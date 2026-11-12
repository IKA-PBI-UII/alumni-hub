import Image from "next/image";
import { cn } from "@/lib/utils";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 md:px-8", className)}>{children}</div>;
}

export function Section({
  className,
  children,
  id,
  tone = "paper",
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  tone?: "paper" | "sand" | "ink";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        tone === "sand" && "bg-sand",
        tone === "ink" && "bg-night text-on-night",
        className,
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-terra", className)}>
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </p>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  intro,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-10 max-w-2xl md:mb-14", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow className={align === "center" ? "justify-center" : undefined}>{eyebrow}</Eyebrow>}
      <h2 className="text-3xl font-bold text-balance md:text-5xl">{title}</h2>
      {intro && <p className="mt-4 text-base text-pretty text-muted-ink md:text-lg">{intro}</p>}
    </div>
  );
}

/** Header for inner pages. Optional photo on the right. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  image?: { src: string; alt: string };
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-line pt-28 pb-12 md:pt-36 md:pb-16">
      <Container className={cn("grid items-end gap-10", image && "md:grid-cols-12")}>
        <div className={cn(image && "md:col-span-7")}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="text-4xl font-extrabold text-balance md:text-6xl">{title}</h1>
          {intro && <p className="mt-5 max-w-xl text-base text-pretty text-muted-ink md:text-lg">{intro}</p>}
          {children}
        </div>
        {image && (
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl md:col-span-5">
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
          </div>
        )}
      </Container>
    </header>
  );
}

export function SampleTag({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tone === "light" ? "border-line bg-sand/60 text-muted-ink" : "border-white/20 bg-white/5 text-paper/70",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-terra" />
      Prototype · sample data
    </span>
  );
}

export function LetterBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink font-display text-lg font-bold text-paper",
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  );
}
