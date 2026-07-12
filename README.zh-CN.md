# web-pdm

[English](./README.md) | 简体中文

<img src="./docs/public/brand/web-pdm-mark-light.svg" alt="web-pdm" width="168" />

web-pdm 是一个用 G6 制作的 ER 图工具，最终目标是做成在线版 PowerDesigner。当前版本已经发展为基于 G6 5 的轻量、可嵌入 React ER 图工作台。

![web-pdm ER 图](./docs/assets/erd.jpeg)

## 缘起

[《ER 图的设计与实现》](https://www.yuque.com/antv/g6-blog/nbaywp)记录了项目最初的设计与实现思路。项目希望为数据库设计、领域建模和 Low-code/APaaS 平台提供可定制、跨平台的业务模型视图。

## 在线体验

- [文档与交互式工作台](https://erd.zyking.xyz/)
- [完整模型示例](https://erd.zyking.xyz/zh/demo/)
- [历史模型 Demo](https://erd.zyking.xyz/~demos/docs-erd '模型')

## 核心能力

- 使用真实的 G6 `5.1.1` 渲染，支持关系布局、小地图和 PNG 导出
- 自维护轻量控件，在复杂交互处使用 Radix primitives，并使用 Lucide 图标
- 不依赖 Ant Design、dumi、father 或 Docker 运行环境
- 默认英文，完整支持简体中文
- 支持光明与黑暗主题，画布、控件和浮层文本均保持清晰可见
- 自适应浏览器可视区域；没有菜单数据时不会显示空导航栏
- 文档站可直接构建为 Cloudflare Worker 静态资源

## 环境要求

- Node.js `22.13.0` 或更高版本
- pnpm `11.12.0`

## 本地开发

```bash
corepack enable
pnpm install
pnpm dev
```

开发服务会输出本地文档地址，首页即为可交互的 ER 图工作台。

早期版本使用以下启动命令，继续保留供旧项目和历史提交参考：

```bash
npm i
npm run watch
```

`npm run watch` 属于早期构建链路；当前仓库请使用 `pnpm dev`。

## 完整验证

```bash
pnpm test
pnpm typecheck
pnpm lint
pnpm build
pnpm test:browser
pnpm test:exports
```

## 包说明

- `web-pdm`：包含轻量控件和图标，可直接使用的 React 组件
- `web-pdm-core`：组件核心逻辑与公共类型

## 反馈与共建

欢迎通过 Issue、Pull Request 和社区交流参与项目。以下二维码来自项目原始文档并继续保留：

<img src="./docs/assets/group.jpeg" alt="web-pdm 社区" width="260" />

## 赞助

如果 web-pdm 对你的工作有帮助，可以通过原有赞助渠道支持项目持续维护。

<img src="./docs/assets/pay.jpeg" alt="赞助 web-pdm" width="260" />

## 更新日志

项目早期路线图、0.0.1—0.0.3 版本记录与技术致谢完整保存在[《历史资料》](./doc/历史资料.md)，当前版本的迁移边界同时记录在文档站和仓库历史中。

## 部署

请查看[部署到 Cloudflare](./部署到Cloudflare.md)。站点使用 `pnpm build:site` 构建，发布目录为 `docs-dist`，通过 Worker 静态资源托管，不需要 Docker。

## 许可证

[MIT](./LICENSE)
