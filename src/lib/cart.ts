"use client";

import { createLocalStore } from "@/lib/local-store";
import { getProduct, type Product } from "@/data/store";

export type CartLine = { slug: string; color: string; size?: string; qty: number };

const cartStore = createLocalStore<CartLine[]>("ika-demo-cart", []);

const sameLine = (a: CartLine, b: Omit<CartLine, "qty">) =>
  a.slug === b.slug && a.color === b.color && a.size === b.size;

export const useCart = cartStore.useValue;

export function cartSummary(lines: CartLine[]) {
  const items = lines
    .map((line) => ({ line, product: getProduct(line.slug) }))
    .filter((x): x is { line: CartLine; product: Product } => Boolean(x.product));
  const count = items.reduce((n, x) => n + x.line.qty, 0);
  const subtotal = items.reduce((n, x) => n + x.line.qty * x.product.price, 0);
  return { items, count, subtotal };
}

export const cartActions = {
  add(line: Omit<CartLine, "qty">, qty = 1) {
    cartStore.set((prev) =>
      prev.some((l) => sameLine(l, line))
        ? prev.map((l) => (sameLine(l, line) ? { ...l, qty: Math.min(10, l.qty + qty) } : l))
        : [...prev, { ...line, qty }],
    );
  },
  setQty(line: Omit<CartLine, "qty">, qty: number) {
    cartStore.set((prev) =>
      qty <= 0
        ? prev.filter((l) => !sameLine(l, line))
        : prev.map((l) => (sameLine(l, line) ? { ...l, qty: Math.min(10, qty) } : l)),
    );
  },
  clear() {
    cartStore.set([]);
  },
};

/* Open/closed state of the bag drawer (in memory, shared by every bag button). */
let bagOpen = false;
const bagListeners = new Set<() => void>();

export const bag = {
  subscribe(l: () => void) {
    bagListeners.add(l);
    return () => bagListeners.delete(l);
  },
  get: () => bagOpen,
  set(open: boolean) {
    bagOpen = open;
    bagListeners.forEach((l) => l());
  },
};
