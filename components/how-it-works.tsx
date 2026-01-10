import { Upload, Cpu, BarChart3, Download } from "lucide-react"

const steps = [
  {
    icon: Upload,
    title: "Upload",
    description: "Upload a pitch deck PDF or video, or provide a GitHub repository URL for developer tools.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description:
      "Our AI agents extract information, research the market, and analyze repositories using Gemini models.",
  },
  {
    icon: BarChart3,
    title: "Score & Insights",
    description:
      "Get detailed scoring based on your custom rubric, market size estimates, and comprehensive summaries.",
  },
  {
    icon: Download,
    title: "Export & Share",
    description: "Export results, ask follow-up questions with our QA chatbot, and share insights with your team.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to comprehensive startup analysis
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-12 left-0 right-0 h-0.5 bg-border hidden lg:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative z-10 mb-4 flex h-24 w-24 items-center justify-center rounded-full border-4 border-background bg-card">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
