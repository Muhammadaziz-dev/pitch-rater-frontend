"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MessageCircleQuestion,
  Target,
  AlertTriangle,
  Users,
  ThumbsUp,
  ThumbsDown,
  TrendingUp,
  DollarSign,
  Lightbulb,
  AlertCircle,
  Sparkles,
  Building2,
} from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface MarketResearchResultsProps {
  data: any
}

export function MarketResearchResults({ data }: MarketResearchResultsProps) {
  const research = data.market_research
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    questions: true,
    target: true,
    problem: true,
    competitors: true,
    sentiment: false,
    market: false,
    pricing: false,
    gap: false,
    risks: false,
    trends: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  return (
    <div className="space-y-4">
      {/* Clarification Questions */}
      {research?.clarification_questions && research.clarification_questions.length > 0 && (
        <Collapsible open={openSections.questions} onOpenChange={() => toggleSection("questions")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <MessageCircleQuestion className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold">Clarification Questions</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.questions ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 space-y-2">
                {research.clarification_questions.map((question: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-1">•</span>
                    <p className="text-sm text-muted-foreground">{question}</p>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Target Market */}
      {research?.target_market && (
        <Collapsible open={openSections.target} onOpenChange={() => toggleSection("target")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Target className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Target Market</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.target ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {research.target_market.primary_users && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Primary Users</p>
                      <p className="font-medium">{research.target_market.primary_users}</p>
                    </div>
                  )}
                  {research.target_market.geography && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Geography</p>
                      <p className="font-medium">{research.target_market.geography}</p>
                    </div>
                  )}
                  {research.target_market.secondary_users && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-muted-foreground mb-1">Secondary Users</p>
                      <p className="font-medium">{research.target_market.secondary_users}</p>
                    </div>
                  )}
                </div>
                {research.target_market.citations && research.target_market.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {research.target_market.citations.map((citation: string, idx: number) => (
                        <a
                          key={idx}
                          href={citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          [{idx + 1}]
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Main Problem */}
      {research?.main_problem && (
        <Collapsible open={openSections.problem} onOpenChange={() => toggleSection("problem")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg font-semibold">Main Problem</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.problem ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                {research.main_problem.pain_points && research.main_problem.pain_points.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">Pain Points:</p>
                    {research.main_problem.pain_points.map((point: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        <p className="text-sm">{point}</p>
                      </div>
                    ))}
                  </div>
                )}
                {research.main_problem.citations && research.main_problem.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {research.main_problem.citations.map((citation: string, idx: number) => (
                        <a
                          key={idx}
                          href={citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          [{idx + 1}]
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Competitors */}
      {research?.competitors && research.competitors.length > 0 && (
        <Collapsible open={openSections.competitors} onOpenChange={() => toggleSection("competitors")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">Competitors</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.competitors ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 space-y-4">
                {research.competitors.map((competitor: any, idx: number) => (
                  <div key={idx} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{competitor.name}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{competitor.description}</p>
                    {competitor.citations && competitor.citations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {competitor.citations.map((citation: string, cidx: number) => (
                          <a
                            key={cidx}
                            href={citation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            [{cidx + 1}]
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* User Sentiment */}
      {research?.user_sentiment && (
        <Collapsible open={openSections.sentiment} onOpenChange={() => toggleSection("sentiment")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold">User Sentiment</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.sentiment ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {research.user_sentiment.positive && research.user_sentiment.positive.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsUp className="h-4 w-4 text-green-500" />
                      <p className="text-sm font-medium text-green-500">Positive</p>
                    </div>
                    <div className="space-y-2">
                      {research.user_sentiment.positive.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-green-500 mt-1">+</span>
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {research.user_sentiment.negative && research.user_sentiment.negative.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <ThumbsDown className="h-4 w-4 text-red-500" />
                      <p className="text-sm font-medium text-red-500">Negative</p>
                    </div>
                    <div className="space-y-2">
                      {research.user_sentiment.negative.map((item: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="text-red-500 mt-1">-</span>
                          <p className="text-sm">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {research.user_sentiment.citations && research.user_sentiment.citations.length > 0 && (
                <div className="px-6 pb-6 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                  <div className="flex flex-wrap gap-2">
                    {research.user_sentiment.citations.map((citation: string, idx: number) => (
                      <a
                        key={idx}
                        href={citation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-500 hover:underline"
                      >
                        [{idx + 1}]
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Market Size & Growth */}
      {research?.market_size_growth && (
        <Collapsible open={openSections.market} onOpenChange={() => toggleSection("market")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-emerald-500" />
                <h3 className="text-lg font-semibold">Market Size & Growth</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.market ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {research.market_size_growth.market_size && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Market Size</p>
                      <p className="text-2xl font-bold text-emerald-500">{research.market_size_growth.market_size}</p>
                    </div>
                  )}
                  {research.market_size_growth.growth_rate && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Growth Rate</p>
                      <p className="text-2xl font-bold text-emerald-500">{research.market_size_growth.growth_rate}</p>
                    </div>
                  )}
                </div>
                {research.market_size_growth.growth_notes && (
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">{research.market_size_growth.growth_notes}</p>
                  </div>
                )}
                {research.market_size_growth.citations && research.market_size_growth.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {research.market_size_growth.citations.map((citation: string, idx: number) => (
                        <a
                          key={idx}
                          href={citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          [{idx + 1}]
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Pricing Strategies */}
      {research?.pricing_strategies && research.pricing_strategies.length > 0 && (
        <Collapsible open={openSections.pricing} onOpenChange={() => toggleSection("pricing")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-yellow-500" />
                <h3 className="text-lg font-semibold">Pricing Strategies</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.pricing ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6 space-y-4">
                {research.pricing_strategies.map((strategy: any, idx: number) => (
                  <div key={idx} className="border border-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold">{strategy.competitor}</h4>
                      <Badge variant="secondary">{strategy.pricing}</Badge>
                    </div>
                    {strategy.notes && <p className="text-sm text-muted-foreground mb-2">{strategy.notes}</p>}
                    {strategy.citations && strategy.citations.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {strategy.citations.map((citation: string, cidx: number) => (
                          <a
                            key={cidx}
                            href={citation}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-500 hover:underline"
                          >
                            [{cidx + 1}]
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Unique Value Gap */}
      {research?.unique_value_gap && (
        <Collapsible open={openSections.gap} onOpenChange={() => toggleSection("gap")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h3 className="text-lg font-semibold">Unique Value Gap</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.gap ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                {research.unique_value_gap.gaps && research.unique_value_gap.gaps.length > 0 && (
                  <div className="space-y-2">
                    {research.unique_value_gap.gaps.map((gap: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-amber-500 mt-1" />
                        <p className="text-sm">{gap}</p>
                      </div>
                    ))}
                  </div>
                )}
                {research.unique_value_gap.citations && research.unique_value_gap.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {research.unique_value_gap.citations.map((citation: string, idx: number) => (
                        <a
                          key={idx}
                          href={citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          [{idx + 1}]
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Risks & Challenges */}
      {research?.risks_challenges && (
        <Collapsible open={openSections.risks} onOpenChange={() => toggleSection("risks")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold">Risks & Challenges</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.risks ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                {research.risks_challenges.risks && research.risks_challenges.risks.length > 0 && (
                  <div className="space-y-2">
                    {research.risks_challenges.risks.map((risk: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-red-500 mt-1" />
                        <p className="text-sm">{risk}</p>
                      </div>
                    ))}
                  </div>
                )}
                {research.risks_challenges.citations && research.risks_challenges.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {research.risks_challenges.citations.map((citation: string, idx: number) => (
                        <a
                          key={idx}
                          href={citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          [{idx + 1}]
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Trends */}
      {research?.trends && (
        <Collapsible open={openSections.trends} onOpenChange={() => toggleSection("trends")}>
          <Card className="border-border bg-card">
            <CollapsibleTrigger className="flex w-full items-center justify-between p-6 hover:bg-accent/50 transition-colors">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold">Industry Trends</h3>
              </div>
              <ChevronDown className={`h-5 w-5 transition-transform ${openSections.trends ? "rotate-180" : ""}`} />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="px-6 pb-6">
                {research.trends.trends && research.trends.trends.length > 0 && (
                  <div className="space-y-2">
                    {research.trends.trends.map((trend: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2">
                        <TrendingUp className="h-4 w-4 text-purple-500 mt-1" />
                        <p className="text-sm">{trend}</p>
                      </div>
                    ))}
                  </div>
                )}
                {research.trends.citations && research.trends.citations.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {research.trends.citations.map((citation: string, idx: number) => (
                        <a
                          key={idx}
                          href={citation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline"
                        >
                          [{idx + 1}]
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}
    </div>
  )
}
