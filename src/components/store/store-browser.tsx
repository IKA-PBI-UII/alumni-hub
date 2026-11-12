"use client";

import { useState } from "react";
import { ProductCard } from "@/components/store/product-card";
import { STORE_CATEGORIES, products } from "@/data/store";
import { cn } from "@/lib/utils";

export function StoreBrowser() {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? products : products.filter((p) => p.category === cat);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter by category" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:px-0">
          {["All", ...STORE_CATEGORIES].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                cat === c ? "border-ink bg-ink text-paper" : "border-line bg-card text-muted-ink hover:text-ink",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-ink" aria-live="polite">
          {list.length} {list.length === 1 ? "item" : "items"}
        </p>
      </div>
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {list.map((p) => (
          <li key={p.slug}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
