import { EnhancedHeroSection } from "@/components/enhanced-hero-section"
import { EnhancedProjectsSection } from "@/components/enhanced-projects-section"
import { AboutMeSection } from "@/components/about-me-section"
import { TechStackShowcase } from "@/components/tech-stack-showcase"
import { ResumeSection } from "@/components/resume-section"
import { InteractiveTimeline } from "@/components/interactive-timeline"
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
        <EnhancedHeroSection />

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
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-maize">Professional Timeline</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  My journey through education and professional experience, click on any item to learn more.
                </p>
              </div>
              <InteractiveTimeline />
            </div>
          </section>
        </FadeInSection>

        <FadeInSection>
          <ResumeSection />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  )
}
