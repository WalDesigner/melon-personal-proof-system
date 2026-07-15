import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { ContactMenu } from "./contact-menu";
import { InteractiveEffects } from "./interactive-effects";

const navigation = [
  { index: "01", label: "能力", href: "/#capabilities", section: "capabilities" },
  { index: "02", label: "核心作品", href: "/#studio", section: "studio" },
  { index: "03", label: "经历", href: "/#experience", section: "experience" },
  { index: "04", label: "联系", href: "/#contact", section: "contact" },
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
      <InteractiveEffects />
      <header className="site-header">
        <div className="shell header-inner">
          <Link className="brand" href="/" aria-label="嘉伦个人网站首页">
            <BrandSignal />
            <span className="brand-copy">
              <strong>嘉伦 <em>Melon</em></strong>
              <small>业务 × 方案 × 交付</small>
            </span>
          </Link>

          <nav className="main-nav" aria-label="主导航">
            {navigation.map((item) => (
              <Link data-nav={item.section} href={item.href} key={item.href}>
                <span>{item.index}</span>
                <strong>{item.label}</strong>
              </Link>
            ))}
          </nav>

          <ContactMenu />
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer" id="footer">
        <div className="footer-aura" aria-hidden="true" />
        <div className="shell footer-stage">
          <div className="footer-main">
            <div className="footer-statement">
              <span>保持联系</span>
              <h2>让复杂问题，<br />有一条能被推进的路径。</h2>
              <p>面向全国的人工智能解决方案、售前与实施交付机会。</p>
            </div>
            <div className="footer-contact-card">
              <div className="footer-contact-head">
                <span>直接联系我</span>
                <i aria-hidden="true" />
              </div>
              <a href="mailto:15226655044@163.com">
                <span>发送邮件</span><ArrowUpRight size={17} />
              </a>
              <a href="tel:15226655044">
                <span>电话沟通</span><ArrowUpRight size={17} />
              </a>
              <a href="https://github.com/WalDesigner" target="_blank" rel="noreferrer">
                <span>查看代码主页</span><ArrowUpRight size={17} />
              </a>
            </div>
          </div>

            <div className="footer-bottom">
              <div className="footer-brand"><BrandSignal /><strong>嘉伦 <em>Melon</em></strong></div>
              <nav aria-label="页脚导航">
              <Link href="/#capabilities">能力证明</Link>
              <Link href="/#studio">核心作品</Link>
              <Link href="/#experience">职业经历</Link>
              <Link href="/#top">返回顶部</Link>
              </nav>
            <span>个人能力证明系统</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
