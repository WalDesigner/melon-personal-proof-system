import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  BrainCircuit,
  Check,
  CloudCog,
  Code2,
  FileSearch,
  Gauge,
  Presentation,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import { siteConfig } from "@/config/site";

import { SolutionJourney } from "../solution-journey";

export const metadata: Metadata = {
  title: "企业人工智能解决方案工作台｜核心案例",
  description:
    "一个演示企业人工智能解决方案从客户诊断、方案设计、概念验证到部署与投入产出评估全过程的公开产品原型。",
};

const problems = [
  {
    icon: FileSearch,
    title: "需求没有被说清",
    text: "客户想引入人工智能，但问题、场景、数据条件和成功标准尚未形成共同认识。",
  },
  {
    icon: Target,
    title: "验证边界不断扩大",
    text: "功能越堆越多，却没有最小验证范围、验收指标和清晰的推进节奏。",
  },
  {
    icon: CloudCog,
    title: "部署成本不透明",
    text: "模型、数据、安全、系统集成与运维成本没有放进同一套交付判断中。",
  },
  {
    icon: Gauge,
    title: "业务价值难沟通",
    text: "技术能力讲了很多，但投入结构、效率收益和内部决策依据仍然模糊。",
  },
];

const workflow = [
  { number: "01", title: "客户画像", text: "记录行业、规模、业务目标、组织约束与现有系统基础。" },
  { number: "02", title: "需求诊断", text: "识别核心痛点、使用角色、业务流程与优先场景。" },
  { number: "03", title: "智能分析", text: "将结构化输入转为场景建议、风险提示与后续问题。" },
  { number: "04", title: "方案设计", text: "连接业务目标、智能能力、数据需求、系统模块和交付成果。" },
  { number: "05", title: "概念验证", text: "定义验证范围、时间节奏、参与角色、验收指标与风险。" },
  { number: "06", title: "部署路径", text: "规划技术架构、集成方式、安全边界和阶段性上线策略。" },
  { number: "07", title: "投入产出评估", text: "用投入、效率、收益与风险假设支持客户决策和内部汇报。" },
];

const contribution = [
  {
    icon: Users,
    title: "业务流程抽象",
    text: "把企业人工智能售前与方案工作的关键节点整理为可操作流程。",
  },
  {
    icon: Boxes,
    title: "产品与信息架构",
    text: "设计工作台结构、页面关系、字段逻辑、状态反馈和演示路径。",
  },
  {
    icon: Code2,
    title: "前端交互实现",
    text: "完成主要交互、响应式界面与多模块联动，让方案可以被实际操作。",
  },
  {
    icon: BrainCircuit,
    title: "智能协作构建",
    text: "借助人工智能完成拆解、编码、测试和迭代，同时保留人工判断与结果验证。",
  },
  {
    icon: ShieldCheck,
    title: "验证与部署",
    text: "完成关键路径测试、构建检查与两个公开访问入口的部署验证。",
  },
  {
    icon: Presentation,
    title: "方案讲解表达",
    text: "将产品过程转化为可讲解的业务问题、方案路径、边界和能力证明。",
  },
];

const proof = [
  "能把企业人工智能项目拆成清晰、可讨论的工作流",
  "能同时站在客户、产品、售前、技术与交付角度判断",
  "能把抽象方案做成可交互、可演示的产品原型",
  "能借助人工智能快速构建，并对最终输出负责",
  "理解演示原型、概念验证与生产系统之间的明确边界",
];

