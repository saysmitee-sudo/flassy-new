import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected AI photo, video, avatar, and campaign work from FLASSY STUDIO.",
};

export default function ProjectsPage() {
  return (
    <section className="container-site pb-16 pt-10 text-center md:pb-20 md:pt-14 md:text-left">
      <div className="mb-10 max-w-2xl md:mb-12">
        <ScrollReveal>
          <h1 className="text-[40px] font-medium leading-none tracking-tight md:text-[64px]">
            Projects
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={0.08}>
          <p className="mt-5 text-[16px] leading-relaxed text-foreground-muted md:text-[18px]">
            A growing library of visual AI production — from product stills and motion to avatars and
            full social launches.
          </p>
        </ScrollReveal>
      </div>

      <ScrollRevealGroup className="grid gap-6 md:grid-cols-2 md:gap-6">
        {projects.map((project) => (
          <ScrollRevealItem key={project.slug}>
            <ProjectCard project={project} />
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
