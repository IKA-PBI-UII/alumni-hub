import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/aceternity/bento-grid";
import { PageHeader, Section, SectionTitle } from "@/components/site/primitives";
import { pillarIcons } from "@/components/site/icons";
import { pillars, problemToProgram } from "@/data/programs";
import { cn } from "@/lib/utils";

export const metadata: Metadata = { title: "Programs" };

// Bento placement for the five pillars on a 3-column grid.
const layout: Record<string, string> = {
  grow: "md:col-span-2",
  earn: "md:row-span-2",
  connect: "",
  give: "",
  represent: "md:col-span-3",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="Five pillars that follow an alumnus's whole journey."
        intro="From your first job search to giving back years later, every program fits one of five pillars."
      />

      <Section>
        <BentoGrid>
          {pillars.map((p) => {
            const Icon = pillarIcons[p.id];
            const wide = p.id === "represent";
            return (
              <BentoGridItem
                key={p.id}
                id={p.id}
                className={cn(layout[p.id], wide && "bg-night text-on-night hover:border-terra md:flex-row md:items-center")}
                header={
                  p.image ? (
                    <div
                      className={cn(
                        "relative w-full overflow-hidden rounded-xl bg-sand",
                        p.id === "earn" ? "aspect-[4/3] md:aspect-auto md:min-h-64 md:flex-1" : "aspect-[16/9] md:aspect-[16/7]",
                        (p.id === "connect" || p.id === "give") && "md:aspect-[16/9]",
                      )}
                    >
                      <Image
                        src={p.image.src}
                        alt={p.image.alt}
                        fill
                        sizes="(min-width: 768px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : undefined
                }
                icon={
                  <span
                    className={cn(
                      "flex size-11 items-center justify-center rounded-full",
                      wide ? "bg-terra text-white" : "bg-sand text-ink",
                    )}
                  >
                    <Icon aria-hidden strokeWidth={1.5} className="size-5" />
                  </span>
                }
                title={<h2>{p.name}</h2>}
                description={<span className={cn(wide && "text-on-night/70")}>{p.line}</span>}
              >
                <ul className={cn("mt-4 space-y-1.5 text-sm", wide && "sm:columns-3 sm:gap-6")}>
                  {p.activities.map((a) => (
                    <li key={a} className="flex items-start gap-2 break-inside-avoid">
                      <Check aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-terra" />
                      {a}
                    </li>
                  ))}
                </ul>
                <Link
                  href={p.related.href}
                  className={cn(
                    "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold underline-offset-4 hover:underline",
                    wide ? "text-highlight" : "text-terra",
                  )}
                >
                  {p.related.label} <ArrowRight aria-hidden strokeWidth={2} className="size-4" />
                </Link>
              </BentoGridItem>
            );
          })}
        </BentoGrid>
      </Section>

      <Section tone="sand">
        <SectionTitle
          eyebrow="Problem → Program"
          title="Each program answers a real problem."
          intro="We start from what graduates actually struggle with, then build the smallest program that helps."
        />
        <ol className="surface divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
          {problemToProgram.map((row, i) => (
            <li key={row.problem} className="grid gap-2 p-5 sm:grid-cols-[3rem_1fr_auto_1fr] sm:items-center sm:gap-6 md:p-6">
              <span className="font-display text-sm font-bold text-muted-ink">0{i + 1}</span>
              <p className="text-lg font-medium">{row.problem}</p>
              <ArrowRight aria-hidden strokeWidth={1.5} className="hidden size-5 text-terra sm:block" />
              <p className="flex items-center gap-2">
                <span className="sr-only">Program: </span>
                <span className="font-display text-lg font-bold">{row.program}</span>
                <span className="rounded-full bg-sand px-2.5 py-0.5 text-xs text-muted-ink">{row.pillar}</span>
              </p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
