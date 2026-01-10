"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, User } from "lucide-react"

interface InvestorPersonasProps {
  isOpen: boolean
  toggleOpen: () => void
  investorModes: any
}

export function InvestorPersonas({ isOpen, toggleOpen, investorModes }: InvestorPersonasProps) {
  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle className="text-xl">Investor Personas</CardTitle>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.entries(investorModes).map(([mode, data]: [string, any]) => (
                <div key={mode} className="p-4 border rounded-xl bg-muted/10 space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-bold capitalize">{mode.replace(/_/g, " ")}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Hard Questions</p>
                    <div className="space-y-2">
                      {(data.hard_questions || []).map((q: string, i: number) => (
                        <div key={i} className="text-xs p-2 bg-background border rounded italic text-muted-foreground">
                          {q}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
