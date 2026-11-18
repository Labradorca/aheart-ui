# 从 1.x 迁移到 2.0 预发布版

用已发布的 `aheart-ui@1.4.0`、`@aheart-ui/ai@1.2.0` 和 `@aheart-ui/dnd@1.1.0` 建立回退基线。旧应用仍可使用公开的 1.3.0，先保存原始源码、配置和锁文件。2.0 预发布版使用精确版本和 `next` 通道，`latest` 保持 1.x。

## API 和产物

| 1.x 用法 | 2.0 预发布版 | 迁移 |
| --- | --- | --- |
| `import UI from 'aheart-ui'` | 核心根入口只有 named 导出 | 将 default 移到 `aheart-ui/full`，并显式导入 `aheart-ui/full.css`。根 named 组件、公开类型和对象身份继续可用 |
| 逻辑深路径 `aheart-ui/es/*`、`aheart-ui/lib/*` | 2.x 由打包时生成的兼容 facade 提供 | 可导入等价的公开子入口。应用若读取 `node_modules` 内的绝对物理路径，改用公开子入口或解析它们。包内布局现在是 `dist/{esm,cjs,types,styles}` |
| `import { AIAgentWorkbench } from '@aheart-ui/ai'` | AI 根入口移除 Workbench | 改用 `@aheart-ui/ai/workbench`，等价的 `@aheart-ui/ai/agent-workbench` 也可用 |
| AI 根默认 Plugin 自动注册 Workbench | AI 根 Plugin 注册其余组件 | 要继续全量注册使用 `@aheart-ui/ai/full`，并显式安装 DND |
| AI 强制安装 DND | DND 成为 `^1.1.0` 可选 peer | Chat、Agent 和 AIForm 无需 DND。Workbench 和 AI full 用户在应用内显式安装 DND 1.1.0 |
| `aheart-ui/style.css` 或旧深路径样式 | `style.css` 仍等价于 `full.css`，JS 入口无隐式样式 | 全量导入 `full.css`；按需导入一次 `theme.css` 及组件 CSS |

完整范围见 [冻结弃用表](https://github.com/Labradorca/aheart-ui/blob/master/docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md)。

## 显式样式

全量注册。

```ts
import UI from 'aheart-ui/full'
import 'aheart-ui/full.css'
app.use(UI)
```

按需消费 AIForm。

```ts
import { AIForm } from '@aheart-ui/ai/form'
import 'aheart-ui/theme.css'
import '@aheart-ui/ai/form/style.css'
```

按需消费 Workbench。

```ts
import { AIAgentWorkbench } from '@aheart-ui/ai/workbench'
import 'aheart-ui/theme.css'
import '@aheart-ui/ai/workbench/style.css'
```

在应用入口导入一次 theme。手写组件样式或用 Resolver 的 `importStyle: 'css'`，选择一种方式。Resolver 只注入组件及其声明依赖的 CSS，`false` 只解析 JS。已有的 DND sortable 样式导入仍可解析。

## Codemod

从仓库根目录运行，传入应用副本里需要改写的文件。

```sh
node scripts/codemods/aheart-v2.mjs --dry-run /path/to/app/src/App.vue /path/to/app/src/main.ts
node scripts/codemods/aheart-v2.mjs --write /path/to/app/src/App.vue /path/to/app/src/main.ts
node scripts/codemods/aheart-v2.mjs --check /path/to/app/src/App.vue /path/to/app/src/main.ts
```

工具处理静态 default、named-default、显式 re-export、明确的 CommonJS 或 awaited 属性访问、Workbench 别名以及有等价公开入口的旧逻辑路径。工具也将旧 `style.css` 改写到公开的 `full.css`。混合导入保留原有 named 绑定和类型，重复执行保持幂等。Vue 文件中只改写 script 和 script setup。

动态 namespace、变量传播、反射、跨 ESM/CJS 的绑定语义、私有路径、带抑制指令的混合声明，以及解析失败的文件需要人工审阅。含 Workbench 的 AI 根调用应使用新子入口；确需原来的整个 Plugin 及注册集合时使用 AI full。不能从源码推断样式加载策略时，按上节选择全量或按需。

## 安装精确版本

先用 `npm view aheart-ui dist-tags` 和 `npm view @aheart-ui/ai dist-tags` 确认公开通道。Alpha 已发布。只使用 Core 的应用可以去掉命令中的 AI 依赖。

```sh
npm install --save-exact aheart-ui@2.0.0-alpha.0 @aheart-ui/ai@2.0.0-alpha.0
```

Core 和 AI 的 `next` 均指向 Beta 后，可从 Alpha 升级到以下版本。

```sh
npm install --save-exact aheart-ui@2.0.0-beta.0 @aheart-ui/ai@2.0.0-beta.0
```

核对锁文件中的精确版本、`resolved` 与 `integrity`。Workbench 和 AI full 还需要 `npm install --save-exact @aheart-ui/dnd@1.1.0`。用本地 tarball 验收时，在应用副本里更新依赖清单和锁文件。

## 验证和回退

先运行 codemod 预览并检查差异，再执行严格类型、生产构建、SSR/hydration 与 iframe 验证。保存锁文件和包摘要。两试点的源码改写只在独立副本执行。应用业务源码若需手工改动，逐项对照上面的人工事项记录。

回退时恢复升级前的源码、`package.json` 和原锁文件，再执行 `npm ci`。核对 registry URL、integrity 及原业务数据。公开版本的回退通过 dist-tag 切换和 npm deprecate 执行，保留既有版本及 tag。

iOS Safari 仅经浏览器仿真验证，未经真机验证。
