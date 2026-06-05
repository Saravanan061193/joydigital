import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { notFound } from "next/navigation";
import { marked } from "marked";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Blog | Joy Digital`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  // Compile markdown content to HTML string
  const htmlContent = await marked(post.content);

  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        {/* Post Title Area */}
        <section className="py-16 bg-white relative overflow-hidden border-b border-gray-100">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="bg-accent-glow text-accent font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-accent/20">
                {post.category}
              </span>
              <span className="text-xs text-text-muted font-bold">
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-primary-dark tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>
            
            <span className="text-xs text-text-secondary font-semibold">
              Written by {post.author} &bull; Joy Digital Marketing
            </span>
          </div>
        </section>

        {/* Post Reader Content */}
        <section className="py-16 bg-light-bg">
          <div className="max-w-3xl mx-auto px-6">
            <article className="bg-white border border-gray-100 rounded-3xl p-8 sm:p-12 shadow-sm text-left">
              <div 
                className="prose prose-blue max-w-none text-sm sm:text-base text-text-secondary leading-relaxed space-y-6 
                           prose-headings:text-primary-dark prose-headings:font-bold prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4 
                           prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-p:mb-4 prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
                           prose-li:mb-2"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              
              {/* Back to Blog */}
              <div className="border-t border-gray-100 mt-12 pt-8 text-center">
                <Link
                  href="/blog"
                  className="text-xs font-bold text-primary hover:text-accent flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-arrow-left-long" /> Back to Blog Articles
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
