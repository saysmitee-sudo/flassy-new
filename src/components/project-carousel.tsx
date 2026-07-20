"use client";

import { motion, useMotionValue, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ProjectCard } from "@/components/project-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { MoreLink } from "@/components/more-link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

const SPEED = 42;
const DRAG_THRESHOLD = 8;

export function ProjectCarousel({ projects }: { projects: readonly Project[] }) {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const dragging = useRef(false);
  const didDrag = useRef(false);
  const dragStartX = useRef(0);
  const dragOriginX = useRef(0);
  const loopWidth = useRef(0);
  const looped = [...projects, ...projects];

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      loopWidth.current = track.scrollWidth / 2;
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [projects]);

  useEffect(() => {
    if (reduceMotion) return;

    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(32, now - last) / 1000;
      last = now;

      if (!pausedRef.current && !dragging.current && loopWidth.current > 0) {
        let next = x.get() - SPEED * dt;
        if (next <= -loopWidth.current) {
          next += loopWidth.current;
        }
        x.set(next);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion, x]);

  function wrapX(value: number) {
    const w = loopWidth.current;
    if (w <= 0) return value;
    let v = value;
    while (v <= -w) v += w;
    while (v > 0) v -= w;
    return v;
  }

  return (
    <section id="projects" className="scroll-mt-24 pb-16 md:pb-20">
      <div
        ref={viewportRef}
        className={cn(
          "relative -my-4 overflow-hidden py-4",
        )}
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => {
          dragging.current = false;
          setPaused(false);
        }}
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          // Don't capture yet — allow Links to receive the click on a tap
          dragging.current = false;
          didDrag.current = false;
          dragStartX.current = e.clientX;
          dragOriginX.current = x.get();
          setPaused(true);
        }}
        onPointerMove={(e) => {
          // Only drag while the primary button is held — hover must not move the track
          if ((e.buttons & 1) === 0) {
            if (dragging.current) {
              dragging.current = false;
              try {
                viewportRef.current?.releasePointerCapture(e.pointerId);
              } catch {
                /* already released */
              }
            }
            return;
          }

          const delta = e.clientX - dragStartX.current;
          if (!didDrag.current && Math.abs(delta) <= DRAG_THRESHOLD) return;

          if (!didDrag.current) {
            didDrag.current = true;
            dragging.current = true;
            viewportRef.current?.setPointerCapture(e.pointerId);
          }

          x.set(wrapX(dragOriginX.current + delta));
        }}
        onPointerUp={(e) => {
          const wasDragging = didDrag.current;
          dragging.current = false;
          try {
            viewportRef.current?.releasePointerCapture(e.pointerId);
          } catch {
            /* already released */
          }

          // Block navigation only after a real drag; plain clicks open the project
          if (wasDragging) {
            requestAnimationFrame(() => {
              didDrag.current = false;
            });
          } else {
            didDrag.current = false;
          }
        }}
        onPointerCancel={() => {
          dragging.current = false;
          didDrag.current = false;
        }}
        onClickCapture={(e) => {
          if (didDrag.current) {
            e.preventDefault();
            e.stopPropagation();
            didDrag.current = false;
          }
        }}
        onWheel={(e) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault();
            x.set(wrapX(x.get() - e.deltaX));
            setPaused(true);
          }
        }}
        aria-label="Featured projects"
      >
        <motion.div
          ref={trackRef}
          className="flex w-max gap-4 px-4 md:gap-5 md:px-10 lg:px-[112px]"
          style={{ x }}
        >
          {looped.map((project, index) => (
            <div
              key={`${project.slug}-${index}`}
              className="w-[58vw] max-w-[240px] shrink-0 sm:w-[42vw] sm:max-w-[260px] md:w-[240px] md:max-w-none lg:w-[280px]"
            >
              <ProjectCard project={project} aspect="9/16" />
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollReveal className="container-site mt-8 flex justify-center md:mt-10 md:justify-end">
        <MoreLink className="inline-flex items-center gap-2 text-[16px] transition-opacity hover:opacity-70" />
      </ScrollReveal>
    </section>
  );
}
