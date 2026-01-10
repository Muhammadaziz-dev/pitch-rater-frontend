"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Target,
  ChevronDown,
  CheckCircle2,
  ShieldAlert,
  FileText,
  User,
  XCircle,
  ArrowRight,
  Zap,
  MessageSquare,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { InvestorReadinessSnapshot } from "@/components/investor-readiness-snapshot"
import { PitchSummary } from "@/components/pitch-summary"
import { ClaimConfidenceMap } from "@/components/claim-confidence-map"
import { InvestorSkepticMode } from "@/components/investor-skeptic-mode"
import { ScoreBreakdown } from "@/components/score-breakdown"
import { InvestorPersonas } from "@/components/investor-personas"
import { ActionPlan } from "@/components/action-plan"
import { RawAnalysis } from "@/components/raw-analysis"
import { PitchTranscript } from "@/components/pitch-transcript"

interface AnalysisResultsProps {
  data: any
  type: "pitch-deck" | "video" | "market" | "github" | "complete"
}

export function AnalysisResults({ data, type }: AnalysisResultsProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    snapshot: true,
    summary: true,
    claims: true,
    skeptic: true,
    breakdown: false,
    personas: true,
    actionPlan: true,
    transcript: false, // added transcript state
  })

  if (!data) return null

  const getPitchData = () => {
    const baseData = data // data is the aggregated result now

    return {
      summary: baseData.summary || {},
      investorSim: baseData.investor_simulation || {},
      claimAssumptions: baseData.claim_assumptions || {},
      skepticism: baseData.skepticism_flags || [],
      ratings: baseData.investor_simulation?.scores || {},
      verdict: baseData.investor_simulation?.verdict,
      overallScore: baseData.investor_simulation?.overall_score,
      investorModes: baseData.investor_modes || {},
      transcript: baseData.transcript || null,
      topBlockers: baseData.top_blockers || [],
      actionPlan: baseData.next_actions || [],
    }
  }

  const pData = getPitchData()
  const companyOverview = pData.summary["Company Overview"] || pData.summary || {}

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-6 mt-8">
      {type !== "market" && (
        <>
          <InvestorReadinessSnapshot
            verdict={pData.verdict}
            overallScore={pData.overallScore}
            topBlockers={pData.topBlockers}
          />
          <ClaimConfidenceMap
            isOpen={openSections.claims}
            toggleOpen={() => toggleSection("claims")}
            claimAssumptions={pData.claimAssumptions}
          />
          <InvestorSkepticMode
            isOpen={openSections.skeptic}
            toggleOpen={() => toggleSection("skeptic")}
            skepticism={pData.skepticism}
          />
          <ScoreBreakdown
            isOpen={openSections.breakdown}
            toggleOpen={() => toggleSection("breakdown")}
            ratings={pData.ratings}
          />
          <InvestorPersonas
            isOpen={openSections.personas}
            toggleOpen={() => toggleSection("personas")}
            investorModes={pData.investorModes}
          />
          <ActionPlan
            isOpen={openSections.actionPlan}
            toggleOpen={() => toggleSection("actionPlan")}
            fixList={pData.actionPlan}
          />
          <PitchTranscript
            isOpen={openSections.transcript}
            toggleOpen={() => toggleSection("transcript")}
            transcript={pData.transcript}
          />
        </>
      )}

      <PitchSummary
        isOpen={openSections.summary}
        toggleOpen={() => toggleSection("summary")}
        companyOverview={companyOverview}
        summary={pData.summary}
      />

      <RawAnalysis data={data} />
    </div>
  )
}