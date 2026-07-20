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
      <h1 className="sr-only">{project.title}</h1>

      {project.cover || project.video ? (
        <motion.div
          ref={heroRef}
          className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] bg-surface md:max-w-md"
          initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease }}
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
            "mx-auto aspect-[9/16] w-full max-w-sm rounded-[var(--radius-card)] md:max-w-md",
            accentClass[project.accent],
          )}
          initial={reduceMotion ? false : { opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          aria-hidden
        />
      )}

      {videos.length > 0 && (
        <ScrollRevealGroup className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2">
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

      {gallery.length > 0 && (
        <ScrollRevealGroup className="mt-4 grid gap-4 md:mt-6 md:grid-cols-2 lg:grid-cols-3">
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
      )}

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
