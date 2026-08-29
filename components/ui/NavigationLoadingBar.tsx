"use client";

import React, { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function NavigationLoadingBarContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Complete progress bar when pathname or searchParams finish updating
  useEffect(() => {
    if (loading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname, searchParams]);

  // Intercept click on internal links to start progress bar instantly
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("#") &&
        target.getAttribute("target") !== "_blank" &&
        href !== window.location.pathname
      ) {
        setLoading(true);
        setProgress(30);
        setTimeout(() => setProgress(70), 120);
        setTimeout(() => setProgress(88), 300);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  if (!loading && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] pointer-events-none transition-all duration-200 ease-out"
      style={{
        width: `${progress}%`,
        background: "linear-gradient(90deg, #2563EB 0%, #9333EA 50%, #10B981 100%)",
        boxShadow: "0 0 12px rgba(37, 99, 235, 0.8), 0 0 6px rgba(147, 51, 234, 0.6)",
        opacity: loading || progress > 0 ? 1 : 0,
      }}
    />
  );
}

export default function NavigationLoadingBar() {
  return (
    <Suspense fallback={null}>
      <NavigationLoadingBarContent />
    </Suspense>
  );
}
