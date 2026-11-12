import { Suspense } from "react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Logo } from "@/components/site/logo";

/** Static placeholder while the navbar (which reads the URL) streams in. */
function NavbarFallback() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-transparent bg-paper/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-5 md:h-18 md:px-8">
        <Logo />
      </div>
    </header>
  );
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
