"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, MessageSquare } from "lucide-react"

interface PitchTranscriptProps {
  isOpen: boolean
  toggleOpen: () => void
  transcript: string | null
}

export function PitchTranscript({ isOpen, toggleOpen, transcript }: PitchTranscriptProps) {
  if (!transcript) return null

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <Card>
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-xl">Pitch Transcript</CardTitle>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">
            <div className="p-4 bg-muted/30 rounded-lg border max-h-60 overflow-y-auto">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{transcript}</p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}