export default function StudioCasePage() {
  return (
    <article className="page-canvas case-page">
      <section className="case-hero-v2" id="top">
        <div className="ambient-orb ambient-orb-three" aria-hidden="true" />
        <div className="shell">
          <Link className="back-link-v2" href="/">
            <ArrowLeft size={16} />返回个人主页
          </Link>
          <div className="case-hero-layout">
            <div className="case-hero-copy" data-reveal>
              <div className="project-label-row project-label-light">
                <span>核心作品</span>
                <span>公开演示版本</span>
              </div>
              <h1>企业人工智能<br />解决方案工作台</h1>
              <p>
                将企业人工智能项目从需求诊断、方案设计、概念验证到部署与投入产出评估，
                组织成一条可操作、可演示、可讲解的解决方案工作流。
              </p>
              <div className="case-actions-v2">
                <a
                  className="button button-primary"
                  href={siteConfig.links.studioChina}
                  target="_blank"
                  rel="noreferrer"
                >
                  国内在线演示 <ArrowUpRight size={17} />
                </a>
                <a
                  className="button button-dark-outline"
                  href={siteConfig.links.studioGlobal}
                  target="_blank"
                  rel="noreferrer"
                >
                  备用访问入口 <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
            <div className="case-overview" data-reveal data-tilt>
              <span>案例概览</span>
              <dl>
                <div><dt>产品定位</dt><dd>企业人工智能解决方案工作台</dd></div>
                <div><dt>我的职责</dt><dd>产品设计、前端实现、智能协作、部署验证</dd></div>
                <div><dt>当前阶段</dt><dd>公开产品原型，用于演示与能力证明</dd></div>
                <div><dt>核心流程</dt><dd>7 个阶段，从客户问题到决策依据</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      <section className="flow-section problem-section">
        <div className="shell">
          <div className="section-heading-v2" data-reveal>
            <span>为什么构建它</span>
            <div>
              <h2>企业不缺少人工智能概念，<br />缺少的是一条清晰的推进路径。</h2>
              <p>
                这个项目不是为了证明“会调用一个模型”，而是为了练习并展示：
                如何把一个机会转成业务能理解、技术能评估、项目能推进的方案。
              </p>
            </div>
          </div>
          <div className="problem-grid-v2">
            {problems.map((problem) => {
              const Icon = problem.icon;
              return (
                <article className="problem-panel" data-reveal data-tilt key={problem.title}>
                  <Icon size={22} />
                  <h3>{problem.title}</h3>
                  <p>{problem.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flow-section interactive-flow-section">
        <div className="shell interactive-flow-layout">
          <div className="flow-copy" data-reveal>
            <span>方案推进逻辑</span>
            <h2>不是一次生成答案，<br />而是逐步减少不确定性。</h2>
            <p>
              将鼠标移入不同步骤，可以看到每一个阶段需要做出的判断和对应产物。
              这也是我理解企业方案工作的方式。
            </p>
          </div>
          <div data-reveal><SolutionJourney /></div>
        </div>
      </section>

      <section className="flow-section seven-stage-section">
        <div className="shell">
          <div className="compact-heading" data-reveal>
            <span>产品中的完整流程</span>
            <h2>7 个阶段，共用一条业务主线</h2>
          </div>
          <div className="workflow-grid-v2">
            {workflow.map((step) => (
              <article className="workflow-panel-v2" data-reveal key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                <ArrowRight size={16} aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flow-section contribution-section-v2">
        <div className="shell">
          <div className="section-heading-v2" data-reveal>
            <span>我具体做了什么</span>
            <div>
              <h2>我的贡献，不只是写页面。</h2>
              <p>
                前端是实现手段，真正的重点是业务流程抽象、产品判断、智能协作、
                交付边界和可讲解的方案表达。
              </p>
            </div>
          </div>
          <div className="contribution-grid-v2">
            {contribution.map((item) => {
              const Icon = item.icon;
              return (
                <article data-reveal key={item.title}>
                  <Icon size={21} />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="flow-section case-proof-section">
        <div className="shell proof-card-v2" data-reveal>
          <div>
            <span>它证明了什么</span>
            <h2>作品的价值，不只在功能数量。</h2>
            <p>
              更重要的是，它把我对客户、产品、技术和交付的理解，变成了一个可以操作、
              可以追问，也可以持续迭代的证据。
            </p>
          </div>
          <ul>
            {proof.map((item) => <li key={item}><Check size={16} />{item}</li>)}
          </ul>
        </div>
      </section>

      <section className="flow-section boundary-section">
        <div className="shell boundary-card" data-reveal>
          <div>
            <span>能力边界说明</span>
            <h2>这是公开演示原型，不是真实企业生产案例。</h2>
          </div>
          <p>
            当前版本用于展示我对企业人工智能需求分析、方案组织、概念验证、部署规划和
            价值沟通的理解。它尚未进入真实企业生产环境，也不替代正式的安全、数据与架构评审。
          </p>
        </div>
      </section>

      <section className="flow-section case-closing-section">
        <div className="shell case-closing" data-reveal>
          <div>
            <span>想直接看看产品？</span>
            <h2>进入工作台，沿着流程完成一次方案推演。</h2>
          </div>
          <a
            className="button button-primary"
            href={siteConfig.links.studioChina}
            target="_blank"
            rel="noreferrer"
          >
            打开在线演示 <ArrowUpRight size={17} />
          </a>
        </div>
      </section>
    </article>
  );
}
