import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { META_THEME_COLORS, siteConfig } from "@/config/site";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { BProgressProvider } from "@/registry/new-york/components/bprogress-provider-next-app";
import { Confirmer } from "@/registry/new-york/ui/confirmer";

import "./globals.css";
import "./typeset.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Components", "shadcn"],
  authors: [
    {
      name: "junwen-k",
      url: "https://junwen-k.dev",
    },
  ],
  creator: "junwen-k",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        fontVariables,
        "[--header-height:calc(var(--spacing)*14)] lg:[--header-height:calc(var(--spacing)*16)]",
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
                }
              } catch (_) {}
            `,
          }}
        />
        <meta name="theme-color" content={META_THEME_COLORS.light} />
      </head>
      <body className="group/body overscroll-none antialiased [--footer-height:calc(var(--spacing)*14)]">
        <ThemeProvider>
          <BProgressProvider>
            <div
              data-slot="layout"
              className="group/layout relative z-10 flex min-h-svh flex-col bg-background"
            >
              <SiteHeader />
              <main className="flex min-h-0 flex-1 flex-col">{children}</main>
              <SiteFooter />
            </div>
            <Toaster position="top-center" />
          </BProgressProvider>
          <Confirmer />
        </ThemeProvider>
      </body>
    </html>
  );
}
