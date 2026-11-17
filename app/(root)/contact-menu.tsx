"use client";

import { ChevronDown, ExternalLink, Github, Mail, Phone } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

type ContactMenuProps = {
  placement?: "header" | "hero";
};

export function ContactMenu({ placement = "header" }: ContactMenuProps) {
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const closeFromOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setPinned(false);
      }
    };
    const closeFromEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setPinned(false);
      }
    };

    document.addEventListener("pointerdown", closeFromOutside);
    document.addEventListener("keydown", closeFromEscape);
    return () => {
      if (closeTimerRef.current !== null) window.clearTimeout(closeTimerRef.current);
      document.removeEventListener("pointerdown", closeFromOutside);
      document.removeEventListener("keydown", closeFromEscape);
    };
  }, []);

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const keepOpen = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    if (pinned) return;

    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
      closeTimerRef.current = null;
    }, 240);
  };

  const togglePinned = () => {
    setPinned((current) => {
      const next = !current;
      setOpen(next);
      return next;
    });
  };

  return (
    <div
      className={`contact-menu contact-menu-${placement} ${open ? "is-open" : ""} ${pinned ? "is-pinned" : ""}`}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node) && !pinned) setOpen(false);
      }}
      onMouseEnter={keepOpen}
      onMouseLeave={scheduleClose}
      ref={rootRef}
    >
      <button
        aria-expanded={open}
        aria-controls={panelId}
        aria-haspopup="dialog"
        className="contact-menu-trigger"
        onFocus={() => setOpen(true)}
        onClick={togglePinned}
        type="button"
      >
        <span className="contact-status-dot" aria-hidden="true" />
        联系我
        <ChevronDown size={13} aria-hidden="true" />
      </button>

      <div id={panelId} inert={!open} aria-hidden={!open} aria-label="联系嘉伦" className="contact-menu-panel" role="dialog">
        <div className="contact-menu-head">
          <div>
            <span>招聘与合作</span>
            <strong>{siteConfig.contact.phone || siteConfig.contact.email ? "直接联系嘉伦" : "作品档案"}</strong>
          </div>
          <span className="contact-menu-pin">{pinned ? "已固定" : "悬浮保持 · 点击固定"}</span>
        </div>

        <div className="contact-menu-list">
          {siteConfig.contact.email && <a className="contact-menu-row contact-profile-link" href={`mailto:${siteConfig.contact.email}`}>
            <Mail size={16} aria-hidden="true" />
            <span><small>发送邮件</small><strong>{siteConfig.contact.email}</strong></span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>}
          {siteConfig.contact.phone && <a className="contact-menu-row contact-profile-link" href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}>
            <Phone size={16} aria-hidden="true" />
            <span><small>拨打电话</small><strong>{siteConfig.contact.phone}</strong></span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>}
          <a className="contact-menu-row contact-profile-link" href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Github size={16} aria-hidden="true" />
            <span><small>公开开发档案</small><strong>GitHub 作品与开发记录</strong></span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
