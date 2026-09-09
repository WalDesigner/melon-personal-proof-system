/* eslint-disable @next/next/no-html-link-for-pages -- COS static hosting uses direct file entrypoints; Next Link can create /index.html RSC requests. */
import { siteConfig } from "@/config/site";

import { ContactMenu } from "./contact-menu";
import { InteractiveEffects } from "./interactive-effects";

const navigation = [
  { index: "01", label: "作品", href: "/index.html#studio", section: "studio" },
  { index: "02", label: "能力", href: "/index.html#capabilities", section: "capabilities" },
  { index: "03", label: "经历", href: "/index.html#experience", section: "experience" },
  { index: "04", label: "联系", href: "/index.html#contact", section: "contact" },
];

function BrandSignal() {
  return (
    <span className="brand-signal" aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-frame">
      <a className="skip-link" href="#main-content">跳转到正文</a>
      <InteractiveEffects />
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="/index.html" aria-label="嘉伦个人网站首页">
            <BrandSignal />
            <span className="brand-copy">
              <strong>嘉伦 <em>Melon</em></strong>
              <small>业务 × 方案 × 交付</small>
            </span>
          </a>

          <nav className="main-nav" aria-label="主导航">
            {navigation.map((item) => (
              <a data-nav={item.section} href={item.href} key={item.href}>
                <span>{item.index}</span>
                <strong>{item.label}</strong>
              </a>
            ))}
          </nav>

          <ContactMenu />
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>{children}</main>

      <footer className="portfolio-footer" id="footer">
        <div className="shell">
          <span>嘉伦 / Melon <small>业务 × 方案 × 交付</small></span>
          <nav aria-label="页脚导航">
            <a href="/studio/index.html">项目案例</a>
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a href="/index.html#contact">联系嘉伦</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
