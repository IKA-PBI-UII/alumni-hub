import type { Metadata } from "next";
import Image from "next/image";
import { Container, PageHeader, Section, SectionTitle } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";
import { TeamGrid } from "@/components/site/team-grid";
import { roadmap, team, values } from "@/data/team";
import { cn } from "@/lib/utils";
import { StorePromoCard } from "@/components/store/store-promo";

export const metadata: Metadata = { title: "About & team" };

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About IKA PBI UII"
        title="Nobody walks alone after graduation."
        intro="We are the alumni association of English Education (Pendidikan Bahasa Inggris), Universitas Islam Indonesia."
        image={{ src: "/images/hero-alt.jpg", alt: "Graduating students throwing their hats" }}
      />

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-12">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-5">
            <Image
              src="/images/classroom-smile.jpg"
              alt="Teacher smiling at her students"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:col-span-7 md:pl-6">
            <p className="text-sm font-semibold text-terra">Our mission</p>
            <p className="mt-3 font-display text-3xl leading-tight font-bold text-balance md:text-5xl">
              Connect every PBI UII alumnus with guidance, opportunity and each other.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="sand">
        <SectionTitle eyebrow="Values" title="Three words we hold ourselves to." />
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.name} delay={i * 0.08} className="surface rounded-2xl border border-line bg-card p-7">
              <h3 className="text-2xl font-bold">{v.name}</h3>
              <p className="mt-2 text-muted-ink">{v.line}</p>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="team">
        <SectionTitle
          eyebrow="The team"
          title="Twelve alumni, each with a clear job."
          intro="Program Masters own an area for the whole term. Project Managers and Squad Members rotate as projects come and go. Tap anyone to learn more."
        />
        <TeamGrid team={team} />

      </Section>

      <section className="pb-20 md:pb-28">
        <Container>
          <StorePromoCard
            heading="Represent PBI UII, wherever you teach."
            line="Our merch is made in small batches by alumni, for alumni. Part of every sale funds mentoring and events."
            featured={["varsity-jacket", "crewneck", "classic-cap"]}
          />
        </Container>
      </section>

      <section className="bg-night py-20 text-on-night md:py-28">
        <Container>
          <p className="mb-3 text-sm font-semibold text-highlight">Roadmap</p>
          <h2 className="max-w-xl text-3xl font-bold md:text-5xl">Small steps, shipped in public.</h2>
          <ol className="mt-12 grid gap-0 md:grid-cols-4 md:gap-6">
            {roadmap.map((r, i) => (
              <li key={r.when} className="relative border-l border-white/20 pb-8 pl-6 last:pb-0 md:border-t md:border-l-0 md:pt-6 md:pb-0 md:pl-0">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1.5 -left-1.5 size-3 rounded-full md:-top-1.5 md:left-0",
                    i === 0 ? "bg-terra" : "bg-paper/40",
                  )}
                />
                <p className="font-display text-xl font-bold">{r.when}</p>
                <ul className="mt-3 space-y-1 text-sm text-paper/70">
                  {r.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </>
  );
}
