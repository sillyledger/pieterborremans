import type { Metadata } from "next";
import BlogIndex, { POSTS_PER_PAGE } from "@/app/blog/BlogIndex";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog | Pieter Borremans",
  description:
    "Pieter Borremans writes about entrepreneurship, independent business-building, and the unfiltered reality of creating things online.",
};

export const dynamic = "force-dynamic";

// Page 1 is served by /blog itself; only pre-render pages 2+ here.
export async function generateStaticParams() {
  const posts = await getPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
    page: String(i + 2),
  }));
}

export default async function BlogIndexPageN({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  const pageNum = parseInt(page, 10);
  return <BlogIndex page={isNaN(pageNum) ? 1 : pageNum} />;
}
