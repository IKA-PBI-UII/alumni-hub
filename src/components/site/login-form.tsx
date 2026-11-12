"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAuth } from "@/lib/auth";
import { demoUser } from "@/data/alumni";

const schema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Enter any password"),
  remember: z.boolean(),
});

type Values = z.infer<typeof schema>;

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "", remember: true },
  });

  function enter(email?: string) {
    login(email);
    toast.success(`Welcome back, ${demoUser.nickname}`);
    router.push("/dashboard");
  }

  const comingSoon = () => toast("Coming soon");

  return (
    <div className="w-full max-w-sm">
      <h1 className="text-3xl font-extrabold md:text-4xl">Alumni login</h1>
      <p className="mt-2 text-muted-ink">Welcome back. Your network is waiting.</p>

      <p className="mt-6 flex items-start gap-2 rounded-xl border border-terra/30 bg-terra/5 px-4 py-3 text-sm text-ink">
        <Info aria-hidden strokeWidth={1.5} className="mt-0.5 size-4 shrink-0 text-terra" />
        Prototype: any email and password works.
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((v) => enter(v.email))} className="mt-6 space-y-5" noValidate>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <button type="button" onClick={comingSoon} className="text-sm font-medium text-terra hover:underline">
                    Forgot password?
                  </button>
                </div>
                <FormControl>
                  <Input type="password" autoComplete="current-password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2.5">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={(v) => field.onChange(v === true)} />
                </FormControl>
                <FormLabel className="font-normal">Remember me</FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" size="lg" className="w-full">
            Log in
          </Button>
        </form>
      </Form>

      <div className="my-6 flex items-center gap-3 text-xs text-muted-ink">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>

      <Button size="lg" variant="terra" className="w-full" onClick={() => enter()}>
        Continue as demo alumni
      </Button>

      <p className="mt-6 text-center text-sm text-muted-ink">
        New here?{" "}
        <button type="button" onClick={comingSoon} className="font-semibold text-ink underline-offset-4 hover:underline">
          Create account
        </button>
      </p>
    </div>
  );
}
