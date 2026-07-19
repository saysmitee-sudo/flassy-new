"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

export function CursorGlow() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const opacity = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 180, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 28, mass: 0.4 });
  const springOpacity = useSpring(opacity, { stiffness: 120, damping: 24 });

  useEffect(() => {
    if (reduceMotion) return;

    const mq = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    if (!mq.matches) return () => mq.removeEventListener("change", sync);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      opacity.set(1);
    };
    const onLeave = () => opacity.set(0);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    return () => {
      mq.removeEventListener("change", sync);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [opacity, reduceMotion, x, y]);

  if (reduceMotion || !enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80] hidden size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
      style={{
        x: springX,
        y: springY,
        opacity: springOpacity,
        background:
          "radial-gradient(circle, color-mix(in srgb, var(--primary) 22%, transparent) 0%, transparent 68%)",
      }}
    />
  );
}
