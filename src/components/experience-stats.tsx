"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useRef } from "react";
import { ScrollReveal, ScrollRevealGroup, ScrollRevealItem } from "@/components/scroll-reveal";
import { experienceStats } from "@/content/home-blocks";

function AnimatedValue({ value }: { value: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const numeric = value.match(/^\d+/)?.[0];
  const rest = numeric ? value.slice(numeric.length) : "";
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 70, damping: 22 });

  useEffect(() => {
    if (!numeric || reduceMotion) return;
    if (inView) motionValue.set(Number(numeric));
  }, [inView, motionValue, numeric, reduceMotion]);

  useEffect(() => {
    if (!numeric || reduceMotion) return;
    const unsubscribe = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.round(latest)}${rest}`;
    });
    return unsubscribe;
  }, [numeric, reduceMotion, rest, spring]);

  if (!numeric || reduceMotion) {
    return <span ref={ref}>{value}</span>;
  }

  return <span ref={ref}>0{rest}</span>;
}

export function ExperienceStats() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="container-site pb-16 md:pb-20">
      <ScrollReveal>
        <div className="border-y border-border py-8 md:py-10">
          <ScrollRevealGroup className="grid gap-8 md:grid-cols-3 md:gap-6">
            {experienceStats.map((stat, index) => (
              <ScrollRevealItem key={stat.label}>
                <motion.div
                  className="text-center md:text-left"
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                >
                  <p className="text-[32px] font-medium leading-none tracking-tight md:text-[40px]">
                    <AnimatedValue value={stat.value} />
                  </p>
                  <motion.p
                    className="mt-2 text-[14px] leading-relaxed text-foreground-muted md:text-[16px]"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 + index * 0.08 }}
                  >
                    {stat.label}
                  </motion.p>
                </motion.div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>
        </div>
      </ScrollReveal>
    </section>
  );
}
