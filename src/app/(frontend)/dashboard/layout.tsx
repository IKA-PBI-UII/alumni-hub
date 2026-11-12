"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarNav } from "@/components/dashboard/sidebar";
import { SampleTag } from "@/components/site/primitives";
import { AppearanceControls } from "@/components/appearance-controls";
import { useAuth } from "@/lib/auth";
import { initials } from "@/lib/format";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (ready && !user) router.replace("/login");
  }, [ready, user, router]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-svh">
        <div className="hidden w-64 border-r border-line p-5 lg:block">
          <Skeleton className="h-8 w-36 rounded-xl" />
          <div className="mt-8 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="flex-1 space-y-4 p-6 md:p-10">
          <Skeleton className="h-10 w-72 rounded-xl" />
          <Skeleton className="h-40 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          {/* Still rendered (hidden) so Next can validate the segment; shown once auth is known. */}
          <div hidden>{children}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh bg-canvas">
      <aside className="sticky top-0 hidden h-svh w-64 shrink-0 border-r border-line bg-paper lg:block">
        <SidebarNav />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-line bg-paper/90 px-5 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open dashboard menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 bg-paper p-0">
                <SheetTitle className="sr-only">Dashboard menu</SheetTitle>
                <SidebarNav onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <SampleTag />
          </div>
          <div className="flex items-center gap-3">
            <AppearanceControls />
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-muted-ink">Class of {user.classOf}</p>
            </div>
            <Avatar className="size-9">
              <AvatarFallback className="bg-terra text-sm font-semibold text-on-accent">{initials(user.name)}</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main id="main" className="mx-auto w-full max-w-6xl flex-1 px-5 py-8 md:px-8 md:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
