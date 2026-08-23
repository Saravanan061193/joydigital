"use client";

import { getUtmParameters } from "./utmTracker";

export interface ToolEventData {
  toolName: string;
  action: string;
  metadata?: Record<string, any>;
}

// Simple browser and OS detection
function getBrowserAndOS() {
  if (typeof window === "undefined") return { browser: "Unknown", os: "Unknown", device: "Desktop" };

  const ua = navigator.userAgent;
  let browser = "Unknown";
  let os = "Unknown";
  let device = "Desktop";

  // Browser detection
  if (ua.indexOf("Firefox") > -1) browser = "Firefox";
  else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung Browser";
  else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
  else if (ua.indexOf("Trident") > -1) browser = "Internet Explorer";
  else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) browser = "Edge";
  else if (ua.indexOf("Chrome") > -1) browser = "Chrome";
  else if (ua.indexOf("Safari") > -1) browser = "Safari";

  // OS detection
  if (ua.indexOf("Windows NT") > -1) os = "Windows";
  else if (ua.indexOf("Macintosh") > -1) os = "macOS";
  else if (ua.indexOf("Android") > -1) {
    os = "Android";
    device = "Mobile";
  } else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) {
    os = "iOS";
    device = "Mobile";
  } else if (ua.indexOf("Linux") > -1) os = "Linux";

  // Device mobile/tablet regex check fallback
  if (/Mobi|Android|iPhone|iPad|iPod/i.test(ua)) {
    device = "Mobile";
  }

  return { browser, os, device };
}

// Generate or retrieve persistent anonymous user identifier
export function getOrCreateAnonUserId(): string {
  if (typeof window === "undefined") return "server-side";
  
  let anonId = localStorage.getItem("joy_tool_anon_id");
  if (!anonId) {
    anonId = crypto.randomUUID();
    localStorage.setItem("joy_tool_anon_id", anonId);
  }
  return anonId;
}

export async function trackToolUsage(data: ToolEventData) {
  if (typeof window === "undefined") return;

  try {
    const anonId = getOrCreateAnonUserId();
    const { browser, os, device } = getBrowserAndOS();
    const utm = getUtmParameters();

    const payload = {
      anonId,
      toolName: data.toolName,
      action: data.action,
      device,
      browser,
      os,
      referrer: document.referrer || "Direct",
      landingPage: window.location.pathname,
      utmSource: utm?.source || null,
      utmMedium: utm?.medium || null,
      utmCampaign: utm?.campaign || null,
      metadata: data.metadata || {},
    };

    // Use beacon if available on page unload, or standard fetch
    const url = "/api/free-tools/track";
    if (navigator.sendBeacon && data.action === "tool_close") {
      navigator.sendBeacon(url, JSON.stringify(payload));
    } else {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
  } catch (error) {
    console.error("Error sending tool tracking event:", error);
  }
}
