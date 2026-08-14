"use client";

export interface UtmData {
  source?: string;
  medium?: string;
  campaign?: string;
  term?: string;
  content?: string;
  referrer?: string;
  landingPage?: string;
  timestamp?: string;
}

export function captureUtmParameters() {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const utmSource = urlParams.get("utm_source");
    const utmMedium = urlParams.get("utm_medium");
    const utmCampaign = urlParams.get("utm_campaign");
    const utmTerm = urlParams.get("utm_term");
    const utmContent = urlParams.get("utm_content");

    // Only capture if at least one UTM parameter is present, or if there's none but we want to capture search engines/referrals
    const hasUtm = utmSource || utmMedium || utmCampaign || utmTerm || utmContent;

    // Check if we already have UTM data in session storage to avoid overwriting original source
    const existing = sessionStorage.getItem("joy_utm_data");
    
    if (hasUtm) {
      const utmData: UtmData = {
        source: utmSource || undefined,
        medium: utmMedium || undefined,
        campaign: utmCampaign || undefined,
        term: utmTerm || undefined,
        content: utmContent || undefined,
        referrer: document.referrer || "Direct",
        landingPage: window.location.pathname + window.location.search,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem("joy_utm_data", JSON.stringify(utmData));
    } else if (!existing) {
      // Capture organic/referral if no UTM is present and no session details exist
      const ref = document.referrer;
      if (ref && !ref.includes(window.location.hostname)) {
        let source = "Referral";
        if (ref.includes("google.")) source = "Google Organic";
        else if (ref.includes("bing.")) source = "Bing Organic";
        else if (ref.includes("yahoo.")) source = "Yahoo Organic";
        else if (ref.includes("facebook.") || ref.includes("fb.me")) source = "Facebook";
        else if (ref.includes("instagram.")) source = "Instagram";
        else if (ref.includes("linkedin.")) source = "LinkedIn";
        else if (ref.includes("twitter.com") || ref.includes("t.co")) source = "Twitter/X";
        else {
          try {
            source = new URL(ref).hostname;
          } catch (_) {}
        }

        const utmData: UtmData = {
          source,
          medium: "organic",
          referrer: ref,
          landingPage: window.location.pathname,
          timestamp: new Date().toISOString()
        };
        sessionStorage.setItem("joy_utm_data", JSON.stringify(utmData));
      }
    }
  } catch (error) {
    console.error("Error capturing UTM parameters:", error);
  }
}

export function getUtmParameters(): UtmData | null {
  if (typeof window === "undefined") return null;
  try {
    const data = sessionStorage.getItem("joy_utm_data");
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return null;
  }
}
