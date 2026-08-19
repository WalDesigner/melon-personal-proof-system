"use client";

import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { siteConfig } from "@/config/site";

type ContactMenuProps = {
  placement?: "header" | "hero";
};

const contactItems = [
  {
    key: "wechat",
    label: "微信（手机号）",
    value: siteConfig.contact.wechat,
    icon: MessageCircle,
  },
  {
    key: "phone",
    label: "电话",
    value: siteConfig.contact.phone,
    icon: Phone,
  },
  {
    key: "email",
    label: "邮箱",
    value: siteConfig.contact.email,
    icon: Mail,
  },
];

export function ContactMenu({ placement = "header" }: ContactMenuProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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

  const copyValue = async (key: string, value: string) => {
    let copiedSuccessfully = false;
    try {
      await navigator.clipboard.writeText(value);
      copiedSuccessfully = true;
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copiedSuccessfully = document.execCommand("copy");
      textArea.remove();
    }

    if (copiedSuccessfully) {
      setCopied(key);
      window.setTimeout(() => setCopied(null), 1600);
    }
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

      <div aria-hidden={!open} aria-label="联系嘉伦" className="contact-menu-panel" role="dialog">
        <div className="contact-menu-head">
          <div>
            <span>保持联系</span>
            <strong>可直接复制联系方式</strong>
          </div>
          <span className="contact-menu-pin">{pinned ? "已固定" : "悬浮保持 · 点击固定"}</span>
        </div>

        <div className="contact-menu-list">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <div className="contact-menu-row" key={item.key}>
                <Icon size={15} aria-hidden="true" />
                <span>
                  <small>{item.label}</small>
                  <strong>{item.value}</strong>
                </span>
                <button
                  aria-label={`复制${item.label}`}
                  className={copied === item.key ? "is-copied" : ""}
                  onClick={() => copyValue(item.key, item.value)}
                  type="button"
                >
                  {copied === item.key ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="contact-menu-actions">
          <a href="weixin://" aria-label="尝试打开微信">
            尝试打开微信 <ExternalLink size={14} />
          </a>
          <small>打开后粘贴手机号搜索</small>
        </div>
      </div>
    </div>
  );
}
