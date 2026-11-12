"use client";

import { Check, Moon, Palette, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paletteOptions, setAppearance, styleOptions, useAppearance } from "@/lib/appearance";
import { cn } from "@/lib/utils";

/** Style + palette picker and dark/light toggle. `onDark` = sitting on a dark panel (home hero). */
export function AppearanceControls({ onDark = false, className }: { onDark?: boolean; className?: string }) {
  const { style, mode, palette } = useAppearance();
  const iconBtn = cn(onDark && "text-on-night hover:bg-on-night/10 hover:text-on-night");
  const dark = mode === "dark";

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className={iconBtn} aria-label="Choose style and palette">
            <Palette strokeWidth={1.5} className="size-[18px]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 rounded-xl p-1.5">
          <DropdownMenuLabel className="text-xs font-medium text-muted-ink">Style</DropdownMenuLabel>
          {styleOptions.map((o) => (
            <DropdownMenuItem
              key={o.value}
              onSelect={() => setAppearance({ style: o.value })}
              className="flex items-start gap-3 rounded-lg px-2.5 py-2"
              aria-checked={style === o.value}
              role="menuitemradio"
            >
              <StyleSwatch value={o.value} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{o.label}</span>
                <span className="block text-xs text-muted-ink">{o.hint}</span>
              </span>
              {style === o.value && <Check strokeWidth={2} className="mt-0.5 size-4 text-terra" />}
            </DropdownMenuItem>
          ))}

          <DropdownMenuSeparator className="my-1.5" />
          <DropdownMenuLabel className="text-xs font-medium text-muted-ink">Palette</DropdownMenuLabel>
          {paletteOptions.map((o) => (
            <DropdownMenuItem
              key={o.value}
              onSelect={() => setAppearance({ palette: o.value })}
              className="flex items-start gap-3 rounded-lg px-2.5 py-2"
              aria-checked={palette === o.value}
              role="menuitemradio"
            >
              <PaletteSwatch colors={o.swatches} />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium">{o.label}</span>
                <span className="block text-xs text-muted-ink">{o.hint}</span>
              </span>
              {palette === o.value && <Check strokeWidth={2} className="mt-0.5 size-4 text-terra" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        className={iconBtn}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        title={dark ? "Light mode" : "Dark mode"}
        onClick={() => setAppearance({ mode: dark ? "light" : "dark" })}
      >
        {dark ? <Sun strokeWidth={1.5} className="size-[18px]" /> : <Moon strokeWidth={1.5} className="size-[18px]" />}
      </Button>
    </div>
  );
}

/** Tiny preview of each style's card treatment. */
function StyleSwatch({ value }: { value: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "mt-0.5 block h-7 w-9 shrink-0 bg-card",
        value === "minimal" && "rounded-md border border-line",
        value === "brutal" && "rounded-[3px] border-[1.5px] border-ink shadow-[2px_2px_0_0_var(--ink)]",
        value === "neu" &&
          "rounded-lg bg-paper shadow-[2px_2px_5px_rgb(0_0_0/0.18),-2px_-2px_5px_rgb(255_255_255/0.7)] dark:shadow-[2px_2px_5px_rgb(0_0_0/0.5),-2px_-2px_5px_rgb(255_255_255/0.06)]",
      )}
    />
  );
}

/** Colour strip for each palette. */
function PaletteSwatch({ colors }: { colors: string[] }) {
  return (
    <span aria-hidden className="mt-0.5 flex h-7 w-9 shrink-0 overflow-hidden rounded-md ring-1 ring-line">
      {colors.map((c) => (
        <span key={c} className="h-full flex-1" style={{ background: c }} />
      ))}
    </span>
  );
}
