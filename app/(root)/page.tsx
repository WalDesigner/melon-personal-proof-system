import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Code2,
  Dumbbell,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  Route,
  Sparkles,
} from "lucide-react";

import { siteConfig } from "@/config/site";

import { ContactMenu } from "./contact-menu";
import { SolutionJourney } from "./solution-journey";
import { SpatialProof } from "./spatial-proof";

export const metadata: Metadata = {
  title: "企业人工智能解决方案候选人",
  description: siteConfig.description,
};

const capabilities = [
  {
    icon: BriefcaseBusiness,
    number: "01",
    title: "理解业务与客户",
    description:
      "从企业目标、业务流程、决策角色和投入回报出发识别问题，并把复杂产品讲成客户能判断的价值。",
    evidence: ["独立产品演示", "商务谈判与成交", "3 家企业客户"],
    className: "capability-business",
  },
  {
    icon: Route,
    number: "02",
    title: "设计方案与原型",
    description:
      "把模糊需求拆成场景、功能、数据、验证范围和部署路径，再做成可操作、可讨论的产品原型。",
    evidence: ["需求诊断", "方案工作流", "交互式产品原型"],
    className: "capability-solution",
  },
  {
    icon: Code2,
    number: "03",
    title: "推动技术与交付",
    description:
      "有前端开发和企业项目经验，能够连接甲乙双方，跟进功能核验、问题闭环与最终验收。",
    evidence: ["产品开发与迭代", "甲乙方协作", "项目验收收官"],
    className: "capability-delivery",
  },
];

const experiences = [
  {
    period: "2022.06 — 2025.04",
    company: "北京三信时代科技发展有限公司",
    role: "高级前端开发工程师",
    summary:
      "完成产品迭代与新项目开发；长期参与安全加密通信软件项目，负责需求传递、乙方协作、页面与功能核验，最终推动项目完成验收。",
    proof: "技术实现基础 · 企业项目协作 · 验收交付意识",
  },
  {
    period: "2025 — 2026",
    company: "独立项目合作",
    role: "软件与电子信息方向",
    summary:
      "通过合作关系承接软件、互联网与电子信息类需求，根据项目边界选择自主实现或协调外部资源，并持续跟进结果交付。",
    proof: "主动获取项目 · 需求澄清 · 资源协调与结果负责",
  },
  {
    period: "2026 · 三个月左右",
    company: "启知道集团｜科创空间",
    role: "企业级软件高级销售",
    summary:
      "面向有研发与创新需求的科技企业，独立完成产品演示、客户沟通、商务谈判与成交，累计成交 3 家企业客户。",
    proof: "客户沟通 · 价值表达 · 商务推进与成交闭环",
  },
];

const proofFlow = [
  { number: "01", title: "听懂问题", output: "业务目标与真实痛点" },
  { number: "02", title: "形成判断", output: "场景优先级与价值" },
  { number: "03", title: "组织方案", output: "能力、数据与边界" },
  { number: "04", title: "做出验证", output: "原型与验收标准" },
  { number: "05", title: "推动交付", output: "部署路径与结果" },
];

