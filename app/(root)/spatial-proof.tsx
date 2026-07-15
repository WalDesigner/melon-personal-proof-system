"use client";

import {
  Check,
  Code2,
  MessageSquareText,
  Network,
  Target,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const nodes = [
  {
    label: "客户沟通",
    statement: "把客户诉求，还原成真实业务问题",
    className: "spatial-node-one",
    icon: MessageSquareText,
    target: [0, 1.12, 0.18],
  },
  {
    label: "业务判断",
    statement: "判断场景价值、优先级与投入边界",
    className: "spatial-node-two",
    icon: Target,
    target: [1.2, 0.24, 0.22],
  },
  {
    label: "方案设计",
    statement: "连接能力、数据、系统与交付路径",
    className: "spatial-node-three",
    icon: Network,
    target: [0.87, -0.92, 0.14],
  },
  {
    label: "产品实现",
    statement: "把抽象方案，做成可操作的原型",
    className: "spatial-node-four",
    icon: Code2,
    target: [-0.87, -0.92, 0.14],
  },
  {
    label: "交付闭环",
    statement: "让过程可跟进，结果可验收、可复盘",
    className: "spatial-node-five",
    icon: Check,
    target: [-1.2, 0.24, 0.22],
  },
] as const;

const PARTICLE_COUNT = 300;

function createGlowTexture() {
  const textureCanvas = document.createElement("canvas");
  textureCanvas.width = 64;
  textureCanvas.height = 64;
  const context = textureCanvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.18, "rgba(190,255,245,.96)");
  gradient.addColorStop(0.52, "rgba(72,214,191,.34)");
  gradient.addColorStop(1, "rgba(72,214,191,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(textureCanvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function SpatialProof() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef<number | null>(null);
  const [active, setActive] = useState<number | null>(null);

  const selectNode = (index: number | null) => {
    activeRef.current = index;
    setActive(index);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas,
        powerPreference: "high-performance",
      });
    } catch {
      wrapper.classList.add("is-webgl-fallback");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0, 6.1);
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const world = new THREE.Group();
    scene.add(world);

    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const clusterTargets = nodes.map(() => new Float32Array(PARTICLE_COUNT * 3));
    const teal = new THREE.Color("#66f1d7");
    const blue = new THREE.Color("#75a9ff");

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const y = 1 - (index / (PARTICLE_COUNT - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const angle = Math.PI * (3 - Math.sqrt(5)) * index;
      const radius = 1.82 + Math.sin(index * 1.73) * 0.11;
      const x = Math.cos(angle) * radiusAtY * radius;
      const z = Math.sin(angle) * radiusAtY * radius;
      const offset = index * 3;

      basePositions[offset] = x;
      basePositions[offset + 1] = y * radius;
      basePositions[offset + 2] = z;
      positions[offset] = x;
      positions[offset + 1] = y * radius;
      positions[offset + 2] = z;

      const color = index % 5 === 0 ? blue : teal;
      const shade = 0.62 + ((index * 17) % 31) / 80;
      colors[offset] = color.r * shade;
      colors[offset + 1] = color.g * shade;
      colors[offset + 2] = color.b * shade;

      nodes.forEach((node, nodeIndex) => {
        const target = clusterTargets[nodeIndex];
        const orbit = index * 2.39996 + nodeIndex * 0.7;
        const clusterRadius = 0.14 + ((index * 29) % 71) / 150;
        const depth = Math.sin(index * 1.91 + nodeIndex) * 0.28;
        target[offset] = node.target[0] + Math.cos(orbit) * clusterRadius;
        target[offset + 1] = node.target[1] + Math.sin(orbit) * clusterRadius * 0.62;
        target[offset + 2] = node.target[2] + depth;
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    const positionAttribute = new THREE.BufferAttribute(positions, 3);
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    particleGeometry.setAttribute("position", positionAttribute);
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const glowTexture = createGlowTexture();
    const particleMaterial = new THREE.PointsMaterial({
      blending: THREE.AdditiveBlending,
      color: 0xffffff,
      depthWrite: false,
      map: glowTexture ?? undefined,
      opacity: 0.92,
      size: 0.105,
      transparent: true,
      vertexColors: true,
    });
    const points = new THREE.Points(particleGeometry, particleMaterial);
    world.add(points);

    const connectionPairs: Array<[number, number]> = [];
    for (let index = 0; index < PARTICLE_COUNT; index += 2) {
      connectionPairs.push([index, (index + 13) % PARTICLE_COUNT]);
      if (index % 4 === 0) connectionPairs.push([index, (index + 34) % PARTICLE_COUNT]);
    }
    const linePositions = new Float32Array(connectionPairs.length * 6);
    const lineGeometry = new THREE.BufferGeometry();
    const lineAttribute = new THREE.BufferAttribute(linePositions, 3);
    lineAttribute.setUsage(THREE.DynamicDrawUsage);
    lineGeometry.setAttribute("position", lineAttribute);
    const lineMaterial = new THREE.LineBasicMaterial({
      blending: THREE.AdditiveBlending,
      color: 0x62d9c6,
      depthWrite: false,
      opacity: 0.18,
      transparent: true,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    world.add(lines);

    const ringGroup = new THREE.Group();
    const rings: THREE.Mesh[] = [];
    [1.96, 2.16, 2.38].forEach((radius, index) => {
      const geometry = new THREE.TorusGeometry(radius, 0.006 + index * 0.002, 8, 160);
      const material = new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: index === 1 ? 0x6ea8ff : 0x4ddfc5,
        opacity: 0.13 - index * 0.025,
        transparent: true,
      });
      const ring = new THREE.Mesh(geometry, material);
      ring.rotation.x = Math.PI / 2 + index * 0.42;
      ring.rotation.y = index * 0.36;
      rings.push(ring);
      ringGroup.add(ring);
    });
    world.add(ringGroup);

    let pointerTargetX = 0;
    let pointerTargetY = 0;
    let pointerX = 0;
    let pointerY = 0;
    let morph = 0;
    let frame = 0;
    let previousTime = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = wrapper.getBoundingClientRect();
      pointerTargetX = ((event.clientX - rect.left) / rect.width - 0.5) * 0.55;
      pointerTargetY = ((event.clientY - rect.top) / rect.height - 0.5) * 0.34;
    };

    const onPointerLeave = () => {
      pointerTargetX = 0;
      pointerTargetY = 0;
      selectNode(null);
    };

    const render = (time: number) => {
      const delta = Math.min(32, time - previousTime || 16.7);
      previousTime = time;
      const activeIndex = activeRef.current;
      const targetMorph = activeIndex === null ? 0 : 1;
      morph += (targetMorph - morph) * (1 - Math.pow(0.958, delta / 16.7));
      pointerX += (pointerTargetX - pointerX) * 0.045;
      pointerY += (pointerTargetY - pointerY) * 0.045;

      for (let index = 0; index < PARTICLE_COUNT; index += 1) {
        const offset = index * 3;
        const anchorParticle = index % 7 === 0;
        const cluster = activeIndex === null ? null : clusterTargets[activeIndex];
        const gatherStrength = anchorParticle ? morph * 0.52 : morph;
        const targetX = cluster
          ? basePositions[offset] + (cluster[offset] - basePositions[offset]) * gatherStrength
          : basePositions[offset];
        const targetY = cluster
          ? basePositions[offset + 1] + (cluster[offset + 1] - basePositions[offset + 1]) * gatherStrength
          : basePositions[offset + 1];
        const targetZ = cluster
          ? basePositions[offset + 2] + (cluster[offset + 2] - basePositions[offset + 2]) * gatherStrength
          : basePositions[offset + 2];
        const ease = activeIndex === null ? 0.036 : 0.045;
        positions[offset] += (targetX - positions[offset]) * ease;
        positions[offset + 1] += (targetY - positions[offset + 1]) * ease;
        positions[offset + 2] += (targetZ - positions[offset + 2]) * ease;
      }
      positionAttribute.needsUpdate = true;

      connectionPairs.forEach(([first, second], index) => {
        const lineOffset = index * 6;
        const firstOffset = first * 3;
        const secondOffset = second * 3;
        linePositions[lineOffset] = positions[firstOffset];
        linePositions[lineOffset + 1] = positions[firstOffset + 1];
        linePositions[lineOffset + 2] = positions[firstOffset + 2];
        linePositions[lineOffset + 3] = positions[secondOffset];
        linePositions[lineOffset + 4] = positions[secondOffset + 1];
        linePositions[lineOffset + 5] = positions[secondOffset + 2];
      });
      lineAttribute.needsUpdate = true;

      if (!reducedMotion) {
        if (activeIndex === null) {
          world.rotation.y += 0.0026 * (delta / 16.7);
          world.rotation.x += (pointerY - world.rotation.x) * 0.024;
          world.rotation.z += (-pointerX * 0.28 - world.rotation.z) * 0.022;
        } else {
          world.rotation.y += (0 - world.rotation.y) * 0.036;
          world.rotation.x += (0 - world.rotation.x) * 0.036;
          world.rotation.z += (0 - world.rotation.z) * 0.036;
        }
      }
      const cameraTargetX = activeIndex === null ? pointerX * 0.7 : 0;
      const cameraTargetY = activeIndex === null ? -pointerY * 0.52 : 0;
      camera.position.x += (cameraTargetX - camera.position.x) * 0.03;
      camera.position.y += (cameraTargetY - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
      particleMaterial.size = 0.105 + morph * 0.022;
      lineMaterial.opacity = 0.15 + morph * 0.07;
      rings.forEach((ring, index) => {
        const pulse = 1 + Math.sin(time * 0.0008 + index * 1.7) * 0.012;
        ring.scale.setScalar(pulse);
        ring.rotation.z += (0.00045 + index * 0.00014) * (delta / 16.7);
      });

      renderer.render(scene, camera);
      frame = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    wrapper.addEventListener("pointermove", onPointerMove);
    wrapper.addEventListener("pointerleave", onPointerLeave);
    resize();
    frame = window.requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      wrapper.removeEventListener("pointermove", onPointerMove);
      wrapper.removeEventListener("pointerleave", onPointerLeave);
      window.cancelAnimationFrame(frame);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      glowTexture?.dispose();
      rings.forEach((ring) => {
        ring.geometry.dispose();
        (ring.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  const current = active === null ? null : nodes[active];

  return (
    <div className="spatial-proof" ref={wrapperRef}>
      <canvas aria-hidden="true" ref={canvasRef} />
      <div className="spatial-vignette" aria-hidden="true" />
      <div className="spatial-glass spatial-glass-one" aria-hidden="true" />
      <div className="spatial-glass spatial-glass-two" aria-hidden="true" />
      <div className={`spatial-core ${current ? "is-focused" : ""}`} aria-live="polite">
        <span>{current ? current.label : "嘉伦 · Melon"}</span>
        <strong>
          {current ? current.statement : <><span>把复杂问题</span><span>变成推进路径</span></>}
        </strong>
      </div>
      {nodes.map((node, index) => {
        const Icon = node.icon;
        return (
          <button
            className={`spatial-node ${node.className} ${active === index ? "is-active" : ""}`}
            key={node.label}
            onBlur={() => selectNode(null)}
            onFocus={() => selectNode(index)}
            onMouseEnter={() => selectNode(index)}
            onMouseLeave={() => selectNode(null)}
            type="button"
          >
            <Icon size={16} />{node.label}
          </button>
        );
      })}
      <div className="spatial-caption">
        <span aria-hidden="true" />移动视角 · 悬浮节点观察能力聚拢
      </div>
    </div>
  );
}
