"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

  const handleAnalysisComplete = (data: any, type: AnalysisType) => {
    setActiveAnalysis(data)
    setAnalysisType(type)
  }

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

      {activeAnalysis && analysisType && <AnalysisResults data={activeAnalysis} type={analysisType} />}
    </div>
  )
}