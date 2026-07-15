"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const stages = [
  {
    label: "理解客户",
    title: "把模糊诉求还原成真实业务问题",
    description:
      "从目标、角色、流程、数据和约束出发，不急着给技术答案，先确认问题是否值得解决。",
    output: "客户画像与需求诊断",
  },
  {
    label: "设计方案",
    title: "把问题拆成可讨论的解决路径",
    description:
      "连接业务目标、人工智能能力、数据条件、系统模块和风险边界，让业务与技术可以在同一张图上对齐。",
    output: "场景方案与能力映射",
  },
  {
    label: "验证价值",
    title: "用最小范围验证关键假设",
    description:
      "限定概念验证的时间、功能、参与角色与验收标准，避免把演示原型误当成完整生产系统。",
    output: "概念验证计划与验收标准",
  },
  {
    label: "规划交付",
    title: "提前看见部署和协作成本",
    description:
      "把系统集成、安全、运维、人员分工和上线节奏纳入方案，使后续交付可预期、可推进。",
    output: "部署路径与交付清单",
  },
  {
    label: "说明回报",
    title: "把技术方案翻译成决策依据",
    description:
      "从投入、效率、收益和风险假设解释方案价值，帮助客户完成内部汇报与优先级判断。",
    output: "投入产出评估",
  },
];

export function SolutionJourney() {
  const [active, setActive] = useState(0);
  const current = stages[active];

  return (
    <div className="journey" data-tilt>
      <div className="journey-steps" role="tablist" aria-label="解决方案推进路径">
        {stages.map((stage, index) => (
          <button
            aria-selected={active === index}
            className={active === index ? "is-active" : ""}
            key={stage.label}
            onClick={() => setActive(index)}
            onFocus={() => setActive(index)}
            onMouseEnter={() => setActive(index)}
            role="tab"
            type="button"
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{stage.label}</strong>
            <ArrowRight size={15} />
          </button>
        ))}
      </div>
      <div className="journey-detail" role="tabpanel" aria-live="polite">
        <span className="journey-kicker">当前阶段</span>
        <h3>{current.title}</h3>
        <p>{current.description}</p>
        <div className="journey-output">
          <Check size={15} />
          形成输出：{current.output}
        </div>
      </div>
    </div>
  );
}
