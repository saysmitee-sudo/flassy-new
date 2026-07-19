"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { navLinks } from "@/lib/site";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 520, damping: 34 };

function NavLink({
  href,
  label,
  active,
  reduceMotion,
}: {
  href: string;
  label: string;
  active: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <Link
      href={href}
      className="relative rounded-full px-3.5 py-2.5 text-[13px] leading-none md:px-5 md:py-3 md:text-[16px]"
    >
      {active && (
        <motion.span
          layoutId="nav-active-pill"
          className="absolute inset-0 rounded-full bg-nav-active-bg"
          transition={
            reduceMotion
              ? { duration: 0.15, ease: [0.22, 1, 0.36, 1] }
              : { type: "spring", stiffness: 520, damping: 38 }
          }
        />
      )}
      <motion.span
        className={cn(
          "relative z-10 block",
          active ? "text-nav-active-fg" : "text-nav-fg",
        )}
        whileHover={reduceMotion ? undefined : { scale: active ? 1.02 : 1.06 }}
        whileTap={reduceMotion ? undefined : { scale: 0.94 }}
        transition={spring}
      >
        {label}
      </motion.span>
    </Link>
  );
}

export function Navigation() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="relative z-50 w-full pt-8 md:pt-10">
        <div className="container-site grid grid-cols-[1fr_auto_1fr] items-center">
          <Logo className="col-start-2 justify-self-center" />
          <ThemeToggle className="col-start-3 justify-self-end" />
        </div>
      </div>

      <div className="sticky top-3 z-[60] mt-5 flex justify-center px-3 md:top-5 md:mt-7">
        <motion.nav
          aria-label="Primary"
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-0.5 rounded-full border border-nav-border bg-nav-bg p-[4px] md:gap-1 md:p-[5px]">
            {navLinks.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={active}
                  reduceMotion={reduceMotion}
                />
              );
            })}
          </div>
        </motion.nav>
      </div>
    </>
  );
}
