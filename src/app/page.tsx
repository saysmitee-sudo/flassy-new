import { Hero } from "@/components/hero";
import { ExperienceStats } from "@/components/experience-stats";
import { ProductionComparison } from "@/components/production-comparison";
import { FaqList } from "@/components/faq-list";
import { ProcessSteps } from "@/components/process-steps";
import { ProjectCarousel } from "@/components/project-carousel";
import { ScrollReveal } from "@/components/scroll-reveal";
import { faqItems } from "@/content/faq";
import { getFeaturedProjects } from "@/content/projects";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <ProjectCarousel projects={featured} />

      <ProductionComparison />
      <ExperienceStats />

      <section
        id="how-we-work"
        className="container-site scroll-mt-24 pb-20 text-center md:pb-28"
      >
        <ScrollReveal>
          <h2 className="section-heading mb-10 text-[36px] leading-none tracking-tight md:mb-14 md:text-[52px]">
            How we work
          </h2>
        </ScrollReveal>
        <ProcessSteps />
      </section>

      <section id="faq" className="container-site scroll-mt-24 pb-20 text-center md:pb-28">
        <ScrollReveal className="mb-4 md:mb-6">
          <h2 className="section-heading text-[36px] tracking-tight md:text-[52px]">FAQ</h2>
        </ScrollReveal>
        <ScrollReveal className="mb-10 max-w-2xl md:mx-auto md:mb-14 md:text-left">
          <p className="text-[16px] leading-relaxed text-foreground-muted md:text-[18px]">
            Quick answers about how we work, what we produce, and how a project usually starts.
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="text-left">
          <FaqList items={faqItems} />
        </ScrollReveal>
      </section>
    </>
  );
}
