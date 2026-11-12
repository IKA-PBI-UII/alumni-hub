"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { LayoutDashboard, LogOut, Menu } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { AppearanceControls } from "@/components/appearance-controls";
import { BagButton } from "@/components/store/bag-button";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

export const navLinks = [
  { href: "/programs", label: "Programs" },
  { href: "/jobs", label: "Jobs" },
  { href: "/news", label: "News" },
  { href: "/events", label: "Events" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, ready, logout } = useAuth();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Home and login start on a dark panel: keep the bar light-on-dark until scrolled.
  const overDark = pathname === "/" && !scrolled;
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  function handleLogout() {
    logout();
    toast("Logged out");
    router.push("/");
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-b border-line bg-paper/95 backdrop-blur-md"
          : overDark
            ? "border-b border-transparent bg-night/20 backdrop-blur-sm"
            : "border-b border-transparent bg-paper/70 backdrop-blur-md",
      )}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-18 md:px-8">
        <Logo tone={overDark ? "light" : "dark"} />

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm font-medium transition-colors",
                  overDark ? "text-on-night/80 hover:text-on-night" : "text-muted-ink hover:text-ink",
                  isActive(l.href) && (overDark ? "text-on-night" : "bg-sand text-ink"),
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <AppearanceControls onDark={overDark} className="hidden sm:flex" />
          <BagButton onDark={overDark} />
          {ready && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                className="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra"
                aria-label="Account menu"
              >
                <Avatar className="size-9 ring-2 ring-terra/40">
                  <AvatarFallback className="bg-terra text-sm font-semibold text-on-accent">{initials(user.name)}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl">
                <DropdownMenuLabel>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs font-normal text-muted-ink">Class of {user.classOf}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard /> Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={handleLogout}>
                  <LogOut /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm" variant={overDark ? "light" : "default"} className="hidden sm:inline-flex">
              <Link href="/login">Alumni Login</Link>
            </Button>
          )}

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("md:hidden", overDark && "text-on-night hover:bg-on-night/10 hover:text-on-night")}
                aria-label="Open menu"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-sm bg-paper">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Logo />
              </SheetHeader>
              <ul className="flex flex-col gap-1 px-4">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive(l.href) ? "page" : undefined}
                      className={cn(
                        "block rounded-xl px-4 py-3 font-display text-xl font-semibold",
                        isActive(l.href) ? "bg-sand text-ink" : "text-ink/80",
                      )}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-3 p-4">
                <div className="flex items-center justify-between rounded-xl border border-line px-3 py-1.5">
                  <span className="text-sm text-muted-ink">Appearance</span>
                  <AppearanceControls />
                </div>
                {ready && user ? (
                  <Button asChild className="w-full" size="lg">
                    <Link href="/dashboard" onClick={() => setOpen(false)}>
                      Go to dashboard
                    </Link>
                  </Button>
                ) : (
                  <Button asChild className="w-full" size="lg" variant="terra">
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Alumni Login
                    </Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
