import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundBeams } from "@/components/ui/aceternity/background-beams";
import { Spotlight } from "@/components/ui/aceternity/spotlight";
import { Container } from "@/components/site/primitives";
import { Reveal } from "@/components/site/reveal";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[min(92svh,860px)] items-end overflow-hidden bg-night pt-32 pb-16 text-on-night md:items-center md:pb-24">
      <Image
        src="/images/hero.jpg"
        alt="Graduates throwing their caps in the air"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[center_60%] opacity-50"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/75 to-night/30" />
      <BackgroundBeams className="-z-10 opacity-70" />
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />

      <Container className="relative">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-on-night/80 backdrop-blur-sm sm:text-sm">
            <span aria-hidden className="size-1.5 rounded-full bg-terra" />
            IKA PBI UII · English Education alumni, Universitas Islam Indonesia
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="max-w-4xl text-5xl leading-[1.02] font-extrabold text-balance md:text-7xl">
            Your alumni network, <span className="text-highlight">in one place.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-xl text-base text-pretty text-on-night/75 md:text-lg">
            Mentoring, jobs, events and stories from IKA PBI UII. Built lean, run transparently, moving fast.
          </p>
        </Reveal>
        <Reveal delay={0.24} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" variant="terra">
            <Link href="/login">
              Join as alumni <ArrowRight strokeWidth={2} />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline-light">
            <Link href="/programs">See programs</Link>
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
