import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { RouteScrollReset } from "@/components/route-scroll-reset";
import { CursorGlow } from "@/components/cursor-glow";
import { PageTransition } from "@/components/page-transition";
import { site } from "@/lib/site";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Visual AI Content Studio`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} dark h-full`} suppressHydrationWarning>
      <body className="min-h-full bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <CursorGlow />
          <RouteScrollReset />
          <Navigation />
          <main className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
