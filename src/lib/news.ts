import "server-only";
import { cacheLife, cacheTag } from "next/cache";
import { getPayload, type Where } from "payload";
import config from "@payload-config";
import { NEWS_CATEGORIES, type Article, type NewsCategory } from "@/data/news";
import type { Media, Post } from "@/payload-types";

export const NEWS_PAGE_SIZE = 9;

function toArticle(post: Post): Article {
  const image = typeof post.image === "object" ? (post.image as Media) : null;
  return {
    slug: post.slug,
    title: post.title,
    category: post.category,
    date: post.date,
    author: post.author,
    image: image?.url ?? "/images/grads-friends.jpg",
    imageAlt: image?.alt ?? "",
    excerpt: post.excerpt,
    content: post.content as Article["content"],
    featured: post.featured ?? false,
  };
}

const PUBLISHED: Where = { _status: { equals: "published" } };

/**
 * All published Payload posts, newest first. Cached under the "news" tag; the
 * Posts collection clears it on every change (see src/collections/Posts.ts).
 */
export async function getNews(): Promise<Article[]> {
  "use cache";
  cacheTag("news");
  cacheLife("hours");

  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      where: PUBLISHED,
      sort: "-date",
      depth: 1,
      limit: 100,
      draft: false,
    });
    return res.docs.map(toArticle);
  } catch (err) {
    // Database unreachable: render an empty newsroom and retry soon.
    console.error("[news] Could not load posts from Payload:", err);
    cacheLife("minutes");
    return [];
  }
}

export async function getArticle(slug: string) {
  return (await getNews()).find((a) => a.slug === slug);
}

/** The /news hero: newest post marked featured, else the newest post. */
export async function getFeaturedArticle(): Promise<Article | undefined> {
  const news = await getNews();
  return news.find((a) => a.featured) ?? news[0];
}

export type NewsFilters = {
  q?: string;
  category?: NewsCategory;
  /** YYYY-MM-DD, inclusive. */
  from?: string;
  /** YYYY-MM-DD, inclusive. */
  to?: string;
};

export type NewsPage = {
  articles: Article[];
  page: number;
  totalPages: number;
  totalDocs: number;
};

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/** Reads /news search params into validated filters + page number. */
export function parseNewsParams(sp: Record<string, string | string[] | undefined>) {
  const one = (k: string) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
  };
  const category = one("category");
  const from = one("from");
  const to = one("to");
  const page = Number.parseInt(one("page") ?? "1", 10);
  const filters: NewsFilters = {
    q: one("q")?.slice(0, 100),
    // URLs use lowercase (?category=announcements); older capitalised links still work.
    category: NEWS_CATEGORIES.find((c) => c.toLowerCase() === category?.toLowerCase()),
    from: from && DAY.test(from) ? from : undefined,
    to: to && DAY.test(to) ? to : undefined,
  };
  return { filters, page: Number.isFinite(page) && page > 0 ? page : 1 };
}

export function hasFilters(f: NewsFilters) {
  return Boolean(f.q || f.category || f.from || f.to);
}

/**
 * One page of published posts matching the filters, newest first. Search
 * matches title, excerpt, author and body text (`like` = every word, any case).
 */
export async function searchNews(filters: NewsFilters, page: number, excludeSlug?: string): Promise<NewsPage> {
  "use cache";
  cacheTag("news");
  cacheLife("hours");

  const and: Where[] = [PUBLISHED];
  if (filters.q) {
    and.push({
      or: ["title", "excerpt", "author", "searchText"].map((field) => ({ [field]: { like: filters.q } })),
    });
  }
  if (filters.category) and.push({ category: { equals: filters.category } });
  if (filters.from) and.push({ date: { greater_than_equal: `${filters.from}T00:00:00.000Z` } });
  if (filters.to) and.push({ date: { less_than_equal: `${filters.to}T23:59:59.999Z` } });
  if (excludeSlug) and.push({ slug: { not_equals: excludeSlug } });

  try {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      where: { and },
      sort: "-date",
      depth: 1,
      limit: NEWS_PAGE_SIZE,
      page,
      draft: false,
    });
    return {
      articles: res.docs.map(toArticle),
      page: res.page ?? page,
      totalPages: res.totalPages,
      totalDocs: res.totalDocs,
    };
  } catch (err) {
    console.error("[news] Search failed:", err);
    cacheLife("minutes");
    return { articles: [], page, totalPages: 0, totalDocs: 0 };
  }
}

/**
 * Up to `limit` published posts related to an article: same category first,
 * topped up with the newest posts from other categories.
 */
export async function getRelatedArticles(slug: string, category: NewsCategory, limit = 3): Promise<Article[]> {
  "use cache";
  cacheTag("news");
  cacheLife("hours");

  const find = async (where: Where[], n: number) => {
    const payload = await getPayload({ config });
    const res = await payload.find({
      collection: "posts",
      where: { and: [PUBLISHED, { slug: { not_equals: slug } }, ...where] },
      sort: "-date",
      depth: 1,
      limit: n,
      pagination: false,
      draft: false,
    });
    return res.docs.map(toArticle);
  };

  try {
    const same = await find([{ category: { equals: category } }], limit);
    if (same.length >= limit) return same;
    const others = await find([{ category: { not_equals: category } }], limit - same.length);
    return [...same, ...others];
  } catch (err) {
    console.error("[news] Could not load related posts:", err);
    cacheLife("minutes");
    return [];
  }
}
