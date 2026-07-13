import type { Metadata } from "next";
import { Open_Sans, Reddit_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const redditMono = Reddit_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pieter Borremans | Content creator, blogger, and entrepreneur",
  description:
    "Pieter Borremans is a writer, content creator, and founder based in Taichung, Taiwan and London, UK. He writes about entrepreneurship, independent business-building, and the unfiltered reality of creating things online.",
  metadataBase: new URL("https://pieterborremans.com"),
};

// Canonical entity graph — same @id as ryokagroup.com/founder, indiehacker.blog/about,
// and echoroom.xyz/about, so Google treats all four as describing the same Person.
// Keep sameAs, jobTitle, and description in sync across all four sites.
// Site-wide (root layout) rather than page-specific: this is static, universal
// identity data, not page content — same category as Organization schema.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://ryokagroup.com/founder#pieter",
  name: "Pieter Borremans",
  givenName: "Pieter",
  familyName: "Borremans",
  jobTitle: "Writer, Content Creator, Founder",
  description:
    "Pieter Borremans is a writer, content creator, and founder with over two decades of experience in business, digital strategy, and content. Born in Asia and raised in Brussels, he writes about entrepreneurship, independent business-building, and the unfiltered reality of creating things online.",
  url: "https://pieterborremans.com",
  image: "https://pieterborremans.com/images/pieter-borremans-writer.png",
  birthPlace: {
    "@type": "Place",
    name: "Indonesia",
  },
  nationality: {
    "@type": "Country",
    name: "Belgium",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "KdG University College",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Antwerp",
      addressCountry: "BE",
    },
  },
  homeLocation: [
    { "@type": "Place", name: "Taichung, Taiwan" },
    { "@type": "Place", name: "London, United Kingdom" },
  ],
  worksFor: {
    "@type": "Organization",
    "@id": "https://ryokagroup.com/#organization",
    name: "Ryoka Group",
  },
  sameAs: [
    "https://ryokagroup.com/founder",
    "https://www.indiehacker.blog",
    "https://echoroom.xyz/about",
    "https://ryoka.xyz",
    "https://www.linkedin.com/in/pieter-borremans/",
    "https://medium.com/@borremanspieter",
    "https://www.youtube.com/@PieterBorremans",
    "https://github.com/sillyledger",
    "https://www.pinterest.com/borremanspieter",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${redditMono.variable} font-sans bg-bg text-ink antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
