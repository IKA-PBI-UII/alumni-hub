"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BriefcaseBusiness, CalendarDays, LayoutDashboard, LogOut, MessagesSquare, UserRound } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/site/logo";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const dashboardLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/profile", label: "My Profile", icon: UserRound },
  { href: "/dashboard/jobs", label: "Jobs", icon: BriefcaseBusiness },
  { href: "/dashboard/mentoring", label: "Mentoring", icon: MessagesSquare },
  { href: "/dashboard/events", label: "Events", icon: CalendarDays },
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-5">
        <Logo />
      </div>
      <nav aria-label="Dashboard" className="flex-1 px-3">
        <ul className="space-y-1">
          {dashboardLinks.map(({ href, label, icon: Icon }) => {
            const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-ink text-paper" : "text-muted-ink hover:bg-sand hover:text-ink",
                  )}
                >
                  <Icon aria-hidden strokeWidth={1.5} className="size-[18px]" />
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-line p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="block rounded-xl px-3 py-2 text-sm text-muted-ink hover:bg-sand hover:text-ink"
        >
          ← Back to site
        </Link>
        <button
          type="button"
          onClick={() => {
            logout();
            toast("Logged out");
            router.replace("/");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-ink hover:bg-sand hover:text-ink"
        >
          <LogOut aria-hidden strokeWidth={1.5} className="size-[18px]" /> Log out
        </button>
      </div>
    </div>
  );
}
