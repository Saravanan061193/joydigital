import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import { getPostBySlug, getAllPosts, BlogPost } from "@/lib/blog";
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

  const title = post.seoTitle || post.title;
  const description = post.metaDescription || post.description;
  const canonical = post.canonicalUrl || `https://joydigital.in/blog/${resolvedParams.slug}`;
  const isNoindex = post.robots?.toLowerCase().includes("noindex");
  const isNofollow = post.robots?.toLowerCase().includes("nofollow");

  return {
    title: `${title} | Joy Digital`,
    description: description,
    alternates: {
      canonical: canonical,
    },
    robots: {
      index: !isNoindex,
      follow: !isNofollow,
    },
    openGraph: {
      type: "article",
      url: canonical,
      siteName: "Joy Digital Agency",
      title: post.ogTitle || `${title} | Joy Digital`,
      description: post.ogDescription || description,
      images: [
        {
          url: post.ogImage || post.image || "https://joydigital.in/assets/images/hero-banner.webp",
          width: 1200,
          height: 630,
          alt: post.imageAlt || title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.twitterTitle || post.ogTitle || `${title} | Joy Digital`,
      description: post.twitterDescription || post.ogDescription || description,
      images: [post.twitterImage || post.ogImage || post.image || "https://joydigital.in/assets/images/hero-banner.webp"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = await getPostBySlug(resolvedParams.slug);

  if (!post || post.status === "Draft" || post.status === "Archived") {
    notFound();
  }

  // Compile markdown content to HTML string on the server side
  const htmlContent = await marked(post.content);

  // Retrieve all posts for related selection
  const allPosts = await getAllPosts();
  let relatedPosts: BlogPost[] = [];

  if (post.manualRelatedSlugs && post.manualRelatedSlugs.length > 0) {
    const manualMatches = post.manualRelatedSlugs
      .map((s) => allPosts.find((p) => p.slug === s))
      .filter((p): p is BlogPost => Boolean(p) && Boolean(p?.slug && p.slug !== resolvedParams.slug));
    relatedPosts = manualMatches;
  }

  // If autoSuggestRelated is true or not enough manual picks exist, fill remaining up to 3-4 posts
  if (post.autoSuggestRelated !== false && relatedPosts.length < 3) {
    const existingSlugs = new Set([resolvedParams.slug, ...relatedPosts.map((p) => p.slug)]);
    const candidates = allPosts.filter((p) => !existingSlugs.has(p.slug) && p.status !== "Draft" && p.status !== "Archived");

    const scored = candidates.map((c) => {
      let score = 0;
      if (c.category === post.category) score += 5;

      const commonTags = (c.tags || []).filter((t) => (post.tags || []).includes(t));
      score += commonTags.length * 3;

      if (post.focusKeyword && (c.title.toLowerCase().includes(post.focusKeyword.toLowerCase()) || c.description.toLowerCase().includes(post.focusKeyword.toLowerCase()))) {
        score += 4;
      }
      return { post: c, score };
    });

    scored.sort((a, b) => b.score - a.score || new Date(b.post.date).getTime() - new Date(a.post.date).getTime());
    const suggested = scored.slice(0, 3 - relatedPosts.length).map((s) => s.post);
    relatedPosts = [...relatedPosts, ...suggested];
  }

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
