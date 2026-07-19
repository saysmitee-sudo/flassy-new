import { Hero } from "@/components/hero";
import { ExpertiseGrid } from "@/components/expertise-grid";
import { ExperienceStats } from "@/components/experience-stats";
import { ProductionComparison } from "@/components/production-comparison";
import { FaqList } from "@/components/faq-list";
import { ProcessSteps } from "@/components/process-steps";
import { ProjectCarousel } from "@/components/project-carousel";
import { ScrollReveal } from "@/components/scroll-reveal";
import { faqItems } from "@/content/faq";
import { getFeaturedProjects } from "@/content/projects";
import { services } from "@/content/services";

export default function HomePage() {
  const featured = getFeaturedProjects();

  return (
    <>
      <Hero />

      <ProjectCarousel projects={featured} />

      <ProductionComparison />
      <ExperienceStats />

      <section className="container-site pb-20 text-center md:pb-28 md:text-left">
        <ScrollReveal>
          <h2 className="mb-10 text-[32px] font-medium leading-none md:mb-14 md:text-[48px]">
            What we can do
          </h2>
        </ScrollReveal>
        <ExpertiseGrid items={services} />
      </section>

      <section
        id="how-we-work"
        className="container-site scroll-mt-24 pb-20 text-center md:pb-28 md:text-left"
      >
        <ScrollReveal>
          <h2 className="mb-10 text-[32px] font-medium md:mb-14 md:text-[48px]">How we work</h2>
        </ScrollReveal>
        <ProcessSteps />
      </section>

      <section id="faq" className="container-site scroll-mt-24 pb-20 text-center md:pb-28 md:text-left">
        <ScrollReveal className="mb-10 max-w-2xl md:mb-14">
          <h2 className="text-[32px] font-medium md:text-[48px]">FAQ</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-foreground-muted md:text-[18px]">
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
