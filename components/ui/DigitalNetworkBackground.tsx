"use client";

import React, { useEffect, useRef } from "react";

export default function DigitalNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      pulseSpeed: number;
      pulseDirection: number;
      pulseVal: number;
    }> = [];

    // Check system preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || 600;
      initParticles();
    };

    // Initialize particles based on screen width
    const initParticles = () => {
      particles = [];
      const isMobile = window.innerWidth < 768;
      // 30 particles on desktop, 12 on mobile to preserve Core Web Vitals
      const particleCount = isMobile ? 12 : 30;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // Extremely slow velocity (0.15px max per frame) for minimal distraction
          vx: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.3,
          vy: prefersReducedMotion ? 0 : (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 2 + 1.5,
          pulseSpeed: Math.random() * 0.015 + 0.005,
          pulseDirection: Math.random() > 0.5 ? 1 : -1,
          pulseVal: Math.random(),
        });
      }
    };

    // Animation Loop
    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const maxDistance = 120;

      // Update and draw particles
      particles.forEach((p) => {
        // Move particle
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary bounce
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        // Slow pulsing glow
        p.pulseVal += p.pulseSpeed * p.pulseDirection;
        if (p.pulseVal > 1 || p.pulseVal < 0.2) {
          p.pulseDirection *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        // Subtle grey-blue nodes with pulsing opacity
        ctx.fillStyle = `rgba(37, 99, 235, ${p.pulseVal * 0.08})`;
        ctx.fill();
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            // Line opacity fades as distance increases
            const opacity = (1 - dist / maxDistance) * 0.06;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${opacity})`;
            ctx.lineWidth = 0.55;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.85] z-0"
    />
  );
}
