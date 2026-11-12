"use client";

import { useEffect, useEffectEvent, useState, useTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, Search, X } from "lucide-react";
import { format, parseISO } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { NEWS_CATEGORIES } from "@/data/news";
import type { NewsFilters as Filters } from "@/lib/news";
import { newsSearchParams } from "@/lib/news-url";
import { cn } from "@/lib/utils";

// Mobile-first: 44px tall and 16px text by default (no iOS zoom on focus), compact from md.
const field =
  "h-11 rounded-xl border border-line bg-card px-3 text-base text-ink outline-none transition-colors focus-visible:border-ink md:h-10 md:text-sm";

/**
 * URL-driven filters for /news. Every change resets to page 1 and pushes the
 * new query string; the server re-renders the results. While that is in
 * flight the root carries `data-pending`, which the results list dims on.
 */
export function NewsFilters({ filters }: { filters: Filters }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();
  const [q, setQ] = useState(filters.q ?? "");

  function apply(next: Partial<Filters>) {
    const qs = newsSearchParams({ ...filters, ...next });
    startTransition(() => router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  }

  // Debounced search-as-you-type.
  const search = useEffectEvent((value: string) => {
    if (value !== (filters.q ?? "")) apply({ q: value || undefined });
  });
  useEffect(() => {
    const t = setTimeout(() => search(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const active = Boolean(filters.q || filters.category || filters.from || filters.to);

  return (
    <div data-pending={pending ? "" : undefined} className="mb-10 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <form
          role="search"
          className="relative flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            apply({ q: q.trim() || undefined });
          }}
        >
          <label htmlFor="news-q" className="sr-only">
            Search news
          </label>
          <Search aria-hidden strokeWidth={1.75} className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-ink" />
          <input
            id="news-q"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by title, content or author"
            className={cn(field, "w-full pl-10")}
          />
        </form>
        <div className="grid grid-cols-2 gap-3 md:flex md:shrink-0">
          <DateFilter
            label="From"
            align="start"
            value={filters.from}
            max={filters.to}
            onChange={(from) => apply({ from })}
          />
          <DateFilter
            label="To"
            align="end"
            value={filters.to}
            min={filters.from}
            onChange={(to) => apply({ to })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
        <div
          role="group"
          aria-label="Filter by category"
          className="-mx-5 flex flex-1 gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
        >
          {(["All", ...NEWS_CATEGORIES] as const).map((c) => {
            const on = c === "All" ? !filters.category : filters.category === c;
            return (
              <button
                key={c}
                type="button"
                aria-pressed={on}
                onClick={() => apply({ category: c === "All" ? undefined : c })}
                className={cn(
                  "inline-flex h-11 shrink-0 items-center rounded-full border px-4 text-sm font-medium transition-colors md:h-10",
                  on ? "border-ink bg-ink text-paper" : "border-line bg-card text-muted-ink hover:text-ink",
                )}
              >
                {c}
              </button>
            );
          })}
        </div>
        {active && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              startTransition(() => router.push(pathname, { scroll: false }));
            }}
            className="inline-flex h-11 shrink-0 items-center gap-1 self-end px-1 text-sm font-medium text-muted-ink hover:text-ink md:h-10 md:self-auto"
          >
            <X aria-hidden strokeWidth={2} className="size-4" /> Clear
          </button>
        )}
      </div>
    </div>
  );
}

const DAY = "yyyy-MM-dd";

/**
 * One end of the publication date filter: a button that opens a shadcn
 * Calendar. `min`/`max` (YYYY-MM-DD) keep From on or before To.
 */
function DateFilter({
  label,
  value,
  min,
  max,
  align,
  onChange,
}: {
  label: string;
  align: "start" | "end";
  value?: string;
  min?: string;
  max?: string;
  onChange: (value?: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = value ? parseISO(value) : undefined;
  const disabled = [
    ...(min ? [{ before: parseISO(min) }] : []),
    ...(max ? [{ after: parseISO(max) }] : []),
  ];

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-ink">{label}</span>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          aria-label={`${label} date${value ? `: ${format(selected!, "d MMMM yyyy")}` : ""}`}
          className={cn(field, "inline-flex w-full items-center gap-2 text-left md:w-40 lg:w-44", !value && "text-muted-ink")}
        >
          <CalendarDays aria-hidden strokeWidth={1.75} className="size-4 shrink-0 text-muted-ink" />
          <span className="truncate">{selected ? format(selected, "d MMM yyyy") : "Any date"}</span>
        </PopoverTrigger>
        <PopoverContent align={align} collisionPadding={16} className="w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            startMonth={new Date(2015, 0)}
            endMonth={new Date(new Date().getFullYear(), 11)}
            defaultMonth={selected ?? (min ? parseISO(min) : max ? parseISO(max) : undefined)}
            selected={selected}
            disabled={disabled}
            onSelect={(day) => {
              onChange(day ? format(day, DAY) : undefined);
              setOpen(false);
            }}
          />
          {value && (
            <div className="border-t border-line p-2">
              <button
                type="button"
                onClick={() => {
                  onChange(undefined);
                  setOpen(false);
                }}
                className="w-full rounded-lg px-3 py-2 text-sm font-medium text-muted-ink hover:bg-sand hover:text-ink"
              >
                Clear
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}
