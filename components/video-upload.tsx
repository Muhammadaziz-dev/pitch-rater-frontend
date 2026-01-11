"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Upload, Video, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { usePolling } from "@/hooks/use-polling"
import {
  analyzeVideoPitch,
  extractClaimsText,
  analyzeMarketSize,
  scoreStartup,
  investorPersonas,
  skepticismFlags,
  getJob,
} from "@/lib/api"

interface VideoUploadProps {
  onAnalysisComplete?: (data: any) => void
}

const ACCEPTED_FILE_TYPES = ["video/mp4", "video/quicktime", "audio/mpeg", "audio/wav", "audio/mp3"]

type AnalysisStep =
  | "idle"
  | "uploading"
  | "polling"
  | "extracting_claims"
  | "analyzing_market"
  | "scoring"
  | "complete"
  | "failed"

export function VideoUpload({ onAnalysisComplete }: VideoUploadProps) {
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
    pollingInterval: 5000,
    maxAttempts: 30,
  })

  useEffect(() => {
    if (jobId) {
      setAnalysisStep("polling")
      startPolling()
    }
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
          const videoData = jobResult.result
          if (!videoData?.transcript || !videoData?.analysis) {
            throw new Error("Video analysis result is missing transcript or analysis.")
          }

          const { transcript, analysis } = videoData
          const companyOverview = analysis.summary?.["Company Overview"]

          setAnalysisStep("extracting_claims")
          const [claimsData, marketResearchData, personasData] = await Promise.all([
            extractClaimsText(transcript),
            analyzeMarketSize({
              company_name: companyOverview?.["Company Name"] ?? "Unknown",
              business_description: companyOverview?.["What the Company Does"] ?? "N/A",
              industry: companyOverview?.["Industry"] ?? "N/A",
              region: companyOverview?.["Region"] ?? "Global",
            }),
            investorPersonas(transcript),
          ])

          if (!claimsData?.claim_assumptions || !marketResearchData?.market_research) {
            throw new Error("Failed to retrieve claims or market research.")
          }

          setAnalysisStep("scoring")
          const [scoreData, skepticismData] = await Promise.all([
            scoreStartup(claimsData.claim_assumptions, marketResearchData.market_research),
            skepticismFlags(claimsData.claim_assumptions),
          ])

          const investorModes =
            personasData?.investor_modes ||
            personasData?.analysis?.investor_modes ||
            videoData?.analysis?.investor_modes ||
            {}

          const finalData = {
            ...videoData,
            ...claimsData,
            ...marketResearchData,
            ...scoreData,
            ...skepticismData,
            ...personasData,
            investor_modes: investorModes,
          }
          onAnalysisComplete?.(finalData)
          setAnalysisStep("complete")
          toast({ title: "Analysis Complete", description: "Video pitch analysis is ready." })
        } catch (error) {
          console.error("Error processing video analysis chain:", error)
          toast({
            title: "Processing Error",
            description: "Failed to process video analysis results. Please try again.",
            variant: "destructive",
          })
          setAnalysisStep("failed")
        }
      } else if (jobResult.status === "failed") {
        stopPolling()
        console.error("Video analysis job failed:", jobResult.error)
        toast({
          title: "Analysis Failed",
          description: jobResult.error || "The video analysis job failed. Please try again.",
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
      if (!ACCEPTED_FILE_TYPES.includes(selectedFile.type)) {
        toast({
          title: "Invalid file type",
          description: "Please upload a supported video or audio file (MP4, MOV, MP3, WAV).",
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
      const data = await analyzeVideoPitch(file)
      if (data.job_id) {
        setJobId(data.job_id)
      }
      else {
        throw new Error("Did not receive a job ID.")
      }
    } catch (error) {
      console.error("Video analysis error:", error)
      toast({
        title: "Upload Failed",
        description: "Failed to start video analysis. Please try again.",
        variant: "destructive",
      })
      setAnalysisStep("failed")
    }
  }

  const isLoading =
    analysisStep === "uploading" ||
    analysisStep === "polling" ||
    analysisStep === "extracting_claims" ||
    analysisStep === "analyzing_market" ||
    analysisStep === "scoring"

  const getLoadingMessage = () => {
    switch (analysisStep) {
      case "uploading":
        return "Uploading..."
      case "polling":
        return `Analyzing & Transcribing... (Job ID: ${jobId})`
      case "extracting_claims":
        return "Extracting claims & personas..."
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
          accept={ACCEPTED_FILE_TYPES.join(",")}
          onChange={handleFileChange}
          className="hidden"
          id="video-upload"
          disabled={isLoading}
        />
        <label htmlFor="video-upload" className={isLoading ? "cursor-not-allowed" : "cursor-pointer"}>
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              {file ? <Video className="h-8 w-8 text-primary" /> : <Upload className="h-8 w-8 text-muted-foreground" />}
            </div>
            <div>
              <p className="text-lg font-medium">{file ? file.name : "Click to upload video or audio"}</p>
              <p className="text-sm text-muted-foreground mt-1">MP4, MOV, MP3, WAV files supported</p>
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
        <Button onClick={handleAnalyze} disabled={isLoading || analysisStep === "complete"} className="w-full" size="lg">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {getLoadingMessage()}
            </>
          ) : (
            "Analyze Video Pitch"
          )}
        </Button>
      )}
    </div>
  )
}
