# V0 收口与范围决策 · 2026-11-17

状态：**PR 提交时快照；合并后状态以 PR #51、主线 CI 与 Pages 证据为准**。负责人已批准 A2 并决定 v2 Go；A2 合入前仍以 A1 为准，四份原规范和 A1 不变。#50 已合入，路线图已同步；V1 尚未启动。

## 负责人决定（由本人填写）

| 项目 | 决定 | 日期 / 依据 |
| --- | --- | --- |
| A2 批准 | 已批准，自 PR #51 合入 master 起生效 | 2026-11-17；负责人明确回复“批准 A2 修订”，见 [原文记录](owner-decisions-2026-11-17.md) |
| 是否启动 v2 | Go，按 A2 计划推进 v2 | 2026-11-17；由负责人本人回答，见 [原文记录](owner-decisions-2026-11-17.md) |
| V0 阶段结论 |  |  |
| V0 开 PR 授权 | 已授权创建 V0 PR | 2026-11-17；负责人在本对话明确回复“授权创建 V0 PR”；不包含 A2 批准、v2 Go、合并、Pages 或 V1 授权 |
| V0 合并及自动 Pages 部署授权 |  |  |

“是否启动 v2”已由负责人选择 Go，代理仅原样登记。A2 两个批准框依据该直接回复勾选；生效仍以合入 master 为条件。V1 各停止点的授权不从 V0 继承。

开 PR 授权是在审阅候选 `a47058a` 的差异摘要后单独取得。[草稿 PR #51](https://github.com/Labradorca/aheart-ui/pull/51) 已创建。负责人其后单独批准 A2 并决定 v2 Go，合并及自动 Pages 部署仍未授权。

## 基线与交付

- 初始基线 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7`；#50 合入后 rebase 到 `287058d6395460913b8013c9201c196e9b36c2c9`。分支 `codex/v2-a2-v0`，worktree `/Users/start/code/aheart-ui-wt/v2-a2-v0`。旧检出只复制草稿，没有在旧检出实施。
- [事实核对](fact-check.md)：npm、PR #43/#44/#50、41 条跳过、49 个 Ready 与 24 条子路径口径；只读 [API 快照](facts.json)、[源码审计](source-audit.json)、上游 Release 附件副本。
- [修订 A2](../../docs/superpowers/specs/2026-11-17-aheart-ui-v2-amendment-a2-draft.md)：逐项写明补充和纠正；增加全部 M1 数值预算，不放宽任何值。
- [M2 日志](../M2/decision-log.md)、[M3 日志](../M3/decision-log.md)：九行表；M2 namespaced/data 拟归 V3；M3 精确 SHA 的 CI cancelled / Pages 缺失保留；用户验收均缺失。
- [四项弃用处置](../../docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md)：旧/替代 API、开始/移除版本、warning、示例、入口/依赖/产物依据。第四项已由 1.3 发布产物满足，只保留回归契约；前三项为 major 提案。
- [合并计划](../../docs/superpowers/plans/2026-11-17-aheart-ui-current-plan.md)：六份来源逐条可追溯；A1 现行与 A2 提案效力分明；技术契约、V0–V4、质量、Icons/Motion 按需项与回滚集中可读。提案在 superpowers 下，当前文档站配置不发布这些源规范页面。
- [路线图文案](roadmap-copy.md)：负责人选定“待 #50 合入再应用”；该条件已解除，已保留 #50 布局并应用 M2/M3 版本与 V0–V4 提案状态，见 [运行证据](roadmap-after-pr50/README.md)。
- [#50 合并前复核](coordination-recheck-2026-11-17.md) 保留历史；[合并后快照](roadmap-after-pr50/verification.json) 记录 merged、准确合并 SHA 与公开版本，41 条跳过基线不变。
- PR 模板增加阶段日志、分状态与授权范围检查项。本轮不改运行时代码、依赖、exports、版本号、tag 或 npm。

## 一张验收表（A2-7 格式，非批准声明）

| 项目 | 分项状态 | 证据 | SHA / 时间 | 责任人 |
| --- | --- | --- | --- | --- |
| G1 设计 | A2 已批准；v2 Go 已由负责人决定；待合入生效 | A2、合并计划、弃用表及 [直接回复](owner-decisions-2026-11-17.md)；开 PR 和合并/Pages 分开授权 | 2026-11-17 | wzfdhr |
| G2 代码 | Local：文档/证据/PR 模板与路线图文案候选 | 本节交付清单；原规范/A1 保持原样，路线图保留 #50 布局 | 实施基线 `287058d`；路线图源提交 `17e7256` | Codex |
| G3 自动检查 | 见检查记录的逐项退出码 | [检查记录](checks/README.md)、[checks.json](checks/results.json)；测试仅说明此次文档范围 | 基线 + 本地 diff | Codex |
| G4 视觉 | 代理已检查批准状态更新后的实际生产预览宽/窄视口；操作验收仍未代填 | [当前截图与观察](roadmap-approved/README.md)；[审批前记录](roadmap-after-pr50/README.md) 及 CSS zoom 限制保留；原 M2/M3 不补造 | `c70c5a53f045f8506d38533829e93c4ab5e52141` | Codex 观察 / wzfdhr 验收 |
| G5 包 | npm pack：N/A（纯文档候选，未重打包） | 上游三包 Release 附件只作已有证据引用 | 已有发布基线 `735d3d33` | N/A |
| G6 PR / 合并 | PR：Draft，待审；Merged：否 | [PR #51](https://github.com/Labradorca/aheart-ui/pull/51)；最终 head 的 PR CI 看该 PR 实时检查，不能以 PR CI 替代合并后主线 CI；合并及 Pages 另需明确授权 | 2026-11-17；创建快照见 [pr-created.json](pr-created.json) | wzfdhr |
| G7 主线 CI / Pages | Main CI：本候选缺失；Pages：本候选未部署 | facts.json 中成功记录属于基线及历史 SHA，不能代表本候选 | 本候选缺失 | 待授权后 CI |
| G8 用户验收 | A2 文档批准和 v2 范围决定已收到；逐条真实操作证据仍缺失 | [负责人直接回复](owner-decisions-2026-11-17.md)；不据此补造 M2/M3 或 5–8 条自用操作验收 | 2026-11-17；操作证据缺失 | wzfdhr |
| npm published | N/A：V0 无版本发布 | 公开 npm 1.3.0/领域包1.1.0为已有事实；本轮未发布 | 基线 | N/A |

## 缺口、风险与出口

| 项目 | 解除条件 |
| --- | --- |
| #50 同文件重构 | 已解除：基于 `287058d` 保留新结构应用文案，文档构建、16 项脚本和宽/窄实际页面检查有记录；这不是用户验收 |
| A2 批准与范围冻结 | 已获直接批准；M2 范围变更、四项处置与全部预算仍待合入 master 生效 |
| 是否启动 v2 | 已由负责人决定 Go；来自单独回复，没有从开 PR 授权推导 |
| M2/M3 历史缺失 | 缺失保留；后续证据只证明对应 SHA 与任务，不改写历史 UA |
| PR / 主线与部署 | 开 PR 已获单独授权；必需 CI 全 SUCCESS 且明确授权合并及 Pages 后才合并，跟进新主线证据 |
| V1 | V0 合并后从新 master 另建分支；某组件拆分/模块图/CSS预算失败立即停止报根因；不跳过、不放宽预算 |

回滚本候选只需撤回文档与模板改动；没有运行时或包数据迁移。V0 正式出口仍要求文档合入、路线图落地、清单无未定处置、负责人决定有记录；本地整理不满足这些出口条件。
