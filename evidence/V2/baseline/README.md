# V2 开工核对与 1.x 回退基线

工作分支为 `codex/v2-alpha`。起点为官方 `master` 和更新后的 `origin/master` 共同指向的 `1344017414d203f75095b01c3cc952ab7bcb178d`。

| 进入条件 | 核对结果 |
| --- | --- |
| A2 批准并合入 | 通过。批准框已勾选，PR #51 合并 SHA `b1eef9b6f5e1b64706beee5d4d56e08891f27c26` 已在 master 祖先。[A2](../../../docs/superpowers/specs/2026-11-17-aheart-ui-v2-amendment-a2-draft.md) · [PR #51](https://github.com/Labradorca/aheart-ui/pull/51) |
| 负责人 Go | 通过。V0 决策日志登记“Go，按 A2 计划推进 v2”。[V0 日志](../../V0/decision-log.md) |
| V1 Pass、全部 Ready 入口和 CSS | 通过。PR #52 已合入，负责人回复“√V1 结项确认”。主线中的 V1 验收表为合并前快照，合并后验收及 G8 代理自动复测归档在 V1 本地结项提交 `52e77bf`，公开版本及双试点证据可在 Release 附件核对。对公开 npm 的三包逐个检查 exports 目标与包内文件，65 个入口和对应 CSS 均有目标。[PR #52](https://github.com/Labradorca/aheart-ui/pull/52) · [V1 Release](https://github.com/Labradorca/aheart-ui/releases/tag/v1.4.0) · [包覆盖](registry.json) |
| V0 弃用表无待定项 | 通过。B1 根默认 Plugin、B2 布局和兼容 facade、B3 AI 与 DND 解耦、B4 样式回归契约均有明确处置。[冻结表](../../../docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md) |

已阅读现行合并计划、A2-4、A2-6、A2-7，RFC §7.2–§7.6、§15.2 和 §18，以及冻结表。包体和 CSS 沿用 M1 与已冻结的入口门禁，E2E 以 V0 的 41 条静态跳过调用点为上限。[现行计划](../../../docs/superpowers/plans/2026-11-17-aheart-ui-current-plan.md) · [M1 契约](../../M1/contract.md)

| 公开 latest | 用作回退的 tarball SHA-256 |
| --- | --- |
| `aheart-ui@1.4.0` | `2c87c1bed02b307655624f6068df0d06ca9e6d9859ff783b150d9e2d79c25474` |
| `@aheart-ui/ai@1.2.0` | `8055c52babbb0002145db1b3bb0df0eb2638f9c28239d71c4a7231ea20e62fc7` |
| `@aheart-ui/dnd@1.1.0` | `8cbc23c703b7250154c7d8afd2c18bf0e2ba3fe16f6bd6a82754967caf54747a` |

公开 tarball 和 SRI 已直接从 registry 下载核对，原文件保存到本 worktree 的 `test-results/v2-baseline/packs/`。V1 GitHub Release 回执包含 core 和 AI 包的对应哈希。[registry 回执](registry.json) · [V1 Release 回执](v1-release.json)

## 升级前复测

| 检查 | 结果 |
| --- | --- |
| 两个精确版本试点 | 通过。clean-consumer 与 ai-review-gate 从公开 registry 重装，锁文件里的 resolved 和 integrity 均与上表对应。两端严格类型、SSR / hydration 和 Chromium 两视口通过 |
| M1、M3 消费端 | 通过。包入口、历史路径、样式与模块图、Resolver、SSR 和 iframe |
| V1 全量消费端 | 通过。65 个入口的运行时与 CSS 门禁全部通过 |
| 严格类型 | Vue 3.5.38、3.5.44 均通过 |
| 迁移工具及视觉回归 | 通过。三个浏览器引擎两套视口共六对 full/scoped 截图逐字节一致 |

结果保存于[检查回执](checks.json)，原始运行文件保存在本 worktree 的 `test-results/v2-baseline/`。回退锁文件保存在 [clean-consumer](clean-consumer-lock.json) 与 [ai-review-gate](ai-review-gate-lock.json)。
