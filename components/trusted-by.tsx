export function TrustedBy() {
  const companies = ["Y Combinator", "Techstars", "Sequoia", "a16z", "500 Global", "Founders Fund"]

  return (
    <section className="py-16 border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
          Trusted by Investors & Accelerators
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {companies.map((company) => (
            <div
              key={company}
              className="text-lg font-medium text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
