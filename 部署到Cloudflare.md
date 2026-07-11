# 部署到 Cloudflare Pages

本项目不需要 Docker。Cloudflare Pages 直接安装依赖并构建静态站点即可。

## 构建设置

- 框架预设：`None`
- 构建命令：`pnpm build:site`
- 构建输出目录：`docs-dist`
- Node.js：`22.12.0` 或更高版本
- pnpm：`11.11.0`

仓库已在 `package.json` 中固定 pnpm 版本。Cloudflare 每次部署都会从源码生成 `docs-dist`，因此构建产物不提交到 Git。

如果需要同时验证组件包，可将构建命令改为 `pnpm build`；站点输出目录仍然是 `docs-dist`。
