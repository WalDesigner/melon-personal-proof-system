# 嘉伦 · Melon｜个人能力证明系统

面向企业人工智能解决方案、售前与实施交付岗位的个人能力展示网站。

它不是传统的前端作品集，而是把技术实现、客户沟通、方案设计、产品原型和项目交付组织成一条可验证的职业能力链路。

## 核心体验

- 作品优先：先呈现职业定位、核心项目与可核验实现，再展示工作方式和经历；
- 旗舰案例：用“企业人工智能解决方案工作台”展示需求诊断、方案设计、概念验证、部署规划和投入产出判断；
- 经历到证据：把前端开发、企业项目交付和企业级软件销售转化为岗位价值；
- 配置过的电话和邮箱可在顶部「联系我」浮层与页尾显示，页尾始终提供 GitHub，不展示微信；
- 响应式与无障碍：支持键盘操作、清晰焦点状态和减少动态效果设置。

## 页面

- `/`：职业定位、核心作品、工作方式、经历、长期主义与联系方式；
- `/studio`：核心作品的完整案例说明与在线演示入口。

## 本地运行

```bash
npm ci
npm run dev
```

浏览器打开 `http://localhost:3000`。

正式检查：

```bash
npm run lint
npm run build
npm run preview
```

`npm run preview` 默认使用 3000 端口；如端口被占用，可在命令末尾补上
`-- -l 3100`。

## 国内发布准备

本网站不依赖服务端接口或环境密钥，正式发布采用 CloudBase 静态托管：

- `next.config.js` 启用静态导出，构建产物位于 `out/`；
- 静态托管不创建容器实例，没有容器冷启动；仍消耗存储、请求与流量，同环境不代表独立免费额度，以实际资源归属和账单为准；
- 正式构建时传入公开站点域名，以便 sitemap 与分享元数据使用正确地址：

```bash
NEXT_PUBLIC_SITE_URL=https://your-public-domain.example npm run build
```

部署时仅上传 `out/` 目录，避免将本地职业底稿、环境文件或源代码传到公网。

### 已上线

- 国内公开站点：[嘉伦 · Melon](https://2645-static-enterprise-ai-studi-d1bhe40a167e-1444381545.cos.ap-shanghai.myqcloud.com/index.html)；
- 核心案例页：[企业人工智能解决方案工作台](https://2645-static-enterprise-ai-studi-d1bhe40a167e-1444381545.cos.ap-shanghai.myqcloud.com/studio/index.html)；
- 已在 2026-08-19 完成公网首页、案例直达页与浏览器交互验证。

2026-11-18 页尾联系版已在原 CloudBase/COS 发布，57 个文件公网回读一致。默认网址仍可能以附件形式返回 HTML，公网文件一致不等于浏览器入口限制已解决。本站是纯静态导出，不依赖工作台容器或模型密钥。见 [版本记录](RELEASE_GATE.md)。

### 公开源码与生产内容

此分支公开交互实现，不内置个人电话、邮箱、体重数字和相册照片；它不是线上静态包。默认构建仍可浏览首页和案例，联系方式回退为作品档案，不生成空拨号、空邮件或失效照片链接。

- `NEXT_PUBLIC_PORTFOLIO_PHONE`、`NEXT_PUBLIC_PORTFOLIO_EMAIL`：可选，分别启用顶部和页尾对应的联系项。
- `NEXT_PUBLIC_PORTFOLIO_WEIGHT_START`、`NEXT_PUBLIC_PORTFOLIO_WEIGHT_CURRENT`：可选，均设置后才显示阶段数字。
- 相册媒体放在本地忽略目录 `public/images/discipline-story/`，准备好 `photo-gallery.tsx` 定义的 WebP 大图和缩略图后，才设置 `NEXT_PUBLIC_PORTFOLIO_GALLERY=1`。

这些值会出现在构建后的网页，不是秘密变量。不要填入凭据，也不要把包含个人资料的源码配置、媒体或构建产物推送到公开仓库。

## 技术栈

- Next.js 16
- React 19
- TypeScript
- Three.js
- 原生 CSS 动效与响应式布局

## 内容边界

- 核心作品是公开产品原型，不描述为真实企业生产部署案例；
- 前端是技术底座，职业主线是人工智能解决方案、售前与实施交付；
- 长期执行力模块只引用本人真实体重管理经历，不使用占位照片或虚构证据；
- 仓库只包含可公开的网站源代码，职业底稿、简历材料和内部设计记录保留在本地。

## 当前阶段

2026-11-18：页尾联系版完成，保留黑蓝首屏、吸顶导航、相册和案例路径。站点仍为静态托管；构建依赖版本本轮未变，依赖维护与功能发布分开。

## 许可与来源

工程底座改编自 [namanbarkiya/minimal-next-portfolio](https://github.com/namanbarkiya/minimal-next-portfolio)，遵循 MIT License，原许可证保留在仓库中。网站的信息架构、中文内容、三维交互、首页与案例页均已按本项目重新设计。
