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

export function WebGLFlowmap() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Disable WebGLFlowmap by default to save resources.
  // Enable only if explicitly needed via environment variable.
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
        data: new Float32Array([-1, -1, 3, -1, -1, 3]),
      },
    });

    const flowmap = new Flowmap(gl, {
      falloff: 0.25,
      alpha: 0.8,
      dissipation: 0.92,
    });

    flowmap.aspect = window.innerWidth / window.innerHeight;

    const mouse = {
      x: 0.5,
      y: 0.5,
      targetX: 0.5,
      targetY: 0.5,
      lastX: 0.5,
      lastY: 0.5,
    };

    // Refraction shader — creates liquid glass distortion effect
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

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }

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

          float distortionStrength = 0.25;
          vec2 displacement = velocity * distortionStrength;

          float aberrationStrength = 0.015;
          vec2 uvRed   = vUv + displacement * aberrationStrength;
          vec2 uvGreen = vUv + displacement * aberrationStrength * 0.5;
          vec2 uvBlue  = vUv - displacement * aberrationStrength;

          float noiseRed   = noise(uvRed   * 8.0);
          float noiseGreen = noise(uvGreen * 8.0);
          float noiseBlue  = noise(uvBlue  * 8.0);

          float refraction = (noiseRed + noiseGreen + noiseBlue) / 3.0;
          float fresnel    = smoothstep(0.0, 0.3, speed) * 0.5;
          float visibility = smoothstep(0.01, 0.15, speed);

          vec3 glassColor = vec3(0.95, 0.97, 1.0);
          glassColor *= 0.9 + 0.2 * refraction;
          glassColor += fresnel * 0.1;

          gl_FragColor = vec4(glassColor, visibility * 0.08);
        }
      `,
      uniforms: {
        uFlow: { value: flowmap.uniform },
        uTime: { value: 0 },
      },
    });

    const refractionMesh = new Mesh(gl, {
      geometry,
      program: refractionProgram,
    });
    refractionMesh.setParent(scene);

    function move(e: MouseEvent) {
      mouse.targetX = e.clientX / window.innerWidth;
      mouse.targetY = 1 - e.clientY / window.innerHeight;
    }
    window.addEventListener("mousemove", move);

    let frame: number;
    let isPaused = false;

    function animate(t: number) {
      frame = requestAnimationFrame(animate);

      if (isPaused) return;

      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const vx = mouse.x - mouse.lastX;
      const vy = mouse.y - mouse.lastY;

      flowmap.mouse.set(mouse.x, mouse.y);
      flowmap.velocity.set(vx * 8.0, vy * 8.0);
      flowmap.update();

      refractionProgram.uniforms.uTime.value = t * 0.001;
      renderer.render({ scene, camera });

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    }

    animate(0);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      flowmap.aspect = window.innerWidth / window.innerHeight;
    }
    window.addEventListener("resize", resize);

    // Fully pause the rAF loop when the tab is hidden to free the GPU thread.
    function handleVisibilityChange() {
      isPaused = document.hidden;
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (container.contains(gl.canvas)) {
        container.removeChild(gl.canvas);
      }
    };
    // theme intentionally omitted: the effect does not adapt to theme changes.
    // Including it would cause a full WebGL context teardown on every theme toggle.
  }, [shouldReduceMotion, enableWebGL]);

  if (shouldReduceMotion || !enableWebGL) {
    return null;
  }

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}