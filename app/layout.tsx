import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/sonner";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vinod Season Shop — Premium Decorations & Festive Items",
    template: "%s | Vinod Season Shop",
  },
  description:
    "Discover artificial flowers, wedding decorations, pooja items, garlands, torans, and seasonal decorations at Vinod Season Shop. Quality festive products for every occasion.",
  keywords: [
    "artificial flowers",
    "wedding decorations",
    "pooja items",
    "garlands",
    "torans",
    "festival decorations",
    "seasonal decorations",
    "Vinod Season Shop",
  ],
  authors: [{ name: "Vinod Season Shop" }],
  creator: "Vinod Season Shop",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Vinod Season Shop",
    title: "Vinod Season Shop — Premium Decorations & Festive Items",
    description:
      "Discover artificial flowers, wedding decorations, pooja items, garlands, torans, and seasonal decorations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinod Season Shop — Premium Decorations & Festive Items",
    description:
      "Discover artificial flowers, wedding decorations, pooja items, garlands, torans, and seasonal decorations.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className="min-h-full antialiased">
        <Providers>
          {children}
          <Toaster position="top-right" richColors />
          <ServiceWorkerRegistration />
        </Providers>
      </body>
    </html>
  );
}
