"use client";

import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashTitle, EmptyState, Panel } from "@/components/dashboard/ui";
import { DateBlock, RsvpButton } from "@/components/site/event-card";
import { events } from "@/data/events";
import { useRsvps } from "@/lib/demo-store";

export default function DashboardEventsPage() {
  const rsvps = useRsvps();
  const going = events.filter((e) => rsvps.includes(e.id));

  return (
    <>
      <DashTitle
        title="Events"
        intro="Your RSVPs, and a place to pitch the next event."
        action={
          <Button asChild variant="outline">
            <Link href="/events">Browse all events</Link>
          </Button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-5">
        <Panel title={`You're going (${going.length})`} className="lg:col-span-3">
          {going.length === 0 ? (
            <EmptyState
              title="No RSVPs yet."
              line="Pick a talkshow or workshop to join."
              action={
                <Button asChild>
                  <Link href="/events">See events</Link>
                </Button>
              }
            />
          ) : (
            <ul className="space-y-3">
              {going.map((e) => (
                <li key={e.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-line p-3">
                  <DateBlock iso={e.date} className="w-14 py-2 [&>span:first-child]:text-[10px] [&>span:last-child]:hidden [&>span:nth-child(2)]:text-2xl" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{e.title}</p>
                    <p className="text-sm text-muted-ink">
                      {e.time} · {e.location}
                    </p>
                  </div>
                  <RsvpButton event={e} size="sm" />
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel
          title={
            <span className="inline-flex items-center gap-2">
              <Lightbulb aria-hidden strokeWidth={1.5} className="size-5 text-terra" /> Submit an event idea
            </span>
          }
          className="lg:col-span-2"
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              (e.target as HTMLFormElement).reset();
              toast.success("Idea sent to the Events team", { description: "Prototype: not sent" });
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="idea-title">Title</Label>
              <Input id="idea-title" required placeholder="e.g. Teaching in Japan: Q&A" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idea-type">Type</Label>
              <Select name="type" defaultValue="Talkshow">
                <SelectTrigger id="idea-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["Talkshow", "Workshop", "Reunion", "Mentoring", "Job Fair"].map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="idea-desc">Why it matters</Label>
              <Textarea id="idea-desc" rows={3} placeholder="Who is it for and what will they take away?" />
            </div>
            <Button type="submit" className="w-full">
              Send idea
            </Button>
          </form>
        </Panel>
      </div>
    </>
  );
}
