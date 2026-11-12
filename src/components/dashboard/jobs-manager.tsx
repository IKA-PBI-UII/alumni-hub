"use client";

import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Bookmark, ExternalLink, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DashTitle, EmptyState } from "@/components/dashboard/ui";
import { PostJobDialog } from "@/components/dashboard/post-job-dialog";
import { JobCard } from "@/components/site/job-card";
import { demoActions, useMyJobs, useSavedJobs } from "@/lib/demo-store";
import { jobs as seedJobs } from "@/data/jobs";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function JobsManager() {
  const params = useSearchParams();
  const [open, setOpen] = useState(() => params.get("new") === "1");
  const myJobs = useMyJobs();
  const savedIds = useSavedJobs();
  const saved = [...myJobs, ...seedJobs].filter((j) => savedIds.includes(j.id));

  return (
    <>
      <DashTitle
        title="Jobs"
        intro="Post openings for fellow alumni and keep track of jobs you saved."
        action={
          <Button variant="terra" onClick={() => setOpen(true)}>
            <Plus strokeWidth={2} /> Post a job
          </Button>
        }
      />
      <PostJobDialog open={open} onOpenChange={setOpen} />

      <Tabs defaultValue="mine" className="gap-6">
        <TabsList className="h-11 rounded-full bg-sand p-1">
          <TabsTrigger value="mine" className="rounded-full px-5">
            My posts ({myJobs.length})
          </TabsTrigger>
          <TabsTrigger value="saved" className="rounded-full px-5">
            Saved ({saved.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mine">
          {myJobs.length === 0 ? (
            <EmptyState
              title="You haven't posted any jobs yet."
              line="Know an opening? Share it with alumni in two minutes."
              action={
                <Button onClick={() => setOpen(true)}>
                  <Plus strokeWidth={2} /> Post a job
                </Button>
              }
            />
          ) : (
            <div className="surface overflow-hidden rounded-2xl border border-line bg-card">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="pl-5">Job</TableHead>
                    <TableHead className="hidden md:table-cell">Posted</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-5 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myJobs.map((j) => (
                    <TableRow key={j.id}>
                      <TableCell className="pl-5">
                        <Link href={`/jobs/${j.id}`} className="font-semibold hover:text-terra">
                          {j.title}
                        </Link>
                        <p className="text-sm text-muted-ink">
                          {j.company} · {j.type}
                        </p>
                      </TableCell>
                      <TableCell className="hidden text-muted-ink md:table-cell">{formatDate(j.postedAt)}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "rounded-full",
                            j.status === "Active" ? "bg-success/10 text-success" : "bg-sand text-muted-ink",
                          )}
                        >
                          {j.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="pr-5 text-right">
                        <div className="flex justify-end gap-1">
                          <Button asChild variant="ghost" size="icon-sm" aria-label={`View ${j.title}`}>
                            <Link href={`/jobs/${j.id}`}>
                              <ExternalLink strokeWidth={1.5} />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const next = j.status === "Active" ? "Closed" : "Active";
                              demoActions.setJobStatus(j.id, next);
                              toast(next === "Closed" ? "Job closed" : "Job reopened");
                            }}
                          >
                            {j.status === "Active" ? "Close" : "Reopen"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label={`Delete ${j.title}`}
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              demoActions.deleteJob(j.id);
                              toast("Job deleted");
                            }}
                          >
                            <Trash2 strokeWidth={1.5} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="saved">
          {saved.length === 0 ? (
            <EmptyState
              title="No saved jobs."
              line="Tap Save on any job to keep it here."
              action={
                <Button asChild variant="outline">
                  <Link href="/jobs">
                    <Bookmark strokeWidth={1.5} /> Browse jobs
                  </Link>
                </Button>
              }
            />
          ) : (
            <ul className="grid gap-4 lg:grid-cols-2">
              {saved.map((j) => (
                <li key={j.id}>
                  <JobCard job={j} />
                </li>
              ))}
            </ul>
          )}
        </TabsContent>
      </Tabs>
    </>
  );
}
