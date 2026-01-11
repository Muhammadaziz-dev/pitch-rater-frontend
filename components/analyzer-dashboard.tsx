"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PitchDeckUpload } from "@/components/pitch-deck-upload"
import { VideoUpload } from "@/components/video-upload"
import { MarketResearch } from "@/components/market-research"
import { GitHubAnalysis } from "@/components/github-analysis"
import { QAChat } from "@/components/qa-chat"
import { AnalysisResults } from "@/components/analysis-results"

type AnalysisType = "pitch-deck" | "video" | "market" | "github" | "complete"

export function AnalyzerDashboard() {
  const [activeAnalysis, setActiveAnalysis] = useState<any>(null)
  const [analysisType, setAnalysisType] = useState<AnalysisType | null>(null)
  const storageKey = "pitch-rater:analysis-cache"
  const cacheTtlMs = 6 * 60 * 60 * 1000

  const handleAnalysisComplete = (data: any, type: AnalysisType) => {
    setActiveAnalysis(data)
    setAnalysisType(type)
  }

  useEffect(() => {
    try {
      const cached = localStorage.getItem(storageKey)
      if (!cached) return
      const parsed = JSON.parse(cached)
      if (!parsed?.data || !parsed?.type || !parsed?.timestamp) {
        localStorage.removeItem(storageKey)
        return
      }
      if (Date.now() - parsed.timestamp > cacheTtlMs) {
        localStorage.removeItem(storageKey)
        return
      }
      const shouldKeep = window.confirm("We found previous analysis results. Keep them?")
      if (!shouldKeep) {
        localStorage.removeItem(storageKey)
        return
      }
      setActiveAnalysis(parsed.data)
      setAnalysisType(parsed.type)
    } catch {
      localStorage.removeItem(storageKey)
    }
  }, [])

  useEffect(() => {
    if (!activeAnalysis || !analysisType) {
      localStorage.removeItem(storageKey)
      return
    }
    const payload = {
      data: activeAnalysis,
      type: analysisType,
      timestamp: Date.now(),
    }
    localStorage.setItem(storageKey, JSON.stringify(payload))
  }, [activeAnalysis, analysisType])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Startup Analyzer</h1>
        <p className="text-muted-foreground">
          Upload a pitch deck, video, or GitHub repository to get AI-powered insights
        </p>
      </div>

      <Tabs defaultValue="deck" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="deck">Pitch Deck</TabsTrigger>
          <TabsTrigger value="video">Video Pitch</TabsTrigger>
          <TabsTrigger value="market">Market Research</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
          <TabsTrigger value="chat">Q&A Chat</TabsTrigger>
        </TabsList>

        <TabsContent value="deck" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Pitch Deck</CardTitle>
              <CardDescription>
                Upload a PDF pitch deck to extract key information and get AI-powered scoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PitchDeckUpload onAnalysisComplete={(data) => handleAnalysisComplete(data, "pitch-deck")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyze Video Pitch</CardTitle>
              <CardDescription>Upload a pitch video for transcription and investor-style critique</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoUpload onAnalysisComplete={(data) => handleAnalysisComplete(data, "video")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Market Research</CardTitle>
              <CardDescription>Get market size estimates and competitive landscape analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <MarketResearch onAnalysisComplete={(data) => handleAnalysisComplete(data, "market")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>GitHub Repository Analysis</CardTitle>
              <CardDescription>Analyze repository health and development activity for developer tools</CardDescription>
            </CardHeader>
            <CardContent>
              <GitHubAnalysis onAnalysisComplete={(data) => handleAnalysisComplete(data, "github")} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chat" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Q&A Assistant</CardTitle>
              <CardDescription>Ask questions about analyzed startups using our AI chatbot</CardDescription>
            </CardHeader>
            <CardContent>
              <QAChat analysis={activeAnalysis} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {activeAnalysis && analysisType && (
        <div className="space-y-3">
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActiveAnalysis(null)
                setAnalysisType(null)
                localStorage.removeItem(storageKey)
              }}
            >
              Clear cached results
            </Button>
          </div>
          <AnalysisResults data={activeAnalysis} type={analysisType} />
        </div>
      )}
    </div>
  )
}
