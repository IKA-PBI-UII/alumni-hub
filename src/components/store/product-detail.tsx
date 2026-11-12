"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, HandHeart, Minus, Package, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ProductTag } from "@/components/store/product-card";
import { PROCEEDS_SHARE, type Product } from "@/data/store";
import { bag, cartActions } from "@/lib/cart";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProductDetail({ product }: { product: Product }) {
  const [color, setColor] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const needsSize = Boolean(product.sizes?.length);
  const [sizeError, setSizeError] = useState(false);

  function add() {
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    cartActions.add({ slug: product.slug, color, size }, qty);
    toast.success("Added to bag", {
      description: `${product.name}${size ? ` · ${size}` : ""} × ${qty}`,
      action: { label: "View bag", onClick: () => bag.set(true) },
    });
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 md:gap-12">
      <div
        className="surface relative aspect-square overflow-hidden rounded-3xl border border-line"
        style={{ background: product.backdrop }}
      >
        <Image src={product.image} alt={product.imageAlt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-10" />
        {product.tag && <ProductTag tag={product.tag} className="absolute top-4 left-4" />}
      </div>

      <div className="flex flex-col">
        <p className="text-sm font-medium text-muted-ink">{product.category}</p>
        <h1 className="mt-1 text-3xl font-extrabold text-balance md:text-5xl">{product.name}</h1>
        <p className="mt-3 font-display text-2xl font-bold tabular-nums">{formatRupiah(product.price)}</p>
        <p className="mt-4 text-pretty text-muted-ink md:text-lg">{product.blurb}</p>

        <fieldset className="mt-7">
          <legend className="text-sm font-semibold">
            Colour <span className="font-normal text-muted-ink">· {color}</span>
          </legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                aria-pressed={color === c.name}
                aria-label={c.name}
                title={c.name}
                onClick={() => setColor(c.name)}
                className={cn(
                  "flex size-10 items-center justify-center rounded-full border-2 transition-colors",
                  color === c.name ? "border-ink" : "border-transparent hover:border-line",
                )}
              >
                <span className="size-7 rounded-full ring-1 ring-ink/20" style={{ background: c.hex }} />
              </button>
            ))}
          </div>
        </fieldset>

        {needsSize && (
          <fieldset className="mt-6">
            <legend className="text-sm font-semibold">Size</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes!.map((s) => (
                <Button
                  key={s}
                  type="button"
                  variant={size === s ? "default" : "outline"}
                  aria-pressed={size === s}
                  className="min-w-12"
                  onClick={() => {
                    setSize(s);
                    setSizeError(false);
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
            {sizeError && (
              <p role="alert" className="mt-2 text-sm text-destructive">
                Choose a size first.
              </p>
            )}
          </fieldset>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <div className="flex h-12 items-center rounded-full border border-line bg-card">
            <button
              type="button"
              aria-label="Decrease quantity"
              className="mx-1.5 flex size-9 cursor-pointer items-center justify-center rounded-full text-ink disabled:cursor-not-allowed disabled:opacity-40"
              disabled={qty <= 1}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
            >
              <Minus strokeWidth={2} className="size-4" />
            </button>
            <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite" aria-label={`Quantity ${qty}`}>
              {qty}
            </span>
            <button
              type="button"
              aria-label="Increase quantity"
              className="mx-1.5 flex size-9 cursor-pointer items-center justify-center rounded-full text-ink disabled:cursor-not-allowed disabled:opacity-40"
              disabled={qty >= 10}
              onClick={() => setQty((q) => Math.min(10, q + 1))}
            >
              <Plus strokeWidth={2} className="size-4" />
            </button>
          </div>
          <Button size="lg" variant="terra" className="flex-1 sm:flex-none sm:px-10" onClick={add}>
            Add to bag
          </Button>
        </div>

        <ul className="mt-8 space-y-2 border-t border-line pt-6">
          {product.details.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm">
              <Check aria-hidden strokeWidth={2} className="mt-0.5 size-4 shrink-0 text-terra" />
              {d}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <p className="flex items-start gap-2.5 rounded-xl bg-sand px-4 py-3 text-sm">
            <HandHeart aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-terra" />
            {formatRupiah(Math.round(product.price * PROCEEDS_SHARE))} of each one funds mentoring and events.
          </p>
          <p className="flex items-start gap-2.5 rounded-xl bg-sand px-4 py-3 text-sm">
            <Package aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-terra" />
            {product.tag === "Pre-order" ? "Pre-order: ships in about 3 weeks." : "Pick up at events or ship anywhere in Indonesia."}
          </p>
        </div>
      </div>
    </div>
  );
}
