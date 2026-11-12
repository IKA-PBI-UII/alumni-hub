import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/site/login-form";

export const metadata: Metadata = { title: "Alumni login" };

export default function LoginPage() {
  return (
    <div className="grid min-h-svh pt-16 md:pt-18 lg:grid-cols-2">
      <div className="relative isolate hidden overflow-hidden bg-night p-12 text-on-night lg:flex lg:flex-col lg:justify-end">
        <Image
          src="/images/grads-group.jpg"
          alt="Group of graduates celebrating together"
          fill
          priority
          sizes="50vw"
          className="-z-20 object-cover opacity-50"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/60 to-transparent" />
        <p className="max-w-md font-display text-4xl leading-tight font-extrabold text-balance">
          Nobody walks alone after graduation.
        </p>
        <p className="mt-4 max-w-sm text-on-night/70">
          Mentors, jobs and classmates from PBI UII, in one place.
        </p>
      </div>
      <div className="flex items-center justify-center px-5 py-14 md:px-8">
        <LoginForm />
      </div>
    </div>
  );
}
