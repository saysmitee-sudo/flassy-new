"use client";

import { motion, useReducedMotion } from "motion/react";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";

export function ExpertiseGrid({
  items,
}: {
  items: readonly { title: string; description: string }[];
}) {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollRevealGroup className="grid gap-10 md:grid-cols-2 md:gap-x-16 md:gap-y-14">
      {items.map((item) => (
        <ScrollRevealItem key={item.title}>
          <motion.article
            className="mx-auto max-w-xl text-center md:mx-0 md:text-left"
            whileHover={reduceMotion ? undefined : { x: 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <div className="mb-3 flex items-center justify-center gap-3 md:mb-4 md:justify-start">
              <motion.span
                className="hidden size-1 rounded-full bg-foreground md:inline-block"
                aria-hidden
                whileHover={reduceMotion ? undefined : { scale: 1.8 }}
              />
              <h3 className="text-[24px] font-medium leading-none md:text-[32px]">{item.title}</h3>
            </div>
            <p className="text-[16px] leading-relaxed text-foreground-muted md:text-[18px]">
              {item.description}
            </p>
          </motion.article>
        </ScrollRevealItem>
      ))}
    </ScrollRevealGroup>
  );
}
