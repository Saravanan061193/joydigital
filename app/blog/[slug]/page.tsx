import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { marked } from "marked";
import BlogArticleContainer from "@/components/sections/BlogArticleContainer";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog | Joy Digital`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Compile markdown content to HTML string on the server side
  const htmlContent = await marked(post.content);

  // Fetch up to 3 related articles (matching category prioritized, sorted by date)
  const allPosts = await getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== resolvedParams.slug)
    .sort((a, b) => {
      const aMatches = a.category === post.category ? 1 : 0;
      const bMatches = b.category === post.category ? 1 : 0;
      if (aMatches !== bMatches) return bMatches - aMatches;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, 3);

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28">
        
        {/* Animated layout wrapper holding article details */}
        <BlogArticleContainer 
          post={post} 
          htmlContent={htmlContent} 
          relatedPosts={relatedPosts}
          slug={resolvedParams.slug}
        />

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
