import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/aceternity/hover-effect";
import { Hero } from "@/components/site/home/hero";
import { StatsBand } from "@/components/site/home/stats-band";
import { Container, Section, SectionTitle } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { JobRow } from "@/components/site/job-card";
import { DateBlock, RsvpButton } from "@/components/site/event-card";
import { featureIcons, pillarIcons } from "@/components/site/icons";
import { hubFeatures, pillars, problemStats } from "@/data/programs";
import { jobs } from "@/data/jobs";
import { getNews } from "@/lib/news";
import { upcomingEvents } from "@/data/events";
import { values } from "@/data/team";
import { formatDate } from "@/lib/format";
import { StoreShowcase } from "@/components/store/store-promo";

export default async function HomePage() {
  const news = await getNews();
  const nextEvent = upcomingEvents[0];

  return (
    <>
      <Hero />

      {/* The problem */}
      <Section>
        <SectionTitle
          eyebrow="Why we exist"
          title="Graduating is a beginning, not a finish line."
          intro="Graduates need guidance, connections and better English. Alumni already have the answers."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {problemStats.map((s, i) => (
            <Reveal key={s.figure} delay={i * 0.08}>
              <figure className="surface flex h-full flex-col rounded-2xl border border-line bg-card p-7">
                <p className="font-display text-6xl font-extrabold tracking-[-0.04em] text-terra md:text-7xl">{s.figure}</p>
                <figcaption className="mt-4 flex flex-1 flex-col justify-between gap-6">
                  <p className="text-lg leading-snug font-medium">{s.label}</p>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted-ink underline-offset-4 hover:text-ink hover:underline"
                  >
                    Source: {s.source} <ArrowUpRight aria-hidden strokeWidth={1.5} className="size-3.5" />
                  </a>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Five pillars */}
      <Section tone="sand">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            eyebrow="Five pillars"
            title="Programs that follow your whole journey."
            className="md:mb-14"
          />
          <Button asChild variant="outline" className="mb-10 w-fit bg-transparent md:mb-14">
            <Link href="/programs">
              All programs <ArrowRight strokeWidth={2} />
            </Link>
          </Button>
        </div>
        <HoverEffect
          className="-mx-1.5"
          items={pillars.map((p) => {
            const Icon = pillarIcons[p.id];
            return {
              title: p.name,
              description: p.line,
              href: `/programs#${p.id}`,
              icon: <Icon strokeWidth={1.5} className="size-5" />,
            };
          })}
        />
      </Section>

      {/* One-stop hub */}
      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionTitle
              eyebrow="One-stop hub"
              title="Everything alumni need, without ten different group chats."
              className="md:sticky md:top-28"
            />
          </div>
          <ul className="grid gap-x-8 sm:grid-cols-2 md:col-span-7">
            {hubFeatures.map((f) => {
              const Icon = featureIcons[f.icon];
              return (
                <li key={f.name} className="flex gap-4 border-t border-line py-6">
                  <Icon aria-hidden strokeWidth={1.5} className="mt-0.5 size-6 shrink-0 text-terra" />
                  <div>
                    <h3 className="text-lg font-bold">{f.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-ink">{f.line}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      {/* Latest */}
      <Section tone="sand">
        <SectionTitle eyebrow="Latest" title="What's happening now." />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="surface rounded-2xl border border-line bg-card p-5 md:p-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-bold">New jobs</h3>
              <Link href="/jobs" className="text-sm font-medium text-terra underline-offset-4 hover:underline">
                View all
              </Link>
            </div>
            <div className="-mx-2">
              {jobs.slice(0, 3).map((j) => (
                <JobRow key={j.id} job={j} />
              ))}
            </div>
          </div>

          <div className="surface rounded-2xl border border-line bg-card p-5 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">News</h3>
              <Link href="/news" className="text-sm font-medium text-terra underline-offset-4 hover:underline">
                View all
              </Link>
            </div>
            <ul className="space-y-4">
              {news.slice(0, 3).map((a) => (
                <li key={a.slug}>
                  <Link href={`/news/${a.slug}`} className="group flex gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                      <Image src={a.image} alt="" fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-ink">
                        <span className="text-terra">{a.category}</span> · {formatDate(a.date)}
                      </p>
                      <p className="mt-0.5 line-clamp-2 leading-snug font-semibold group-hover:text-terra">{a.title}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface flex flex-col rounded-2xl bg-night p-5 text-on-night md:p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">Next event</h3>
              <Link href="/events" className="text-sm font-medium text-highlight underline-offset-4 hover:underline">
                All events
              </Link>
            </div>
            <div className="flex gap-4">
              <DateBlock iso={nextEvent.date} className="bg-terra" />
              <div>
                <p className="text-xs font-medium tracking-wider text-on-night/60 uppercase">{nextEvent.type}</p>
                <p className="mt-1 font-display text-xl leading-snug font-bold">{nextEvent.title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-on-night/70">{nextEvent.description}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-on-night/70">
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden strokeWidth={1.5} className="size-4" /> {nextEvent.time}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden strokeWidth={1.5} className="size-4" /> {nextEvent.location}
              </span>
            </div>
            <div className="mt-auto pt-6">
              <RsvpButton event={nextEvent} />
            </div>
          </div>
        </div>
      </Section>

      <StatsBand />

      {/* Values */}
      <Section>
        <SectionTitle eyebrow="How we work" title="Lean. Transparent. Fast." />
        <ol className="grid gap-4 md:grid-cols-3">
          {values.map((v, i) => (
            <li key={v.name}>
              <Reveal delay={i * 0.08} className="surface h-full rounded-2xl border border-line bg-card p-7">
                <span className="font-display text-sm font-bold text-terra">0{i + 1}</span>
                <h3 className="mt-6 text-2xl font-bold">{v.name}</h3>
                <p className="mt-2 font-medium">{v.line}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-ink">{v.detail}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Section>

      {/* Store */}
      <Section tone="sand">
        <StoreShowcase />
      </Section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="surface relative isolate overflow-hidden rounded-3xl bg-night px-6 py-16 text-on-night md:px-14 md:py-24">
            <Image
              src="/images/grads-group.jpg"
              alt="Group of graduates celebrating together"
              fill
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="-z-20 object-cover opacity-35"
            />
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-night via-night/85 to-night/30" />
            <h2 className="max-w-xl text-3xl font-bold text-balance md:text-5xl">
              Graduated from PBI UII? Claim your alumni profile.
            </h2>
            <p className="mt-4 max-w-md text-on-night/75">
              Two minutes to join. Get matched with mentors, see jobs first and stay in touch.
            </p>
            <Button asChild size="lg" variant="terra" className="mt-8">
              <Link href="/login">
                Join as alumni <ArrowRight strokeWidth={2} />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
