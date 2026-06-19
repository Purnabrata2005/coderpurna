import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import type { WebSite, WithContext } from "schema-dts";
import { SITE_INFO } from "@/config/site";
import { USER } from "@/data/user";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  alternates: {
    canonical: "/",
  },
  title: {
    template: `%s | ${SITE_INFO.name}`,
    default: `${USER.displayName} | ${USER.jobTitle}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [{ name: USER.displayName }],
  robots: "index, follow",
  other: {
    "geo.region": "IN-WB",
    "geo.placename": "Kolkata",
  },
  openGraph: {
    type: "profile",
    url: "/",
    siteName: `${USER.displayName} Portfolio`,
    title: `${USER.displayName} | ${USER.jobTitle}`,
    description: SITE_INFO.description,
    firstName: USER.firstName,
    lastName: USER.lastName,
    username: USER.username,
    gender: USER.gender,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: `${USER.displayName} - ${USER.jobTitle}`,
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${USER.displayName} | ${USER.jobTitle}`,
    description: SITE_INFO.description,
    creator: "@purnabrata2005",
    images: [SITE_INFO.ogImage],
  },
  verification: {
    google: "Kd0GS98d-Qdogfjb-NZmuNIPyiPGc22-eaOm4w8Nqf0",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
};

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: [USER.username],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Space+Mono:wght@400;700&family=Caveat:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getWebSiteJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body>
        <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" strategy="beforeInteractive" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.6.0/p5.min.js" strategy="afterInteractive" />
        {children}
      </body>
    </html>
  );
}

