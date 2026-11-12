import type { NewsFilters } from "@/lib/news";

/**
 * Query string for /news. Category values are lowercase in the URL
 * (`?category=announcements`); parseNewsParams maps them back.
 * Client-safe: used by the filter bar and the server-rendered pagination.
 */
export function newsSearchParams(filters: NewsFilters, page = 1): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category.toLowerCase());
  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);
  if (page > 1) params.set("page", String(page));
  return params.toString();
}
