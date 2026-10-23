"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "@/context/ThemeContext";

export default function HeroCanvasOptionA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const isLight = theme === "light";

    const uniforms = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIsLight: { value: isLight ? 1.0 : 0.0 },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    // Custom GLSL Shader: Smooth circular metaballs + concentric liquid glass rings
    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uIsLight;

      void main() {
        vec2 uv = vUv - 0.5;
        float aspect = uResolution.x / max(uResolution.y, 1.0);
        uv.x *= aspect;

        vec2 mouse = (uMouse - 0.5);
        mouse.x *= aspect;

        // 5 Organic Circular Orbs (Metaballs)
        vec2 c1 = vec2(sin(uTime * 0.45) * 0.38, cos(uTime * 0.35) * 0.24);
        vec2 c2 = vec2(cos(uTime * 0.32 + 1.4) * 0.45, sin(uTime * 0.5 + 0.8) * 0.28);
        vec2 c3 = vec2(sin(uTime * 0.28 + 3.1) * 0.30, cos(uTime * 0.42 + 2.2) * 0.32);
        vec2 c4 = mouse * 0.65;
        vec2 c5 = vec2(cos(uTime * 0.55) * 0.22, sin(uTime * 0.38) * 0.18) - mouse * 0.25;

        float d1 = length(uv - c1);
        float d2 = length(uv - c2);
        float d3 = length(uv - c3);
        float d4 = length(uv - c4);
        float d5 = length(uv - c5);

        // Smooth Metaball potential field
        float field = 0.0;
        field += 0.045 / (d1 * d1 + 0.065);
        field += 0.040 / (d2 * d2 + 0.070);
        field += 0.035 / (d3 * d3 + 0.060);
        field += 0.048 / (d4 * d4 + 0.055);
        field += 0.030 / (d5 * d5 + 0.065);

        // Crisp circular isolines (liquid glass refraction rings)
        float blobCore = smoothstep(1.35, 2.6, field);
        float blobRim = smoothstep(1.65, 1.85, field) - smoothstep(1.85, 2.08, field);
        float outerHalo = smoothstep(0.75, 1.65, field) - smoothstep(1.65, 2.4, field);

        // Subtle concentric circular radar wave from center
        float centerDist = length(uv);
        float ring1 = smoothstep(0.38, 0.383, centerDist) - smoothstep(0.383, 0.386, centerDist);
        float ring2 = smoothstep(0.62, 0.623, centerDist) - smoothstep(0.623, 0.626, centerDist);
        float rings = (ring1 + ring2) * 0.18;

        // Palette: #0A312D (Shade) & #11FFA1 (Mint Accent)
        vec3 shadeColor = vec3(0.039, 0.192, 0.176);
        vec3 mintColor = vec3(0.067, 1.0, 0.631);

        vec3 darkColor = shadeColor * outerHalo * 1.4
                       + mix(shadeColor, mintColor, 0.45) * blobCore * 0.55
                       + mintColor * blobRim * 0.65
                       + mintColor * rings;

        float alphaDark = clamp(outerHalo * 0.55 + blobCore * 0.45 + blobRim * 0.5 + rings, 0.0, 0.85);

        // Light mode: Clean, luminous mint orbs with ZERO dark aureoles/halos/rings
        // We completely zero out outerHalo and rings in light mode so there is NO dark contour
        vec3 lightCore = vec3(0.067, 1.0, 0.631); // Pure bright mint
        vec3 lightRim  = vec3(0.04, 0.72, 0.48);  // Fresh crisp mint-emerald
        vec3 lightColor = mix(lightCore, lightRim, blobRim);
        
        // Only render the core and soft rim of the circle, strictly no dark halo
        float alphaLight = clamp(blobCore * 0.45 + blobRim * 0.35, 0.0, 0.65);

        vec3 finalColor = mix(darkColor, lightColor, uIsLight);
        float finalAlpha = mix(alphaDark, alphaLight, uIsLight);

        // Circular vignette fade at edges
        float vignette = 1.0 - smoothstep(0.45, 1.15, centerDist);
        gl_FragColor = vec4(finalColor, finalAlpha * vignette);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let targetX = 0.5;
    let targetY = 0.5;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      targetY = 1.0 - (event.clientY - rect.top) / Math.max(rect.height, 1);
    };

    const handleResize = () => {
      if (!container) return;
      renderer.setSize(container.clientWidth, container.clientHeight);
      uniforms.uResolution.value.set(
        container.clientWidth,
        container.clientHeight
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    let animationFrameId: number;
    const timer = new THREE.Timer();

    const animate = (timestamp?: number) => {
      animationFrameId = requestAnimationFrame(animate);
      timer.update(timestamp);
      uniforms.uTime.value = timer.getElapsed();
      uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.04;
      uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.04;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
