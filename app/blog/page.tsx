import type { Metadata } from "next";
import BlogIndex from "./BlogIndex";

export const metadata: Metadata = {
  title: "Blog | Pieter Borremans",
  description:
    "Pieter Borremans writes about entrepreneurship, independent business-building, and the unfiltered reality of creating things online.",
};

// Static, regenerated at most once a minute (or instantly via /api/revalidate).
export const revalidate = 60;

export default function BlogIndexPage() {
  return <BlogIndex page={1} />;
}
