"use client";

import Image from "next/image";
import Link from "next/link";
import { useSyncExternalStore } from "react";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PROCEEDS_SHARE } from "@/data/store";
import { bag, cartActions, cartSummary, useCart } from "@/lib/cart";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";

/** Bag icon with item count; opens the bag drawer. */
export function BagButton({ onDark = false }: { onDark?: boolean }) {
  const open = useSyncExternalStore(bag.subscribe, bag.get, () => false);
  const lines = useCart();
  const { items, count, subtotal } = cartSummary(lines);

  function checkout() {
    cartActions.clear();
    bag.set(false);
    toast.success("Order placed (prototype)", { description: "No payment was taken. Thanks for supporting the network!" });
  }

  return (
    <Sheet open={open} onOpenChange={bag.set}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", onDark && "text-on-night hover:bg-on-night/10 hover:text-on-night")}
          aria-label={count ? `Open bag, ${count} ${count === 1 ? "item" : "items"}` : "Open bag"}
        >
          <ShoppingBag strokeWidth={1.5} className="size-[18px]" />
          {count > 0 && (
            <span className="absolute top-1 right-1 flex min-w-4 items-center justify-center rounded-full bg-terra px-1 text-[10px] leading-4 font-bold text-on-accent tabular-nums">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col gap-0 bg-paper p-0 sm:max-w-md">
        <SheetHeader className="border-b border-line px-5 py-4">
          <SheetTitle className="font-display text-xl">Your bag</SheetTitle>
          <SheetDescription>
            {count ? `${count} ${count === 1 ? "item" : "items"}` : "Nothing here yet."}
          </SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag aria-hidden strokeWidth={1.25} className="size-12 text-muted-ink" />
            <p className="text-muted-ink">Wear the network. Every purchase funds mentoring and events.</p>
            <Button asChild onClick={() => bag.set(false)}>
              <Link href="/store">Browse the store</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-5">
              {items.map(({ line, product }) => {
                const key = { slug: line.slug, color: line.color, size: line.size };
                return (
                  <li key={`${line.slug}-${line.color}-${line.size ?? ""}`} className="flex gap-3 py-4">
                    <Link
                      href={`/store/${product.slug}`}
                      onClick={() => bag.set(false)}
                      className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-line"
                      style={{ background: product.backdrop }}
                    >
                      <Image src={product.image} alt={product.imageAlt} fill sizes="80px" className="object-contain p-2" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug font-semibold">{product.name}</p>
                      <p className="text-sm text-muted-ink">
                        {line.color}
                        {line.size && ` · ${line.size}`}
                      </p>
                      <div className="mt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center rounded-full border border-line">
                          <button
                            type="button"
                            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-ink"
                            aria-label={`Decrease quantity of ${product.name}`}
                            onClick={() => cartActions.setQty(key, line.qty - 1)}
                          >
                            {line.qty === 1 ? <Trash2 strokeWidth={1.5} className="size-3.5" /> : <Minus strokeWidth={2} className="size-3.5" />}
                          </button>
                          <span className="w-6 text-center text-sm tabular-nums" aria-label="Quantity">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            className="flex size-8 cursor-pointer items-center justify-center rounded-full text-ink disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label={`Increase quantity of ${product.name}`}
                            disabled={line.qty >= 10}
                            onClick={() => cartActions.setQty(key, line.qty + 1)}
                          >
                            <Plus strokeWidth={2} className="size-3.5" />
                          </button>
                        </div>
                        <p className="font-semibold tabular-nums">{formatRupiah(product.price * line.qty)}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="space-y-3 border-t border-line px-5 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-muted-ink">Subtotal</span>
                <span className="font-display text-2xl font-extrabold tabular-nums">{formatRupiah(subtotal)}</span>
              </div>
              <p className="rounded-xl bg-sand px-3 py-2 text-sm text-ink">
                {formatRupiah(Math.round(subtotal * PROCEEDS_SHARE))} of this order funds mentoring and events, published in the{" "}
                <Link href="/transparency" onClick={() => bag.set(false)} className="font-semibold underline underline-offset-2">
                  open ledger
                </Link>
                .
              </p>
              <Button size="lg" variant="terra" className="w-full" onClick={checkout}>
                Checkout
              </Button>
              <p className="text-center text-xs text-muted-ink">Prototype: no payment is taken. Pickup at events or shipping (next phase).</p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
