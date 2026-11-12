import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container, SampleTag } from "@/components/site/primitives";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductDetail } from "@/components/store/product-detail";
import { ProductCard } from "@/components/store/product-card";
import { getProduct, products } from "@/data/store";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

async function ProductPageContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== slug)
    .sort((a, b) => Number(b.category === product.category) - Number(a.category === product.category))
    .slice(0, 4);

  return (
    <>
      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <Container>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Link href="/store" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-ink hover:text-ink">
              <ArrowLeft aria-hidden strokeWidth={1.5} className="size-4" /> All products
            </Link>
            <SampleTag />
          </div>
          <ProductDetail product={product} />
        </Container>
      </section>
      <section className="border-t border-line bg-sand/40 py-16 md:py-20">
        <Container>
          <h2 className="mb-8 text-2xl font-bold md:text-3xl">You might also like</h2>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}

export default function ProductPage({ params }: PageProps<"/store/[slug]">) {
  return (
    <Suspense
      fallback={
        <Container className="grid gap-8 pt-36 pb-24 md:grid-cols-2">
          <Skeleton className="aspect-square rounded-3xl" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-3/4 rounded-xl" />
            <Skeleton className="h-8 w-1/3 rounded-xl" />
            <Skeleton className="h-24 w-full rounded-xl" />
          </div>
        </Container>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}
