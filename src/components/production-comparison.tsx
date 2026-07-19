"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { productionComparison } from "@/content/home-blocks";
import { cn } from "@/lib/utils";

function ComparisonColumn({
  label,
  items,
  highlight,
}: {
  label: string;
  items: readonly string[];
  highlight?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={cn(
        "h-full text-left",
        highlight
          ? "rounded-[20px] border border-border bg-surface-elevated p-4 md:rounded-[24px] md:p-6"
          : "rounded-[20px] border border-transparent p-4 opacity-75 md:p-6",
      )}
      whileHover={
        reduceMotion
          ? undefined
          : highlight
            ? { y: -6, scale: 1.015 }
            : { y: -3, opacity: 0.9 }
      }
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      <h3
        className={cn(
          "text-[15px] font-medium leading-tight md:text-[24px]",
          highlight ? "text-foreground" : "text-foreground-muted",
        )}
      >
        {label}
      </h3>
      <ul className="mt-3 space-y-2.5 md:mt-5 md:space-y-4">
        {items.map((item, i) => (
          <motion.li
            key={item}
            className={cn(
              "flex gap-2 text-[12px] leading-snug md:gap-3 md:text-[16px] md:leading-relaxed",
              highlight ? "text-foreground" : "text-foreground-muted",
            )}
            initial={reduceMotion ? false : { opacity: 0, x: highlight ? 8 : -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className={cn(
                "mt-[5px] size-1 shrink-0 rounded-full md:mt-[7px]",
                highlight ? "bg-foreground" : "bg-border",
              )}
              aria-hidden
            />
            {item}
          </motion.li>
        ))}
      </ul>
    </motion.article>
  );
}

export function ProductionComparison() {
  const { title, classic, ours } = productionComparison;

  return (
    <section className="container-site pb-16 text-center md:pb-20 md:text-left">
      <ScrollReveal>
        <h2 className="mx-auto max-w-2xl text-[32px] font-medium leading-none md:mx-0 md:max-w-none md:text-[48px]">
          {title}
        </h2>
      </ScrollReveal>

      <ScrollRevealGroup className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:gap-6">
        <ScrollRevealItem className="h-full">
          <ComparisonColumn label={classic.label} items={classic.items} />
        </ScrollRevealItem>
        <ScrollRevealItem className="h-full">
          <ComparisonColumn label={ours.label} items={ours.items} highlight />
        </ScrollRevealItem>
      </ScrollRevealGroup>
    </section>
  );
}
