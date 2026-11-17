# M2 决策与证据补录 · 2026-11-17

状态：**实现已合并并公开交付；阶段验收证据未齐，Needs decision**。这份补录不改变 [2026-11-10 本地摘要](implementation-2026-11-10/summary.md) 的历史文字，不代写用户验收。规范优先级为已批准 A1；A2 已批准但尚未合入生效，以下按 A2-7 整理的一张表只是呈现方式，不降低 A1 门禁。

## 一张验收表

| 项目 | 分项状态 | 证据 | SHA / 时间 | 责任人 |
| --- | --- | --- | --- | --- |
| G1 设计 | A1 已批准；范围缩减已随 A2 获批准，待合入生效 | [A1-4](../../docs/superpowers/specs/2026-11-05-aheart-ui-v2-solo-scope-amendment.md) 定义 Primitive 与浮层；本日志范围变更登记见下文 | 2026-11-05 / 本次补录 | wzfdhr 决策 |
| G2 代码 | Local：历史实现有记录 | [#43 diff](https://github.com/Labradorca/aheart-ui/pull/43/files)、[本地摘要](implementation-2026-11-10/summary.md)；普通 Combobox 与共享浮层已交付，namespaced/data 契约未交付 | `9889ce995e647ee6b6868bd826a973be074691b0` | 实施记录 / Codex 复核 |
| G3 自动检查 | 历史检查有记录；本次未重跑 M2 全量运行时 | 摘要中的单测、类型、打包消费和五项目自动化；[合并主线 CI](https://github.com/Labradorca/aheart-ui/actions/runs/42963104012) success | 同合并 SHA；2026-11-11 UTC | CI |
| G4 视觉 | 自动化/代理观察有记录；负责人视觉接受证据缺失 | 摘要记录 Combobox 筛选观察、浏览器回归；[后续 Release 证据](../V0/upstream-release/release-evidence.json) 为自动化试点，不能代替人工接受 | 本地候选 / 后续 `735d3d33` | wzfdhr 验收 |
| G5 包 | npm pack：历史摘要有记录，原 M2 候选包 hash 缺失；后续发布包 hash 可查 | [Release](https://github.com/Labradorca/aheart-ui/releases/tag/v1.3.0)、[SHA256SUMS](../V0/upstream-release/SHA256SUMS)；核心包 SHA-256 `96dab41f93885399d9776969abe42b1dc6a0e7efc670429387d653cae6e095a7` | 后续发布源码 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7` | 发布记录 |
| G6 PR / 合并 | PR：已关闭且合并；Merged：是；自审依据见历史摘要（A1 不要求独立多角色签字） | [PR #43](https://github.com/Labradorca/aheart-ui/pull/43)、[合并提交](https://github.com/Labradorca/aheart-ui/commit/9889ce995e647ee6b6868bd826a973be074691b0) | `2026-11-11T05:02:32Z` | GitHub 记录 |
| G7 主线 CI / Pages | Main CI：success；Pages：同 SHA success | [CI 42963104012](https://github.com/Labradorca/aheart-ui/actions/runs/42963104012)、[Pages 42966860141](https://github.com/Labradorca/aheart-ui/actions/runs/42966860141)、[当前站点](https://labradorca.github.io/aheart-ui/)；deployment `7702690937` success | 合并 SHA；当前站点已随之后提交更新 | CI / Pages |
| G8 用户验收 | UA：**缺失** | 未找到 M2 负责人逐项真实任务记录或阶段签字；没有代填。A2 已批准、待合入，亦未据此倒填新 G8 | 缺失 | wzfdhr |
| npm published | 已发布事实；不是阶段验收结论 | npm `aheart-ui@1.3.0`；[公开版本核对](../V0/facts.json)、[v1.3.0 Release](https://github.com/Labradorca/aheart-ui/releases/tag/v1.3.0) | Release `2026-11-17T01:10:36Z`，纽约时间 11 月 16 日 | npm / Release |

## 范围变更登记

| ID | A1 应有范围 | 实际交付 / 差额 | A2 提案归属 | 生效条件 |
| --- | --- | --- | --- | --- |
| M2-SCOPE-01 | 普通与 namespaced Combobox、Primitive/组合 API | 已交付 `ACombobox`；未导出 `Combobox.Root/Input/Trigger/Content/Item`。见 [combobox/index.ts](../../packages/components/src/combobox/index.ts) 和 [实现](../../packages/components/src/combobox/combobox.vue) | **移到 V3**（2.1.x additive）；不阻塞提案中的 2.0 | 负责人批准 A2 并合入 master；此前仍是 A1 未完成范围 |
| M2-SCOPE-02 | 稳定 `data-scope`、`data-part`、`data-state` 契约 | 浮层共享逻辑已交付；Combobox 无统一 data 契约，其他零散 data 属性不算契约通过 | **移到 V3**，按原验收 M3 Must/量化条件执行 | 同上；若发现必须 breaking，先回 V2 清单再批准 |

保留 3A → 3B → 3C 的实现顺序，不把共享 utility 当作全部 Primitive 完成。范围归属登记依据 A2-2/A2-5；负责人已直接批准 A2，见 [决定记录](../V0/owner-decisions-2026-11-17.md)；本补录不代签，也不提前让范围变更生效。

## 尚缺与决策边界

- 原 M2 候选的可复核包 hash、人工视觉接受、用户真实任务与书面阶段结论：**缺失**。
- 未关闭 P0/P1/P2 的本轮完整审计：**缺失**，不能因历史 CI 通过写成数量 0。
- 按现行 A1，不能把 M2 写成全部 Must 与 G8 已通过。公开交付事实与阶段 Pass 分开；待负责人审查范围变更和证据缺口。
- 回滚：使用已发布 1.3.0 或上一个兼容版本及锁文件；本补录可单独撤回，不变更组件实现。

负责人阶段决定：

日期 / 依据：
