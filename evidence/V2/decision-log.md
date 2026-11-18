# V2 破坏性切换决策与验收

起点为 `1344017414d203f75095b01c3cc952ab7bcb178d`。分支 `codex/v2-alpha`，候选代码 SHA `e71d333a375febe902b50edb817be1a8a5407374`。QA 源码 SHA 为 `616c841ad0691d9ac607367505c64c9461e9c54f`。A2 已批准并在主线生效，V0 Go 与 V1 Pass 签收均已核对。[进入条件与 1.x 基线](baseline/README.md)

| 顺序 | 范围 | 实现提交和证据 |
| --- | --- | --- |
| 1 | 根 named 与 full | `141c53c`。[公开形状及生产模块图](root-split/README.md) |
| 2 | core、AI 发布产物布局 | `90bfe0c`。[包布局和旧路径复核](layout/README.md) |
| 3 | 生成 facade、生成物退出 Git、docs 源码 alias | `6a5a278`。[兼容与文档证据](facades/README.md) |
| 4 | AI root 移除 Workbench，DND 可选 peer | `d947590`。[无 DND 的 Chat](ai-optional/README.md) |
| 5 | 显式样式及 Resolver 回归 | `0030d69`。[65 入口与视觉](explicit-css/README.md) |
| 6 | Codemod、指南及升级回退演练 | `62f4f5a`。[两试点和持久任务](migration/README.md) |
| 7 | alpha 版本、next 发包契约和 CHANGELOG | `e71d333`。core 与 AI 为 `2.0.0-alpha.0`，DND 使用公开 `1.1.0` |

## A2-7 验收表

| 项目 | 分项状态 | 证据 | SHA / 时间 | 执行者 |
| --- | --- | --- | --- | --- |
| G1 设计 | A2、V0 Go、V1 Pass、四项冻结边界已核对 | [进入条件](baseline/README.md) | `1344017` | wzfdhr / Codex |
| G2 代码 | 七项实现已分别提交 | 上表 | `e71d333` | Codex |
| G3 自动检查 | 全仓 2,073 项通过，五项目 868 通过、131 运行时跳过、0 失败、0 flaky，静态跳过 41 条。文档、覆盖率、严格类型、SSR/iframe、模块和预算通过 | [E2E](alpha/e2e-summary.json) · [检查](alpha/checks.json) · [根入口生产图](alpha/root-module-graphs.json) | `e71d333` | Codex |
| G4 视觉 | 最终 alpha 包在三个浏览器引擎、两种视口的六对截图逐字节一致 | [最终视觉复验](alpha/checks.json) | `e71d333` | Codex |
| G5 包 | 本地 alpha pack 与确定性通过，重复 pack 相同 | [包摘要](alpha/packs.json) · [实包布局](alpha/pack-layout.json) | `e71d333` | Codex |
| G6 PR / 合并 | PR 未开，未合并 | 开 PR 前提供差异摘要与破坏性清单 | 待后续 | wzfdhr |
| G7 Main CI / Pages | V2 Main CI、Pages 待合并后的单独证据 |  |  | CI |
| G8 用户验收 | 待负责人逐项验收 | [五项任务清单](user-tasks.md) | `e71d333` 待验 | wzfdhr |
| npm published | 未预发布，等待单独授权 | [公开版本快照](alpha/external-state.json)，alpha 预发布目标为 `next` |  | wzfdhr |

P2 #53 为公开 1.x 已有的窄屏日期范围问题，已排到下一次 1.x 补丁。候选 P0/P1 均为 0。[问题与公开 registry 快照](alpha/external-state.json)
