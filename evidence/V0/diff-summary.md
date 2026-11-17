# V0 开 PR 前差异摘要

初始基线：`735d3d33e0e5a770c5cb83f782dbe33016b4ada7`；#50 合入后的实施基线：`287058d6395460913b8013c9201c196e9b36c2c9`。分支：`codex/v2-a2-v0`；独立 worktree：`/Users/start/code/aheart-ui-wt/v2-a2-v0`。

[#50 合并前快照](coordination-recheck-2026-11-17.md) 保留为历史；#50 已合入，路线图按负责人确认的等待方案完成本地应用与 [运行检查](roadmap-after-pr50/README.md)。

| 改动 | 审阅入口 |
| --- | --- |
| 复制并修订 A2；注明事实复核、41 条跳过、49 Ready / 24 子路径口径、M3 精确 SHA 缺口、显式 CSS 已满足、完整预算与 dist 内兼容 facade | [A2 草稿](../../docs/superpowers/specs/2026-11-17-aheart-ui-v2-amendment-a2-draft.md)；[相对输入草稿的 diff](a2-revision.diff) |
| M2/M3 各一张九行验收表；不补人工验收；M2 namespaced/data 拟移 V3 | [M2](../M2/decision-log.md)、[M3](../M3/decision-log.md) |
| 四项弃用候选有入口、依赖、产物证据，版本与迁移示例；B4 改为既有回归契约 | [弃用表](../../docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md) |
| 六份来源合成一份可执行计划，条款逐项注明来源和效力 | [合并计划](../../docs/superpowers/plans/2026-11-17-aheart-ui-current-plan.md) |
| V0 决策留空，PR 模板增加阶段证据与分状态检查；路线图保留 #50 布局应用发布状态和 V0–V4 待批准提案 | [V0 日志](decision-log.md)、[路线图文案](roadmap-copy.md)、[运行与截图](roadmap-after-pr50/README.md)、[PR 模板](../../.github/pull_request_template.md) |
| 可复核事实快照、Release 原始 JSON/哈希副本、命令/退出码 | [核对报告](fact-check.md)、[检查记录](checks/README.md) |

Local：在 #50 新主线上文档构建成功；相关脚本 **16/16** 通过；宽/窄实际生产预览已观察，截图有记录；diff 检查与精确命令在检查记录。补充 CSS zoom 探针有已诊断的最小宽度限制，未记为通过。superpowers 源规范/计划不在当前 VitePress 发布页面内，文档构建不等于这些提案已公开发布。

PR：未创建。Merged：否。Main CI：本候选缺失。Pages：本候选未部署。npm pack：本轮 N/A。npm published：本轮无发布，公开 1.3.0/领域包 1.1.0 是已有事实。用户验收：缺失。

V0 仍未达到合并出口：A2 未批准，“是否启动 v2”未填，PR 与主线门禁尚未执行；M2/M3 历史人工验收缺口保留。四份原规范和 A1 不改，路线图已在 #50 合并结果上应用文案，没有覆盖其布局。V1 未启动，须 V0 合并后另建分支。

请负责人分别决定：是否批准 A2、是否启动 v2（Go / 延期 / 缩范围），以及是否授权创建本范围的 V0 PR。允许开 PR 不等于合并、自动 Pages 部署或后续 V1 的任何发布授权。
