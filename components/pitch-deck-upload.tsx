"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { usePolling } from "@/hooks/use-polling"
import { analyzePitchDeck, analyzeMarketSize, scoreStartup, skepticismFlags, getJob } from "@/lib/api"

interface PitchDeckUploadProps {
  onAnalysisComplete?: (data: any) => void
}

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

type AnalysisStep =
  | "idle"
  | "uploading"
  | "polling"
  | "analyzing_market"
  | "scoring"
  | "complete"
  | "failed"

export function PitchDeckUpload({ onAnalysisComplete }: PitchDeckUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [jobId, setJobId] = useState<string | null>(null)
  const [analysisStep, setAnalysisStep] = useState<AnalysisStep>("idle")
  const { toast } = useToast()

  const {
    data: jobResult,
    isPolling,
    error: pollingError,
    startPolling,
    stopPolling,
  } = usePolling({
    fetcher: () => getJob(jobId!),
    isDone: (data) => data?.status === "completed" || data?.status === "failed",
    pollingInterval: 3000,
    maxAttempts: 20,
  })

  useEffect(() => {
    if (jobId) {
      setAnalysisStep("polling")
      startPolling()
    }
    // Cleanup on unmount
    return () => {
      stopPolling()
    }
  }, [jobId])

  useEffect(() => {
    const processJobResult = async () => {
      if (!jobResult) return

      if (jobResult.status === "completed") {
        stopPolling()
        try {
          const deckAnalysisResult = jobResult.result
          if (!deckAnalysisResult || !deckAnalysisResult.summary || !deckAnalysisResult.claim_assumptions) {
            throw new Error("Analysis result is missing expected data.")
          }

          setAnalysisStep("analyzing_market")
          const companyOverview = deckAnalysisResult.summary?.["Company Overview"]
          const marketResearchData = await analyzeMarketSize({
            company_name: companyOverview?.["Company Name"] ?? "Unknown",
            business_description: companyOverview?.["What the Company Does"] ?? "N/A",
            industry: companyOverview?.["Industry"] ?? "N/A",
            region: companyOverview?.["Region"] ?? "Global",
          })

          setAnalysisStep("scoring")
          const [scoreData, skepticismData] = await Promise.all([
            scoreStartup(deckAnalysisResult.claim_assumptions, marketResearchData.market_research),
            skepticismFlags(deckAnalysisResult.claim_assumptions),
          ])

          const investorModes = deckAnalysisResult?.investor_modes || {}

          const finalData = {
            ...deckAnalysisResult,
            ...marketResearchData,
            ...scoreData,
            ...skepticismData,
            investor_modes: investorModes,
          }

          onAnalysisComplete?.(finalData)
          setAnalysisStep("complete")
          toast({ title: "Analysis Complete", description: "Startup analysis is ready." })
        } catch (error) {
          console.error("Error processing analysis chain:", error)
          toast({
            title: "Processing Error",
            description: "Failed to process analysis results. Please try again.",
            variant: "destructive",
          })
          setAnalysisStep("failed")
        }
      } else if (jobResult.status === "failed") {
        stopPolling()
        console.error("Pitch deck analysis job failed:", jobResult.error)
        toast({
          title: "Analysis Failed",
          description: jobResult.error || "The analysis job failed. Please try again.",
          variant: "destructive",
        })
        setAnalysisStep("failed")
      }
    }

    processJobResult()
  }, [jobResult])

  useEffect(() => {
    if (pollingError) {
      toast({
        title: "Polling Error",
        description: "Could not retrieve analysis status. Please try again.",
        variant: "destructive",
      })
      setAnalysisStep("failed")
    }
  }, [pollingError])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file.",
          variant: "destructive",
        })
        return
      }
      if (selectedFile.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `Please upload a file smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
      setAnalysisStep("idle")
      setJobId(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) return

    setAnalysisStep("uploading")
    try {
      const data = await analyzePitchDeck(file)
      if (data.job_id) {
        setJobId(data.job_id)
      } else {
        throw new Error("Did not receive a job ID.")
      }
    } catch (error) {
      console.error("Pitch deck analysis error:", error)
      toast({
        title: "Upload Failed",
        description: "Failed to start pitch deck analysis. Please try again.",
        variant: "destructive",
      })
      setAnalysisStep("failed")
    }
  }

  const isLoading =
    analysisStep === "uploading" ||
    analysisStep === "polling" ||
    analysisStep === "analyzing_market" ||
    analysisStep === "scoring"

  const getLoadingMessage = () => {
    switch (analysisStep) {
      case "uploading":
        return "Uploading..."
      case "polling":
        return `Analyzing pitch deck... (Job ID: ${jobId})`
      case "analyzing_market":
        return "Researching market..."
      case "scoring":
        return "Scoring startup..."
      default:
        return "Analyzing..."
    }
  }

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="pitch-deck-upload"
          disabled={isLoading}
        />
        <label htmlFor="pitch-deck-upload" className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              {file ? <FileText className="h-8 w-8 text-primary" /> : <Upload className="h-8 w-8 text-muted-foreground" />}
            </div>
            <div>
              <p className="text-lg font-medium">{file ? file.name : "Click to upload pitch deck"}</p>
              <p className="text-sm text-muted-foreground mt-1">PDF files only, up to 50MB</p>
            </div>
          </div>
        </label>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center text-muted-foreground">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          <p>{getLoadingMessage()}</p>
        </div>
      )}

      {file && (
        <Button onClick={handleAnalyze} disabled={isLoading || analysisStep === 'complete'} className="w-full" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {getLoadingMessage()}
            </>
          ) : (
            "Analyze Pitch Deck"
          )}
        </Button>
      )}
    </div>
  )
}
