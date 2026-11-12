import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/data/news";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Open layout (image + text) by default. In neobrutalism it becomes a white
 * outlined card via the `.news-card*` hooks in globals.css.
 */
export function NewsCard({ article, className }: { article: Article; className?: string }) {
  return (
    <Link href={`/news/${article.slug}`} className={cn("news-card group flex h-full flex-col", className)}>
      <div className="news-card-media relative aspect-[16/10] overflow-hidden rounded-2xl bg-sand">
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:group-hover:scale-100"
        />
      </div>
      <div className="news-card-body flex flex-1 flex-col">
        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-ink">
          <span className="text-terra">{article.category}</span>
          <span aria-hidden>·</span>
          <time dateTime={article.date}>{formatDate(article.date)}</time>
        </div>
        <h3 className="mt-2 text-xl leading-snug font-bold text-balance group-hover:text-terra">{article.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-ink">{article.excerpt}</p>
      </div>
    </Link>
  );
}
