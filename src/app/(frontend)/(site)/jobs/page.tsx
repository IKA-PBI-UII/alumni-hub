import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader, SampleTag, Section } from "@/components/site/primitives";
import { JobsBrowser } from "@/components/site/jobs-browser";

export const metadata: Metadata = { title: "Jobs" };

export default function JobsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Job board"
        title="Jobs shared by alumni and partners."
        intro="Teaching, corporate, media, tech and more. Alumni can post openings from their dashboard."
        image={{ src: "/images/jobs-laptop.jpg", alt: "Young professional searching for jobs on a laptop" }}
      >
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Button asChild variant="terra">
            <Link href="/dashboard/jobs">
              <Plus strokeWidth={2} /> Post a job
            </Link>
          </Button>
          <SampleTag />
        </div>
      </PageHeader>
      <Section className="pt-10 md:pt-14">
        <JobsBrowser />
      </Section>
    </>
  );
}
