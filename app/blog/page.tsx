import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import { getAllPosts } from "@/lib/blog";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agency Growth Blog | Marketing & SEO Tips | Joy Digital",
  description: "Stay ahead of competitors with the latest search marketing checklists, SEO audit guidelines, conversion optimization practices, and next-gen web speed updates.",
};

export default async function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-24 lg:pt-32">
        {/* Blog Hero */}
        <section className="py-12 bg-white text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <span className="inline-block bg-accent-glow text-accent font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-accent/20 mb-6">
              Knowledge Base
            </span>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-dark tracking-tight mb-4">
              Our Digital Growth <span className="text-gradient">Blog Hub</span>
            </h1>
            <p className="text-sm text-text-secondary max-w-xl mx-auto leading-relaxed">
              Find actionable checklists, SEO tips, conversion strategies, and web performance insights to help grow your business search visibility.
            </p>
          </div>
        </section>

        {/* Blog Listings Grid */}
        <section className="py-16 bg-light-bg">
          <div className="max-w-7xl mx-auto px-6">
            
            {posts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-text-muted text-4xl mb-4"><i className="fa-solid fa-folder-open" /></div>
                <h3 className="text-lg font-bold text-primary-dark mb-2">No Articles Found</h3>
                <p className="text-sm text-text-secondary">We are currently drafting new guides. Stay tuned!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-accent-glow text-accent font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-accent/10">
                          {post.category}
                        </span>
                        <span className="text-[10px] text-text-muted font-semibold">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      
                      <h3 className="text-base sm:text-lg font-bold text-primary-dark mb-3 leading-tight hover:text-accent transition-colors">
                        <Link href={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h3>
                      
                      <p className="text-xs text-text-secondary leading-relaxed mb-6">
                        {post.description}
                      </p>
                    </div>

                    <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-gray-50 flex items-center justify-between">
                      <span className="text-[10px] text-text-muted font-bold">
                        By {post.author}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-primary hover:text-accent flex items-center gap-1.5"
                      >
                        Read Guide <i className="fa-solid fa-arrow-right-long text-[10px]" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}

          </div>
        </section>

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
