import { FileText, Video, TrendingUp, Github, MessageSquare, Award } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "Pitch Deck Analysis",
    description:
      "Upload PDF pitch decks and get comprehensive AI-powered analysis extracting key startup information, business model, traction, and team details.",
  },
  {
    icon: Video,
    title: "Video Pitch Scoring",
    description:
      "Upload pitch videos with automatic transcription and investor-style critique. Get readiness scores and hard questions your startup needs to answer.",
  },
  {
    icon: Award,
    title: "Custom Scoring Rubrics",
    description:
      "Apply customizable evaluation rubrics tailored for investors, accelerators, or competition judges. Score startups consistently across criteria.",
  },
  {
    icon: TrendingUp,
    title: "Market Research Agent",
    description:
      "AI-powered market size estimation using real-time internet data. Understand sector dynamics, competitors, and market opportunities instantly.",
  },
  {
    icon: Github,
    title: "GitHub Analysis",
    description:
      "For developer tools and open-source startups, analyze repository health, community engagement, and development activity automatically.",
  },
  {
    icon: MessageSquare,
    title: "QA Chatbot",
    description:
      "Ask natural language questions about any analyzed startup. RAG-powered chatbot provides instant answers from the full startup profile.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Evaluate Startups</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive AI-powered tools for investors, accelerators, and ecosystem builders
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card
                key={feature.title}
                className="border-border bg-card/50 backdrop-blur hover:bg-card transition-colors"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
