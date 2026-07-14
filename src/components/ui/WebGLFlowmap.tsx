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

  useEffect(() => {
    if (shouldReduceMotion || !ref.current) return;

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

    // Liquid distortion shader — single pass.
    // The flowmap is treated purely as a velocity/displacement buffer. Nothing
    // is drawn from length(flow); instead the velocity advects the sampling
    // domain and a signed refraction ripple is derived from noise gradients
    // along the flow direction, so the result reads as an invisible fluid being
    // disturbed rather than circular blobs.
    const smokeProgram = new Program(gl, {
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
        uniform float uIsDark;
        varying vec2 vUv;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }

        float valueNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = hash(i);
          float b = hash(i + vec2(1.0, 0.0));
          float c = hash(i + vec2(0.0, 1.0));
          float d = hash(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }

        float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < 5; i++) {
            value += amplitude * valueNoise(p);
            p = p * 2.0 + vec2(37.0, 17.0);
            amplitude *= 0.5;
          }
          return value;
        }

        void main() {
          vec4 flow = texture2D(uFlow, vUv);
          vec2 velocity = flow.xy;
          float speed = length(velocity);

          // Advect the sampling domain along the velocity so the fluid appears
          // pushed/displaced by the cursor, stretching with faster motion.
          vec2 uv = vUv - velocity * 0.4;

          // Low-frequency domain warp only breaks up uniformity so the field
          // looks organic rather than like a regular noise grid.
          vec2 warp = vec2(
            fbm(uv * 2.5 + uTime * 0.04),
            fbm(uv * 2.5 - uTime * 0.04 + 7.3)
          );
          vec2 duv = uv * 3.0 + warp * 0.5 + velocity * 6.0;

          // Turbulence body of the fluid; higher velocity injects more variation.
          float turb = fbm(duv);

          // Refraction ripple: signed difference of the noise sampled ahead of
          // and behind the flow direction — a soft lensing highlight with no
          // hard boundary, like light bending through moving water.
          vec2 dir = speed > 0.0001 ? velocity / speed : vec2(0.0);
          float ahead = fbm(duv + dir * 0.4);
          float behind = fbm(duv - dir * 0.4);
          float refractRipple = ahead - behind;

          // Smooth, edgeless falloff — visible only where the field is moving,
          // fully transparent at rest (no fog overlay, no circular mask).
          float influence = smoothstep(0.0, 0.22, speed);
          float body = smoothstep(0.35, 0.85, turb);
          float alpha = influence * (body * 0.22 + abs(refractRipple) * 0.5);

          vec3 lightTint = vec3(0.65, 0.72, 0.95);
          vec3 darkTint = vec3(0.50, 0.65, 1.0);
          vec3 tint = mix(lightTint, darkTint, uIsDark);
          // Ripple brightens one side and darkens the other like refraction.
          vec3 color = tint + refractRipple * 0.4;

          gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.6));
        }
      `,
      uniforms: {
        uFlow: { value: flowmap.uniform },
        uTime: { value: 0 },
        uIsDark: { value: theme === "dark" ? 1.0 : 0.0 },
      },
      transparent: true,
    });

    const smokeMesh = new Mesh(gl, {
      geometry,
      program: smokeProgram,
    });

    smokeMesh.setParent(scene);

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

      // Smooth mouse movement with inertia.
      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      const vx = mouse.x - mouse.lastX;
      const vy = mouse.y - mouse.lastY;

      // Velocity scales with mouse speed so fast movement pushes longer,
      // stronger trails and slow movement leaves subtle wisps.
      const speed = Math.sqrt(vx * vx + vy * vy);
      const velocityStrength = 20.0;

      flowmap.mouse.set(mouse.x, mouse.y);
      flowmap.velocity.set(
        vx * speed * velocityStrength,
        vy * speed * velocityStrength
      );
      flowmap.update();

      smokeProgram.uniforms.uTime.value = t * 0.001;

      renderer.render({ scene, camera });

      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;

      frame = requestAnimationFrame(animate);
    }

    animate(0);

    function resize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      flowmap.aspect = window.innerWidth / window.innerHeight;
    }
    window.addEventListener("resize", resize);

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
  }, [shouldReduceMotion, theme]);

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
