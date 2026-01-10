import { AnalyzerDashboard } from "@/components/analyzer-dashboard"
import { Header } from "@/components/header"

export default function AnalyzerPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <AnalyzerDashboard />
      </main>
    </div>
  )
}
