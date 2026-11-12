"use client";

import { Check, Clock, MapPin, Video } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { AlumniEvent } from "@/data/events";
import { demoActions, useRsvps } from "@/lib/demo-store";
import { dateParts } from "@/lib/format";
import { cn } from "@/lib/utils";

export function DateBlock({ iso, className }: { iso: string; className?: string }) {
  const { day, month, year } = dateParts(iso);
  return (
    <div
      className={cn(
        "flex w-18 shrink-0 flex-col items-center justify-center rounded-xl bg-ink py-3 text-paper",
        className,
      )}
    >
      <span className="text-xs font-semibold tracking-widest text-paper/70 uppercase">{month}</span>
      <span className="font-display text-3xl leading-none font-extrabold">{day}</span>
      <span className="mt-0.5 text-[11px] text-paper/60">{year}</span>
    </div>
  );
}

export function RsvpButton({ event, size = "default" }: { event: AlumniEvent; size?: "default" | "sm" }) {
  const rsvps = useRsvps();
  const going = rsvps.includes(event.id);

  if (event.past) {
    return (
      <Button variant="outline" size={size} disabled>
        Ended
      </Button>
    );
  }

  return (
    <Button
      size={size}
      variant={going ? "outline" : "default"}
      aria-pressed={going}
      className={cn(going && "border-success/40 text-success hover:text-success")}
      onClick={() => {
        const nowGoing = demoActions.toggleRsvp(event.id);
        if (nowGoing) toast.success("You're going", { description: event.title });
        else toast("RSVP cancelled", { description: event.title });
      }}
    >
      {going ? (
        <>
          <Check strokeWidth={2} /> You&apos;re going
        </>
      ) : (
        "RSVP"
      )}
    </Button>
  );
}

export function EventCard({ event }: { event: AlumniEvent }) {
  return (
    <article className="surface flex flex-col gap-5 rounded-2xl border border-line bg-card p-5 sm:flex-row sm:items-center md:p-6">
      <DateBlock iso={event.date} className={cn(event.past && "bg-muted-ink")} />
      <div className="min-w-0 flex-1">
        <Badge variant="outline" className="rounded-full border-line bg-sand px-2.5 text-ink">
          {event.type}
        </Badge>
        <h3 className="mt-2 text-xl font-bold">{event.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted-ink">{event.description}</p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-ink">
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden strokeWidth={1.5} className="size-4" /> {event.time}
          </span>
          <span className="inline-flex items-center gap-1.5">
            {event.online ? (
              <Video aria-hidden strokeWidth={1.5} className="size-4" />
            ) : (
              <MapPin aria-hidden strokeWidth={1.5} className="size-4" />
            )}
            {event.location}
          </span>
        </div>
      </div>
      <div className="sm:self-center">
        <RsvpButton event={event} />
      </div>
    </article>
  );
}
