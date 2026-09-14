import React from "react";
import Link, { LinkProps } from "next/link";

export interface SEOLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>, LinkProps {
  href: string;
  title: string; // Mandatory title prop for strict SEO & accessibility compliance
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  target?: string;
  rel?: string;
  isExternal?: boolean;
}

/**
 * SEOLink Component
 * Ensures every link in Next.js carries an explicit `title` attribute,
 * proper `aria-label`, and secure `rel` tags for external & anchor links.
 */
export default function SEOLink({
  href,
  title,
  children,
  ariaLabel,
  className,
  target,
  rel,
  isExternal,
  ...props
}: SEOLinkProps) {
  // Determine if link is external or an anchor link
  const isExternalLink = isExternal || href.startsWith("http://") || href.startsWith("https://") || href.startsWith("mailto:") || href.startsWith("tel:");
  const isAnchorLink = href.startsWith("#");

  const computedRel = isExternalLink
    ? rel || "noopener noreferrer"
    : rel;

  const computedAriaLabel = ariaLabel || title;

  // Render external or anchor link using standard <a> tag
  if (isExternalLink || isAnchorLink) {
    return (
      <a
        href={href}
        title={title}
        aria-label={computedAriaLabel}
        className={className}
        target={target || (isExternalLink ? "_blank" : undefined)}
        rel={computedRel}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Render internal page link using Next.js Link
  return (
    <Link
      href={href}
      title={title}
      aria-label={computedAriaLabel}
      className={className}
      target={target}
      rel={rel}
      {...props}
    >
      {children}
    </Link>
  );
}
