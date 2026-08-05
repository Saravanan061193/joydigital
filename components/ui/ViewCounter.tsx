"use client";

import React, { useState, useEffect } from "react";

interface ViewCounterProps {
  slug: string;
  increment?: boolean;
  className?: string;
}

export default function ViewCounter({ slug, increment = false, className = "" }: ViewCounterProps) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        const url = increment
          ? `https://api.counterapi.dev/v1/joydigital-blog/${slug}/up`
          : `https://api.counterapi.dev/v1/joydigital-blog/${slug}`;
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setViews(data.count);
        }
      } catch (err) {
        console.error("Error fetching view count:", err);
      }
    };

    fetchViews();
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