export default function HomePage() {
  return (
    <article className="page-canvas home-page">
      <section className="hero-v2" id="top">
        <div className="ambient-orb ambient-orb-one" aria-hidden="true" />
        <div className="ambient-orb ambient-orb-two" aria-hidden="true" />
        <div className="shell hero-layout">
          <div className="hero-copy" data-reveal>
            <div className="role-pill">
              <Sparkles size={15} aria-hidden="true" />
              企业人工智能解决方案候选人
            </div>
            <h1>
              把业务问题，推进成
              <span>可验证的人工智能方案。</span>
            </h1>
            <p className="hero-lead-v2">
              我是嘉伦。连接客户沟通、方案设计、产品原型、技术实现与项目交付，
              让一个模糊机会逐步变成可演示、可判断、可推进的解决方案。
            </p>
            <div className="hero-actions-v2">
              <Link className="button button-primary" href="/#studio">
                查看我独立构建的作品 <ArrowRight size={17} />
              </Link>
              <ContactMenu placement="hero" />
            </div>
            <div className="opportunity-line" aria-label="求职机会范围">
              <span><MapPin size={15} />面向全国面试机会</span>
              <span>解决方案、售前与实施交付</span>
              <span>接受远程与短期出差</span>
            </div>
          </div>

          <div data-reveal><SpatialProof /></div>
        </div>

        <div className="shell proof-ribbon" data-reveal aria-label="关键能力证明">
          <div><strong>3 家</strong><span>企业客户成交</span></div>
          <div><strong>25—49 万</strong><span>单笔合同金额区间</span></div>
          <div><strong>3 年以上</strong><span>技术与项目实践</span></div>
          <p>不是堆砌标签，而是用真实经历证明一条完整的推进链路。</p>
        </div>
      </section>

      <section className="flow-section capability-section" id="capabilities" data-section="capabilities">
        <div className="shell">
          <div className="section-heading-v2" data-reveal>
            <span>能力如何形成价值</span>
            <div>
              <h2>我不是一个单一岗位标签，<br />而是一条完整的问题推进链路。</h2>
              <p>
                前端不是职业边界，销售也不是单独经历。它们共同构成了我理解客户、
                组织方案、做出原型并协同交付的能力。
              </p>
            </div>
          </div>
          <div className="capability-bento">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  className={`capability-panel ${item.className}`}
                  data-reveal
                  data-tilt
                  key={item.number}
                >
                  <div className="panel-index"><Icon size={21} /><span>{item.number}</span></div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <ul>
                    {item.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}
                  </ul>
                  {item.number === "01" && (
                    <div className="business-radar" aria-label="从客户信息形成价值共识">
                      <span className="business-radar-goal">目标</span>
                      <span className="business-radar-process">流程</span>
                      <span className="business-radar-role">角色</span>
                      <span className="business-radar-return">回报</span>
                      <strong>价值共识</strong>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <div className="proof-flow" data-reveal id="method">
            <div className="proof-flow-heading">
              <span>我的推进方法</span>
              <strong>一个机会，如何变成可交付结果</strong>
            </div>
            <div className="proof-flow-track">
              {proofFlow.map((step) => (
                <div className="proof-flow-step" key={step.number}>
                  <span>{step.number}</span>
                  <strong>{step.title}</strong>
                  <small>{step.output}</small>
                </div>
              ))}
              <div className="proof-flow-beam" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="flow-section studio-feature" id="studio" data-section="studio">
        <div className="shell">
          <div className="studio-frame" data-reveal>
            <div className="studio-frame-copy">
              <div className="project-label-row">
                <span>核心作品</span>
                <span>公开演示版本</span>
                <span>独立设计、构建与部署</span>
              </div>
              <h2>企业人工智能<br />解决方案工作台</h2>
              <p>
                用一个可操作的产品原型，模拟企业人工智能项目从需求诊断、方案设计、
                概念验证到部署规划和投入产出评估的全过程。
              </p>
              <ul className="project-proof-list">
                <li><Check size={16} />把售前与方案思路转化为产品流程</li>
                <li><Check size={16} />同时考虑业务价值、技术路径和交付边界</li>
                <li><Check size={16} />独立完成产品结构、前端实现与部署验证</li>
                <li><Check size={16} />借助人工智能协作完成拆解、编码、测试与持续迭代</li>
              </ul>
              <div className="project-actions">
                <Link className="button button-light" href="/studio">
                  阅读完整案例 <ArrowRight size={17} />
                </Link>
                <a
                  className="text-link-light"
                  href={siteConfig.links.studioChina}
                  target="_blank"
                  rel="noreferrer"
                >
                  打开在线演示 <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
            <div className="studio-frame-interaction">
              <div className="interaction-intro">
                <span>将鼠标移入步骤，查看方案如何推进</span>
                <strong>从问题到决策</strong>
              </div>
              <SolutionJourney />
            </div>
          </div>
        </div>
      </section>

      <section className="flow-section experience-section" id="experience" data-section="experience">
        <div className="shell experience-layout">
          <div className="experience-intro" data-reveal>
            <span>经历不是时间堆叠</span>
            <h2>每段经历，<br />都在补全同一套能力。</h2>
            <p>
              从技术实现，到企业项目协作，再到客户沟通与成交，我正在把多段经历收束为
              “理解业务并推动方案落地”的职业主线。
            </p>
          </div>
          <div className="experience-list">
            {experiences.map((experience, index) => (
              <article className="experience-row" data-reveal key={experience.period}>
                <div className="experience-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="experience-main">
                  <div className="experience-meta">
                    <time>{experience.period}</time>
                    <span>{experience.role}</span>
                  </div>
                  <h3>{experience.company}</h3>
                  <p>{experience.summary}</p>
                  <strong>{experience.proof}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flow-section operating-section" id="discipline">
        <div className="shell">
          <div className="operating-card" data-reveal data-tilt>
            <div className="operating-icon"><HeartPulse size={25} /></div>
            <div>
              <span>长期执行力</span>
              <h2>复杂目标，不靠一时热情。</h2>
              <p>
                曾从 180 多斤减至 140 斤以下并长期保持训练。相比数字，我更看重这段经历形成的
                目标拆解、过程反馈、持续执行和自我重塑能力。
              </p>
            </div>
            <div className="transformation-evidence">
              <div className="transformation-stage" aria-label="体重管理结果">
                <div><span>起点</span><strong>180+</strong><small>斤</small></div>
                <i aria-hidden="true"><ArrowRight size={18} /></i>
                <div><span>长期保持</span><strong>140−</strong><small>斤</small></div>
              </div>
              <div className="transformation-gallery" aria-label="健身照片版式占位">
                {[
                  ["变化前", "照片位 01"],
                  ["训练中", "照片位 02"],
                  ["长期保持", "照片位 03"],
                ].map(([label, placeholder], index) => (
                  <figure key={label}>
                    <div className={`fitness-placeholder fitness-placeholder-${index + 1}`} role="img" aria-label={`${label}照片待替换`}>
                      <Dumbbell size={18} />
                      <span>{placeholder}</span>
                    </div>
                    <figcaption>{label}</figcaption>
                  </figure>
                ))}
              </div>
              <small className="placeholder-note">版式占位，待替换为本人真实照片</small>
            </div>
          </div>
        </div>
      </section>

      <section className="flow-section contact-section" id="contact" data-section="contact">
        <div className="shell contact-card" data-reveal>
          <div>
            <span>下一步</span>
            <h2>如果你需要一个能连接业务、客户与技术的人，我们可以聊聊。</h2>
            <p>
              目前面向全国的人工智能解决方案、售前与实施交付机会；
              也接受远程协作与短期出差。
            </p>
          </div>
          <div className="contact-actions">
            <a
              className="button button-primary"
              href={`mailto:${siteConfig.contact.email}`}
            >
              <Mail size={17} />发送邮件
            </a>
            <a
              className="button button-secondary"
              href={`tel:${siteConfig.contact.phone}`}
            >
              <Phone size={17} />电话联系
            </a>
          </div>
        </div>
      </section>
    </article>
  );
}
