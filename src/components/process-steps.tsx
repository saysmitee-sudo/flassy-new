"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { processSteps } from "@/content/services";
import { cn } from "@/lib/utils";

function ProcessArrow({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.svg
        className={cn("mx-auto block size-4 text-foreground-muted lg:hidden", className)}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        animate={reduceMotion ? undefined : { y: [0, 4, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M8 3v10M8 13L4 9M8 13l4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
      <motion.svg
        className={cn("mx-auto hidden size-4 text-foreground-muted lg:block", className)}
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden
        animate={reduceMotion ? undefined : { x: [0, 4, 0], opacity: [0.45, 1, 0.45] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M3 8h10M13 8L9 4M13 8l-4 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </>
  );
}

export function ProcessSteps() {
  const reduceMotion = useReducedMotion();

  return (
    <ScrollRevealGroup className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-3">
      {processSteps.map((step, index) => (
        <Fragment key={step.title}>
          <ScrollRevealItem className="min-w-0 flex-1">
            <motion.article
              className="border-t border-border pt-6 text-center md:text-left"
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <h3 className="text-[24px] font-medium md:text-[28px]">{step.title}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-foreground-muted">
                {step.description}
              </p>
            </motion.article>
          </ScrollRevealItem>
          {index < processSteps.length - 1 && (
            <ScrollRevealItem
              className="flex shrink-0 items-center justify-center py-1 lg:w-6 lg:px-0 lg:py-0 lg:pt-8"
            >
              <ProcessArrow />
            </ScrollRevealItem>
          )}
        </Fragment>
      ))}
    </ScrollRevealGroup>
  );
}
