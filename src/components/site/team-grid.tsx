"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { TEAM_TERM, type TeamMember } from "@/data/team";
import { cn } from "@/lib/utils";

const avatarTones = ["bg-ink text-paper", "bg-terra text-on-accent", "bg-success text-on-accent", "bg-sand text-ink"];

const trackBadge: Record<TeamMember["track"], { label: string; className: string }> = {
  Lead: { label: "Lead", className: "bg-ink text-paper" },
  "Program Master": { label: "Program Master", className: "bg-terra text-on-accent" },
  "Project Manager": { label: "Project Manager", className: "bg-success text-on-accent" },
  Squad: { label: "Squad Member", className: "bg-sand text-ink" },
};

const label = "text-xs font-medium tracking-[0.08em] text-muted-ink uppercase eyebrow";

/** Team cards; clicking one opens a profile sheet on the right. */
export function TeamGrid({ team }: { team: TeamMember[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  // Keep the last member rendered while the sheet animates closed.
  const [shown, setShown] = useState(0);
  const open = (i: number) => {
    setShown(i);
    setSelected(i);
  };
  const n = team.length;
  const m = team[shown];
  const mates = team.map((t, i) => ({ t, i })).filter(({ t, i }) => t.group === m.group && i !== shown);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, i) => (
          <li key={member.name} className="flex">
            <button
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              aria-label={`Open profile: ${member.name}, ${member.position}`}
              className="surface surface-hover group flex flex-1 gap-4 rounded-2xl border border-line bg-card p-5 text-left"
            >
              <Avatar className="size-16 ring-1 ring-line">
                <AvatarImage src={member.photo} alt="" className="object-cover" />
                <AvatarFallback className={cn("font-display text-lg font-bold", avatarTones[i % avatarTones.length])}>
                  {member.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-lg font-bold tracking-[-0.02em]">{member.name}</span>
                <span className="block text-sm font-medium text-terra">{member.position}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-muted-ink">{member.line}</span>
              </span>
              <ChevronRight
                aria-hidden
                strokeWidth={1.75}
                className="mt-1 size-[18px] shrink-0 text-ink opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-80"
              />
            </button>
          </li>
        ))}
      </ul>

      <Sheet open={selected !== null} onOpenChange={(o) => !o && setSelected(null)}>
        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-full gap-0 overflow-y-auto border-line p-0 sm:max-w-[460px]"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between gap-3 border-b border-line bg-card px-5 py-4">
            <span className={label}>
              {String(shown + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" aria-label="Previous member" onClick={() => open((shown - 1 + n) % n)}>
                <ChevronLeft strokeWidth={1.75} />
              </Button>
              <Button variant="outline" size="icon" aria-label="Next member" onClick={() => open((shown + 1) % n)}>
                <ChevronRight strokeWidth={1.75} />
              </Button>
              <SheetClose asChild>
                <Button size="icon" aria-label="Close profile">
                  <X strokeWidth={2} />
                </Button>
              </SheetClose>
            </div>
          </div>

          <div className="flex flex-col gap-7 px-7 pt-7 pb-9">
            <div className="flex flex-col gap-5">
              {/* 240px: source crops are 480px, so this stays sharp on 2× screens. */}
              <div className="surface relative aspect-square w-60 max-w-full overflow-hidden rounded-2xl border border-line bg-card">
                <Image
                  key={m.photo}
                  src={m.photo}
                  alt={`Portrait of ${m.name}`}
                  fill
                  sizes="240px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span
                  data-slot="badge"
                  className={cn(
                    "w-fit rounded-full border border-line px-2.5 py-1 text-xs font-semibold",
                    trackBadge[m.track].className,
                  )}
                >
                  {trackBadge[m.track].label}
                </span>
                <SheetTitle className="mt-1 font-display text-4xl leading-tight font-extrabold tracking-[-0.02em]">
                  {m.name}
                </SheetTitle>
                <p className="text-[15px] text-muted-ink">{m.fullName}</p>
                <p className="mt-1 font-semibold text-terra">{m.position}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <p className={label}>What they do</p>
              <SheetDescription className="text-base leading-relaxed text-ink">{m.description}</SheetDescription>
            </div>

            <dl className="grid grid-cols-2 overflow-hidden rounded-xl border border-line bg-card">
              <div className="border-r border-line px-4 py-3.5">
                <dt className="text-xs text-muted-ink">Team</dt>
                <dd className="mt-1 text-sm leading-snug font-semibold">{m.group}</dd>
              </div>
              <div className="px-4 py-3.5">
                <dt className="text-xs text-muted-ink">Term</dt>
                <dd className="mt-1 text-sm leading-snug font-semibold">{TEAM_TERM}</dd>
              </div>
            </dl>

            {mates.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className={label}>Works with</p>
                <div className="flex flex-wrap gap-2">
                  {mates.map(({ t, i }) => (
                    <button
                      key={t.name}
                      type="button"
                      onClick={() => open(i)}
                      className="flex min-h-11 items-center gap-2.5 rounded-full border border-line bg-card py-1.5 pr-3.5 pl-1.5 text-sm font-semibold transition-colors hover:bg-sand"
                    >
                      <Avatar className="size-8">
                        <AvatarImage src={t.photo} alt="" className="object-cover" />
                        <AvatarFallback className="bg-sand text-xs font-bold text-ink">
                          {t.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
