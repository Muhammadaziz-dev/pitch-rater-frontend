"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ShieldAlert, XCircle } from "lucide-react"

interface InvestorSkepticModeProps {
  isOpen: boolean
  toggleOpen: () => void
  skepticism: any[]
}

export function InvestorSkepticMode({ isOpen, toggleOpen, skepticism }: InvestorSkepticModeProps) {
  if (skepticism.length === 0) return null

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <Card className="border-red-500/20 bg-red-500/[0.02]">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-red-500/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <CardTitle className="text-xl">Investor Skeptic Mode</CardTitle>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {skepticism.slice(0, 5).map((item: any, i: number) => {
              const statement = item.statement || item.sentence || ""
              const reason = item.why_investors_doubt || item.reason || ""
              return (
              <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-card shadow-sm">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground">Pitch Sentence</p>
                  <p className="text-sm italic text-muted-foreground">“{statement}”</p>
                </div>
                <div className="space-y-1 border-t md:border-t-0 md:border-l md:pl-4 pt-4 md:pt-0">
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <p className="text-[10px] uppercase font-bold text-red-500">Investor Reaction</p>
                  </div>
                  <p className="text-sm font-medium">{reason}</p>
                </div>
              </div>
            )})}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
