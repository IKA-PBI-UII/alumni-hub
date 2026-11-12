import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/site/primitives";
import { ProductCard } from "@/components/store/product-card";
import { PROCEEDS_SHARE, getProduct, products, type Product } from "@/data/store";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

const pick = (slugs: string[]) => slugs.map(getProduct).filter((p): p is Product => Boolean(p));

/** Default trio shown on promo cards. */
const FEATURED = ["alumni-hoodie", "classic-cap", "alumni-tee"];

/**
 * Compact store banner for inner pages: copy + CTA on the left, three product
 * tiles on the right. `heading`/`line` let each page tie the store to its topic.
 */
export function StorePromoCard({
  heading = "Wear the network.",
  line = `Hats, tees and jackets from IKA PBI UII. ${Math.round(PROCEEDS_SHARE * 100)}% of every sale funds mentoring and events.`,
  featured = FEATURED,
  className,
}: {
  heading?: string;
  line?: string;
  featured?: string[];
  className?: string;
}) {
  const items = pick(featured).slice(0, 3);

  return (
    <aside
      aria-label="IKA PBI UII Store"
      className={cn(
        "surface grid items-center gap-6 overflow-hidden rounded-3xl border border-line bg-card p-5 md:grid-cols-12 md:gap-8 md:p-8",
        className,
      )}
    >
      <div className="md:col-span-5">
        <p className="eyebrow flex items-center gap-2 text-sm font-semibold text-terra">
          <span aria-hidden className="h-px w-6 bg-current" />
          IKA PBI UII Store
        </p>
        <h2 className="mt-3 text-2xl font-bold text-balance md:text-3xl">{heading}</h2>
        <p className="mt-2 text-pretty text-muted-ink">{line}</p>
        <Button asChild className="mt-5">
          <Link href="/store">
            Shop merch <ArrowRight strokeWidth={2} />
          </Link>
        </Button>
      </div>
      <ul className="grid grid-cols-3 gap-2 sm:gap-3 md:col-span-7">
        {items.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/store/${p.slug}`}
              className="group block overflow-hidden rounded-2xl border border-line"
              aria-label={`${p.name}, ${formatRupiah(p.price)}`}
            >
              <div className="relative aspect-square" style={{ background: p.backdrop }}>
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 18vw, 30vw"
                  className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                />
              </div>
              <div className="border-t border-line bg-card px-2.5 py-2">
                <p className="line-clamp-2 min-h-[2lh] text-xs leading-tight font-semibold group-hover:text-terra sm:min-h-0 sm:truncate sm:text-sm">{p.name}</p>
                <p className="text-xs text-muted-ink tabular-nums">{formatRupiah(p.price)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Home page section: four best sellers with full product cards. */
export function StoreShowcase() {
  const items = pick(["alumni-hoodie", "classic-cap", "alumni-tee", "canvas-tote"]);
  const fallback = products.slice(0, 4);

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionTitle
          eyebrow="Store"
          title="Wear the network."
          intro="Merch made in small batches. Every purchase funds mentoring and events, published in the open ledger."
          className="md:mb-14"
        />
        <Button asChild variant="outline" className="mb-10 w-fit md:mb-14">
          <Link href="/store">
            Visit the store <ArrowRight strokeWidth={2} />
          </Link>
        </Button>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {(items.length ? items : fallback).map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
      <p className="mt-6 flex items-center gap-2 text-sm text-muted-ink">
        <HandHeart aria-hidden strokeWidth={1.5} className="size-4 text-terra" />
        {Math.round(PROCEEDS_SHARE * 100)}% of every sale goes to programs.
      </p>
    </>
  );
}
