import { cn } from "@/lib/utils";

export function DashTitle({
  title,
  intro,
  action,
}: {
  title: string;
  intro?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
        {intro && <p className="mt-1.5 text-muted-ink">{intro}</p>}
      </div>
      {action}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("surface rounded-2xl border border-line bg-card p-5 md:p-6", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between gap-3">
          {title && <h2 className="text-lg font-bold">{title}</h2>}
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function EmptyState({ title, line, action }: { title: string; line?: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line px-6 py-12 text-center">
      <p className="font-display text-lg font-bold">{title}</p>
      {line && <p className="mt-1 text-sm text-muted-ink">{line}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
