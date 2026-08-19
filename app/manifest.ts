import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "嘉伦 · Melon｜企业人工智能解决方案候选人",
    short_name: "嘉伦",
    description: "把企业问题转化为可演示、可推进、可交付的人工智能解决方案。",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f5f2",
    theme_color: "#081426",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
    categories: ["个人作品", "商业", "技术"],
    lang: "zh-CN",
    dir: "ltr",
  };
}
