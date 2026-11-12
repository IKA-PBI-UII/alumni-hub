import { cn } from "@/lib/utils";

/** Bento Grid (Aceternity-style). */
export function BentoGrid({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("mx-auto grid grid-cols-1 gap-4 md:auto-rows-[minmax(20rem,auto)] md:grid-cols-3", className)}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  header,
  icon,
  title,
  description,
  children,
  id,
}: {
  className?: string;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "surface surface-hover group/bento row-span-1 flex scroll-mt-28 flex-col justify-between gap-5 overflow-hidden rounded-2xl border border-line bg-card p-5 transition duration-300 hover:border-terra/40",
        className,
      )}
    >
      {header}
      <div className="transition duration-300 group-hover/bento:translate-x-1 motion-reduce:group-hover/bento:translate-x-0">
        {icon}
        <div className="mt-3 text-2xl font-bold">{title}</div>
        {description && <div className="mt-1 text-muted-ink">{description}</div>}
        {children}
      </div>
    </div>
  );
}
