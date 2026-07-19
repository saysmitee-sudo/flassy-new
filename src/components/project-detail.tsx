"use client";

import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { TiltCard } from "@/components/magnetic";
import { accentClass, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function ProjectDetail({
  project,
  prev,
  next,
}: {
  project: Project;
  prev: Project | null;
  next: Project | null;
}) {
  const reduceMotion = useReducedMotion();
  const videos = (project.videos ?? []).filter((src) => src !== project.video);
  const gallery = (project.images ?? []).filter((src) => src !== project.cover);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-24, 24]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reduceMotion ? [1, 1] : [1.08, 1]);

  return (
    <article className="container-site pb-20 pt-12 md:pb-28 md:pt-20">
      <motion.p
        className="text-[14px] text-foreground-muted md:text-[16px]"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        {project.category}
      </motion.p>

      <motion.h1
        className="section-heading mt-3 text-[48px] leading-none tracking-tight md:text-[84px]"
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.06, ease }}
      >
        {project.title}
      </motion.h1>

      <motion.p
        className="mt-6 max-w-2xl text-[16px] leading-relaxed text-foreground-muted md:text-[20px]"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.14, ease }}
      >
        {project.summary}
      </motion.p>

      {project.cover || project.video ? (
        <motion.div
          ref={heroRef}
          className="relative mx-auto mt-12 aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] bg-surface md:mt-16 md:max-w-md"
          initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.2, ease }}
        >
          {project.video ? (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={project.video}
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
              poster={project.cover}
              aria-label={project.title}
            />
          ) : project.cover ? (
            <motion.div className="absolute inset-0" style={{ y: imageY, scale: imageScale }}>
              <Image
                src={project.cover}
                alt={project.title}
                fill
                unoptimized
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover object-top"
              />
            </motion.div>
          ) : null}
        </motion.div>
      ) : (
        <motion.div
          className={cn(
            "mt-12 flex min-h-[320px] items-end rounded-[var(--radius-card)] p-8 md:mt-16 md:min-h-[520px] md:p-12",
            accentClass[project.accent],
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
        >
          <div className="grid w-full gap-4 text-black/80 md:grid-cols-3">
            <div>
              <p className="text-[14px] opacity-70">Role</p>
              <p className="mt-1 text-[18px] font-medium">{project.role}</p>
            </div>
            <div>
              <p className="text-[14px] opacity-70">Year</p>
              <p className="mt-1 text-[18px] font-medium">{project.year}</p>
            </div>
            <div>
              <p className="text-[14px] opacity-70">Category</p>
              <p className="mt-1 text-[18px] font-medium">{project.category}</p>
            </div>
          </div>
        </motion.div>
      )}

      <ScrollRevealGroup className="mt-12 grid gap-6 text-foreground-muted md:mt-16 md:grid-cols-3 md:gap-8">
        {[
          { label: "Role", value: project.role },
          { label: "Year", value: project.year },
          { label: "Category", value: project.category },
        ].map((item) => (
          <ScrollRevealItem key={item.label}>
            <motion.div whileHover={reduceMotion ? undefined : { y: -3 }}>
              <p className="text-[14px]">{item.label}</p>
              <p className="mt-1 text-[18px] font-medium text-foreground">{item.value}</p>
            </motion.div>
          </ScrollRevealItem>
        ))}
      </ScrollRevealGroup>

      <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <ScrollReveal>
          <h2 className="text-[28px] font-semibold tracking-tight md:text-[36px]">Overview</h2>
        </ScrollReveal>
        <div className="space-y-6">
          {project.body.map((paragraph, index) => (
            <ScrollReveal key={paragraph} delay={0.06 * index}>
              <p className="text-[16px] leading-relaxed text-foreground-muted md:text-[18px]">
                {paragraph}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {videos.length > 0 && (
        <ScrollRevealGroup className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          {videos.map((src, index) => (
            <ScrollRevealItem key={src}>
              <div className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-card)] bg-black">
                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  src={src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  preload="auto"
                  aria-label={`${project.title} — film ${index + 1}`}
                />
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      )}

      {gallery.length > 0 ? (
        <ScrollRevealGroup className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {gallery.map((src, index) => (
            <ScrollRevealItem key={src}>
              <TiltCard maxTilt={reduceMotion ? 0 : 5}>
                <motion.div
                  className="relative aspect-[9/16] overflow-hidden rounded-[var(--radius-card)] bg-surface"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                >
                  <motion.div
                    className="absolute inset-0"
                    whileHover={reduceMotion ? undefined : { scale: 1.05 }}
                    transition={{ duration: 0.7, ease }}
                  >
                    <Image
                      src={src}
                      alt={`${project.title} — frame ${index + 1}`}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </motion.div>
              </TiltCard>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      ) : videos.length === 0 ? (
        <ScrollRevealGroup className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
          <ScrollRevealItem>
            <div
              className={cn(
                "aspect-[9/16] rounded-[var(--radius-card)] opacity-90",
                accentClass[project.accent],
              )}
            />
          </ScrollRevealItem>
          <ScrollRevealItem>
            <div className="aspect-[9/16] rounded-[var(--radius-card)] bg-surface" />
          </ScrollRevealItem>
        </ScrollRevealGroup>
      ) : null}

      <ScrollReveal className="mt-16 md:mt-24">
        <nav
          className="flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:justify-between"
          aria-label="Project navigation"
        >
          {prev ? (
            <motion.div whileHover={reduceMotion ? undefined : { x: -4 }}>
              <Link href={`/projects/${prev.slug}`} className="group block">
                <p className="text-[14px] text-foreground-muted">Previous</p>
                <p className="mt-1 text-[20px] font-medium transition-opacity group-hover:opacity-70">
                  {prev.title}
                </p>
              </Link>
            </motion.div>
          ) : (
            <span />
          )}
          {next ? (
            <motion.div whileHover={reduceMotion ? undefined : { x: 4 }}>
              <Link href={`/projects/${next.slug}`} className="group block md:text-right">
                <p className="text-[14px] text-foreground-muted">Next</p>
                <p className="mt-1 text-[20px] font-medium transition-opacity group-hover:opacity-70">
                  {next.title}
                </p>
              </Link>
            </motion.div>
          ) : null}
        </nav>
      </ScrollReveal>
    </article>
  );
}
