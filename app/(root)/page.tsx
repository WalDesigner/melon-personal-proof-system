import type { Metadata } from "next";
import { ArrowRight, ArrowUpRight, Check, Github, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { HeroFlow } from "./hero-flow";
import { PhotoGallery } from "./photo-gallery";
import { SolutionJourney } from "./solution-journey";
import styles from "./home.module.css";

export const metadata: Metadata = {
  title: "嘉伦｜AI 解决方案 · 售前与实施交付",
  description: siteConfig.description,
};

const experiences = [
  { period: "2022 — 2025", title: "企业软件研发", role: "高级前端开发工程师", summary: "负责产品迭代和新项目开发；参与安全通信软件项目，负责需求传递、跨团队协作和功能核验，推动项目验收。", proof: "技术实现 · 项目协作 · 验收交付" },
  { period: "2025 — 2026", title: "独立项目合作", role: "软件与电子信息方向", summary: "承接软件与电子信息类需求，根据项目边界判断哪些工作自主实现、哪些需要协调外部资源，并持续跟进交付。", proof: "需求澄清 · 资源协调 · 结果负责" },
  { period: "2026", title: "企业软件销售", role: "企业级软件高级销售", summary: "面向有研发与创新需求的科技企业，独立完成产品演示、客户沟通、商务谈判与成交，推动多家企业客户合作。", proof: "客户沟通 · 价值表达 · 商务推进" },
];

const capabilities = [
  { title: "先问清业务问题", description: "明确谁在使用、哪一步低效、现有数据能否支撑，以及客户如何判断这次投入是否值得。", evidence: "企业软件演示、客户沟通与商务推进", href: "#experience" },
  { title: "再做出可验证方案", description: "将需求拆成输入、输出、最小验证范围和验收指标，用产品原型让业务与技术在同一份方案上讨论。", evidence: "需求分析、模型接入与结构化草案", href: "/studio/index.html" },
  { title: "把交付约束放进设计", description: "提前考虑失败反馈、数据边界、部署成本和回滚路径，让演示之外的维护问题也有答案。", evidence: "前端项目验收、容器部署与故障复盘", href: "/studio/index.html#engineering" },
];

export default function HomePage() {
  return (
    <article className={styles.home}>
      <section className={styles.hero} id="top">
        <div className="shell">
          <p className={styles.eyebrow}>嘉伦 / MELON <span>AI 解决方案 · 售前与实施交付</span></p>
          <div className={styles.heroGrid}>
            <div>
              <h1>听懂业务问题。<br /><em>做出可验证的方案。</em></h1>
              <p className={styles.lead}>我是嘉伦。从前端研发、企业项目协作到软件销售，<br className={styles.desktopBreak} />我把技术实现与客户沟通，带进同一条解决方案路径。</p>
              <div className={styles.actions}>
                <a className="button button-primary" href="#studio">查看核心作品 <ArrowRight size={17} /></a>
                <a className={styles.textLink} href="#contact">联系嘉伦 <ArrowUpRight size={17} /></a>
              </div>
              <p className={styles.location}><MapPin size={15} />面向全国的 AI 解决方案、售前与实施交付机会</p>
            </div>
            <aside className={styles.heroNote} aria-label="作品阅读指引">
              <span className={styles.noteLabel}>SELECTED WORK / 01</span>
              <h2>把 AI 方案，<br />变成可以操作的工作台。</h2>
              <p>从客户需求出发，完成一次真实模型调用，继续推演 PoC、部署与 ROI。</p>
              <HeroFlow />
              <div className={styles.miniFlow} aria-label="作品关键路径"><span>业务输入</span><ArrowRight size={14} /><span>AI 草案</span><ArrowRight size={14} /><span>方案决策</span></div>
              <a href="/studio/index.html">查看设计与实现 <ArrowUpRight size={16} /></a>
            </aside>
          </div>
          <dl className={styles.facts}>
            <div><dt>技术与项目实践</dt><dd>3 年以上</dd></div>
            <div><dt>企业客户合作</dt><dd>多家</dd></div>
            <div><dt>作品展示流程</dt><dd>需求到 ROI</dd></div>
          </dl>
        </div>
      </section>
      <section className={styles.section} id="studio" data-section="studio">
        <div className="shell">
          <div className={styles.heading}><span>01 / 作品</span><div><h2>先看作品，再聊能力。</h2><p>一个展示解决方案实现，一个组织职业经历与技术证据。</p></div></div>
          <article className={styles.flagship}>
            <div className={styles.projectCopy}>
              <span className={styles.noteLabel}>核心作品 · 全栈 MVP</span>
              <h3>企业 AI<br />解决方案工作台</h3>
              <p>把客户、需求、方案、PoC、部署与 ROI 组织成连贯的咨询流程。需求分析接入 ModelScope，在服务端生成结构化方案草案。</p>
              <ul className={styles.proofs}>
                <li><Check size={16} />真实调用：服务端模型接入与结构化解析</li>
                <li><Check size={16} />失败处理：受限重试、超时与来源标识</li>
                <li><Check size={16} />交付实践：测试、国内容器部署与交接</li>
              </ul>
              <p className={styles.byline}>我负责产品设计、实现与部署；借助 AI 协作编码，并进行结果验证。</p>
              <div className={styles.actions}>
                <a className="button button-light" href="/studio/index.html">阅读完整案例 <ArrowRight size={16} /></a>
                <a className={styles.lightLink} href={siteConfig.links.studioChina} target="_blank" rel="noreferrer">在线演示 <ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className={styles.projectPanel}>
              <span>方案工作流预览 · 点击步骤查看</span>
              <SolutionJourney />
              <p>需求分析使用真实 AI；PoC、部署与 ROI 展示咨询设计和案例推演。</p>
            </div>
          </article>
          <article className={styles.secondaryProject}>
            <span className={styles.projectNumber}>02</span>
            <div><h3>个人职业作品站</h3><p>你正在浏览的这个网站。用静态导出承载作品、经历与联系入口，保持展示站与模型调用服务独立。</p><span>Next.js · TypeScript · 静态导出 · COS</span></div>
            <a className={styles.textLink} href="https://github.com/WalDesigner/melon-personal-proof-system" target="_blank" rel="noreferrer">查看实现 <ArrowUpRight size={17} /></a>
          </article>
        </div>
      </section>
      <section className={styles.section} id="capabilities" data-section="capabilities">
        <div className="shell">
          <div className={styles.heading}><span>02 / 工作方式</span><div><h2>从问题到交付，我怎样推进。</h2><p>用业务判断确定方向，用原型减少分歧，用验收标准约束范围。</p></div></div>
          <div className={styles.capabilities}>
            {capabilities.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.description}</p><a href={item.href}>{item.evidence}<ArrowUpRight size={15} /></a></article>)}
          </div>
        </div>
      </section>
      <section className={styles.section} id="experience" data-section="experience">
        <div className="shell">
          <div className={styles.heading}><span>03 / 经历</span><div><h2>技术、客户与交付，<br />来自实际经历的连接。</h2></div></div>
          <div className={styles.experiences}>
            {experiences.map((item) => <article key={item.title}><div className={styles.experienceMeta}><span>{item.period}</span><strong>{item.role}</strong></div><div><h3>{item.title}</h3><p>{item.summary}</p><span className={styles.experienceProof}>{item.proof}</span></div></article>)}
          </div>
        </div>
      </section>
      <section className={styles.discipline} id="discipline">
        <div className={`shell ${styles.disciplineGrid}`}>
          <header className={styles.disciplineIntro}>
            <div className={styles.disciplineStory}>
              <span className={styles.eyebrow}>工作之外 / 持续执行</span>
              <h2>长期主义</h2>
              <p className={styles.disciplineLead}>把值得做的事，持续做下去。</p>
              <p>体重管理让我学到：起点和结果显示了变化，但决定能走多远的，是能不能用适合自己的节奏持续做下去。这也是我推进长期项目的方法。</p>
            </div>
            {siteConfig.discipline.start && siteConfig.discipline.current && <aside className={styles.disciplineResult} aria-label="体重管理阶段记录">
              <span className={styles.disciplineKicker}>体重管理 · 阶段记录</span>
              <div className={styles.disciplineMetric}><span><small>变化起点</small><strong>{siteConfig.discipline.start}</strong></span><ArrowRight size={19} aria-hidden="true" /><span><small>保持阶段</small><strong>{siteConfig.discipline.current}</strong></span></div>
            </aside>}
          </header>
          <ol className={styles.disciplineSteps} aria-label="我的长期执行方法">
            <li><span aria-hidden="true">01</span><div><strong>把目标拆小</strong><p>把一个长期目标，拆成今天能完成的训练。</p></div></li>
            <li><span aria-hidden="true">02</span><div><strong>根据进展调整</strong><p>复盘训练状态，找到能持续的节奏。</p></div></li>
            <li><span aria-hidden="true">03</span><div><strong>把训练留在日常</strong><p>阶段目标达成后，仍保留训练习惯。</p></div></li>
          </ol>
          {siteConfig.discipline.galleryEnabled && <PhotoGallery />}
        </div>
      </section>
      <section className={styles.contact} id="contact" data-section="contact">
        <div className={`shell ${styles.contactGrid}`}>
          <div><span className={styles.eyebrow}>04 / 联系</span><h2>从一个具体的<br />业务问题聊起。</h2><p>关注 AI 解决方案、售前与实施交付岗位，面向全国机会。<br />{siteConfig.contact.phone || siteConfig.contact.email ? "欢迎直接联系我，交流业务场景与团队需求。" : "欢迎查看公开作品与开发记录。"}</p></div>
          <div className={styles.contactDetails}>
            {siteConfig.contact.phone && <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`}><span><Phone size={16} aria-hidden="true" />拨打电话</span><strong>{siteConfig.contact.phone}</strong><ArrowUpRight size={18} aria-hidden="true" /></a>}
            {siteConfig.contact.email && <a href={`mailto:${siteConfig.contact.email}`}><span><Mail size={16} aria-hidden="true" />发送邮件</span><strong>{siteConfig.contact.email}</strong><ArrowUpRight size={18} aria-hidden="true" /></a>}
            <a href={siteConfig.links.github} target="_blank" rel="noreferrer"><span><Github size={16} aria-hidden="true" />公开开发档案</span><strong>GitHub 作品与开发记录</strong><ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </article>
  );
}
