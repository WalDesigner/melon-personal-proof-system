"use client";

import { Pause, Play } from "lucide-react";
import { type CSSProperties, useEffect, useId, useRef, useState } from "react";
import styles from "./hero-flow.module.css";

const stages = [
  { label: "需求", x: 61, y: 166, at: 0.08 },
  { label: "方案", x: 170, y: 131, at: 0.32 },
  { label: "验证", x: 301, y: 94, at: 0.60 },
  { label: "交付", x: 435, y: 57, at: 0.88 },
];
const path = "M22 166H78C119 166 127 131 170 131H193C247 131 250 94 301 94H331C379 94 390 57 435 57H497";
const duration = "7.2s";

export function HeroFlow() {
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncMotion = () => {
      if (playing && visible && !motionPreference.matches && !document.hidden) svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    }, { threshold: 0.1 });
    observer.observe(svg);
    syncMotion();
    motionPreference.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    return () => {
      observer.disconnect();
      motionPreference.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
    };
  }, [playing]);

  return (
    <div className={styles.flow}>
      <div className={styles.graph}>
        <svg ref={svgRef} data-hero-flow viewBox="0 0 520 188" fill="none" aria-hidden="true" focusable="false">
          <defs>
            <pattern id={`${id}-grid`} width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" stroke="#9cc8bb" strokeOpacity=".14" />
            </pattern>
            <linearGradient id={`${id}-path`} x1="22" y1="170" x2="497" y2="57" gradientUnits="userSpaceOnUse">
              <stop stopColor="#58b49e" /><stop offset="1" stopColor="#92e9d1" />
            </linearGradient>
            <radialGradient id={`${id}-glow`}>
              <stop stopColor="#b6ffed" stopOpacity=".68" />
              <stop offset=".4" stopColor="#87f5d1" stopOpacity=".46" />
              <stop offset="1" stopColor="#61dcc1" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="520" height="188" rx="6" fill={`url(#${id}-grid)`} className={styles.grid} />
          <path d="M22 182H497M61 166V182M170 131V182M301 94V182M435 57V182" className={styles.guide} />
          <path d={path} stroke={`url(#${id}-path)`} className={styles.track} />
          <path d="m490 50 7 7-7 7" className={styles.arrow} />
          <path d={path} pathLength="1" strokeDasharray=".13 1" strokeDashoffset=".13" className={`${styles.trail} ${styles.motion}`}>
            <animate attributeName="stroke-dashoffset" values=".13;-.87" dur={duration} repeatCount="indefinite" />
          </path>
          {stages.map(({ label, x, y, at }) => (
            <g key={label}>
              <circle cx={x} cy={y} r="10.5" className={styles.ring} />
              <circle cx={x} cy={y} r="5" className={styles.node} />
              <circle cx={x} cy={y} r="11.5" className={`${styles.pulse} ${styles.motion}`} opacity="0">
                <animate attributeName="opacity" values="0;0;.52;0;0" keyTimes={`0;${at - 0.045};${at};${at + 0.095};1`} dur={duration} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
          <g className={`${styles.signal} ${styles.motion}`} data-flow-signal opacity="0">
            <circle r="19" fill={`url(#${id}-glow)`} />
            <circle r="8.5" fill="#b0ffea" opacity=".30" />
            <circle r="5" fill="#edfff9" />
            <animateMotion path={path} dur={duration} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.09;.91;1" dur={duration} repeatCount="indefinite" />
          </g>
        </svg>
        <ol className={styles.steps} role="list" aria-label="方案推进阶段">
          {stages.map(({ label, x, y }, index) => (
            <li key={label} style={{ "--x": `${x / 5.2}%`, "--y": `${y / 1.88}%` } as CSSProperties}>
              <span aria-hidden="true">0{index + 1}</span>{label}
            </li>
          ))}
        </ol>
      </div>
      <button className={styles.toggle} type="button" onClick={() => setPlaying((value) => !value)}>
        {playing ? <Pause size={12} aria-hidden="true" /> : <Play size={12} aria-hidden="true" />}
        {playing ? "暂停动效" : "播放动效"}
      </button>
    </div>
  );
}
