import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Container, PageHeader, Section } from "@/components/site/primitives";
import { NewsCard } from "@/components/site/news-card";
import { NewsFilters } from "@/components/site/news-filters";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeaturedArticle, hasFilters, parseNewsParams, searchNews, type NewsFilters as Filters } from "@/lib/news";
import { formatDate } from "@/lib/format";
import { newsSearchParams } from "@/lib/news-url";
import { cn } from "@/lib/utils";
import { StorePromoCard } from "@/components/store/store-promo";
import type { Article } from "@/data/news";

export const metadata: Metadata = { title: "News" };

export default function NewsPage({ searchParams }: PageProps<"/news">) {
  return (
    <>
      <PageHeader eyebrow="Newsroom" title="Stories and updates from our alumni." />
      <Suspense fallback={<NewsSkeleton />}>
        <Newsroom searchParams={searchParams} />
      </Suspense>
      <Section className="pt-0 md:pt-0">
        <StorePromoCard featured={["slogan-tee", "enamel-mug", "notebook"]} />
      </Section>
    </>
  );
}

async function Newsroom({ searchParams }: { searchParams: PageProps<"/news">["searchParams"] }) {
  const { filters, page } = parseNewsParams(await searchParams);
  const filtered = hasFilters(filters);

  // The hero only shows on the unfiltered first page; it is left out of the
  // unfiltered list on every page so pagination stays consistent.
  const featured = filtered ? undefined : await getFeaturedArticle();
  const result = await searchNews(filters, page, featured?.slug);

  if (!filtered && !featured) {
    return (
      <Section className="pt-12 md:pt-16">
        <EmptyState title="No stories yet." body="The first articles from the newsroom will appear here soon." />
      </Section>
    );
  }

  return (
    <>
      {featured && page === 1 && <FeaturedHero article={featured} />}

      <Section id="stories" className="scroll-mt-24 pt-14 md:pt-20">
        <div className="group/news">
          <NewsFilters filters={filters} />
          <div className="transition-opacity group-has-[[data-pending]]/news:opacity-50">
            {filtered && (
              <p aria-live="polite" className="mb-6 text-sm text-muted-ink">
                {result.totalDocs === 1 ? "1 story" : `${result.totalDocs} stories`} found
              </p>
            )}
            {result.articles.length > 0 ? (
              <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {result.articles.map((a) => (
                  <li key={a.slug}>
                    <NewsCard article={a} />
                  </li>
                ))}
              </ul>
            ) : filtered ? (
              <EmptyState title="No matching stories." body="Try another keyword, category or date range." />
            ) : page > 1 ? (
              <EmptyState title="No stories on this page." body="Head back to the first page for the latest news." />
            ) : null}
            <Pagination filters={filters} page={result.page} totalPages={result.totalPages} />
          </div>
        </div>
      </Section>
    </>
  );
}

function FeaturedHero({ article }: { article: Article }) {
  return (
    <section className="pt-12 md:pt-16">
      <Container>
        <Link
          href={`/news/${article.slug}`}
          className="surface group grid overflow-hidden rounded-3xl border border-line bg-card md:grid-cols-12"
        >
          <div className="relative aspect-[16/10] md:col-span-7 md:aspect-auto md:min-h-96">
            <Image
              src={article.image}
              alt={article.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 60vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
            />
          </div>
          <div className="flex flex-col justify-center p-6 md:col-span-5 md:p-10">
            <p className="text-xs font-semibold tracking-wider text-terra uppercase">Featured · {article.category}</p>
            <h2 className="mt-3 text-3xl leading-tight font-bold text-balance group-hover:text-terra md:text-4xl">
              {article.title}
            </h2>
            <p className="mt-4 text-muted-ink">{article.excerpt}</p>
            <p className="mt-6 flex items-center justify-between text-sm text-muted-ink">
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span className="inline-flex items-center gap-1 font-semibold text-ink">
                Read story <ArrowRight aria-hidden strokeWidth={2} className="size-4 transition-transform group-hover:translate-x-0.5" />
              </span>
            </p>
          </div>
        </Link>
      </Container>
    </section>
  );
}

function pageHref(filters: Filters, page: number) {
  const qs = newsSearchParams(filters, page);
  return `/news${qs ? `?${qs}` : ""}#stories`;
}

/** 1 … 4 5 [6] 7 8 … 20 */
function pageList(page: number, total: number): (number | "gap")[] {
  const out: (number | "gap")[] = [];
  for (let p = 1; p <= total; p++) {
    if (p === 1 || p === total || Math.abs(p - page) <= 1) out.push(p);
    else if (out.at(-1) !== "gap") out.push("gap");
  }
  return out;
}

/**
 * Mobile-first: prev / "Page 2 of 9" / next fits a 390px screen at any page
 * count; numbered pages appear from `sm` up.
 */
function Pagination({ filters, page, totalPages }: { filters: Filters; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const item = "inline-flex size-11 items-center justify-center rounded-full border text-sm font-medium transition-colors sm:size-10";
  const arrow = (to: number, label: string, icon: React.ReactNode) =>
    to >= 1 && to <= totalPages ? (
      <Link href={pageHref(filters, to)} aria-label={label} className={cn(item, "border-line bg-card hover:text-terra")}>
        {icon}
      </Link>
    ) : (
      <span aria-hidden className={cn(item, "border-line text-muted-ink opacity-40")}>
        {icon}
      </span>
    );

  return (
    <nav aria-label="Pagination" className="mt-14 flex items-center justify-between gap-2 sm:justify-center">
      {arrow(page - 1, "Previous page", <ChevronLeft aria-hidden className="size-4" />)}
      <p className="text-sm text-muted-ink sm:hidden">
        Page <span className="font-semibold text-ink">{page}</span> of {totalPages}
      </p>
      <ul className="hidden items-center gap-2 sm:flex">
        {pageList(page, totalPages).map((p, i) =>
          p === "gap" ? (
            <li key={`gap-${i}`} aria-hidden className="px-1 text-muted-ink">
              …
            </li>
          ) : (
            <li key={p}>
              <Link
                href={pageHref(filters, p)}
                aria-current={p === page ? "page" : undefined}
                className={cn(
                  "inline-flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition-colors",
                  p === page ? "border-ink bg-ink text-paper" : "border-line bg-card text-muted-ink hover:text-ink")}
              >
                {p}
              </Link>
            </li>
          ),
        )}
      </ul>
      {arrow(page + 1, "Next page", <ChevronRight aria-hidden className="size-4" />)}
    </nav>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-16 text-center">
      <p className="font-display text-xl font-bold">{title}</p>
      <p className="mt-1 text-muted-ink">{body}</p>
    </div>
  );
}

function NewsSkeleton() {
  return (
    <Container className="space-y-10 pt-12 pb-20 md:pt-16">
      <Skeleton className="aspect-[16/10] w-full rounded-3xl md:aspect-[21/8]" />
      <Skeleton className="h-11 w-full rounded-xl" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="aspect-[16/10] w-full rounded-2xl" />
        ))}
      </div>
    </Container>
  );
}
