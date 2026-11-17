# v2 弃用与兼容清单（A2 已批准，随修订生效）

这是 A2-4 四项候选的具体处置提案，按 [RFC §18.4](../specs/2026-09-08-aheart-ui-v2-architecture-optimization-design.md#_18-4-弃用格式) 记录。方案已随 A2 获负责人批准，自 PR #51 合入 master 起生效，破坏性切换按后续阶段实施；开始版本是计划值，不表示已发布 1.4 或 2.0。基础包 1.3.0、AI/DND 1.1.0 的现状以基线 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7` 审计。v1.x 保留既有 API；本文件不授权删除入口、改版本、打 tag 或发布。

| ID / 旧 API | 替代 API | 开始弃用版本（计划） | 预计移除版本（计划） | 是否有运行时 warning | 迁移示例 | 处置 |
| --- | --- | --- | --- | --- | --- | --- |
| B1：`import AheartUI from 'aheart-ui'` 根默认 Plugin | `import AheartUI from 'aheart-ui/full'`；根 named/components/types 继续保留 | `aheart-ui@1.4.0` | 根 default 在 `aheart-ui@2.0.0-alpha` 移除，2.0 stable 不再提供 | V1 增加开发环境、使用旧 Plugin 时的一次性提示；生产不输出；本轮未实施 | 示例 1 | major 破坏；`/full` 已存在 |
| B2：以 Git 中 `es/`、`lib/` 为主产物，或依赖其物理目录；逻辑深路径继续兼容 | `dist/{esm,cjs,types,styles}`；公开组件 subpath；在 `dist/compat/{es,lib}` 生成 facade 并以 exports 映射旧逻辑路径 | `aheart-ui@1.4.0` 文档标 legacy | Git 生成目录和主产物布局在 2.0-alpha 切换；`aheart-ui/es/*`、`lib/*` 保留整个 2.x，3.0 才删除 | 物理目录无运行时 API，N/A；保留的逻辑路径不伪报在 2.0 删除。V1 对实际改变的旧入口按适用性加开发提示 | 示例 2 | major 布局切换；tarball `files` 保持 dist + README/LICENSE/必要元数据 |
| B3：AI 根入口的 `AIAgentWorkbench` 与强制 `dependencies.@aheart-ui/dnd` | `@aheart-ui/ai/agent-workbench`（已有 `/workbench` 别名保留）；DND 为 optional peer，Workbench 和 `/full` 用户显式安装 | `@aheart-ui/ai@1.2.0`（兼容 minor 目标） | `@aheart-ui/ai@2.0.0-alpha` 从根删除 Workbench；peer 变更同 major | V1 对实际受影响旧用法给开发提示，生产不输出；V2 缺 DND 使用 Workbench/full 时应给可操作错误，不影响 Chat | 示例 3 | major 破坏；DND 无 breaking 时不强制升 major |
| B4：依赖运行时 JS 自动带入真实 CSS 的假设 | 显式 theme + 组件 CSS，或 full.css；Resolver 仅注入组件 CSS | N/A：1.3.0 发布 JS 已无真实 CSS import | N/A：保留 `style.css → full.css`，不新增入口删除 | N/A：当前产物已满足，无可弃用的隐式 CSS 行为；不加虚假 warning | 示例 4 | 从新增破坏降为回归契约 |

AI 的 1.2.0 只是独立版本目标提案；RFC §18.3 要求领域包独立版本，V1 实际改版本仍需负责人单独授权。本轮不改 package.json 或发布版本。

## 每项源码依据

| ID | 入口现状 | 依赖现状 | 产物与构建依据 |
| --- | --- | --- | --- |
| B1 | [基础包 index.ts](../../../packages/components/src/index.ts) 最后导出 `./plugin`；[full.ts](../../../packages/components/src/full.ts) 同样导出 Plugin | [plugin.ts](../../../packages/components/src/plugin.ts) 引入全部注册组件；根未与 full 静态分离 | [package.json](../../../packages/components/package.json) 的 `.` 和 `./full` 分别映射 es/lib；[es/index.js](../../../packages/components/es/index.js) 仍保留 Plugin 导出；V2 须用模块图证明根不含 full、Table、DatePicker、AI、DND |
| B2 | 三包 `main/module/types/exports/files` 当前均以 es/lib 为主；基础包已有逻辑子入口 | 外部依赖仍 external；仅移动文件不会解决 B1 或 B3 的依赖图 | [基础 Vite 配置](../../../packages/components/vite.config.ts)、[AI 配置](../../../packages/ai/vite.config.ts)、[DND 配置](../../../packages/dnd/vite.config.ts)；[审计](../../../evidence/V0/source-audit.json) 列出已跟踪产物数。V2 基础包切布局；领域包若同步切换按各自版本契约执行，不以重排产物掩盖 breaking |
| B3 | [AI index.ts](../../../packages/ai/src/index.ts) 静态导入、导出并在默认 Plugin 注册 Workbench；[独立入口](../../../packages/ai/src/agent-workbench/index.ts) 已存在 | [AI package.json](../../../packages/ai/package.json) 的 DND 是 `dependencies: workspace:^1.1.0`，没有 optional peer；[Workbench](../../../packages/ai/src/agent-workbench.vue) 引入 `@aheart-ui/dnd/sortable` | AI root/full 当前同指 es/lib index；独立 `/agent-workbench` 与 `/workbench` 同指独立产物；Chat 独立路径已有，但安装仍强制带 DND |
| B4 | 基础 src/index.ts 导入 theme，AI/DND 源码也有 CSS import；源码与发布 JS 必须区分 | CSS 不是可选 JS 依赖；`sideEffects: ["**/*.css"]` 保护显式样式 | [M1 契约](../../../evidence/M1/contract.md) 已规定 style-free；基础构建写 `.css.js` 空占位，AI/DND [共享样式构建](../../../packages/build/split-styles.mjs) 拆样式；[源审计](../../../evidence/V0/source-audit.json) 的三包发布 JS 真实 CSS import 均为 0 |

## 迁移示例

### 示例 1：根默认 Plugin

```ts
// 旧：import AheartUI from 'aheart-ui'
import AheartUI from 'aheart-ui/full'
import 'aheart-ui/full.css'
app.use(AheartUI)
```

named import 保留；不要把 `import { Button } from 'aheart-ui'` 机械改成全量插件。

### 示例 2：公开逻辑路径

```ts
// 旧：import { Button } from 'aheart-ui/es/button/index.js'
import { Button } from 'aheart-ui/button'
import 'aheart-ui/theme.css'
import 'aheart-ui/button/style.css'
```

2.x 的旧 es/lib 路径仍须从 tarball 解析；被原 exports 显式禁止的 picker-core 私有路径不因此变成公共 API。不支持应用通过绝对文件系统路径读取 npm 包内部目录。

### 示例 3：Workbench 与 DND

```ts
// 旧：import { AIAgentWorkbench } from '@aheart-ui/ai'
import { AIAgentWorkbench } from '@aheart-ui/ai/agent-workbench'
import '@aheart-ui/ai/agent-workbench/style.css'
import '@aheart-ui/dnd/sortable/style.css'
```

Workbench 用户显式安装 `@aheart-ui/dnd`；Chat 用户无需安装 DND。AI `/full` 保留 Workbench 并明确要求 DND，AI 根其余导出与类型保留。

### 示例 4：显式样式（1.3 已适用）

```ts
import { Button } from 'aheart-ui/button'
import 'aheart-ui/theme.css'
import 'aheart-ui/button/style.css'
```

Resolver 的 `importStyle: 'css'` 只注入组件 CSS，theme 由应用导入一次；使用手动样式或 Resolver 其中一种。完整 1.3 → 2.0 迁移表和可机械改写部分的 codemod 在 V1 实现并从实际 tarball 验证。

V2 只能用 `next` 发布 alpha；`latest` 保持 1.x。两试点从 1.3 升级到 alpha 后，codemod 之外的改动必须逐项写进指南，指南外改动数为 0；回退到 1.3 及锁文件并保留业务状态。来源：RFC §7、§15.2、§18；总体方案 §13.2；A2-3、A2-4。
