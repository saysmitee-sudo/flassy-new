"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
} from "motion/react";
import { useRef, type PointerEvent } from "react";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { whyWorkWithUs } from "@/content/home-blocks";
import { cn } from "@/lib/utils";

const accentStyles = {
  orange: {
    glow: "rgba(237, 118, 21, 0.35)",
    bar: "bg-accent-orange",
    soft: "bg-accent-orange/15",
    text: "text-accent-orange",
  },
  sussie: {
    glow: "rgba(56, 225, 241, 0.3)",
    bar: "bg-accent-sussie",
    soft: "bg-accent-sussie/15",
    text: "text-accent-sussie",
  },
  lavender: {
    glow: "rgba(110, 60, 245, 0.35)",
    bar: "bg-accent-lavender",
    soft: "bg-accent-lavender/15",
    text: "text-accent-lavender",
  },
  blue: {
    glow: "rgba(0, 130, 255, 0.32)",
    bar: "bg-accent-blue",
    soft: "bg-accent-blue/15",
    text: "text-accent-blue",
  },
} as const;

type Accent = keyof typeof accentStyles;

function BenefitCard({
  item,
  reduceMotion,
}: {
  item: (typeof whyWorkWithUs.items)[number];
  reduceMotion: boolean | null;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const accent = accentStyles[item.accent as Accent];
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${accent.glow}, transparent 55%)`;

  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (reduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mx.set(e.clientX - rect.left);
    my.set(e.clientY - rect.top);
  }

  return (
    <ScrollRevealItem className="h-full">
      <motion.article
        ref={cardRef}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)]",
          "border border-border bg-surface-elevated p-6 text-left md:p-8",
          "transition-[border-color,box-shadow] duration-500",
          "hover:border-transparent",
        )}
        onPointerMove={onPointerMove}
        whileHover={reduceMotion ? undefined : { y: -8, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
          aria-hidden
        />
        <div
          className={cn(
            "pointer-events-none absolute -right-10 -top-10 size-36 rounded-full blur-3xl transition-opacity duration-500",
            accent.soft,
            "opacity-60 group-hover:opacity-100",
          )}
          aria-hidden
        />

        <div className="relative z-10 flex items-start justify-between gap-4">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]",
              accent.soft,
              accent.text,
            )}
          >
            {item.hook}
          </span>
        </div>

        <div className={cn("relative z-10 mt-8 h-1 w-12 rounded-full md:mt-10", accent.bar)} />

        <h3 className="relative z-10 mt-5 text-[28px] font-semibold leading-[1.05] tracking-tight md:text-[36px]">
          {item.title}
        </h3>
        <p className="relative z-10 mt-4 text-[15px] leading-relaxed text-foreground-muted md:mt-5 md:text-[17px]">
          {item.description}
        </p>
      </motion.article>
    </ScrollRevealItem>
  );
}

export function ProductionComparison() {
  const reduceMotion = useReducedMotion();
  const { items } = whyWorkWithUs;

  return (
    <section className="container-site pb-16 md:pb-20">
      <ScrollRevealGroup className="grid gap-4 sm:grid-cols-2 md:gap-5">
        {items.map((item) => (
          <BenefitCard
            key={item.title}
            item={item}
            reduceMotion={reduceMotion}
          />
        ))}
      </ScrollRevealGroup>
    </section>
  );
}
