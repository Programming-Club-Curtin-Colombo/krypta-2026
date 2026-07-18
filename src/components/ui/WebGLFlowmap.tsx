"use client";

import { useEffect, useRef } from "react";
import {
  Renderer,
  Camera,
  Geometry,
  Program,
  Mesh,
  Flowmap,
  Transform,
} from "ogl";
import { useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";

export function WebGLFlowmap() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { theme } = useTheme();

  // Disable WebGLFlowmap by default to save resources
  // Enable only if explicitly needed via environment variable
  const enableWebGL = process.env.NEXT_PUBLIC_ENABLE_WEBGL === "true";

  useEffect(() => {
    if (shouldReduceMotion || !ref.current || !enableWebGL) return;

    const container = ref.current;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: Math.min(window.devicePixelRatio, 2),
    });

    const gl = renderer.gl;

    renderer.setSize(window.innerWidth, window.innerHeight);
    gl.clearColor(0, 0, 0, 0);
    container.appendChild(gl.canvas);

    const camera = new Camera(gl);
    camera.position.z = 1;

    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: {
        size: 2,
        data: new Float32Array([
          -1, -1,
          3, -1,
          -1, 3
        ])
      }
    });

    const flowmap = new Flowmap(gl, {
      falloff: 0.25,
      alpha: 0.8,
      dissipation: 0.92
    });

    flowmap.aspect = window.innerWidth / window.innerHeight;

    const mouse = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      lastX: 0.5,
      lastY: 0.5
    };

    // Refraction shader - creates liquid glass distortion effect
    const refractionProgram = new Program(gl, {
      vertex: `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D uFlow;
        uniform float uTime;
        varying vec2 vUv;

        // Simple hash function
        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

        // Smooth noise for glass texture
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          return mix(
            mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
            mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
            f.y
          );
        }

        void main() {
          vec4 flow = texture2D(uFlow, vUv);
          vec2 velocity = flow.xy;
          float speed = length(velocity);

          // Calculate distortion strength based on velocity
          float distortionStrength = 0.25;
          vec2 displacement = velocity * distortionStrength;

          // Chromatic aberration - RGB splitting
          float aberrationStrength = 0.015;
          vec2 uvRed = vUv + displacement * aberrationStrength;
          vec2 uvGreen = vUv + displacement * aberrationStrength * 0.5;
          vec2 uvBlue = vUv - displacement * aberrationStrength;

          // Sample noise at displaced coordinates for glass texture
          float noiseRed = noise(uvRed * 8.0);
          float noiseGreen = noise(uvGreen * 8.0);
          float noiseBlue = noise(uvBlue * 8.0);

          // Create subtle refraction pattern
          float refraction = (noiseRed + noiseGreen + noiseBlue) / 3.0;

          // Fresnel-like edge effect
          float fresnel = smoothstep(0.0, 0.3, speed) * 0.5;

          // Calculate visibility based on velocity
          float visibility = smoothstep(0.01, 0.15, speed);

          // Glass-like color - subtle blue tint
          vec3 glassColor = vec3(0.95, 0.97, 1.0);
          
          // Add brightness variation from refraction
          glassColor *= 0.9 + 0.2 * refraction;

          // Combine with fresnel edge
          glassColor += fresnel * 0.1;

          // Very subtle alpha for glass effect
          float alpha = visibility * 0.08;

          gl_FragColor = vec4(glassColor, alpha);
        }
      `,
      uniforms: {
        uFlow: { value: flowmap.uniform },
        uTime: { value: 0 }
      }
    });

    const refractionMesh = new Mesh(gl, {
      geometry,
      program: refractionProgram
    });

    refractionMesh.setParent(scene);

    function move(e: MouseEvent) {
      mouse.targetX = e.clientX / window.innerWidth;
      mouse.targetY = 1 - e.clientY / window.innerHeight;
    }

    window.addEventListener("mousemove", move);

    let frame: number;
    let isHidden = false;

    function animate(t: number) {
      if (isHidden) {
        frame = requestAnimationFrame(animate);
        return;
      }

      // Smooth mouse movement with inertia
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const vx = mouse.x - mouse.lastX;
      const vy = mouse.y - mouse.lastY;

      const velocityStrength = 8.0;
      flowmap.mouse.set(mouse.x, mouse.y);
      flowmap.velocity.set(vx * velocityStrength, vy * velocityStrength);
      flowmap.update();

      // Update refraction time
      refractionProgram.uniforms.uTime.value = t * 0.001;

      // Single render pass - glass refraction
      renderer.render({ scene, camera });

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      frame = requestAnimationFrame(animate);
    }

    animate(0);

    // Resize handler
    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      flowmap.aspect = window.innerWidth / window.innerHeight;
    }
    window.addEventListener("resize", resize);

    // Visibility handler
    function visibilityChange() {
      isHidden = document.hidden;
    }
    document.addEventListener("visibilitychange", visibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", visibilityChange);
      
      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
  }, [shouldReduceMotion, theme, enableWebGL]);

  if (shouldReduceMotion) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="
        fixed inset-0
        pointer-events-none
        z-[9999]
      "
    />
  );
}