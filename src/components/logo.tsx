"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const spring = { type: "spring" as const, stiffness: 520, damping: 32 };

export function Logo({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("inline-flex", className)}
      whileHover={reduceMotion ? undefined : { scale: 1.04 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96 }}
      transition={spring}
    >
      <Link
        href="/"
        className="inline-flex items-center font-medium tracking-tight text-foreground"
        aria-label={`${site.name} home`}
      >
        <span className="text-[20px] leading-none md:text-[24px]">{site.shortName}</span>
      </Link>
    </motion.div>
  );
}
