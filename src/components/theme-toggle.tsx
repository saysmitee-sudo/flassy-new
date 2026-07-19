"use client";

import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

const emptySubscribe = () => () => {};
const spring = { type: "spring" as const, stiffness: 520, damping: 30 };

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const reduceMotion = useReducedMotion();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const buttonClass = cn(
    "flex size-10 items-center justify-center rounded-full border border-border text-foreground",
    className,
  );

  if (!mounted) {
    return (
      <button type="button" aria-label="Toggle theme" className={buttonClass} />
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={buttonClass}
      whileHover={
        reduceMotion
          ? undefined
          : { scale: 1.08, borderColor: "var(--foreground)" }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.9 }}
      transition={spring}
    >
      <motion.span
        key={isDark ? "dark" : "light"}
        initial={reduceMotion ? false : { opacity: 0, rotate: -30, scale: 0.8 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M21 14.5A8.5 8.5 0 0 1 9.5 3 7 7 0 1 0 21 14.5Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </motion.span>
    </motion.button>
  );
}
