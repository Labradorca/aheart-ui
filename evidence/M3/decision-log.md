# M3 决策与证据补录 · 2026-11-17

状态：**实现已合并并公开交付；合并 SHA 的 G7 与用户验收证据未齐，Needs decision**。保留 [2026-11-11 候选摘要](implementation-2026-11-11/summary.md)，按 A2-7 格式补录，不把历史候选状态改成伪造的用户 Accepted。A2 批准前，A1 与原八门禁仍有效。

## 一张验收表

| 项目 | 分项状态 | 证据 | SHA / 时间 | 责任人 |
| --- | --- | --- | --- | --- |
| G1 设计 | A1 范围可查 | [A1-4 M3](../../docs/superpowers/specs/2026-11-05-aheart-ui-v2-solo-scope-amendment.md)、[迁移指南](../../docs/guide/m3-migration.md)；AI/DND subpath、CSS、Resolver 与文档 | A1 2026-11-05 | wzfdhr 决策 |
| G2 代码 | Local：历史实现有记录 | [#44 diff](https://github.com/Labradorca/aheart-ui/pull/44/files)、[本地摘要](implementation-2026-11-11/summary.md)；v1 AI 根 Workbench 和 DND 安装依赖保留，major 切换未实施 | `25d0d4babfee5782377c787ac187d9728a3635a4` | 实施记录 / Codex 复核 |
| G3 自动检查 | 历史本地与 PR 检查有记录；本轮未重跑 M3 全量 | 摘要记录 1778 项组件单测、严格声明、确定性、独立 SSR 和试点；[第三轮 PR CI](https://github.com/Labradorca/aheart-ui/actions/runs/42976862214) 为历史 PR 证据 | 候选 / 合并前记录 | CI |
| G4 视觉 | 自动化截图有记录；人工接受证据缺失 | 摘要记录 Splitter 六张截图修复与五项目回归；[后续发布证据](../V0/upstream-release/release-evidence.json) 的试点仍注明 automated | 原候选 / 后续 `735d3d33` | wzfdhr 验收 |
| G5 包 | npm pack：历史记录有；原 M3 候选包 hash 缺失；后续发布三包 hash 可查 | [Release](https://github.com/Labradorca/aheart-ui/releases/tag/v1.3.0)、[SHA256SUMS](../V0/upstream-release/SHA256SUMS)、[发布消费记录](../V0/upstream-release/release-evidence.json) | 发布源码 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7` | 发布记录 |
| G6 PR / 合并 | PR：已关闭且合并；Merged：是；自审依据见历史摘要（A1 不要求独立多角色签字） | [PR #44](https://github.com/Labradorca/aheart-ui/pull/44)、[合并提交](https://github.com/Labradorca/aheart-ui/commit/25d0d4babfee5782377c787ac187d9728a3635a4) | `2026-11-11T08:08:49Z` | GitHub 记录 |
| G7 主线 CI / Pages | **合并 SHA：Main CI cancelled；Pages 缺失**。后续发布 SHA：CI/Pages success，单独列示 | 原 SHA [42984728965](https://github.com/Labradorca/aheart-ui/actions/runs/42984728965) 的 browser job cancelled；无同 SHA 成功 Pages。后续 [CI 43912659909](https://github.com/Labradorca/aheart-ui/actions/runs/43912659909) 12/12 success 与 [Pages 43920744949](https://github.com/Labradorca/aheart-ui/actions/runs/43920744949) success；[当前站点](https://labradorca.github.io/aheart-ui/) | 原 SHA `25d0d4ba`；后续发布 SHA `735d3d33` | CI / Pages |
| G8 用户验收 | UA：**缺失** | 未找到 M3 负责人逐项操作与签字；公开 registry 自动化试点不代替用户验收 | 缺失 | wzfdhr |
| npm published | 已公开发布；不是阶段验收结论 | `aheart-ui@1.3.0`、AI/DND `1.1.0`；[实时 registry 核对](../V0/facts.json)、[v1.3.0 Release](https://github.com/Labradorca/aheart-ui/releases/tag/v1.3.0) | Release `2026-11-17T01:10:36Z`，纽约时间 11 月 16 日 | npm / Release |

## 缺口与后续

- G7 精确合并 SHA 的成功主线 CI 和 Pages：**缺失**。保留 cancelled 事实，不重跑历史 SHA 触发部署，不用后续成功替换原记录。负责人可审查后续发布证据，但本日志不代签豁免。
- G4 人工接受、G8 用户验收、原候选包 hash、阶段书面结论：**缺失**。原 `.pilot-runs/` 本地路径只由历史摘要引用，本轮没有找到并验证原目录，不能称已归档原始运行产物。
- 未关闭 P0/P1/P2 的本轮完整审计：**缺失**。
- AI 根导出 Workbench、DND 从 dependency 转 optional peer 属于 V2 major 候选，不能因 M3 的 subpath 已发布便写成依赖边界全完成。见 [弃用表](../../docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md)。
- 回滚：精确版本和原锁文件回退；不更改已发布 tarball、不 unpublish。

负责人阶段决定：

日期 / 依据：
