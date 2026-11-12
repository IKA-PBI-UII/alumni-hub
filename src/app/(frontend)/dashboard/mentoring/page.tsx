"use client";

import { useState } from "react";
import { Check, Clock, MapPin, Video } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashTitle, Panel } from "@/components/dashboard/ui";
import { mentors } from "@/data/alumni";
import { demoActions, useMentorRequests } from "@/lib/demo-store";
import { formatLongDate, initials } from "@/lib/format";
import { cn } from "@/lib/utils";

const focusAreas = ["Teaching careers", "Careers outside teaching", "IELTS & study abroad", "Freelancing", "CV & interviews", "Wellbeing"];

const sessions = [
  { with: "Intan Permatasari", role: "Mentee", topic: "First job applications", date: "2026-11-12", time: "19:30", online: true, status: "Upcoming" },
  { with: "Arif Setiawan", role: "Mentee", topic: "Classroom management", date: "2026-11-19", time: "16:00", online: false, status: "Upcoming" },
  { with: "Intan Permatasari", role: "Mentee", topic: "Kick-off: goals for 3 months", date: "2026-10-29", time: "19:30", online: true, status: "Done" },
];

export default function MentoringPage() {
  const requests = useMentorRequests();
  const [query, setQuery] = useState("");
  const [areas, setAreas] = useState<string[]>(["Teaching careers", "IELTS & study abroad"]);

  const list = mentors.filter((m) =>
    `${m.name} ${m.mentorField} ${m.skills.join(" ")} ${m.jobTitle}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <>
      <DashTitle title="Mentoring" intro="Find a mentor a few steps ahead, or help someone who is just starting." />

      <Tabs defaultValue="find" className="gap-6">
        <TabsList className="h-11 w-full max-w-full justify-start overflow-x-auto rounded-full bg-sand p-1 sm:w-fit">
          <TabsTrigger value="find" className="rounded-full px-5">
            Find a mentor
          </TabsTrigger>
          <TabsTrigger value="become" className="rounded-full px-5">
            Become a mentor
          </TabsTrigger>
          <TabsTrigger value="sessions" className="rounded-full px-5">
            My sessions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="find">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by field or skill, e.g. IELTS"
            aria-label="Search mentors"
            className="mb-5 max-w-md"
          />
          <ul className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {list.map((m) => {
              const requested = requests.includes(m.id);
              return (
                <li key={m.id} className="surface flex flex-col rounded-2xl border border-line bg-card p-5">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarFallback className="bg-ink font-semibold text-paper">{initials(m.name)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="font-bold">{m.name}</p>
                      <p className="truncate text-sm text-muted-ink">
                        {m.jobTitle} · Class of {m.classOf}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-terra">{m.mentorField}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.skills.map((s) => (
                      <Badge key={s} variant="outline" className="rounded-full border-line bg-paper">
                        {s}
                      </Badge>
                    ))}
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-ink">
                    <Clock aria-hidden strokeWidth={1.5} className="size-4" /> {m.availability}
                  </p>
                  <Button
                    className={cn("mt-5", requested && "border-success/40 text-success hover:text-success")}
                    variant={requested ? "outline" : "default"}
                    disabled={requested}
                    onClick={() => {
                      demoActions.requestMentor(m.id);
                      toast.success("Request sent", { description: `${m.name} will get back to you. (Prototype: not sent)` });
                    }}
                  >
                    {requested ? (
                      <>
                        <Check strokeWidth={2} /> Requested
                      </>
                    ) : (
                      "Request a mentor"
                    )}
                  </Button>
                </li>
              );
            })}
          </ul>
          {list.length === 0 && <p className="py-10 text-center text-muted-ink">No mentors match “{query}”.</p>}
        </TabsContent>

        <TabsContent value="become">
          <Panel className="max-w-2xl">
            <div className="mb-6 flex items-center gap-2 rounded-xl bg-success/10 px-4 py-3 text-sm text-success">
              <Check aria-hidden strokeWidth={2} className="size-4" /> You&apos;re already a mentor. Update your preferences below.
            </div>
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Mentor preferences saved");
              }}
            >
              <fieldset>
                <legend className="text-sm font-medium">Focus areas</legend>
                <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
                  {focusAreas.map((a) => (
                    <label key={a} className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-line px-3 py-2.5 text-sm has-[:checked]:border-terra/50 has-[:checked]:bg-terra/5">
                      <Checkbox
                        checked={areas.includes(a)}
                        onCheckedChange={(v) => setAreas((prev) => (v ? [...prev, a] : prev.filter((x) => x !== a)))}
                      />
                      {a}
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours per month</Label>
                  <Input id="hours" type="number" min={1} max={20} defaultValue={2} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages</Label>
                  <Input id="languages" defaultValue="English, Indonesian, Javanese" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">A note for mentees</Label>
                <Textarea id="note" rows={3} placeholder="What can you help with? What should mentees prepare?" />
              </div>
              <Button type="submit" variant="terra">
                Save preferences
              </Button>
            </form>
          </Panel>
        </TabsContent>

        <TabsContent value="sessions">
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li key={s.topic} className="surface flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-card p-5">
                <Avatar className="size-11">
                  <AvatarFallback className="bg-sand font-semibold">{initials(s.with)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{s.topic}</p>
                  <p className="text-sm text-muted-ink">
                    with {s.with} ({s.role.toLowerCase()}) · {formatLongDate(s.date)}, {s.time} WIB
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm text-muted-ink">
                  {s.online ? <Video aria-hidden strokeWidth={1.5} className="size-4" /> : <MapPin aria-hidden strokeWidth={1.5} className="size-4" />}
                  {s.online ? "Online" : "Yogyakarta"}
                </span>
                <Badge className={cn("rounded-full", s.status === "Upcoming" ? "bg-terra/10 text-terra" : "bg-sand text-muted-ink")}>
                  {s.status}
                </Badge>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-ink">Sample sessions.</p>
        </TabsContent>
      </Tabs>
    </>
  );
}
