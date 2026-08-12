"use client";

import React, { useEffect, useRef, useState } from "react";

interface MapMarker {
  lat: number;
  lng: number;
  city: string;
  count: number;
}

interface VisitorMapProps {
  markers: MapMarker[];
}

export default function VisitorMap({ markers }: VisitorMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Check if Leaflet is already loaded globally
    if ((window as any).L) {
      setLeafletLoaded(true);
      return;
    }

    // 2. Load Leaflet CSS
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    link.integrity = "sha255-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    link.crossOrigin = "";
    document.head.appendChild(link);

    // 3. Load Leaflet Script
    const script = document.createElement("script");
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    script.integrity = "sha255-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
    script.crossOrigin = "";
    script.onload = () => {
      setLeafletLoaded(true);
    };
    script.onerror = () => {
      setError("Failed to load Leaflet Map script from CDN.");
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup loaded tags if component unmounts before loading completes
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.body.contains(script)) document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!leafletLoaded || !mapContainerRef.current) return;

    const L = (window as any).L;
    if (!L) return;

    // If map already exists, remove it first to avoid re-init error
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    try {
      // Find center coordinate from markers or default to Chennai
      let centerLat = 13.0827;
      let centerLng = 80.2707;
      let zoom = 4;

      if (markers.length > 0) {
        // Find average coordinates or use the first marker
        centerLat = markers[0].lat;
        centerLng = markers[0].lng;
        zoom = 6;
      }

      // Initialize Map
      const map = L.map(mapContainerRef.current).setView([centerLat, centerLng], zoom);
      mapInstanceRef.current = map;

      // Add Map Tiles (Light Premium CartoDB tiles match light mode perfectly)
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }).addTo(map);

      // Add Markers
      markers.forEach((marker) => {
        if (!marker.lat || !marker.lng) return;

        // Custom circle marker
        const radius = Math.min(25, 6 + Math.log2(marker.count) * 4); // Scaled based on visit counts
        const circle = L.circleMarker([marker.lat, marker.lng], {
          color: "#2563EB", // Blue outline
          fillColor: "#3B82F6",
          fillOpacity: 0.5,
          radius: radius,
          weight: 1.5
        }).addTo(map);

        // Bind tooltip
        circle.bindTooltip(`<strong>${marker.city}</strong><br/>Views: ${marker.count} visits`, {
          permanent: false,
          direction: "top"
        });
      });
    } catch (e: any) {
      console.error("Error creating map instance:", e);
      setError(e.message || "Failed to render map.");
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [leafletLoaded, markers]);

  if (error) {
    return (
      <div className="w-full h-[450px] bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-center text-slate-500 text-xs font-semibold">
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <i className="fa-solid fa-triangle-exclamation text-rose-500 text-2xl" />
          <span>{error}</span>
          <span className="text-[10px] text-slate-400">Verify your internet connection.</span>
        </div>
      </div>
    );
  }

  if (!leafletLoaded) {
    return (
      <div className="w-full h-[450px] bg-slate-50 border border-slate-200 rounded-3xl flex items-center justify-center text-slate-500 text-xs font-semibold">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin"></div>
          <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest animate-pulse">Initializing maps engine...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-[24px] overflow-hidden border border-slate-200 shadow-inner relative">
      <div ref={mapContainerRef} className="w-full h-[450px] z-10" />
    </div>
  );
}
