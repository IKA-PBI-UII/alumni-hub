"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/data/store";
import { bag, cartActions } from "@/lib/cart";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductTag({ tag, className }: { tag: NonNullable<Product["tag"]>; className?: string }) {
  return (
    <Badge
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[11px] font-semibold",
        tag === "Pre-order" || tag === "Limited" ? "bg-terra text-on-accent" : "bg-ink text-paper",
        className,
      )}
    >
      {tag}
    </Badge>
  );
}

export function ColorDots({ colors }: { colors: Product["colors"] }) {
  return (
    <span className="flex items-center gap-1" aria-label={`Colours: ${colors.map((c) => c.name).join(", ")}`}>
      {colors.map((c) => (
        <span key={c.name} title={c.name} className="size-3 rounded-full ring-1 ring-ink/25" style={{ background: c.hex }} />
      ))}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const needsSize = Boolean(product.sizes?.length);

  return (
    <article className="surface surface-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-card">
      <Link href={`/store/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-square overflow-hidden border-b border-line" style={{ background: product.backdrop }}>
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-3 transition-transform sm:p-6 duration-500 group-hover:scale-[1.04] motion-reduce:group-hover:scale-100"
          />
          {product.tag && <ProductTag tag={product.tag} className="absolute top-2 left-2 sm:top-3 sm:left-3" />}
        </div>
        <div className="flex flex-1 flex-col gap-1 p-3 pb-2 sm:p-4 sm:pb-2">
          <p className="text-xs font-medium text-muted-ink">{product.category}</p>
          <h3 className="text-sm leading-snug font-bold group-hover:text-terra sm:text-base">{product.name}</h3>
        </div>
      </Link>
      <div className="flex flex-col gap-3 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="flex items-center justify-between gap-3">
          <p className="font-display text-sm font-bold tabular-nums sm:text-base">{formatRupiah(product.price)}</p>
          <ColorDots colors={product.colors} />
        </div>
        {needsSize ? (
          <Button asChild size="sm" variant="outline" className="w-full">
            <Link href={`/store/${product.slug}`} aria-label={`Choose a size for ${product.name}`}>
              Choose size
            </Link>
          </Button>
        ) : (
          <Button
            size="sm"
            className="w-full"
            aria-label={`Add ${product.name} to bag`}
            onClick={() => {
              cartActions.add({ slug: product.slug, color: product.colors[0].name });
              toast.success("Added to bag", {
                description: product.name,
                action: { label: "View bag", onClick: () => bag.set(true) },
              });
            }}
          >
            <Plus strokeWidth={2} />
            <span>
              Add<span className="hidden sm:inline"> to bag</span>
            </span>
          </Button>
        )}
      </div>
    </article>
  );
}
