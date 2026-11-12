import Link from "next/link";
import { cn } from "@/lib/utils";

/** Placeholder wordmark until the official logo arrives. */
export function Logo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2.5 font-display text-lg font-extrabold tracking-[-0.02em]",
        tone === "light" ? "text-on-night" : "text-ink",
        className,
      )}
    >
      <svg aria-hidden viewBox="0 0 32 32" className="size-8">
        <path
          d="M16 3C8.82 3 3 8.37 3 15c0 3.3 1.44 6.29 3.78 8.46L5.5 29l6.06-2.73c1.39.47 2.88.73 4.44.73 7.18 0 13-5.37 13-12S23.18 3 16 3Z"
          style={{ fill: "var(--logo)" }}
        />
        <circle cx="11" cy="15" r="1.8" fill="#F6F3EC" />
        <circle cx="16" cy="15" r="1.8" fill="#F6F3EC" />
        <circle cx="21" cy="15" r="1.8" fill="#F6F3EC" />
      </svg>
      <span>
        IKA PBI <span className="text-terra">UII</span>
      </span>
    </Link>
  );
}
