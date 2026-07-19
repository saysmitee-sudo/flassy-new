"use client";

import Image from "next/image";
import Link from "next/link";
import { accentClass, type Project } from "@/content/projects";
import { cn } from "@/lib/utils";

function ProjectVisual({ project }: { project: Project }) {
  if (project.video) {
    return (
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.cover}
          aria-label={project.title}
        />
      </div>
    );
  }

  if (project.cover) {
    return (
      <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 70vw, 320px"
          className="object-cover"
          style={{ objectPosition: project.coverPosition ?? "50% 50%" }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-end p-6 md:p-8",
        accentClass[project.accent],
      )}
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -right-8 top-10 h-40 w-40 rounded-[28px] border border-black/20 bg-white/25 md:h-56 md:w-56" />
        <div className="absolute bottom-16 left-8 h-24 w-16 rounded-2xl border border-black/15 bg-black/20 md:h-36 md:w-24" />
      </div>
      <p className="relative z-10 max-w-[80%] text-[24px] font-medium leading-none tracking-tight text-black/80 md:text-[32px]">
        {project.title}
      </p>
    </div>
  );
}

export function ProjectCard({
  project,
  className,
  aspect = "4/3",
}: {
  project: Project;
  className?: string;
  aspect?: "4/3" | "5/4" | "9/16";
  tilt?: boolean;
}) {
  const aspectClass =
    aspect === "9/16"
      ? "aspect-[9/16]"
      : aspect === "5/4"
        ? "aspect-[5/4]"
        : "aspect-[4/3] md:aspect-[5/4]";

  return (
    <Link href={`/projects/${project.slug}`} className={cn("group block", className)}>
      <div
        className={cn(
          "relative overflow-hidden rounded-[var(--radius-card)] bg-surface",
          "transition-shadow duration-500 ease-out",
          "group-hover:shadow-[0_12px_36px_rgba(0,0,0,0.4)]",
          "motion-reduce:group-hover:shadow-none",
          aspectClass,
        )}
      >
        <ProjectVisual project={project} />
      </div>

      <div className="mt-4 flex flex-col items-center gap-1 text-center md:mt-5 md:items-start md:text-left">
        <h3 className="text-[18px] font-semibold tracking-tight transition-transform duration-300 ease-out group-hover:translate-x-1 md:text-[20px]">
          {project.title}
        </h3>
        <p className="text-[14px] text-foreground-muted md:text-[16px]">{project.category}</p>
      </div>
    </Link>
  );
}
