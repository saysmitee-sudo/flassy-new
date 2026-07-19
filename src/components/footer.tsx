"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Magnetic } from "@/components/magnetic";
import { ScrollReveal } from "@/components/scroll-reveal";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 15L15 5M15 5H7M15 5v8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const showContactCta = pathname !== "/contact";

  return (
    <footer className={cn("container-site pb-10", showContactCta ? "pt-20 md:pt-28" : "pt-12 md:pt-16")}>
      {showContactCta && (
        <div className="flex flex-col items-center text-center">
          <ScrollReveal>
            <motion.h2
              className="section-heading text-[48px] leading-[1.05] tracking-tight md:text-[84px] md:leading-none lg:text-[140px]"
              whileHover={reduceMotion ? undefined : { y: -6 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
            >
              Let’s talk!
            </motion.h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <Magnetic strength={0.35}>
              <motion.div whileHover={reduceMotion ? undefined : { scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-pill-border px-8 py-6 text-[18px] transition-colors hover:bg-foreground hover:text-background md:mt-12 md:text-[20px]"
                >
                  <span>Get in touch</span>
                  <motion.span
                    animate={reduceMotion ? undefined : { x: [0, 3, 0], y: [0, -3, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowUpRight />
                  </motion.span>
                </Link>
              </motion.div>
            </Magnetic>
          </ScrollReveal>
        </div>
      )}

      <ScrollReveal delay={0.08} className={showContactCta ? "mt-16 md:mt-24" : undefined}>
        <div className="flex flex-col items-center gap-4 border-t border-border pt-6 text-center text-[14px] text-foreground-muted md:flex-row md:items-center md:justify-between md:text-left">
          <p>
            {new Date().getFullYear()} © — {site.name}
          </p>
          <ul className="flex flex-wrap justify-center gap-6 md:justify-end">
            {site.socials.map((s) => (
              <li key={s.label}>
                <motion.a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-colors hover:text-foreground"
                  whileHover={reduceMotion ? undefined : { y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                >
                  {s.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>
      </ScrollReveal>
    </footer>
  );
}
