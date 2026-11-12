"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Spotlight (Aceternity-style): a soft, angled light that fades in once. */
export function Spotlight({ className, fill = "#F6F3EC" }: { className?: string; fill?: string }) {
  return (
    <motion.svg
      aria-hidden
      initial={{ opacity: 0, x: -60, y: -40 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 1.6, ease: "easeOut", delay: 0.2 }}
      className={cn("pointer-events-none absolute z-0 h-[169%] w-[138%] lg:w-[84%]", className)}
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#spotlight-blur)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill}
          fillOpacity="0.14"
        />
      </g>
      <defs>
        <filter id="spotlight-blur" x="0.86" y="0.84" width="3785.16" height="2840.26" filterUnits="userSpaceOnUse">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1" />
        </filter>
      </defs>
    </motion.svg>
  );
}
