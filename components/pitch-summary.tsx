"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, FileText, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface PitchSummaryProps {
  isOpen: boolean
  toggleOpen: () => void
  companyOverview: any
  summary: any
}

export function PitchSummary({ isOpen, toggleOpen, companyOverview, summary }: PitchSummaryProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState({
    companyName: companyOverview["Company Name"] || "Untitled Startup",
    industry: companyOverview["Industry"] || "Technology",
    oneLiner:
      companyOverview["What the Company Does"] || companyOverview["problem"] || "No description provided",
    targetCustomer: summary.for_who || companyOverview["Region"] || "Global",
    teamSize: companyOverview["Team Size"] || "Not stated",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    // Here you would typically save the data to a backend
    console.log("Saving data:", editedData)
    setIsEditing(false)
    // For now, we just update the view. A real implementation would update the source data.
    companyOverview["Company Name"] = editedData.companyName
    companyOverview["Industry"] = editedData.industry
    companyOverview["What the Company Does"] = editedData.oneLiner
    summary.for_who = editedData.targetCustomer
    companyOverview["Team Size"] = editedData.teamSize
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Reset changes
    setEditedData({
      companyName: companyOverview["Company Name"] || "Untitled Startup",
      industry: companyOverview["Industry"] || "Technology",
      oneLiner:
        companyOverview["What the Company Does"] || companyOverview["problem"] || "No description provided",
      targetCustomer: summary.for_who || companyOverview["Region"] || "Global",
      teamSize: companyOverview["Team Size"] || "Not stated",
    })
  }

  return (
    <Collapsible open={isOpen} onOpenChange={toggleOpen}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CollapsibleTrigger asChild>
              <div className="flex flex-grow items-center gap-2 cursor-pointer">
                <FileText className="h-5 w-5 text-blue-500" />
                <CardTitle className="text-xl">What We Understood From Your Pitch</CardTitle>
              </div>
            </CollapsibleTrigger>
            <div className="flex items-center gap-4">
              {!isEditing && (
                <Button variant="ghost" size="sm" onClick={handleEdit}>
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-6 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Company</label>
                {isEditing ? (
                  <Input name="companyName" value={editedData.companyName} onChange={handleInputChange} />
                ) : (
                  <p className="font-semibold text-lg">{editedData.companyName}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Industry</label>
                {isEditing ? (
                  <Input name="industry" value={editedData.industry} onChange={handleInputChange} />
                ) : (
                  <p className="font-semibold">{editedData.industry}</p>
                )}
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">One-liner</label>
                {isEditing ? (
                  <Textarea name="oneLiner" value={editedData.oneLiner} onChange={handleInputChange} />
                ) : (
                  <div className="p-3 bg-muted/30 rounded-lg border italic text-muted-foreground leading-relaxed">
                    {editedData.oneLiner}
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Target Customer</label>
                {isEditing ? (
                  <Input name="targetCustomer" value={editedData.targetCustomer} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm font-medium">{editedData.targetCustomer}</p>
                )}
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold text-muted-foreground">Team Size</label>
                {isEditing ? (
                  <Input name="teamSize" value={editedData.teamSize} onChange={handleInputChange} />
                ) : (
                  <p className="text-sm font-medium">{editedData.teamSize}</p>
                )}
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>    </Collapsible>
  )
}