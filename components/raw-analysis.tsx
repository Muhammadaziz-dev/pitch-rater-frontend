"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ArrowRight } from "lucide-react"

interface RawAnalysisProps {
  data: any
}

export function RawAnalysis({ data }: RawAnalysisProps) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center gap-2 text-[10px] uppercase font-bold text-muted-foreground hover:text-foreground transition-colors mx-auto mt-8">
        <ArrowRight className="h-3 w-3" /> View raw analysis (advanced)
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-4">
        <Card>
          <CardContent className="p-4">
            <pre className="text-[10px] overflow-auto max-h-60 bg-muted p-4 rounded">
              {JSON.stringify(data, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </CollapsibleContent>
    </Collapsible>
  )
}
