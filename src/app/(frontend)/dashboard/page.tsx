"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, CalendarDays, MessagesSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DashTitle, Panel } from "@/components/dashboard/ui";
import { JobRow } from "@/components/site/job-card";
import { DateBlock, RsvpButton } from "@/components/site/event-card";
import { useAuth } from "@/lib/auth";
import { profileCompleteness, useMentorRequests, useProfile } from "@/lib/demo-store";
import { jobs } from "@/data/jobs";
import { upcomingEvents } from "@/data/events";
import { news } from "@/data/news";
import { formatDate } from "@/lib/format";
import { StorePromoCard } from "@/components/store/store-promo";

const activity = [
  { when: "2 days ago", text: "Rina Kusumawati posted English Teacher at Bright Minds" },
  { when: "4 days ago", text: "You RSVP'd to Mentor Meet & Greet" },
  { when: "1 week ago", text: "New story: From PBI UII to the classroom" },
  { when: "2 weeks ago", text: "You joined the IKA PBI UII alumni hub" },
];

const quickActions = [
  { href: "/dashboard/jobs?new=1", label: "Post a job", icon: Plus },
  { href: "/dashboard/mentoring", label: "Find a mentor", icon: MessagesSquare },
  { href: "/dashboard/events", label: "Browse events", icon: CalendarDays },
];

export default function DashboardOverview() {
  const { user } = useAuth();
  const profile = useProfile();
  const requests = useMentorRequests();
  const completeness = profileCompleteness(profile);
  const recommended = jobs.filter((j) => j.field === "Education").slice(0, 3);

  return (
    <>
      <DashTitle title={`Hi, ${user?.name.split(" ")[0] ?? "there"}`} intro="Here's what's new in your network." />

      <div className="grid gap-5 lg:grid-cols-3">
        <section className="surface relative isolate overflow-hidden rounded-2xl bg-night p-6 text-on-night md:p-8 lg:col-span-2">
          <Image
            src="/images/jobs-laptop-2.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="-z-20 object-cover opacity-25"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/90 to-night/40" />
          <p className="text-sm text-on-night/70">Profile completeness</p>
          <p className="mt-1 font-display text-5xl font-extrabold">{completeness}%</p>
          <Progress value={completeness} className="mt-4 h-2 max-w-sm bg-white/15 [&>*]:bg-terra" aria-label="Profile completeness" />
          <p className="mt-4 max-w-sm text-sm text-on-night/70">
            Complete profiles get matched with mentors and recruiters first.
          </p>
          <Button asChild variant="light" className="mt-5">
            <Link href="/dashboard/profile">
              Complete profile <ArrowRight strokeWidth={2} />
            </Link>
          </Button>
        </section>

        <Panel title="Quick actions">
          <ul className="space-y-2">
            {quickActions.map(({ href, label, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  className="group flex items-center gap-3 rounded-xl border border-line px-4 py-3 font-medium transition-colors hover:border-terra/40 hover:bg-sand/50"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-sand group-hover:bg-terra group-hover:text-on-accent">
                    <Icon aria-hidden strokeWidth={1.5} className="size-4" />
                  </span>
                  {label}
                  <ArrowRight aria-hidden strokeWidth={1.5} className="ml-auto size-4 text-muted-ink" />
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel
          title="Recommended jobs"
          className="lg:col-span-2"
          action={
            <Link href="/jobs" className="text-sm font-medium text-terra hover:underline">
              View all
            </Link>
          }
        >
          <div className="-mx-2">
            {recommended.map((j) => (
              <JobRow key={j.id} job={j} />
            ))}
          </div>
        </Panel>

        <Panel title="Mentoring">
          <div className="flex items-start gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
              <MessagesSquare aria-hidden strokeWidth={1.5} className="size-5" />
            </span>
            <div>
              <p className="font-semibold">You&apos;re a mentor</p>
              <p className="text-sm text-muted-ink">
                2 mentees this term · {requests.length} {requests.length === 1 ? "request" : "requests"} sent
              </p>
            </div>
          </div>
          <Button asChild variant="outline" className="mt-5 w-full">
            <Link href="/dashboard/mentoring">Open mentoring</Link>
          </Button>
        </Panel>

        <Panel
          title="Upcoming events you can join"
          className="lg:col-span-2"
          action={
            <Link href="/events" className="text-sm font-medium text-terra hover:underline">
              All events
            </Link>
          }
        >
          <ul className="space-y-3">
            {upcomingEvents.slice(0, 2).map((e) => (
              <li key={e.id} className="flex flex-wrap items-center gap-4 rounded-xl border border-line p-3">
                <DateBlock iso={e.date} className="w-14 py-2 [&>span:first-child]:text-[10px] [&>span:nth-child(2)]:text-2xl [&>span:last-child]:hidden" />
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
        </Panel>

        <Panel title="Latest news">
          <ul className="space-y-4">
            {news.slice(0, 2).map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="group block">
                  <p className="text-xs text-muted-ink">
                    <span className="text-terra">{a.category}</span> · {formatDate(a.date)}
                  </p>
                  <p className="mt-0.5 leading-snug font-semibold group-hover:text-terra">{a.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent activity" className="lg:col-span-3">
          <ol className="relative space-y-4 border-l border-line pl-5">
            {activity.map((a) => (
              <li key={a.text} className="relative">
                <span aria-hidden className="absolute top-1.5 -left-[25px] size-2.5 rounded-full border-2 border-paper bg-terra" />
                <p className="text-sm">{a.text}</p>
                <p className="text-xs text-muted-ink">{a.when}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-ink">
            <BriefcaseBusiness aria-hidden strokeWidth={1.5} className="size-3.5" /> Sample activity
          </p>
        </Panel>

        <StorePromoCard
          className="lg:col-span-3"
          heading="Alumni merch is here."
          line="Hoodies, caps and tees for the class of every year. Pick up at the next event."
        />
      </div>
    </>
  );
}
