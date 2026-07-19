"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function FaqList({
  items,
}: {
  items: readonly { question: string; answer: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => {
        const open = openIndex === index;
        return (
          <motion.div
            key={item.question}
            className="border-b border-border pb-6"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              className="flex w-full items-start justify-between gap-6 text-left"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : index)}
            >
              <motion.span
                className="text-[18px] font-semibold tracking-tight md:text-[24px]"
                whileHover={reduceMotion ? undefined : { x: 4 }}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              >
                {item.question}
              </motion.span>
              <motion.span
                className={cn(
                  "mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-lg leading-none",
                )}
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 28 }}
                aria-hidden
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="answer"
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-foreground-muted md:text-[18px]">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
