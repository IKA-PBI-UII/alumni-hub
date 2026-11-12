export type LedgerEntry = {
  date: string;
  description: string;
  category: "Contributions" | "Sponsorship" | "Events" | "Hosting & tools" | "Printing" | "Mentoring";
  amount: number;
  type: "in" | "out";
};

/** Sample numbers for the prototype. */
export const ledger: LedgerEntry[] = [
  { date: "2026-10-31", description: "Zoom Pro, one month", category: "Hosting & tools", amount: 240000, type: "out" },
  { date: "2026-10-28", description: "Member contributions, October", category: "Contributions", amount: 2350000, type: "in" },
  { date: "2026-10-24", description: "Talkshow speaker tokens of thanks", category: "Events", amount: 450000, type: "out" },
  { date: "2026-10-20", description: "Talkshow sponsor (sample partner)", category: "Sponsorship", amount: 1500000, type: "in" },
  { date: "2026-10-18", description: "Team Introduction Conference snacks", category: "Events", amount: 620000, type: "out" },
  { date: "2026-10-15", description: "Banner and name tags", category: "Printing", amount: 310000, type: "out" },
  { date: "2026-10-10", description: "Domain and hosting, one year", category: "Hosting & tools", amount: 380000, type: "out" },
  { date: "2026-10-05", description: "Mentoring pilot materials", category: "Mentoring", amount: 150000, type: "out" },
  { date: "2026-09-30", description: "Member contributions, September", category: "Contributions", amount: 1850000, type: "in" },
];

export function ledgerTotals(entries: LedgerEntry[] = ledger) {
  const income = entries.filter((e) => e.type === "in").reduce((s, e) => s + e.amount, 0);
  const spending = entries.filter((e) => e.type === "out").reduce((s, e) => s + e.amount, 0);
  return { income, spending, balance: income - spending };
}

export function spendingByCategory(entries: LedgerEntry[] = ledger) {
  const map = new Map<string, number>();
  for (const e of entries) if (e.type === "out") map.set(e.category, (map.get(e.category) ?? 0) + e.amount);
  return [...map.entries()].map(([category, amount]) => ({ category, amount })).sort((a, b) => b.amount - a.amount);
}
