import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const lora = Lora({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Pieter Borremans | Content creator, blogger, and entrepreneur",
  description:
    "Pieter Borremans is a writer, content creator, and founder based in Taichung, Taiwan and London, UK. He writes about entrepreneurship, independent business-building, and the unfiltered reality of creating things online.",
  metadataBase: new URL("https://pieterborremans.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lora.variable} ${jakarta.variable} ${plexMono.variable} font-sans bg-bg text-ink antialiased`}>
        {children}
      </body>
    </html>
  );
}
