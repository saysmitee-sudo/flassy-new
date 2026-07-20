"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { Magnetic } from "@/components/magnetic";
import { scrollToElement } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, reduceMotion ? 1 : 0.35]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 90, damping: 20 });
  const springY = useSpring(my, { stiffness: 90, damping: 20 });
  const titleTransform = useMotionTemplate`translate3d(${springX}px, ${springY}px, 0)`;

  return (
    <section
      ref={sectionRef}
      className="container-site relative overflow-x-clip pb-12 pt-8 text-center md:pb-16 md:pt-12 md:text-left"
      onPointerMove={(e) => {
        if (reduceMotion) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        mx.set(px * 14);
        my.set(py * 10);
      }}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <motion.div style={{ y, opacity }} className="relative">
        <motion.h1
          className="hero-title mx-auto w-full text-[clamp(3rem,13vw,3.75rem)] md:mx-0 md:text-[clamp(4rem,6.5vw,5.75rem)] lg:text-[clamp(4.75rem,5.8vw,6.5rem)] xl:text-[6.75rem]"
          style={reduceMotion ? undefined : { transform: titleTransform }}
        >
          <span className="block">
            <motion.span
              className="inline-block"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.05, ease }}
            >
              We make
            </motion.span>{" "}
            <br className="md:hidden" aria-hidden />
            <motion.span
              className="inline-block"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.12, ease }}
            >
              content
            </motion.span>
          </span>
          <span className="mt-[0.06em] block">
            <motion.span
              className="inline-block text-foreground-muted"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease }}
            >
              that
            </motion.span>{" "}
            <motion.span
              className="hero-gradient inline-block italic"
              initial={reduceMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.26, ease }}
            >
              sells
            </motion.span>
          </span>
        </motion.h1>

        <Magnetic className="absolute right-0 top-[70%] hidden md:block lg:top-auto lg:bottom-4">
          <motion.a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-full border border-pill-border px-6 py-5 text-[14px] uppercase tracking-wide"
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease }}
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            whileTap={reduceMotion ? undefined : { scale: 0.96 }}
            onClick={(e) => {
              e.preventDefault();
              scrollToElement("projects", reduceMotion);
            }}
          >
            Scroll down
            <motion.svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              aria-hidden
              animate={reduceMotion ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <path
                d="M6.5 1v12M6.5 13L1 7.5M6.5 13L12 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.a>
        </Magnetic>
      </motion.div>

      <motion.div
        className="mt-8 flex flex-col items-center gap-8 md:mt-10 md:flex-row md:items-start md:justify-between"
        initial={reduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.55, ease }}
      >
        <p className="max-w-md text-[16px] leading-relaxed text-foreground-muted md:ml-auto md:text-right md:text-[18px]">
          Scroll-stopping photo, video, and AI avatars that turn attention into sales —
          delivered in days, not weeks.
        </p>
      </motion.div>
    </section>
  );
}
