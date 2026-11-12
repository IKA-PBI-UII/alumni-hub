import type { Metadata } from "next";
import Link from "next/link";
import { HandHeart } from "lucide-react";
import { PageHeader, SampleTag, Section } from "@/components/site/primitives";
import { StoreBrowser } from "@/components/store/store-browser";
import { PROCEEDS_SHARE } from "@/data/store";

export const metadata: Metadata = { title: "Store" };

export default function StorePage() {
  return (
    <>
      <PageHeader
        eyebrow="Store"
        title="Wear the network."
        intro="Hats, tees, jackets and everyday goods from IKA PBI UII. Made in small batches, sold at cost plus a little for the community."
        image={{ src: "/images/grads-lawn.jpg", alt: "Graduates sitting together on a lawn" }}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <p className="surface inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 text-sm">
            <HandHeart aria-hidden strokeWidth={1.5} className="size-4 text-terra" />
            {Math.round(PROCEEDS_SHARE * 100)}% of every sale funds mentoring and events.{" "}
            <Link href="/transparency" className="font-semibold underline underline-offset-2">
              See the ledger
            </Link>
          </p>
          <SampleTag />
        </div>
      </PageHeader>
      <Section className="pt-10 md:pt-14">
        <StoreBrowser />
      </Section>
    </>
  );
}
