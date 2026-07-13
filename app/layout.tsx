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
  icons: {
    icon: "/images/pieter-borremans-writer.png",
    shortcut: "/images/pieter-borremans-writer.png",
    apple: "/images/pieter-borremans-writer.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} ${redditMono.variable} font-sans bg-bg text-ink antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  );
}
