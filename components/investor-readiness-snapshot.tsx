"use client"

import { Card } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

interface InvestorReadinessSnapshotProps {
  verdict?: string
  overallScore?: number
  topBlockers?: string[]
}

export function InvestorReadinessSnapshot({
  verdict = "Not Ready",
  overallScore = 0,
  topBlockers = ["Market sizing not credible", "No traction evidence"],
}: InvestorReadinessSnapshotProps) {
  return (
    <Card className="border-border bg-card overflow-hidden">
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="p-6 flex-1 flex items-center justify-between border-b md:border-b-0 md:border-r border-border">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-red-500/10">
              <AlertTriangle className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground font-medium">Investor Readiness</p>
              <p className="text-xl font-bold text-red-500">{verdict}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground font-medium">Overall Score</p>
            <p className="text-3xl font-black text-primary">
              {overallScore} <span className="text-base font-normal text-muted-foreground">/ 100</span>
            </p>
          </div>
        </div>
        <div className="p-6 flex-1 bg-muted/30">
          <p className="text-[10px] uppercase font-bold text-muted-foreground mb-3">Top Blockers</p>
          <div className="space-y-2">
            {(topBlockers).map(
              (item: string, i: number) => (
                <div key={i} className="flex items-start gap-2 text-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
