import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9990] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center gap-4 transition-all duration-300">
      {/* Sleek Joy Digital Pulse Loader */}
      <div className="relative flex items-center justify-center">
        <div className="w-14 h-14 rounded-full border-3 border-slate-100 border-t-primary animate-spin" />
        <div className="absolute w-7 h-7 rounded-full bg-primary/10 animate-ping" />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="font-extrabold text-sm text-slate-900 tracking-tight">
          Joy<span className="text-primary">Digital</span>
        </span>
        <span className="text-[10px] font-black text-slate-400 animate-pulse uppercase tracking-widest">
          Loading Page...
        </span>
      </div>
    </div>
  );
}
