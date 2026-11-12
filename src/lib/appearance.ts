"use client";

import { createLocalStore } from "@/lib/local-store";

export type UiStyle = "minimal" | "brutal" | "neu";
export type UiMode = "light" | "dark";
export type UiPalette = "heritage" | "sky";
export type Appearance = { style: UiStyle; mode: UiMode; palette: UiPalette };

import { STORAGE_KEY } from "@/lib/appearance-script";

export { STORAGE_KEY };

export const styleOptions: { value: UiStyle; label: string; hint: string }[] = [
  { value: "brutal", label: "Neobrutalism", hint: "Ink outlines, hard shadows" },
  { value: "minimal", label: "Minimalism", hint: "Calm, airy, soft borders" },
  { value: "neu", label: "Neumorphism", hint: "Soft, raised surfaces" },
];

/** Palette = brand identity (colours + typefaces). Works with every style and mode. */
export const paletteOptions: { value: UiPalette; label: string; hint: string; swatches: string[] }[] = [
  {
    value: "heritage",
    label: "Heritage",
    hint: "Ink, terracotta & sand · Jakarta + Inter",
    swatches: ["#16231F", "#B8451A", "#E9A27F", "#ECE7DB"],
  },
  {
    value: "sky",
    label: "Sky & Sun",
    hint: "Blues, orange & yellow · Montserrat + Source Sans",
    swatches: ["#004AAD", "#14A4BD", "#0CC1E0", "#FF914D", "#FFBC59", "#474747"],
  },
];

const store = createLocalStore<Appearance>(STORAGE_KEY, { style: "brutal", mode: "light", palette: "heritage" });

function apply({ style, mode, palette }: Appearance) {
  const root = document.documentElement;
  root.dataset.style = style;
  root.dataset.palette = palette;
  root.classList.toggle("dark", mode === "dark");
}

/** Older saved settings have no palette; fall back to the default. */
export function useAppearance(): Appearance {
  const a = store.useValue();
  return a.palette ? a : { ...a, palette: "heritage" };
}

export function setAppearance(partial: Partial<Appearance>) {
  store.set((prev) => {
    const next: Appearance = { ...prev, palette: prev.palette ?? "heritage", ...partial };
    apply(next);
    return next;
  });
}
