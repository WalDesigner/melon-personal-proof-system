# 嘉伦 · Melon｜个人能力证明系统

面向企业人工智能解决方案、售前与实施交付岗位的个人能力展示网站。

它不是传统的前端作品集，而是把技术实现、客户沟通、方案设计、产品原型和项目交付组织成一条可验证的职业能力链路。

## 核心体验

- 三维能力世界：使用 Three.js 点云、动态连线和空间环展示复合能力，悬浮节点时平滑聚拢到对应能力；
- 旗舰案例：用“企业人工智能解决方案工作台”展示需求诊断、方案设计、概念验证、部署规划和投入产出判断；
- 经历到证据：把前端开发、企业项目交付和企业级软件销售转化为岗位价值；
- 稳定联系入口：悬浮预览、点击固定、滚动保持，支持复制微信、电话、邮箱并尝试唤起微信；
- 响应式与无障碍：支持键盘操作、清晰焦点状态和减少动态效果设置。

## 页面

- `/`：职业定位、能力地图、核心作品、经历证明、长期执行力与联系方式；
- `/studio`：核心作品的完整案例说明与在线演示入口。

## 本地运行

```bash
npm install
npm run dev
```

浏览器打开 `http://localhost:3000`。

正式检查：

```bash
npm run lint
npm run build
PORT=3100 npm run start
```

## 发布准备

仓库已提供 CloudBase Run 所需的 standalone 构建与多阶段容器配置：

- `next.config.js` 启用 `output: "standalone"`；
- `Dockerfile` 使用非 root 用户运行正式产物；
- `.dockerignore` 与 `.cloudbaseignore` 排除本地职业底稿、研究资料、环境文件、
  旧模板素材、依赖和构建产物；
- `cloudbaserc.example.json` 固定独立服务名
  `garen-personal-portfolio`，不会覆盖企业工作台服务。

实际发布前先选择 CloudBase 环境，再将示例复制为本地
`cloudbaserc.json`；该文件默认不进入 Git。正式公开地址必须在构建阶段传入
`NEXT_PUBLIC_SITE_URL`，否则 sitemap 与分享元数据会继续使用本地回退地址。

容器发布前可以本地验证：

```bash
docker build -t garen-personal-portfolio:local .
docker run --rm -p 3100:3000 garen-personal-portfolio:local
```

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Three.js
- 原生 CSS 动效与响应式布局

## 内容边界

- 核心作品是公开产品原型，不描述为真实企业生产部署案例；
- 前端是技术底座，职业主线是人工智能解决方案、售前与实施交付；
- 健身模块只用于证明长期执行力，照片位置当前为明确标注的版式占位；
- 仓库只包含可公开的网站源代码，职业底稿、简历材料和内部设计记录保留在本地。

## 许可与来源

工程底座改编自 [namanbarkiya/minimal-next-portfolio](https://github.com/namanbarkiya/minimal-next-portfolio)，遵循 MIT License，原许可证保留在仓库中。网站的信息架构、中文内容、三维交互、首页与案例页均已按本项目重新设计。
