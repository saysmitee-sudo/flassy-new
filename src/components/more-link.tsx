"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

export function MoreLink({
  href = "/projects",
  className,
}: {
  href?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <Link href={href} className={className}>
      More
      <motion.svg
        width="15"
        height="13"
        viewBox="0 0 15 13"
        fill="none"
        aria-hidden
        className="inline-block"
        animate={reduceMotion ? undefined : { x: [0, 5, 0] }}
        transition={{
          duration: 1.35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <path
          d="M1 6.5h12M8 1l5.5 5.5L8 12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </Link>
  );
}
