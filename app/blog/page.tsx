import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import StickyWidgets from "@/components/ui/StickyWidgets";
import { getAllPosts } from "@/lib/blog";
import StrongCTA from "@/components/StrongCTA";
import BlogListingContainer from "@/components/sections/BlogListingContainer";

export const metadata: Metadata = {
  title: "Agency Growth Blog | Marketing & SEO Tips | Joy Digital",
  description: "Stay ahead of competitors with the latest search marketing checklists, SEO audit guidelines, conversion optimization practices, and next-gen web speed updates.",
};

export default async function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Header />
      <main className="pt-20 lg:pt-28">
        
        {/* Blog listing with active filters and animations */}
        <BlogListingContainer posts={posts} />

        <StrongCTA location="blog page" />

      </main>
      <Footer />
      <StickyWidgets />
    </>
  );
}
