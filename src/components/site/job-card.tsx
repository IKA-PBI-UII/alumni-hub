import Link from "next/link";
import { ArrowUpRight, MapPin, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LetterBadge } from "@/components/site/primitives";
import type { Job } from "@/data/jobs";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function TypeBadge({ type, className }: { type: string; className?: string }) {
  return (
    <Badge variant="outline" className={cn("rounded-full border-line bg-paper px-2.5 py-0.5 text-ink", className)}>
      {type}
    </Badge>
  );
}

export function AlumniBadge() {
  return (
    <Badge className="rounded-full bg-terra/10 px-2.5 py-0.5 text-terra">
      <UserRound strokeWidth={2} /> Posted by alumnus
    </Badge>
  );
}

export function JobCard({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="surface group flex gap-4 rounded-2xl border border-line bg-card p-5 transition-colors hover:border-terra/40 md:p-6"
    >
      <LetterBadge name={job.company} />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold group-hover:text-terra">{job.title}</h3>
            <p className="text-sm text-muted-ink">{job.company}</p>
          </div>
          <ArrowUpRight
            aria-hidden
            strokeWidth={1.5}
            className="size-5 shrink-0 text-muted-ink transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-terra"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-muted-ink">
          <span className="inline-flex items-center gap-1">
            <MapPin aria-hidden strokeWidth={1.5} className="size-4" />
            {job.location}
          </span>
          <span aria-hidden>·</span>
          <span>Posted {formatDate(job.postedAt)}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <TypeBadge type={job.type} />
          <TypeBadge type={job.field} className="bg-sand" />
          {job.postedBy && <AlumniBadge />}
        </div>
      </div>
    </Link>
  );
}

/** Compact row for the home page and dashboard. */
export function JobRow({ job }: { job: Job }) {
  return (
    <Link
      href={`/jobs/${job.id}`}
      className="group flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-sand/70"
    >
      <LetterBadge name={job.company} className="size-10 rounded-lg text-base" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold group-hover:text-terra">{job.title}</p>
        <p className="truncate text-sm text-muted-ink">
          {job.company} · {job.location}
        </p>
      </div>
      <TypeBadge type={job.type} className="hidden sm:inline-flex" />
    </Link>
  );
}
