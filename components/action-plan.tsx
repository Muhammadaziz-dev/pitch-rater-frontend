"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { CheckCircle2, ChevronDown, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react"

interface ActionPlanProps {
  isOpen: boolean
  toggleOpen: () => void
  fixList: string[]
}

export function ActionPlan({ isOpen, toggleOpen, fixList }: ActionPlanProps) {
  const initialItems = fixList || ["Add bottom-up TAM slide", "Show 3 customer interviews"]
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const initialCheckedState: Record<number, boolean> = {}
    initialItems.forEach((_, index) => {
      initialCheckedState[index] = false
    })
    setCheckedItems(initialCheckedState)
  }, [fixList])

  const handleCheckChange = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <Card className="border-green-500/20 bg-green-500/[0.02]">
        <CollapsibleTrigger className="w-full">
          <CardHeader className="cursor-pointer hover:bg-green-500/5 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <CardTitle className="text-xl">Action Plan: What to fix before pitching</CardTitle>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0 space-y-4">
            {initialItems.map((fix: string, i: number) => (
              <div key={i} className="flex items-center gap-3 p-4 border rounded-lg bg-card shadow-sm">
                <Checkbox id={`item-${i}`} checked={checkedItems[i]} onCheckedChange={() => handleCheckChange(i)} />
                <label
                  htmlFor={`item-${i}`}
                  className={`text-sm font-medium ${
                    checkedItems[i] ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {fix}
                </label>
              </div>
            ))}
            <Button className="w-full mt-4">
              <Upload className="h-4 w-4 mr-2" />
              Upload Revised Pitch
            </Button>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  )
}