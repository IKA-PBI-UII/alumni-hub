import Link from "next/link";
import { Logo } from "@/components/site/logo";
import { Container, SampleTag } from "@/components/site/primitives";

const groups = [
  {
    title: "Explore",
    links: [
      { href: "/programs", label: "Programs" },
      { href: "/jobs", label: "Jobs" },
      { href: "/news", label: "News" },
      { href: "/events", label: "Events" },
      { href: "/store", label: "Store" },
    ],
  },
  {
    title: "Association",
    links: [
      { href: "/about", label: "About & team" },
      { href: "/transparency", label: "Transparency" },
      { href: "/login", label: "Alumni login" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line bg-sand/50">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-ink">
            The alumni association of English Education (Pendidikan Bahasa Inggris), Universitas Islam Indonesia.
            Nobody walks alone after graduation.
          </p>
          <a
            href="mailto:hello@ikapbi-uii.example"
            className="mt-4 inline-block text-sm font-medium text-terra underline-offset-4 hover:underline"
          >
            hello@ikapbi-uii.example
          </a>
        </div>
        {groups.map((g) => (
          <div key={g.title} className="md:col-span-3">
            <h2 className="text-sm font-semibold">{g.title}</h2>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted-ink transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="flex flex-col gap-3 border-t border-line py-6 text-xs text-muted-ink sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 IKA PBI UII · Lean · Transparent · Fast</p>
        <div className="flex flex-wrap items-center gap-3">
          <span>Photos: Pexels</span>
          <SampleTag />
        </div>
      </Container>
    </footer>
  );
}
