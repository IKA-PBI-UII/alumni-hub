import { Suspense } from "react";
import { Container } from "@/components/site/primitives";
import { JobDetail } from "@/components/site/job-detail";
import { Skeleton } from "@/components/ui/skeleton";
import { jobs } from "@/data/jobs";

export function generateStaticParams() {
  return jobs.map((j) => ({ id: j.id }));
}

function DetailSkeleton() {
  return (
    <Container className="space-y-4 pt-36 pb-24">
      <Skeleton className="h-10 w-2/3 rounded-xl" />
      <Skeleton className="h-5 w-1/3 rounded-xl" />
      <Skeleton className="h-64 w-full rounded-2xl" />
    </Container>
  );
}

async function JobDetailLoader({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Client component: also finds jobs posted in this browser from the dashboard.
  return <JobDetail id={id} />;
}

export default function JobPage({ params }: PageProps<"/jobs/[id]">) {
  return (
    <Suspense fallback={<DetailSkeleton />}>
      <JobDetailLoader params={params} />
    </Suspense>
  );
}
