import { NumberTicker } from "@/components/ui/aceternity/number-ticker";
import { Container, SampleTag } from "@/components/site/primitives";
import { sampleStats } from "@/data/programs";

export function StatsBand() {
  return (
    <section aria-labelledby="stats-title" className="bg-night py-20 text-on-night md:py-24">
      <Container>
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <h2 id="stats-title" className="max-w-lg text-3xl font-bold text-balance md:text-4xl">
            A network that grows every time someone joins.
          </h2>
          <SampleTag tone="dark" />
        </div>
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {sampleStats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse border-l border-white/15 pl-5">
              <dt className="mt-2 text-sm text-on-night/65 md:text-base">{s.label}</dt>
              <dd className="font-display text-4xl font-extrabold tracking-[-0.03em] md:text-6xl">
                <NumberTicker value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
