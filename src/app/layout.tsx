import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";
import { localBusinessSchema } from "@/components/JsonLd";

const siteUrl = "https://bluehorizonlandscapes.com";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Blue Horizon Landscapes LLC | Premier Landscaping in Orange County NY",
    template: "%s | Blue Horizon Landscapes",
  },
  description: "Blue Horizon Landscapes LLC specializes in transforming outdoor spaces with exceptional design and meticulous craftsmanship. Call (914) 755-8141 for a free estimate.",
  keywords: [
    "landscaping",
    "lawn maintenance",
    "hardscaping",
    "patios",
    "retaining walls",
    "mulching",
    "landscape design",
    "Orange County NY",
    "Newburgh",
    "Harriman",
    "Rockland County",
  ],
  authors: [{ name: "Blue Horizon Landscapes LLC" }],
  creator: "Blue Horizon Landscapes",
  publisher: "Blue Horizon Landscapes LLC",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Blue Horizon Landscapes LLC",
    title: "Blue Horizon Landscapes LLC | Premier Landscaping in Orange County NY",
    description: "Blue Horizon Landscapes LLC specializes in transforming outdoor spaces with exceptional design and meticulous craftsmanship. Call (914) 755-8141 for a free estimate.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Blue Horizon Landscapes - Professional Landscaping Services in Orange County NY",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blue Horizon Landscapes LLC | Premier Landscaping in Orange County NY",
    description: "Professional landscaping services in Orange County NY. Lawn maintenance, hardscaping, patios, retaining walls & more. Call (914) 755-8141",
    images: ["/og-image.jpg"],
    creator: "@bluehorizonlandscapes",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-secondary selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-N1E4VKZQ1E" strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag("js", new Date()); gtag("config", "G-N1E4VKZQ1E");`}
        </Script>
<ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
