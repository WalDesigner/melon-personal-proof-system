"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function InteractiveEffects() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const revealItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );
    const tiltItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-tilt]")
    );
    const sectionItems = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]")
    );
    const navItems = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav]")
    );

    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty("--page-progress", `${Math.min(progress, 1)}`);
      setShowTop(window.scrollY > window.innerHeight * 0.8);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let revealObserver: IntersectionObserver | null = null;
    const cleanTilt: Array<() => void> = [];

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    } else {
      revealItems.forEach((item) => item.classList.add("reveal-pending"));
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -7%" }
      );
      revealObserver = observer;
      revealItems.forEach((item) => observer.observe(item));

      tiltItems.forEach((item) => {
        const onMove = (event: PointerEvent) => {
          if (event.pointerType === "touch") return;
          const rect = item.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          item.style.setProperty("--pointer-x", `${x * 100}%`);
          item.style.setProperty("--pointer-y", `${y * 100}%`);
          item.style.setProperty("--tilt-x", `${(0.5 - y) * 3.2}deg`);
          item.style.setProperty("--tilt-y", `${(x - 0.5) * 3.2}deg`);
        };
        const onLeave = () => {
          item.style.setProperty("--tilt-x", "0deg");
          item.style.setProperty("--tilt-y", "0deg");
        };
        item.addEventListener("pointermove", onMove);
        item.addEventListener("pointerleave", onLeave);
        cleanTilt.push(() => {
          item.removeEventListener("pointermove", onMove);
          item.removeEventListener("pointerleave", onLeave);
        });
      });

    }

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const current = (visible.target as HTMLElement).dataset.section;
        navItems.forEach((link) => {
          link.classList.toggle("is-active", link.dataset.nav === current);
        });
      },
      { threshold: [0.18, 0.35, 0.6], rootMargin: "-18% 0px -46%" }
    );
    sectionItems.forEach((item) => sectionObserver.observe(item));

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      revealObserver?.disconnect();
      sectionObserver.disconnect();
      cleanTilt.forEach((clean) => clean());
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <button
        aria-label="返回页面顶部"
        className={`back-to-top ${showTop ? "is-visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
      >
        <ArrowUp size={17} />
      </button>
    </>
  );
}
