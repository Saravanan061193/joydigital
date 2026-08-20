"use client";

import React, { useEffect, useRef, useState } from "react";

export default function DigitalNetworkBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Determine user reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
  }, []);

  // 1. Mouse Interaction (Lerp-smoothed offset, Desktop only, 5-10px max range)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Scale translation offset to maximum 8px
      const dx = (e.clientX - window.innerWidth / 2) * 0.008;
      const dy = (e.clientY - window.innerHeight / 2) * 0.008;
      targetX = Math.max(-8, Math.min(8, dx));
      targetY = Math.max(-8, Math.min(8, dy));
    };

    const updatePosition = () => {
      // Lerp smoothing (10% interpolation per frame)
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updatePosition);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  // 2. Scroll Interaction (Fade out background effects on scroll)
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const scrollY = window.scrollY;
        // Fade opacity down to 0.15 at 600px scrolled
        containerRef.current.style.opacity = `${Math.max(0.15, 1 - scrollY / 600)}`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 3. Canvas Network Particles and Abstract Global Connection Paths
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
      pulseVal: number;
      pulseSpeed: number;
    }> = [];

    // Global curved connection paths (Base India to international nodes)
    let globalPaths: Array<{
      startX: number;
      startY: number;
      endX: number;
      endY: number;
      cpX: number;
      cpY: number;
      progress: number;
      speed: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 650;
      initNetwork();
    };

    const initNetwork = () => {
      particles = [];
      globalPaths = [];

      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 12 : 28;

      const w = canvas.width;
      const h = canvas.height;

      // Concentration: Bias 70% of particles to the Left and Center
      for (let i = 0; i < count; i++) {
        const isLeftBiased = Math.random() < 0.70;
        const x = isLeftBiased 
          ? Math.random() * w * 0.55 // Left / center quadrant
          : w * 0.55 + Math.random() * w * 0.45; // Right quadrant

        particles.push({
          x,
          y: Math.random() * h,
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.18,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.18,
          radius: Math.random() * 2 + 1.2,
          baseOpacity: Math.random() * 0.12 + 0.05,
          pulseVal: Math.random(),
          pulseSpeed: Math.random() * 0.01 + 0.004,
        });
      }

      // Initialize 4 abstract curved pathways (India to Global, India is around x:50%, y:65%)
      const indiaX = w * 0.48;
      const indiaY = h * 0.62;

      const targets = [
        { x: w * 0.15, y: h * 0.35, cpX: w * 0.3, cpY: h * 0.1 }, // US route
        { x: w * 0.33, y: h * 0.28, cpX: w * 0.38, cpY: h * 0.15 }, // UK/EU route
        { x: w * 0.78, y: h * 0.75, cpX: w * 0.65, cpY: h * 0.8 }, // Australia route
        { x: w * 0.62, y: h * 0.58, cpX: w * 0.55, cpY: h * 0.48 }, // SG route
      ];

      targets.forEach((t) => {
        globalPaths.push({
          startX: indiaX,
          startY: indiaY,
          endX: t.x,
          endY: t.y,
          cpX: t.cpX,
          cpY: t.cpY,
          progress: Math.random(),
          speed: Math.random() * 0.0035 + 0.0015,
        });
      });
    };

    // Calculate bezier coordinates
    const getQuadraticBezierXY = (t: number, sx: number, sy: number, cx: number, cy: number, ex: number, ey: number) => {
      const x = (1 - t) * (1 - t) * sx + 2 * (1 - t) * t * cx + t * t * ex;
      const y = (1 - t) * (1 - t) * sy + 2 * (1 - t) * t * cy + t * t * ey;
      return { x, y };
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const formThreshold = w * 0.55; // Form begins around right 45%

      // A. Draw curved international pathways
      globalPaths.forEach((path) => {
        ctx.beginPath();
        ctx.moveTo(path.startX, path.startY);
        ctx.quadraticCurveTo(path.cpX, path.cpY, path.endX, path.endY);
        // Very thin, low opacity purple connection lines
        ctx.strokeStyle = "rgba(167, 139, 250, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Animate flowing light points along the path
        if (!prefersReducedMotion) {
          path.progress += path.speed;
          if (path.progress > 1) {
            path.progress = 0;
          }
        }

        const point = getQuadraticBezierXY(
          path.progress,
          path.startX,
          path.startY,
          path.cpX,
          path.cpY,
          path.endX,
          path.endY
        );

        // Draw light packet dot (reduce opacity if near form area)
        const isNearForm = point.x > formThreshold;
        const ptOpacity = isNearForm ? 0.02 : 0.22;

        ctx.beginPath();
        ctx.arc(point.x, point.y, 2.0, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${ptOpacity})`;
        ctx.fill();

        // Pulsing glow ring around target nodes
        ctx.beginPath();
        ctx.arc(path.endX, path.endY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124, 58, 237, ${isNearForm ? 0.01 : 0.08})`;
        ctx.fill();
      });

      // B. Draw particles
      particles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary bounce
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }

        // Slow pulsing base glow
        p.pulseVal += p.pulseSpeed;
        const opacityMultiplier = 0.5 + Math.sin(p.pulseVal) * 0.5;

        // Protection: Reduce opacity by 80% if the node crosses behind the right form area
        const isInProtectedArea = p.x > formThreshold;
        const opacity = isInProtectedArea 
          ? p.baseOpacity * opacityMultiplier * 0.15
          : p.baseOpacity * opacityMultiplier;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167, 139, 250, ${opacity})`;
        ctx.fill();
      });

      // C. Draw particle connections (Only connect nodes that are not inside form area)
      const maxDist = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          // Form Protection: Draw no lines in the right section to keep it clean
          if (p1.x > formThreshold && p2.x > formThreshold) continue;

          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const isCrossingFormEdge = p1.x > formThreshold || p2.x > formThreshold;
            const lineOpacity = isCrossingFormEdge
              ? (1 - dist / maxDist) * 0.01 // barely visible
              : (1 - dist / maxDist) * 0.045; // standard faint link

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${lineOpacity})`;
            ctx.lineWidth = 0.45;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-[#171126] transition-opacity duration-300 ease-out"
    >
      {/* Styles for slow CSS blobs and breathing heading glow */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes auroraBlob1 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(40px, -30px) scale(1.06); }
          66% { transform: translate(-25px, 20px) scale(0.94); }
        }
        @keyframes auroraBlob2 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-30px, 40px) scale(0.96); }
        }
        @keyframes auroraBlob3 {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          45% { transform: translate(25px, 15px) scale(1.03); }
          85% { transform: translate(-15px, -25px) scale(0.97); }
        }
        @keyframes headingGlowBreathe {
          0%, 100% { opacity: 0.55; }
          50% { opacity: 1.0; }
        }
        .animate-aurora-1 {
          animation: auroraBlob1 32s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-aurora-2 {
          animation: auroraBlob2 28s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-aurora-3 {
          animation: auroraBlob3 36s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-heading-breathe {
          animation: headingGlowBreathe 10s ease-in-out infinite;
        }
      ` }} />

      {/* GPU-Accelerated Gradient Aurora Blobs (concentrated left/center, low opacity) */}
      {!prefersReducedMotion && (
        <>
          <div className="absolute top-[8%] left-[6%] w-[55vw] h-[55vw] rounded-full bg-[#7C3AED]/7 blur-[110px] animate-aurora-1 pointer-events-none" />
          <div className="absolute bottom-[15%] left-[12%] w-[45vw] h-[45vw] rounded-full bg-[#4F46E5]/5 blur-[130px] animate-aurora-2 pointer-events-none" />
          <div className="absolute top-[25%] left-[25%] w-[35vw] h-[35vw] rounded-full bg-[#A78BFA]/4 blur-[100px] animate-aurora-3 pointer-events-none" />
        </>
      )}

      {/* Static purple fallback when prefers-reduced-motion is active */}
      {prefersReducedMotion && (
        <div className="absolute top-[10%] left-[10%] w-[50vw] h-[50vw] rounded-full bg-[#7C3AED]/7 blur-[110px] pointer-events-none" />
      )}

      {/* Soft Breathing Glow behind Hero Heading (radial opacity 10% to 18%) */}
      <div 
        className="absolute top-[18%] left-[12%] w-[42vw] h-[35vw] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.18),transparent_60%)] animate-heading-breathe pointer-events-none opacity-[0.18]" 
        style={{ mixBlendMode: "screen" }}
      />

      {/* Canvas layer for connection nodes particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-[0.85] pointer-events-none" 
      />
    </div>
  );
}
