interface SectionHeadingProps {
  index: string
  eyebrow: string
  title: string
  subtitle?: string
}

export function SectionHeading({ index, eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <p className="font-mono text-maize/70 text-xs sm:text-sm tracking-[0.3em]">
        {"// "}
        {index} · {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-maize via-maize-200 to-maize-400 bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="mx-auto mt-5 h-px w-24 bg-gradient-to-r from-transparent via-maize to-transparent" />
    </div>
  )
}
