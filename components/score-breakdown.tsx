"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, Zap } from "lucide-react"
import { useState } from "react"

interface ScoreBreakdownProps {
  isOpen: boolean
  toggleOpen: () => void
  ratings: any
}

export function ScoreBreakdown({ isOpen, toggleOpen, ratings }: ScoreBreakdownProps) {
  const [openScores, setOpenScores] = useState<Record<string, boolean>>({})

  const toggleScore = (key: string) => {
    setOpenScores((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                <CardTitle className="text-xl">How investors scored your pitch</CardTitle>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-2">
            {Object.entries(ratings).map(([key, value]: [string, any]) => {
              const score = typeof value === "object" && value !== null ? value.score : value
              const explanation = typeof value === "object" && value !== null ? value.explanation : null

              return (
                <Collapsible key={key} open={openScores[key]} onOpenChange={() => toggleScore(key)}>
                  <CollapsibleTrigger className="w-full text-left">
                    <div className="space-y-2 p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium capitalize">{key.replace(/_/g, " ")}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-primary">{score}/10</span>
                          {explanation && (
                            <ChevronDown
                              className={`h-4 w-4 transition-transform ${openScores[key] ? "rotate-180" : ""}`}
                            />
                          )}
                        </div>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            (score as number) < 5
                              ? "bg-red-500"
                              : (score as number) < 8
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${((score as number) / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  {explanation && (
                    <CollapsibleContent>
                      <div className="p-4 mt-1 border-t bg-muted/30 rounded-b-lg">
                        <p className="text-sm text-muted-foreground italic">{explanation}</p>
                      </div>
                    </CollapsibleContent>
                  )}
                </Collapsible>
              )
            })}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}