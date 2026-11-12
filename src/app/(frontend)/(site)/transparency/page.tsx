import type { Metadata } from "next";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { PageHeader, Section } from "@/components/site/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ledger, ledgerTotals, spendingByCategory } from "@/data/ledger";
import { formatDate, formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { StorePromoCard } from "@/components/store/store-promo";

export const metadata: Metadata = { title: "Transparency" };

export default function TransparencyPage() {
  const totals = ledgerTotals();
  const byCategory = spendingByCategory();
  const max = Math.max(...byCategory.map((c) => c.amount));

  const cards = [
    { label: "Income", value: totals.income, note: "Contributions and sponsors" },
    { label: "Spending", value: totals.spending, note: "Events, tools and printing" },
    { label: "Balance", value: totals.balance, note: "Held in the association account", strong: true },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Open ledger"
        title="Every rupiah, in the open."
        intro="We publish every rupiah that comes in and goes out. Sample numbers for the prototype."
        image={{ src: "/images/study-notes.jpg", alt: "Student taking notes with a laptop" }}
      />

      <Section>
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((c) => (
            <div
              key={c.label}
              className={cn("surface rounded-2xl border border-line p-7", c.strong ? "bg-night text-on-night" : "bg-card")}
            >
              <p className={cn("text-sm font-medium", c.strong ? "text-on-night/70" : "text-muted-ink")}>{c.label}</p>
              <p className="mt-3 font-display text-3xl font-extrabold tracking-[-0.02em] tabular-nums md:text-4xl">
                {formatRupiah(c.value)}
              </p>
              <p className={cn("mt-2 text-sm", c.strong ? "text-on-night/60" : "text-muted-ink")}>{c.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-ink">Period: September–October 2026 · Sample numbers for the prototype.</p>
      </Section>

      <Section tone="sand" className="pt-16 md:pt-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <h2 className="text-2xl font-bold md:text-3xl">Where the money went</h2>
            <p className="mt-1 mb-6 text-muted-ink">Spending by category, largest first.</p>
            <figure>
              <ul className="space-y-4" aria-label="Spending by category">
                {byCategory.map((c) => (
                  <li key={c.category} title={`${c.category}: ${formatRupiah(c.amount)}`}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
                      <span className="font-medium">{c.category}</span>
                      <span className="text-muted-ink tabular-nums">{formatRupiah(c.amount)}</span>
                    </div>
                    <div className="h-2.5 overflow-hidden rounded-full bg-paper">
                      <div className="h-full rounded-full bg-terra" style={{ width: `${(c.amount / max) * 100}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
              <figcaption className="mt-4 text-xs text-muted-ink">Full entries in the ledger table.</figcaption>
            </figure>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <h2 className="mb-6 text-2xl font-bold md:text-3xl">Ledger</h2>
            <div className="surface overflow-hidden rounded-2xl border border-line bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="hidden pl-5 sm:table-cell">Date</TableHead>
                    <TableHead className="pl-4 sm:pl-2">Description</TableHead>
                    <TableHead className="hidden sm:table-cell">Category</TableHead>
                    <TableHead className="pr-4 text-right sm:pr-5">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ledger.map((e, i) => (
                    <TableRow key={i}>
                      <TableCell className="hidden pl-5 align-top whitespace-nowrap text-muted-ink sm:table-cell">{formatDate(e.date)}</TableCell>
                      <TableCell className="pl-4 align-top whitespace-normal sm:min-w-40 sm:pl-2">
                        {e.description}
                        <span className="mt-0.5 block text-xs text-muted-ink sm:hidden">{formatDate(e.date)}</span>
                      </TableCell>
                      <TableCell className="hidden text-muted-ink sm:table-cell">{e.category}</TableCell>
                      <TableCell
                        className={cn(
                          "pr-4 text-right align-top font-medium whitespace-nowrap tabular-nums sm:pr-5",
                          e.type === "in" ? "text-success" : "text-ink",
                        )}
                      >
                        <span className="inline-flex items-center gap-1">
                          {e.type === "in" ? (
                            <ArrowDownLeft aria-hidden strokeWidth={2} className="hidden size-3.5 sm:block" />
                          ) : (
                            <ArrowUpRight aria-hidden strokeWidth={2} className="hidden size-3.5 text-muted-ink sm:block" />
                          )}
                          <span className="sr-only">{e.type === "in" ? "Income" : "Spending"}: </span>
                          {e.type === "in" ? "+" : "−"}
                          {formatRupiah(e.amount)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </Section>

      <Section className="pt-16 md:pt-20">
        <StorePromoCard
          heading="Shop, then watch where it goes."
          line="Store sales show up in this ledger. 30% of every order funds mentoring and events."
          featured={["alumni-hoodie", "canvas-tote", "sticker-sheet"]}
        />
      </Section>
    </>
  );
}
