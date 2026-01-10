import { Button } from "@/components/ui/button"
import { ArrowRight, Upload } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Gradient background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-background to-background" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm">
            <Upload className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">Upload and Analyze</span>
          </div>

          <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight text-balance">
            Analyze Startup Pitch Decks with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="mb-10 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Upload pitch decks, analyze videos, and get instant AI-powered insights with automated scoring, market
            research, and detailed evaluation for investors and accelerators.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link href="/analyzer">
                <Upload className="h-5 w-5" />
                Analyze a Deck Now
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base bg-transparent" asChild>
              <Link href="#how-it-works">
                Learn More
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
