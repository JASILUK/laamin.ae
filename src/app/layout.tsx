import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import LaaminLoader from "@/components/LaaminLoader";
import { site } from "@/data/site";
import "./globals.css";
import FloatingContact from "@/components/FloatingContact";

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const heading = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LAAMIN Business Set Up Services | Business Support in Dubai",
    template: "%s | LAAMIN Business Set Up Services",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "en_AE",
    siteName: site.legalName,
    title: "LAAMIN Business Set Up Services",
    description: site.description,
    url: "/",
  },
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  url: site.url,
  email: site.email,
  telephone: site.phones.map((phone) => phone.tel),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressCountry: site.address.country,
  },
  areaServed: "AE",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${heading.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/*
          Runs before first paint. Marks the page as "loading" so the hero
          animations wait until the loader has left. Without JavaScript the
          flag is never set, so the page simply shows normally.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.dataset.loading="true";`,
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-sans">
        {/* Rendered in the server HTML, so it covers the page from the first paint */}
        <LaaminLoader />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-navy-900 focus:px-4 focus:py-3 focus:text-sm focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingContact/>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd) }}
        />
      </body>
    </html>
  );
}