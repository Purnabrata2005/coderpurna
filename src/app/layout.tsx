import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Purnabrata Dey | Full-Stack Engineer | Next.js & React Expert",
  description: "Full-Stack Engineer with 4+ years of experience specializing in developing high-performance web applications using Next.js, React, Node.js, and TypeScript.",
  keywords: "Purnabrata Dey, Software Engineer, Full-Stack Developer, Next.js, React, Node.js, TypeScript, Coder Purna, CoderArena, coderarena.tech, Coding Platform, Competitive Programming, Web Development",
  authors: [{ name: "Purnabrata Dey" }],
  robots: "index, follow",
  alternates: {
    canonical: "https://coderpurna.com",
  },
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata",
  },
  openGraph: {
    type: "website",
    url: "https://coderpurna.com",
    siteName: "Purnabrata Dey Portfolio",
    title: "Purnabrata Dey | Full-Stack Engineer",
    description: "Full-Stack Engineer with 4+ years of experience specializing in developing high-performance web applications using Next.js, React, Node.js, and TypeScript.",
    images: [
      {
        url: "https://coderpurna.com/image/social-cover.png",
        width: 1200,
        height: 630,
        alt: "Purnabrata Dey - Full-Stack Engineer",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purnabrata Dey | Full-Stack Engineer",
    description: "Full-Stack Engineer with 4+ years of experience specializing in developing high-performance web applications using Next.js, React, Node.js, and TypeScript.",
    images: ["https://coderpurna.com/image/social-cover.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Space+Mono:wght@400;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      </head>
      <body>
        <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}
