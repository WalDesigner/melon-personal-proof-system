"use client";

import Image from "next/image";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Fragment, type CSSProperties, type PointerEvent, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import styles from "./photo-gallery.module.css";

const photos = [
  { id: "before-portrait", width: 750, height: 1050, focus: "50% 38%", alt: "变化前，嘉伦的正面肖像", title: "起点肖像", caption: "变化前的正面记录。" },
  { id: "before-everyday", width: 960, height: 1280, focus: "53% 73%", alt: "训练前，嘉伦戴眼镜的室内半身照", title: "室内半身照", caption: "开始训练前，在室内拍的一张半身照。" },
  { id: "after-training", width: 1280, height: 960, focus: "42% 48%", alt: "变化后，健身房里的训练合影", title: "训练记录", caption: "在健身房和伙伴的合影。一项长期习惯，来自一次次回到训练场。" },
  { id: "after-everyday", width: 960, height: 1280, focus: "54% 68%", alt: "训练后，嘉伦坐在室内的生活照", title: "保持日常", caption: "保持训练后的日常片段。" },
];

const stages = [
  { label: "训练前", english: "BEFORE", items: [0, 1] },
  { label: "训练后", english: "AFTER", items: [2, 3] },
];

function StageConnector() {
  const path = "M4 12h48m-9-8 9 8-9 8";
  return <div className={styles.direction} aria-hidden="true">
    <svg viewBox="0 0 57 24" width="57" height="24" fill="none" focusable="false">
      <path className={styles.directionLine} d={path} />
      <path className={styles.directionPulse} d="M4 12h48" pathLength={1} />
    </svg>
    <span>持续训练</span>
  </div>;
}

function photoPath(id: string, thumbnail = false) {
  return `/images/discipline-story/${id}${thumbnail ? "-thumb" : ""}.webp`;
}

