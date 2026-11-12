"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Bookmark, CalendarDays, Check, Mail, MapPin, Share2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Container, LetterBadge, SampleTag } from "@/components/site/primitives";
import { AlumniBadge, TypeBadge } from "@/components/site/job-card";
import { demoActions, useJob, useSavedJobs } from "@/lib/demo-store";
import { formatDate, initials } from "@/lib/format";

export function JobDetail({ id }: { id: string }) {
  const job = useJob(id);
  const saved = useSavedJobs().includes(id);

  if (!job) {
    return (
      <Container className="pt-36 pb-24 text-center">
        <h1 className="text-3xl font-bold">Job not found</h1>
        <p className="mt-2 text-muted-ink">It may have been closed or removed.</p>
        <Button asChild className="mt-6">
          <Link href="/jobs">Back to jobs</Link>
        </Button>
      </Container>
    );
  }

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: job!.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      toast.success("Link copied");
    } catch {
      /* share sheet dismissed */
    }
  }

  return (
    <>
      <div className="relative h-56 overflow-hidden bg-night md:h-72">
        <Image
          src="/images/office-desk.jpg"
          alt="Young woman at an office desk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_15%] opacity-60"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-night/30" />
      </div>

      <Container className="relative -mt-24 pb-24">
        <Link href="/jobs" className="mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-muted-ink hover:text-ink">
          <ArrowLeft aria-hidden strokeWidth={1.5} className="size-4" /> All jobs
        </Link>

        <div className="grid gap-8 lg:grid-cols-12">
          <article className="surface rounded-2xl border border-line bg-card p-6 md:p-10 lg:col-span-8">
            <div className="flex items-start gap-4">
              <LetterBadge name={job.company} className="size-14 text-xl" />
              <div>
                <h1 className="text-3xl font-extrabold text-balance md:text-4xl">{job.title}</h1>
                <p className="mt-1 text-lg text-muted-ink">{job.company}</p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-ink">
              <span className="inline-flex items-center gap-1.5">
                <MapPin aria-hidden strokeWidth={1.5} className="size-4" /> {job.location}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays aria-hidden strokeWidth={1.5} className="size-4" /> Posted {formatDate(job.postedAt)}
              </span>
              {job.deadline && <span>Apply by {formatDate(job.deadline)}</span>}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <TypeBadge type={job.type} />
              <TypeBadge type={job.field} className="bg-sand" />
              {job.postedBy && <AlumniBadge />}
              {job.status === "Closed" && <TypeBadge type="Closed" className="border-destructive/30 text-destructive" />}
            </div>

            <h2 className="mt-10 text-xl font-bold">About the role</h2>
            <p className="mt-3 leading-relaxed text-ink/85">{job.description}</p>

            <h2 className="mt-8 text-xl font-bold">Requirements</h2>
            <ul className="mt-3 space-y-2.5">
              {job.requirements.map((r) => (
                <li key={r} className="flex items-start gap-2.5">
                  <Check aria-hidden strokeWidth={2} className="mt-1 size-4 shrink-0 text-terra" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-xl font-bold">How to apply</h2>
            <p className="mt-3 text-ink/85">
              {job.apply.kind === "email" ? (
                <>
                  Send your CV and a short cover letter to{" "}
                  <span className="inline-flex items-center gap-1 font-medium">
                    <Mail aria-hidden strokeWidth={1.5} className="size-4" />
                    {job.apply.value}
                  </span>
                  .
                </>
              ) : (
                <>
                  Apply on the employer&apos;s site:{" "}
                  <span className="inline-flex items-center gap-1 font-medium break-all">
                    <ExternalLink aria-hidden strokeWidth={1.5} className="size-4 shrink-0" />
                    {job.apply.value}
                  </span>
                </>
              )}
            </p>
            <p className="mt-2 text-xs text-muted-ink">Sample listing: contact details are placeholders.</p>
          </article>

          <aside className="space-y-4 lg:col-span-4">
            <div className="surface rounded-2xl border border-line bg-card p-6 lg:sticky lg:top-24">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" variant="terra" className="w-full" disabled={job.status === "Closed"}>
                    Apply
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-display text-xl">Apply for {job.title}</DialogTitle>
                    <DialogDescription>
                      We&apos;ll send your IKA PBI UII profile and CV to {job.company}. In this prototype nothing is
                      actually sent.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button onClick={() => toast("Prototype: application not sent")}>Send application</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  aria-pressed={saved}
                  onClick={() => toast(demoActions.toggleSaved(job.id) ? "Job saved" : "Removed from saved")}
                >
                  <Bookmark strokeWidth={1.5} className={saved ? "fill-terra text-terra" : undefined} />
                  {saved ? "Saved" : "Save"}
                </Button>
                <Button variant="outline" onClick={share}>
                  <Share2 strokeWidth={1.5} /> Share
                </Button>
              </div>
            </div>

            {job.postedBy && (
              <div className="surface rounded-2xl border border-line bg-sand/60 p-6">
                <p className="text-xs font-semibold tracking-wider text-muted-ink uppercase">Posted by</p>
                <div className="mt-3 flex items-center gap-3">
                  <Avatar className="size-11">
                    <AvatarFallback className="bg-ink font-semibold text-paper">{initials(job.postedBy.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{job.postedBy.name}</p>
                    <p className="text-sm text-muted-ink">PBI UII, class of {job.postedBy.classOf}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-ink">Questions about the role? Ask the poster through the alumni hub.</p>
              </div>
            )}
            <SampleTag />
          </aside>
        </div>
      </Container>
    </>
  );
}
