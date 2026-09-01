"use client";

import React, { useState, useEffect } from "react";
import {
  Clock,
  Rocket,
  Zap,
  ArrowRight,
  Globe,
  MapPin,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";
import MultiStepLeadModal from "@/components/ui/MultiStepLeadModal";

interface RegionNode {
  id: string;
  name: string;
  region: string;
  tz: string;
  overlap: string;
  x: number; // percentage on SVG canvas
  y: number;
  isBase?: boolean;
}

const REGION_NODES: RegionNode[] = [
  { id: "in", name: "India (HQ)", region: "Core Engineering Base", tz: "IST (UTC+5:30)", overlap: "100% Base Ops", x: 62, y: 56, isBase: true },
  { id: "us", name: "United States", region: "US (EST / PST)", tz: "EST / PST", overlap: "4+ Hours Sync", x: 22, y: 36 },
  { id: "uk", name: "United Kingdom", region: "UK & Europe", tz: "GMT / CET", overlap: "5+ Hours Sync", x: 45, y: 28 },
  { id: "ae", name: "UAE (Dubai)", region: "Middle East", tz: "GST (UTC+4)", overlap: "6+ Hours Sync", x: 55, y: 46 },
  { id: "sg", name: "Singapore", region: "Southeast Asia", tz: "SGT (UTC+8)", overlap: "Full Overlap", x: 74, y: 60 },
  { id: "au", name: "Australia", region: "ANZ Region", tz: "AEST (UTC+10)", overlap: "4+ Hours Sync", x: 86, y: 76 },
];

export default function WorldwideServiceNetwork() {
  const [activeNodeId, setActiveNodeId] = useState<string>("in");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  // Auto-cycle through nodes unless user hovers/clicks
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setActiveNodeId((prev) => {
        const idx = REGION_NODES.findIndex((n) => n.id === prev);
        const nextIdx = (idx + 1) % REGION_NODES.length;
        return REGION_NODES[nextIdx].id;
      });
    }, 3500);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  const activeNode = REGION_NODES.find((n) => n.id === activeNodeId) || REGION_NODES[0];
  const baseNode = REGION_NODES.find((n) => n.isBase) || REGION_NODES[0];

  return (
    <div className="w-full select-none">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <span className="text-xs font-semibold text-purple-400 uppercase tracking-widest block">
          GLOBAL REACH & COLLABORATION
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Building High-Impact Software for Global Founders
        </h2>
        <p className="text-sm sm:text-base text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
          Seamless async delivery and dedicated timezone overlap from our core engineering base.
        </p>
      </div>

      {/* Main Bento Grid Container */}
      <div className="relative w-full bg-[#0E0C1F] border border-purple-500/20 rounded-2xl p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden backdrop-blur-xl">
        
        {/* Dark Grid Overlay & Soft Purple Radial Light */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2d224d15_1px,transparent_1px),linear-gradient(to_bottom,#2d224d15_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          
          {/* LEFT SIDE: Interactive Node Network / Map Graph */}
          <div
            className="lg:col-span-7 w-full aspect-[16/10] sm:aspect-[16/9] relative min-h-[300px] sm:min-h-[340px] bg-[#141029]/60 border border-[#271E42] rounded-xl p-4 overflow-hidden"
            onMouseEnter={() => setIsAutoRotating(false)}
            onMouseLeave={() => setIsAutoRotating(true)}
          >
            {/* SVG Connecting Arc Lines */}
            <svg className="w-full h-full absolute inset-0 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="purpleArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#A78BFA" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#34D399" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {REGION_NODES.filter((n) => !n.isBase).map((targetNode) => {
                const isActive = activeNodeId === targetNode.id || activeNodeId === baseNode.id;
                
                // Calculate curved quadratic control point for smooth arc
                const midX = (baseNode.x + targetNode.x) / 2;
                const midY = (baseNode.y + targetNode.y) / 2 - 12; // curve upwards

                return (
                  <g key={`arc-${targetNode.id}`}>
                    {/* Background Arc */}
                    <path
                      d={`M ${baseNode.x} ${baseNode.y} Q ${midX} ${midY} ${targetNode.x} ${targetNode.y}`}
                      fill="none"
                      stroke={isActive ? "rgba(167, 139, 250, 0.4)" : "rgba(67, 56, 102, 0.25)"}
                      strokeWidth={isActive ? "0.8" : "0.4"}
                      strokeDasharray={isActive ? "none" : "2,2"}
                      className="transition-colors duration-300"
                    />

                    {/* Active Animated Pulse Stroke */}
                    {isActive && (
                      <path
                        d={`M ${baseNode.x} ${baseNode.y} Q ${midX} ${midY} ${targetNode.x} ${targetNode.y}`}
                        fill="none"
                        stroke="url(#purpleArcGrad)"
                        strokeWidth="1.2"
                        strokeDasharray="4,4"
                        className="animate-pulse"
                      />
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Node Dots & Hover Tooltips */}
            {REGION_NODES.map((node) => {
              const isActive = activeNodeId === node.id;

              return (
                <div
                  key={node.id}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onClick={() => setActiveNodeId(node.id)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                >
                  {/* Node Dot Container */}
                  <div className="relative flex items-center justify-center">
                    {/* HQ Base Pulsing Ring */}
                    {node.isBase && (
                      <>
                        <span className="absolute w-8 h-8 rounded-full bg-purple-500/30 animate-ping" />
                        <span className="absolute w-5 h-5 rounded-full bg-emerald-400/30 animate-pulse" />
                      </>
                    )}

                    {/* Active Selection Ring */}
                    {isActive && !node.isBase && (
                      <span className="absolute w-6 h-6 rounded-full bg-purple-400/40 animate-ping" />
                    )}

                    {/* Core Dot */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                        node.isBase
                          ? "bg-emerald-400 ring-4 ring-emerald-500/20 shadow-[0_0_12px_rgba(52,211,153,0.8)]"
                          : isActive
                          ? "bg-purple-400 scale-125 ring-4 ring-purple-500/30 shadow-[0_0_12px_rgba(167,139,250,0.8)]"
                          : "bg-slate-600 hover:bg-purple-400"
                      }`}
                    />
                  </div>

                  {/* Node Label Tooltip Badge */}
                  <div
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 transition-all duration-300 pointer-events-none whitespace-nowrap z-30 ${
                      isActive ? "scale-100 opacity-100" : "scale-95 opacity-80 group-hover:opacity-100 group-hover:scale-100"
                    }`}
                  >
                    <div
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border shadow-lg flex items-center gap-1.5 ${
                        node.isBase
                          ? "bg-emerald-950/90 border-emerald-500/50 text-emerald-300"
                          : isActive
                          ? "bg-purple-950/90 border-purple-500/60 text-purple-200"
                          : "bg-[#140F2D]/90 border-[#2A2148] text-slate-300"
                      }`}
                    >
                      <span>{node.name}</span>
                      <span className="text-[9px] opacity-75 border-l border-current pl-1">{node.overlap}</span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Active Region Status Floating Box at Bottom */}
            <div className="absolute bottom-3 left-3 right-3 bg-[#0F0C22]/90 border border-[#271E42] p-3 rounded-xl backdrop-blur-md flex items-center justify-between z-20 text-xs">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <div>
                  <p className="font-bold text-white text-xs">{activeNode.region}</p>
                  <p className="text-[10px] text-slate-400">{activeNode.tz}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold text-[11px]">
                <Clock className="w-3 h-3 text-purple-400" />
                <span>{activeNode.overlap}</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Content & Bento Trust Cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            {/* Section Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold w-fit">
              <Zap className="w-3.5 h-3.5 text-purple-400" />
              <span>TIMEZONE-ALIGNED DELIVERY</span>
            </div>

            {/* Main Subhead & Description */}
            <div className="space-y-2.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                Collaborate effortlessly across 5+ continents.
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Structured agile workflows, continuous deployment, and guaranteed real-time overlap tailored to your working hours.
              </p>
            </div>

            {/* 2x Bento Micro-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              
              {/* Card 1: 4+ Hours Daily Overlap */}
              <div className="bg-[#16122E]/80 border border-[#2B224B] hover:border-purple-500/40 p-4 rounded-xl space-y-1.5 transition-all group">
                <div className="w-8 h-8 rounded-lg bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Clock className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">4+ Hours Daily Overlap</h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Guaranteed daily sync for US, EU & APAC sprints.
                </p>
              </div>

              {/* Card 2: 100% Async-First Sprints */}
              <div className="bg-[#16122E]/80 border border-[#2B224B] hover:border-purple-500/40 p-4 rounded-xl space-y-1.5 transition-all group">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Rocket className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-bold text-white">100% Async-First Sprints</h4>
                <p className="text-[11px] text-slate-400 leading-normal">
                  Transparent Loom updates, Jira/Linear tracks, and weekly ship cycles.
                </p>
              </div>

            </div>

            {/* Primary CTA Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-600/25 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer group"
              >
                <span>Schedule a Discovery Call</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Multi-Step Discovery Lead Modal */}
      <MultiStepLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        source="Global Network Section"
      />
    </div>
  );
}
