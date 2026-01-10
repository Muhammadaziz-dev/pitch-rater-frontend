import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">Ready to Analyze Your Deal Flow?</h2>
          <p className="text-lg text-muted-foreground mb-10 text-balance">
            Start analyzing startup pitch decks with AI today. Open source and customizable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link href="/analyzer">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="gap-2 text-base bg-transparent" asChild>
              <Link href="https://github.com/hitesh-ag1/deck-insight" target="_blank">
                <Github className="h-5 w-5" />
                View on GitHub
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
