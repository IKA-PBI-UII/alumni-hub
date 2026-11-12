const dateFmt = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const longDateFmt = new Intl.DateTimeFormat("en-GB", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string) {
  return dateFmt.format(new Date(iso));
}

export function formatLongDate(iso: string) {
  return longDateFmt.format(new Date(iso));
}

export function dateParts(iso: string) {
  const d = new Date(iso);
  return {
    day: d.getUTCDate(),
    month: d.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }),
    year: d.getUTCFullYear(),
  };
}

const idr = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export function formatRupiah(n: number) {
  return idr.format(n);
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

/** Today in the prototype's world, fixed so server and client agree. */
export const DEMO_TODAY = "2026-11-05";
