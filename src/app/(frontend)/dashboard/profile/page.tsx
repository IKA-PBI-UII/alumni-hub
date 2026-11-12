"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DashTitle, Panel } from "@/components/dashboard/ui";
import { demoActions, useProfile, type Profile } from "@/lib/demo-store";
import { useHydrated } from "@/lib/local-store";
import { initials } from "@/lib/format";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  nickname: z.string(),
  graduationYear: z
    .string()
    .regex(/^\d{4}$/, "Use a 4-digit year")
    .refine((y) => Number(y) >= 1990 && Number(y) <= 2026, "Between 1990 and 2026"),
  currentJob: z.string(),
  company: z.string(),
  city: z.string(),
  bio: z.string().max(280, "Keep it under 280 characters"),
  skills: z.array(z.string()),
  linkedin: z.union([z.literal(""), z.string().url("Enter a full URL, starting with https://")]),
  showInDirectory: z.boolean(),
  showEmail: z.boolean(),
  openToMentor: z.boolean(),
  openToBeMentored: z.boolean(),
  openToHire: z.boolean(),
});

const toggles: { name: keyof Profile; label: string; hint: string }[] = [
  { name: "showInDirectory", label: "Show me in the alumni directory", hint: "Classmates can find you by year, city and field." },
  { name: "showEmail", label: "Show my email", hint: "Visible to logged-in alumni only." },
  { name: "openToMentor", label: "Open to mentor", hint: "Fresh graduates can request you." },
  { name: "openToBeMentored", label: "Open to be mentored", hint: "We'll suggest mentors for you." },
  { name: "openToHire", label: "Open to hire", hint: "Recruiters in the network can contact you." },
];

function SkillsInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [draft, setDraft] = useState("");
  function add() {
    const s = draft.trim().replace(/,$/, "");
    if (s && !value.includes(s)) onChange([...value, s]);
    setDraft("");
  }
  return (
    <div className="flex min-h-10 flex-wrap items-center gap-1.5 rounded-xl border border-input bg-field px-2 py-1.5 focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
      {value.map((s) => (
        <span key={s} className="inline-flex items-center gap-1 rounded-full bg-sand py-0.5 pr-1 pl-2.5 text-sm">
          {s}
          <button
            type="button"
            aria-label={`Remove ${s}`}
            onClick={() => onChange(value.filter((x) => x !== s))}
            className="rounded-full p-0.5 hover:bg-line"
          >
            <X strokeWidth={2} className="size-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            add();
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={add}
        placeholder={value.length ? "Add more…" : "Type a skill and press Enter"}
        aria-label="Add a skill"
        className="min-w-32 flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  );
}

function ProfileForm({ initial }: { initial: Profile }) {
  const form = useForm<Profile>({ resolver: zodResolver(schema), defaultValues: initial });
  const name = useWatch({ control: form.control, name: "fullName" });

  function onSubmit(v: Profile) {
    demoActions.saveProfile(v);
    form.reset(v);
    toast.success("Profile saved");
  }

  const text = (n: keyof Profile, label: string, placeholder?: string, type = "text") => (
    <FormField
      control={form.control}
      name={n}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} value={field.value as string} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 lg:grid-cols-3" noValidate>
        <div className="space-y-5 lg:col-span-2">
          <Panel title="About you">
            <div className="mb-6 flex items-center gap-4">
              <Avatar className="size-20">
                <AvatarFallback className="bg-terra font-display text-2xl font-bold text-on-accent">
                  {initials(name || "?")}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button type="button" variant="outline" size="sm" onClick={() => toast("Coming soon: photo upload")}>
                  <Camera strokeWidth={1.5} /> Upload photo
                </Button>
                <p className="mt-1.5 text-xs text-muted-ink">JPG or PNG, up to 2 MB.</p>
              </div>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              {text("fullName", "Full name")}
              {text("nickname", "Nickname")}
              {text("graduationYear", "Graduation year", "2021", "text")}
              {text("city", "City", "Yogyakarta")}
              {text("currentJob", "Current job", "English Teacher")}
              {text("company", "Company")}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Short bio</FormLabel>
                    <FormControl>
                      <Textarea rows={3} placeholder="A sentence or two about what you do and what you can help with." {...field} />
                    </FormControl>
                    <FormDescription>{field.value.length}/280</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="skills"
                render={({ field }) => (
                  <FormItem className="sm:col-span-2">
                    <FormLabel>Skills</FormLabel>
                    <SkillsInput value={field.value} onChange={field.onChange} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="sm:col-span-2">{text("linkedin", "LinkedIn URL", "https://linkedin.com/in/…", "url")}</div>
            </div>
          </Panel>
        </div>

        <div className="space-y-5">
          <Panel title="Privacy & availability">
            <div className="divide-y divide-line">
              {toggles.map((t) => (
                <FormField
                  key={t.name}
                  control={form.control}
                  name={t.name}
                  render={({ field }) => (
                    <FormItem className="flex items-start justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                      <div className="space-y-0.5">
                        <FormLabel className="leading-snug">{t.label}</FormLabel>
                        <FormDescription className="text-xs">{t.hint}</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value as boolean} onCheckedChange={field.onChange} className="data-[state=checked]:bg-success" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </Panel>
          <div className="lg:sticky lg:top-24">
            <Button type="submit" size="lg" variant="terra" className="w-full">
              Save changes
            </Button>
            <p className="mt-2 text-center text-xs text-muted-ink">
              {form.formState.isDirty ? "You have unsaved changes." : "Saved in this browser only (prototype)."}
            </p>
          </div>
        </div>
      </form>
    </Form>
  );
}

export default function ProfilePage() {
  const profile = useProfile();
  const hydrated = useHydrated();
  return (
    <>
      <DashTitle title="My profile" intro="How other alumni see you in the directory." />
      {/* Mount after hydration so the form starts from the saved profile. */}
      {hydrated && <ProfileForm initial={profile} />}
    </>
  );
}
