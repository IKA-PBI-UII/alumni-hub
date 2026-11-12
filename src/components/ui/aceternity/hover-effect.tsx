"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Card Hover Effect (Aceternity-style): a soft panel slides between cards on hover. */
export function HoverEffect({
  items,
  className,
}: {
  items: { title: string; description: string; href: string; icon?: React.ReactNode; eyebrow?: string }[];
  className?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {items.map((item, idx) => (
        <Link
          key={item.title}
          href={item.href}
          className="group relative block h-full p-1.5"
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          onFocus={() => setHovered(idx)}
          onBlur={() => setHovered(null)}
        >
          <AnimatePresence>
            {hovered === idx && (
              <motion.span
                className="absolute inset-0 block rounded-3xl bg-sand"
                layoutId="hover-effect-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.2 } }}
                exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.1 } }}
              />
            )}
          </AnimatePresence>
          <div className="surface relative z-10 flex h-full flex-col gap-4 rounded-2xl border border-line bg-card p-6 transition-colors group-hover:border-terra/40">
            {item.icon && (
              <div className="flex size-11 items-center justify-center rounded-full bg-sand text-ink transition-colors group-hover:bg-terra group-hover:text-on-accent">
                {item.icon}
              </div>
            )}
            <div>
              {item.eyebrow && <p className="mb-1 text-xs font-medium tracking-wider text-muted-ink uppercase">{item.eyebrow}</p>}
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-ink">{item.description}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
