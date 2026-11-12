import { cn } from "@/lib/utils";

/**
 * Background Beams (Aceternity-style), CSS-only so it costs no JS.
 * Thin curved paths with a drifting highlight. Disabled for reduced motion
 * (see `.beam` in globals.css).
 */
const paths = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
  "M-240 -349C-240 -349 -172 56 292 183C756 310 824 715 824 715",
  "M-170 -429C-170 -429 -102 -24 362 103C826 230 894 635 894 635",
  "M-100 -509C-100 -509 -32 -104 432 23C896 150 964 555 964 555",
  "M-30 -589C-30 -589 38 -184 502 -57C966 70 1034 475 1034 475",
  "M40 -669C40 -669 108 -264 572 -137C1036 -10 1104 395 1104 395",
];

export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 696 316"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          <linearGradient id="beam-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" style={{ stopColor: "var(--logo)" }} stopOpacity="0" />
            <stop offset="50%" style={{ stopColor: "var(--highlight)" }} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F6F3EC" stopOpacity="0" />
          </linearGradient>
        </defs>
        {paths.map((d, i) => (
          <path key={`base-${i}`} d={d} stroke="#F6F3EC" strokeOpacity="0.05" strokeWidth="0.6" />
        ))}
        {paths.map((d, i) => (
          <path
            key={`beam-${i}`}
            d={d}
            className="beam"
            stroke="url(#beam-grad)"
            strokeWidth="1"
            strokeLinecap="round"
            style={{ animationDuration: `${9 + (i % 4) * 3}s`, animationDelay: `${-i * 1.7}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
