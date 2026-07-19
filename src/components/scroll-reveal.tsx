"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function useRevealInView(once = true) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [visiblePaths, setVisiblePaths] = useState<Record<string, boolean>>({});
  const visible = visiblePaths[pathname] ?? false;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reveal = () => {
      setVisiblePaths((current) =>
        current[pathname] ? current : { ...current, [pathname]: true },
      );
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          if (once) observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" },
    );

    observer.observe(node);

    const checkNow = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96 && rect.bottom > 0) {
        reveal();
        if (once) observer.disconnect();
      }
    };

    checkNow();
    const frame = requestAnimationFrame(checkNow);
    const timers = [0, 80, 160, 280].map((ms) => window.setTimeout(checkNow, ms));

    return () => {
      cancelAnimationFrame(frame);
      timers.forEach((timer) => window.clearTimeout(timer));
      observer.disconnect();
    };
  }, [pathname, once]);

  return { ref, visible };
}

type ScrollRevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: React.ReactNode;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 28,
  once = true,
  ...props
}: ScrollRevealProps) {
  const { ref, visible } = useRevealInView(once);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.65, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

const groupVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.04,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease },
  },
};

export function ScrollRevealGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, visible } = useRevealInView(true);
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
      variants={groupVariants}
    >
      {children}
    </motion.div>
  );
}

export function ScrollRevealItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  );
}
