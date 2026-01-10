"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, TrendingUp } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { MarketResearchResults } from "@/components/market-research-results"

interface MarketResearchProps {
  onAnalysisComplete?: (data: any) => void
}

export function MarketResearch({ onAnalysisComplete }: MarketResearchProps) {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    company_name: "",
    business_description: "",
    industry: "",
    region: "Global",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("https://struttingly-chargeless-aubri.ngrok-free.dev/analyze-market-size", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Analysis failed")

      const data = await response.json()
      setResults(data)
      onAnalysisComplete?.(data)

      toast({
        title: "Analysis complete!",
        description: "Market research has been completed successfully.",
      })

      
    } catch (error) {
      console.error("[v0] Market research error:", error)
      toast({
        title: "Analysis failed",
        description: "Failed to complete market research. Please try again.",
        variant: "destructive",
      })
      
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="company_name">Company Name</Label>
          <Input
            id="company_name"
            value={formData.company_name}
            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
            placeholder="Acme Inc."
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="business_description">Business Description</Label>
          <Textarea
            id="business_description"
            value={formData.business_description}
            onChange={(e) => setFormData({ ...formData, business_description: e.target.value })}
            placeholder="B2B SaaS platform for..."
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              placeholder="SaaS, Logistics, FinTech..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              value={formData.region}
              onChange={(e) => setFormData({ ...formData, region: e.target.value })}
              placeholder="Global, US, EU..."
              required
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full" size="lg">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Researching Market...
            </>
          ) : (
            <>
              <TrendingUp className="mr-2 h-5 w-5" />
              Analyze Market Size
            </>
          )}
        </Button>
      </form>

      {results && <MarketResearchResults data={results} />}
    </div>
  )
}
