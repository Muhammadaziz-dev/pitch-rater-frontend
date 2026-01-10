"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Target } from "lucide-react"

interface ClaimConfidenceMapProps {
  isOpen: boolean
  toggleOpen: () => void
  claimAssumptions: any
}

export function ClaimConfidenceMap({ isOpen, toggleOpen, claimAssumptions }: ClaimConfidenceMapProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-500" />
                <CardTitle className="text-xl">Claim Confidence Map</CardTitle>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(claimAssumptions.claims || {}).map(([key, val]) => {
                const hasEvidence = claimAssumptions.evidence_present?.[key]
                const isMissing = val === "Not stated" || val === null
                return (
                  <div key={key} className="p-4 border rounded-xl bg-muted/20 relative overflow-hidden group">
                    <div
                      className={`absolute left-0 top-0 bottom-0 w-1 ${
                        isMissing ? "bg-red-500" : hasEvidence ? "bg-green-500" : "bg-amber-500"
                      }`}
                    />
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-muted-foreground">
                        {key.replace(/_/g, " ")}
                      </span>
                      <Badge
                        variant="outline"
                        className={
                          isMissing
                            ? "text-red-500 border-red-500/20"
                            : hasEvidence
                              ? "text-green-500 border-green-500/20"
                              : "text-amber-500 border-amber-500/20"
                        }
                      >
                        {isMissing ? "Missing" : hasEvidence ? "Evidence Found" : "Low Confidence"}
                      </Badge>
                    </div>
                    <p className="text-sm font-semibold mb-1">{val as string}</p>
                    <p className="text-[10px] text-muted-foreground italic">
                      {isMissing
                        ? "Issue: No evidence found in pitch"
                        : hasEvidence
                          ? "Status: Mentioned clearly in pitch"
                          : "Issue: Claim made but lacks specific data"}
                    </p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
