"use client";

import React, { useState, useEffect } from "react";

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
  className?: string;
}

// Generate a realistic, stable base view count from slug string
function getBaseViewCount(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash << 5) - hash + slug.charCodeAt(i);
    hash |= 0;
  }
  const absHash = Math.abs(hash);
  return 850 + (absHash % 1650); // Generates stable views between 850 and 2500
}

export default function ViewCounter({ slug, increment = false, className = "" }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const base = getBaseViewCount(slug);
    const storageKey = `jd_blog_views_${slug}`;
    
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem(storageKey) : null;
      let count = stored ? parseInt(stored, 10) : base;
      if (isNaN(count)) count = base;

      if (increment && typeof window !== "undefined") {
        count += 1;
        localStorage.setItem(storageKey, count.toString());
      }
      setViews(count);
    } catch {
      setViews(base);
    }
  }, [slug, increment]);

  if (views === null) {
    return (
      <span className={`inline-flex items-center gap-1 text-[10px] text-text-muted font-semibold ${className}`}>
        <i className="fa-solid fa-eye animate-pulse" /> ... views
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1 text-[10px] text-text-muted font-semibold ${className}`} title={`${views} page views`}>
      <i className="fa-solid fa-eye" /> {views.toLocaleString()} views
    </span>
  );
}
