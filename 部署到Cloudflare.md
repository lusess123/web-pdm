# 部署到 Cloudflare

本项目是纯前端站点，不需要 Docker。当前推荐使用 Cloudflare Worker Static
Assets 部署，并通过 `erd.zyking.xyz` Custom Domain 对外提供服务；原有
Cloudflare Pages 部署方式仍然保留在本文后半部分，已有环境无需迁移也可以继续使用。

## 推荐方案：Cloudflare Worker

仓库根目录的 `wrangler.jsonc` 是部署配置的唯一事实来源：

- Worker 名称：`web-pdm-erd`
- 静态资源目录：`docs-dist`
- 自定义域名：`erd.zyking.xyz`
- 未命中静态文件时回退到单页应用入口，支持直接访问文档子路由

首次使用时先完成 Cloudflare 登录，然后执行：

```bash
pnpm install --frozen-lockfile
pnpm deploy:cloudflare
```

命令会先构建文档站点，再发布静态资源。只想检查构建与 Worker 包而不发布时执行：

```bash
pnpm deploy:cloudflare:dry-run
```

Custom Domain 由 Cloudflare 管理 DNS 与证书，不需要手工创建占位 A 记录或 CNAME。
如果域名上已经存在同名 DNS 记录，应先确认它不再承载其他服务，再执行部署。

## 备选方案：Cloudflare Pages

Cloudflare Pages 也可以直接安装依赖并构建静态站点。

## 构建设置

- 框架预设：`None`
- 构建命令：`pnpm build:site`
- 构建输出目录：`docs-dist`
- 环境变量 `NODE_VERSION`：`22.16.0`
- 环境变量 `PNPM_VERSION`：`11.12.0`

必须在 Cloudflare Pages 的环境变量中显式设置 `PNPM_VERSION=11.12.0`。Pages v3 构建镜像的默认 pnpm 无法读取当前 `pnpm-lock.yaml`，仅依赖 `package.json` 中的 `packageManager` 字段会导致冻结锁文件安装失败。

仓库同时在 `package.json` 中记录了 pnpm 版本和 Node.js 最低版本。Cloudflare 每次部署都会从源码生成 `docs-dist`，因此构建产物不提交到 Git。

如果需要同时验证组件包，可将构建命令改为 `pnpm build`；站点输出目录仍然是 `docs-dist`。
