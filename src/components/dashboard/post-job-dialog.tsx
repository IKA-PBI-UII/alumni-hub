"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { JOB_FIELDS, JOB_TYPES } from "@/data/jobs";
import { demoActions } from "@/lib/demo-store";

const schema = z.object({
  title: z.string().min(3, "Add a job title"),
  company: z.string().min(2, "Add the company name"),
  location: z.string().min(2, "Add a location, or 'Remote'"),
  type: z.enum(JOB_TYPES, { message: "Choose a type" }),
  field: z.enum(JOB_FIELDS, { message: "Choose a field" }),
  description: z.string().min(30, "Write at least a couple of sentences (30+ characters)"),
  requirements: z.string().min(3, "Add at least one requirement"),
  apply: z.string().min(3, "Add an email address or link"),
  deadline: z.string(),
});

type Values = z.infer<typeof schema>;

export function PostJobDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      type: undefined,
      field: undefined,
      description: "",
      requirements: "",
      apply: "",
      deadline: "",
    },
  });

  function onSubmit(v: Values) {
    const apply = v.apply.trim();
    demoActions.postJob({
      title: v.title.trim(),
      company: v.company.trim(),
      location: v.location.trim(),
      type: v.type,
      field: v.field,
      description: v.description.trim(),
      requirements: v.requirements
        .split("\n")
        .map((r) => r.replace(/^[-•*]\s*/, "").trim())
        .filter(Boolean),
      apply: apply.includes("@") && !apply.startsWith("http") ? { kind: "email", value: apply } : { kind: "link", value: apply },
      deadline: v.deadline || undefined,
    });
    toast.success("Job posted", { description: "It's live on the job board." });
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90svh] overflow-y-auto rounded-2xl sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Post a job</DialogTitle>
          <DialogDescription>Share an opening with PBI UII alumni. It appears on the public job board right away.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2" noValidate>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Job title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. English Teacher" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Company or school" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Yogyakarta, Jakarta, Remote…" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JOB_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="field"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Field</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose field" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {JOB_FIELDS.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="What will this person do? Who is the team?" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="requirements"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Requirements</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder={"One per line\nS.Pd. in English Education\nIELTS 6.5 or similar"} {...field} />
                  </FormControl>
                  <FormDescription>One requirement per line.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apply"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How to apply</FormLabel>
                  <FormControl>
                    <Input placeholder="Email or link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deadline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Deadline (optional)</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="gap-2 sm:col-span-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="terra">
                Post a job
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
