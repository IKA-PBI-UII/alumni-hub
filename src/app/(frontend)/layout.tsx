import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Plus_Jakarta_Sans, Source_Sans_3 } from "next/font/google";
import { Providers } from "@/components/providers";
import { appearanceScript, DEFAULT_PALETTE, DEFAULT_STYLE } from "@/lib/appearance-script";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});
// "Sky & Sun" palette. Montserrat stands in for Gotham (commercial, not on Google Fonts).
// Not preloaded: only downloaded when that palette is active.
const sourceSans = Source_Sans_3({ variable: "--font-source-sans", subsets: ["latin"], preload: false });
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "IKA PBI UII · Alumni Hub",
    template: "%s · IKA PBI UII",
  },
  description:
    "Mentoring, jobs, events and stories from IKA PBI UII, the alumni association of English Education, Universitas Islam Indonesia.",
};

export const viewport: Viewport = {
  themeColor: "#16231F",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${sourceSans.variable} ${montserrat.variable} h-full`}
      data-style={DEFAULT_STYLE}
      data-palette={DEFAULT_PALETTE}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: appearanceScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
