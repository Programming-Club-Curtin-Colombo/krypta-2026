"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { useReducedMotion } from "framer-motion";

// ── Module-level constants ────────────────────────────────────────────────────
// Avoids per-frame / per-effect object allocations.
const GRID_SPACING = 60; // matches backgroundSize: "60px 60px" fallback
const HOVER_RADIUS = 300;
const HOVER_RADIUS_SQ = HOVER_RADIUS * HOVER_RADIUS;
const WARP_STRENGTH = 40;
const GLOW_RADIUS_FACTOR = 1.5;
const BRAND_COLOR = [79, 70, 229] as const; // #4f46e5

type GridNode = { bx: number; by: number; cx: number; cy: number; vx: number; vy: number };

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (shouldReduceMotion) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let nodes: GridNode[][] = [];

    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000 };

    const baseColor =
      resolvedTheme === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(15, 23, 42, 0.03)";

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / GRID_SPACING) + 1;
      rows = Math.ceil(height / GRID_SPACING) + 1;

      nodes = Array.from({ length: cols }, (_, i) =>
        Array.from({ length: rows }, (__, j) => ({
          bx: i * GRID_SPACING,
          by: j * GRID_SPACING,
          cx: i * GRID_SPACING,
          cy: j * GRID_SPACING,
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

    // ── Draws glowing brand-colored lines near the mouse cursor ──────────────
    // Extracted to eliminate the duplicate horizontal/vertical loop bodies.
    const drawGlowLines = (
      n1: GridNode | undefined,
      n2: GridNode | undefined
    ) => {
      if (!n1 || !n2) return;
      const midX = (n1.cx + n2.cx) / 2;
      const midY = (n1.cy + n2.cy) / 2;
      const dx = mouse.x - midX;
      const dy = mouse.y - midY;
      const dist2 = dx * dx + dy * dy;
      const glowRadius = HOVER_RADIUS * GLOW_RADIUS_FACTOR;
      if (dist2 < glowRadius * glowRadius) {
        const intensity = Math.pow(
          Math.max(0, 1 - Math.sqrt(dist2) / glowRadius),
          1.8
        );
        ctx.beginPath();
        ctx.moveTo(n1.cx, n1.cy);
        ctx.lineTo(n2.cx, n2.cy);
        ctx.strokeStyle = `rgba(${BRAND_COLOR[0]}, ${BRAND_COLOR[1]}, ${BRAND_COLOR[2]}, ${intensity})`;
        ctx.lineWidth = 1 + intensity;
        ctx.stroke();
      }
    };

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

      const mouseActive = mouse.x !== -1000;

      // Update node physics — use squared distance to avoid sqrt in the hot path.
      // sqrt is only computed when the node is confirmed to be inside the radius.
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const node = nodes[i]?.[j];
          if (!node) continue;

          let targetX = node.bx;
          let targetY = node.by;

          if (mouseActive) {
            const dx = mouse.x - node.bx;
            const dy = mouse.y - node.by;
            const dist2 = dx * dx + dy * dy;

            if (dist2 < HOVER_RADIUS_SQ) {
              const dist = Math.sqrt(dist2);
              const force = Math.pow((HOVER_RADIUS - dist) / HOVER_RADIUS, 2);
              const angle = Math.atan2(dy, dx);
              targetX = node.bx - Math.cos(angle) * force * WARP_STRENGTH;
              targetY = node.by - Math.sin(angle) * force * WARP_STRENGTH;
            }
          }

          // Spring physics
          node.vx += (targetX - node.cx) * 0.08;
          node.vy += (targetY - node.cy) * 0.08;
          // Damping
          node.vx *= 0.75;
          node.vy *= 0.75;
          node.cx += node.vx;
          node.cy += node.vy;
        }
      }

      // Draw base grid lines
      ctx.beginPath();
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const n1 = nodes[i]?.[j];
          const n2 = nodes[i + 1]?.[j];
          if (!n1 || !n2) continue;
          if (i === 0) ctx.moveTo(n1.cx, n1.cy);
          ctx.lineTo(n2.cx, n2.cy);
        }
      }
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows - 1; j++) {
          const n1 = nodes[i]?.[j];
          const n2 = nodes[i]?.[j + 1];
          if (!n1 || !n2) continue;
          if (j === 0) ctx.moveTo(n1.cx, n1.cy);
          ctx.lineTo(n2.cx, n2.cy);
        }
      }
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw radiating glow lines near mouse
      if (mouseActive) {
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols - 1; i++) {
            drawGlowLines(nodes[i]?.[j], nodes[i + 1]?.[j]);
          }
        }
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows - 1; j++) {
            drawGlowLines(nodes[i]?.[j], nodes[i]?.[j + 1]);
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
          backgroundSize: `${GRID_SPACING}px ${GRID_SPACING}px`,
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