function motionAllowed() {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function fromThumbnail(thumb: DOMRect, frame: DOMRect) {
  if (!frame.width || !frame.height || !thumb.width || !thumb.height) return null;
  const scale = Math.min(thumb.width / frame.width, thumb.height / frame.height);
  const x = thumb.left + (thumb.width - frame.width * scale) / 2 - frame.left;
  const y = thumb.top + (thumb.height - frame.height * scale) / 2 - frame.top;
  return `translate(${x}px, ${y}px) scale(${scale})`;
}

export function PhotoGallery() {
  const titleId = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const comparison = useRef<HTMLDivElement>(null);
  const tiles = useRef<Array<HTMLButtonElement | null>>([]);
  const origin = useRef<HTMLButtonElement | null>(null);
  const pendingThumbnail = useRef<DOMRect | null>(null);
  const flight = useRef<Animation | null>(null);
  const closing = useRef(false);
  const touch = useRef<{ id: number; x: number; y: number } | null>(null);
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(0);
  const [comparisonVisible, setComparisonVisible] = useState(false);
  const photo = photos[index];

  useEffect(() => {
    const panel = comparison.current;
    if (!panel) return;
    const observer = new IntersectionObserver(([entry]) => setComparisonVisible(entry.isIntersecting));
    observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (!open || !dialog.current || dialog.current.open) return;
    dialog.current.showModal();
    const thumbnail = pendingThumbnail.current;
    pendingThumbnail.current = null;
    const stage = frame.current;
    if (thumbnail && stage && motionAllowed()) {
      const transform = fromThumbnail(thumbnail, stage.getBoundingClientRect());
      if (transform) flight.current = stage.animate(
        [{ transform, borderRadius: "10px" }, { transform: "none", borderRadius: "16px" }],
        { duration: 410, easing: "cubic-bezier(.2,.8,.2,1)" },
      );
    }
    closeButton.current?.focus({ preventScroll: true });
  }, [open]);

  const show = (next: number) => {
    const tile = tiles.current[next];
    if (!tile || !dialog.current?.showModal) return;
    origin.current = tile;
    pendingThumbnail.current = (tile.querySelector("img") ?? tile).getBoundingClientRect();
    setDirection(0);
    setIndex(next);
    setOpen(true);
  };

  const move = (next: number) => {
    if (closing.current || next < 0 || next >= photos.length || next === index) return;
    setDirection(next > index ? 1 : -1);
    setIndex(next);
  };

  const dismiss = () => {
    const modal = dialog.current;
    const stage = frame.current;
    if (!modal?.open || closing.current) return;
    closing.current = true;
    const startTransform = stage ? getComputedStyle(stage).transform : "none";
    flight.current?.cancel();
    const finish = () => {
      modal.close();
      setOpen(false);
      origin.current?.focus({ preventScroll: true });
      origin.current = null;
      closing.current = false;
    };
    const tile = tiles.current[index];
    if (!tile || !stage || !motionAllowed()) return finish();
    const transform = fromThumbnail((tile.querySelector("img") ?? tile).getBoundingClientRect(), stage.getBoundingClientRect());
    if (!transform) return finish();
    const animation = stage.animate(
      [{ transform: startTransform, opacity: 1 }, { transform, opacity: 0.88, borderRadius: "10px" }],
      { duration: 260, easing: "cubic-bezier(.4,0,.25,1)", fill: "forwards" },
    );
    modal.classList.add(styles.closing);
    void animation.finished.catch(() => {}).then(() => {
      modal.classList.remove(styles.closing);
      animation.cancel();
      finish();
    });
  };

  const captureSwipe = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" || !event.isPrimary) return;
    touch.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
  };

  const checkSwipe = (event: PointerEvent<HTMLElement>) => {
    const start = touch.current;
    touch.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.4) move(index + (dx < 0 ? 1 : -1));
  };

  return (
    <div className={styles.gallery} data-photo-view={comparisonVisible}>
      <div className={styles.galleryHeader}>
        <span>训练前后 <b>4 张照片</b></span>
        <small>点击照片查看大图</small>
      </div>
      <div className={styles.tiles} ref={comparison}>
        {stages.map((stage, stageIndex) => (
          <Fragment key={stage.label}>
            {stageIndex === 1 && <StageConnector />}
            <div className={styles.group} data-phase={stage.english}>
              <div className={styles.groupLabel}><strong>{stage.label}</strong><small>{stage.english}</small></div>
              <div className={styles.groupPhotos}>
                {stage.items.map((i) => {
                  const item = photos[i];
                  return (
                    <figure key={item.id}>
                      <button className={styles.tile} type="button" aria-label={`放大照片：${stage.label} · ${item.title}`} aria-haspopup="dialog" ref={(node) => { tiles.current[i] = node; }} onClick={() => show(i)}>
                        <Image src={photoPath(item.id, true)} width={item.width} height={item.height} alt={item.alt} loading="lazy" style={{ objectPosition: item.focus }} unoptimized />
                        <span className={styles.expand} aria-hidden="true"><Expand size={14} /></span>
                      </button>
                      <figcaption>{item.title}</figcaption>
                    </figure>
                  );
                })}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
      <p className={styles.photoNote}>不同场景里的两段生活记录。</p>

      <dialog ref={dialog} className={styles.modal} aria-labelledby={titleId}
        onCancel={(event) => { event.preventDefault(); dismiss(); }}
        onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(index + (event.key === "ArrowLeft" ? -1 : 1));
          }
        }}>
        {open && <div className={styles.panel}>
          <header className={styles.modalHeader}>
            <div><span>我的生活记录</span><h2 id={titleId}>长期主义 · 照片</h2></div>
            <button ref={closeButton} className={styles.control} type="button" onClick={dismiss} aria-label="关闭照片"><X size={21} /></button>
          </header>
          <div className={styles.viewer}>
            <button className={styles.control} type="button" onClick={() => move(index - 1)} disabled={index === 0} aria-label="上一张"><ArrowLeft size={18} /></button>
            <figure className={styles.stage} onPointerDown={captureSwipe} onPointerUp={checkSwipe} onPointerCancel={() => { touch.current = null; }}>
              <div className={styles.media} ref={frame}>
                <div key={photo.id} className={styles.image} style={{ "--enter-offset": `${direction * 18}px` } as CSSProperties} data-slide={direction !== 0}>
                  <Image src={photoPath(photo.id)} width={photo.width} height={photo.height} alt={photo.alt} draggable={false} unoptimized />
                </div>
              </div>
            </figure>
            <button className={styles.control} type="button" onClick={() => move(index + 1)} disabled={index === photos.length - 1} aria-label="下一张"><ArrowRight size={18} /></button>
          </div>
          <div className={styles.caption} aria-live="polite"><p><strong>{index < 2 ? "训练前" : "训练后"} · {photo.title}</strong> {photo.caption}</p><span>{index + 1} / {photos.length}</span></div>
          <div className={styles.filmstrip} aria-label="照片缩略图">
            {photos.map((item, i) => (
              <button type="button" key={item.id} onClick={() => move(i)} aria-pressed={i === index} aria-label={`查看${item.title}照片`}>
                <Image src={photoPath(item.id, true)} width={item.width} height={item.height} style={{ objectPosition: item.focus }} alt="" unoptimized />
              </button>
            ))}
          </div>
        </div>}
      </dialog>
    </div>
  );
}
