"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Magnetic({
  children,
  className,
  strength = 0.28,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 22, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 280, damping: 22, mass: 0.4 });

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{ x: springX, y: springY }}
      onPointerMove={(e) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * strength);
        y.set(dy * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function TiltCard({
  children,
  className,
  maxTilt = 7,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 220, damping: 24 });
  const springY = useSpring(rotateY, { stiffness: 220, damping: 24 });
  const transform = useMotionTemplate`perspective(900px) rotateX(${springX}deg) rotateY(${springY}deg)`;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform [transform-style:preserve-3d]", className)}
      style={{ transform }}
      onPointerMove={(e) => {
        const node = ref.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        rotateX.set((0.5 - py) * maxTilt * 2);
        rotateY.set((px - 0.5) * maxTilt * 2);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
