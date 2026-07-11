"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (shouldReduceMotion) {
      return; 
    }

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const spacing = 60; // Same as the original backgroundSize: "60px 60px"
    const hoverRadius = 300;
    const warpStrength = 40; 
    
    type GridNode = { bx: number; by: number; cx: number; cy: number; vx: number; vy: number };

    let cols = 0;
    let rows = 0;
    let nodes: GridNode[][] = [];

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / spacing) + 1;
      rows = Math.ceil(height / spacing) + 1;

      nodes = Array.from({ length: cols }, (_, i) =>
        Array.from({ length: rows }, (__, j) => ({
          bx: i * spacing,
          by: j * spacing,
          cx: i * spacing,
          cy: j * spacing,
          vx: 0,
          vy: 0,
        }))
      );
    };

    window.addEventListener("resize", resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      if (mouse.x === -1000) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }
    };

    const handleMouseLeave = () => {
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const isDark = resolvedTheme === "dark";
    // base grid opacity
    const baseColor = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(15, 23, 42, 0.03)"; 
    const brandColor = [79, 70, 229]; // #4f46e5

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse movement
      if (mouse.targetX !== -1000) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x = -1000;
        mouse.y = -1000;
      }

      // Update nodes physics
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const node = nodes[i][j];

          const dx = mouse.x - node.bx;
          const dy = mouse.y - node.by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = node.bx;
          let targetY = node.by;

          if (dist < hoverRadius && mouse.x !== -1000) {
            const force = Math.pow((hoverRadius - dist) / hoverRadius, 2);
            const angle = Math.atan2(dy, dx);
            targetX = node.bx - Math.cos(angle) * force * warpStrength;
            targetY = node.by - Math.sin(angle) * force * warpStrength;
          }

          // Spring physics
          const ax = (targetX - node.cx) * 0.08;
          const ay = (targetY - node.cy) * 0.08;

          node.vx += ax;
          node.vy += ay;

          // Damping
          node.vx *= 0.75;
          node.vy *= 0.75;

          node.cx += node.vx;
          node.cy += node.vy;
        }
      }

      // Draw normal lines first
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const n1 = nodes[i][j];
          const n2 = nodes[i + 1][j];
          if (i === 0) ctx.moveTo(n1.cx, n1.cy);
          ctx.lineTo(n2.cx, n2.cy);
        }
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const n1 = nodes[i][j];
          const n2 = nodes[i][j + 1];
          if (j === 0) ctx.moveTo(n1.cx, n1.cy);
          ctx.lineTo(n2.cx, n2.cy);
        }
      }
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw radiating glowing lines near mouse
      if (mouse.x !== -1000) {
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols - 1; i++) {
            const n1 = nodes[i][j];
            const n2 = nodes[i + 1][j];
            const midX = (n1.cx + n2.cx) / 2;
            const midY = (n1.cy + n2.cy) / 2;
            
            const dx = mouse.x - midX;
            const dy = mouse.y - midY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < hoverRadius * 1.5) {
               const intensity = Math.pow(Math.max(0, 1 - dist / (hoverRadius * 1.5)), 1.8);
               ctx.beginPath();
               ctx.moveTo(n1.cx, n1.cy);
               ctx.lineTo(n2.cx, n2.cy);
               ctx.strokeStyle = `rgba(${brandColor[0]}, ${brandColor[1]}, ${brandColor[2]}, ${intensity})`;
               ctx.lineWidth = 1 + intensity;
               ctx.stroke();
            }
          }
        }

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows - 1; j++) {
            const n1 = nodes[i][j];
            const n2 = nodes[i][j + 1];
            const midX = (n1.cx + n2.cx) / 2;
            const midY = (n1.cy + n2.cy) / 2;
            
            const dx = mouse.x - midX;
            const dy = mouse.y - midY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < hoverRadius * 1.5) {
               const intensity = Math.pow(Math.max(0, 1 - dist / (hoverRadius * 1.5)), 1.8);
               ctx.beginPath();
               ctx.moveTo(n1.cx, n1.cy);
               ctx.lineTo(n2.cx, n2.cy);
               ctx.strokeStyle = `rgba(${brandColor[0]}, ${brandColor[1]}, ${brandColor[2]}, ${intensity})`;
               ctx.lineWidth = 1 + intensity;
               ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme, shouldReduceMotion]);

  if (shouldReduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
