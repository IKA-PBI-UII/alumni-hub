import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { NewsCard } from "@/components/site/news-card";
import { Skeleton } from "@/components/ui/skeleton";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { getArticle, getNews, getRelatedArticles } from "@/lib/news";
import { formatLongDate } from "@/lib/format";

export async function generateStaticParams() {
  const slugs = (await getNews()).map((a) => ({ slug: a.slug }));
  // Cache Components needs at least one param at build time; this one just 404s.
  return slugs.length > 0 ? slugs : [{ slug: "__none" }];
}

async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug, article.category);

  return (
    <>
      <article className="pt-28 pb-20 md:pt-36 md:pb-28">
        <Container className="max-w-3xl">
          <Link href="/news" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-ink hover:text-ink">
            <ArrowLeft aria-hidden strokeWidth={1.5} className="size-4" /> All news
          </Link>
          <p className="mt-8 text-sm font-semibold text-terra">{article.category}</p>
          <h1 className="mt-3 text-4xl leading-[1.08] font-extrabold text-balance md:text-5xl">{article.title}</h1>
          <p className="mt-5 flex flex-wrap items-center gap-x-2 text-sm text-muted-ink">
            <span>By {article.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={article.date}>{formatLongDate(article.date)}</time>
          </p>
        </Container>
        <Container className="mt-10 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-sand">
            <Image src={article.image} alt={article.imageAlt} fill priority sizes="(min-width: 1024px) 1024px, 100vw" className="object-cover" />
          </div>
        </Container>
        <Container className="mt-10 max-w-3xl">
          <p className="text-xl leading-relaxed font-medium text-pretty">{article.excerpt}</p>
          <div className="article-body mt-6 space-y-5 text-lg leading-relaxed text-ink/85">
            {article.content ? (
              <RichText data={article.content} disableContainer />
            ) : (
              article.body?.map((p, i) => <p key={i}>{p}</p>)
            )}
          </div>
        </Container>
      </article>

      {related.length > 0 && (
      <section className="border-t border-line pt-16 pb-20 md:pt-20 md:pb-28">
        <Container>
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">Related</h2>
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <NewsCard article={a} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      )}
    </>
  );
}

export default function ArticlePage({ params }: PageProps<"/news/[slug]">) {
  return (
    <Suspense
      fallback={
        <Container className="max-w-3xl space-y-4 pt-36 pb-24">
          <Skeleton className="h-12 w-full rounded-xl" />
          <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
        </Container>
      }
    >
      <Article params={params} />
    </Suspense>
  );
}
