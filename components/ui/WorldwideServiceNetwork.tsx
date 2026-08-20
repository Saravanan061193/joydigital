"use client";

import React, { useEffect, useState } from "react";

interface Node {
  id: string;
  name: string;
  x: number; // percentage
  y: number; // percentage
  align: "left" | "right" | "top" | "bottom";
  isBase?: boolean;
}

const NODES: Node[] = [
  { id: "in", name: "India (Base)", x: 50, y: 55, align: "bottom", isBase: true },
  { id: "us", name: "United States", x: 18, y: 35, align: "left" },
  { id: "uk", name: "United Kingdom", x: 38, y: 28, align: "top" },
  { id: "eu", name: "Europe", x: 42, y: 32, align: "bottom" },
  { id: "ae", name: "UAE", x: 45, y: 48, align: "left" },
  { id: "sg", name: "Singapore", x: 62, y: 62, align: "top" },
  { id: "au", name: "Australia", x: 82, y: 75, align: "right" },
];

const CONNECTIONS = [
  { from: "in", to: "us" },
  { from: "in", to: "uk" },
  { from: "in", to: "eu" },
  { from: "in", to: "ae" },
  { from: "in", to: "sg" },
  { from: "in", to: "au" },
];

export default function WorldwideServiceNetwork() {
  const [activeNode, setActiveNode] = useState<string>("in");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Determine user reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    // Auto rotate highlights
    if (mediaQuery.matches) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => {
        const index = NODES.findIndex((n) => n.id === prev);
        const nextIndex = (index + 1) % NODES.length;
        return NODES[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full bg-slate-900 border border-slate-800 rounded-[32px] p-6 md:p-10 overflow-hidden shadow-inner max-w-4xl mx-auto my-12 group">
      {/* Background digital grid patterns */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:24px_24px] opacity-15 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Localized Styles to prevent stylesheet pollution */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dash {
          to {
            stroke-dashoffset: -20;
          }
        }
        @keyframes pulseGlow {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .network-dash {
          stroke-dasharray: 6, 4;
          animation: dash 1s linear infinite;
        }
        .network-pulse {
          animation: pulseGlow 2.5s cubic-bezier(0.16, 1, 0.3, 1) infinite;
        }
      ` }} />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Connection Network Visual */}
        <div className="w-full md:w-3/5 aspect-[4/3] relative min-h-[260px] select-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Draw connection paths */}
            {CONNECTIONS.map((conn, idx) => {
              const fromNode = NODES.find((n) => n.id === conn.from);
              const toNode = NODES.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isHighlighted = activeNode === fromNode.id || activeNode === toNode.id;

              return (
                <g key={`path-${idx}`}>
                  {/* Base link line */}
                  <line
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isHighlighted ? "rgba(59, 130, 246, 0.45)" : "rgba(51, 65, 85, 0.35)"}
                    strokeWidth={isHighlighted ? 0.75 : 0.45}
                    className="transition-colors duration-500"
                  />
                  {/* Flowing data packets along line */}
                  {isHighlighted && !prefersReducedMotion && (
                    <line
                      x1={fromNode.x}
                      y1={fromNode.y}
                      x2={toNode.x}
                      y2={toNode.y}
                      stroke="url(#dataGrad)"
                      strokeWidth={1.1}
                      className="network-dash"
                    />
                  )}
                </g>
              );
            })}

            {/* Gradient for flow lines */}
            <defs>
              <linearGradient id="dataGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Render node circles and labels */}
          {NODES.map((node) => {
            const isActive = activeNode === node.id;
            
            return (
              <div
                key={node.id}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 group/node cursor-pointer z-20"
                onClick={() => setActiveNode(node.id)}
              >
                {/* Node Dot */}
                <div className="relative w-4 h-4 flex items-center justify-center">
                  {/* Pulsing ring indicator */}
                  {isActive && !prefersReducedMotion && (
                    <span className="absolute inset-0 bg-blue-500 rounded-full network-pulse" />
                  )}
                  {node.isBase && !prefersReducedMotion && (
                    <span className="absolute inset-0 bg-orange-500/30 rounded-full scale-125 network-pulse" />
                  )}
                  <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-blue-400 scale-125 shadow-md shadow-blue-400/50" 
                      : node.isBase 
                        ? "bg-orange-500 shadow-sm shadow-orange-500/30" 
                        : "bg-slate-700 hover:bg-slate-500"
                  }`} />
                </div>

                {/* Node Label tooltip-like bubble */}
                <div className={`absolute pointer-events-none transition-all duration-300 flex flex-col items-center ${
                  node.align === "left" ? "right-6 top-1/2 -translate-y-1/2" :
                  node.align === "right" ? "left-6 top-1/2 -translate-y-1/2" :
                  node.align === "top" ? "bottom-6 left-1/2 -translate-x-1/2" :
                  "top-6 left-1/2 -translate-x-1/2"
                }`}>
                  <span className={`text-[9px] font-black tracking-wider px-2 py-1 rounded-md border whitespace-nowrap shadow-sm transition-colors duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white border-blue-500 font-extrabold"
                      : "bg-slate-800 text-slate-400 border-slate-700"
                  }`}>
                    {node.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Global statement text */}
        <div className="w-full md:w-2/5 text-left flex flex-col justify-center select-none">
          <div className="inline-flex items-center gap-1.5 bg-[#F97316]/10 border border-[#F97316]/20 px-3 py-1 rounded-full mb-4 w-fit">
            <span className="w-2 h-2 bg-orange-500 rounded-full" />
            <span className="text-[10px] font-extrabold text-[#F97316] uppercase tracking-wider">Borderless Collaboration</span>
          </div>
          
          <h3 className="text-xl md:text-2xl font-black text-white tracking-tight mb-4">
            Helping Startups & Small Businesses Worldwide
          </h3>
          
          <p className="text-xs text-slate-400 leading-relaxed mb-6 font-semibold">
            By deploying cloud-optimized structures and utilizing dynamic communication channels, we support growing businesses without geographical boundaries.
          </p>

          <div className="flex flex-col gap-3.5 border-t border-slate-800 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs">
                <i className="fa-solid fa-cloud-arrow-up" />
              </div>
              <span className="text-[11px] text-slate-300 font-bold">100% Remote Project Sync & Delivery</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-xs">
                <i className="fa-solid fa-clock" />
              </div>
              <span className="text-[11px] text-slate-300 font-bold">Time-Zone Aligned Development Desks</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
