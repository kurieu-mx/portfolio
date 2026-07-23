import { SwarmHero } from "@/components/swarm-hero"
import { EnhancedProjectsSection } from "@/components/enhanced-projects-section"
import { SectionHeading } from "@/components/section-heading"
import { AboutMeSection } from "@/components/about-me-section"
import { TechStackShowcase } from "@/components/tech-stack-showcase"
import { ResumeSection } from "@/components/resume-section"
import { InteractiveTimeline } from "@/components/interactive-timeline"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { FadeInSection } from "@/components/section-transitions"
import { GlowMenu } from "@/components/glow-menu"
import { MobileGlowMenu } from "@/components/mobile-glow-menu"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <GlowMenu />
      <MobileGlowMenu />
      <main className="flex-1">
        <SwarmHero />

        <FadeInSection>
          <EnhancedProjectsSection />
        </FadeInSection>

        <FadeInSection>
          <AboutMeSection />
        </FadeInSection>

        <FadeInSection>
          <TechStackShowcase />
        </FadeInSection>

        <FadeInSection>
          <section id="resume" className="py-16 md:py-24 bg-dark-grey-800">
            <div className="container px-4 md:px-6">
              <SectionHeading
                index="04"
                eyebrow="FLIGHT LOG"
                title="Professional Timeline"
                subtitle="My journey through work, projects, and education — tap any entry to expand."
              />
              <InteractiveTimeline />
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <ResumeSection />
        </FadeInSection>

        <FadeInSection>
          <ContactSection />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  )
}
