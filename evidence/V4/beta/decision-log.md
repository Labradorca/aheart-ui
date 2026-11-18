# V4 Beta 决策与验收

候选工作区从 `202aa62271ad762413cb6ef2f590bbfcd8503656` 建立。负责人于 2026-11-18 回复「确认 V2 Pass」。已复核 Alpha 发布的弃用表、迁移指南、codemod 和实际包。Core 与 AI 的 `next` 为 `2.0.0-alpha.0`，Core `latest` 为 `1.4.0`。公开包版本、下载地址、SRI 与 SHA-256 已留档。[Alpha 发布](https://github.com/Labradorca/aheart-ui/releases/tag/v2.0.0-alpha.0) · [回滚基线](registry-baseline.json)

## Beta 前置检查

| 缺陷 | 严重度 | 状态 |
| --- | --- | --- |
| #53 · 390px 日期范围输入截断 | P2 | 既有缺陷。全量与按需均通过实际打包回归，已合并并关闭。[Issue](https://github.com/Labradorca/aheart-ui/issues/53) |

核对了 Alpha 发布当天 UTC 起更新的问题和所有当前开放问题。已知缺陷只有 #53，未关闭 P0 和 Beta 范围内未关闭 P1 均为 0。前置证据包括公开 Alpha 与修复候选的实际输入尺寸、截图摘要、PR 检查、主线检查、Pages 部署与公开页面核验。发布前和 Beta Go 前再次检查问题清单。[前置核验回执](preflight.json)

## 版本变更范围

负责人于 2026-11-18 回复「授权」，范围为将 Core 和 AI 的版本改为 `2.0.0-beta.0`。包清单、发布契约的版本断言、迁移指南和 CHANGELOG 已同步。现有 AI 的 Core peer 范围 `^2.0.0-alpha.0` 经 SemVer 校验涵盖 `2.0.0-beta.0`。发包前在实际 tarball 中复核 peer 及依赖，DND 使用公开 `1.1.0`。Core 和 AI 的包清单已配置 `next`，发布按 Core、AI 的顺序执行。

## A2-7 验收表

| 门禁 | Beta 状态 |
| --- | --- |
| G1 设计 | 已核对 V2 Pass、缺陷分级及回滚基线，已冻结七项自用任务。[任务清单](user-tasks.md) |
| G2 代码 | #53 已合入基线。已按授权修改 Core 和 AI 的 Beta 版本 |
| G3 自动检查 | 待 Beta 候选 |
| G4 视觉 | #53 在全量和按需的 390 × 844 页面均通过，保留逐字节截图门槛。待 Beta 实包复验。[前置核验](preflight.json) |
| G5 包 | 待 Beta pack |
| G6 PR / 合并 | 待 Beta PR 和单独合并授权 |
| G7 Main CI / Pages | 待 Beta 合入后分别核对 |
| G8 用户验收 | 待两个试点从公开 registry 精确安装。U3、U4 由负责人本人实测，其他任务按清单记录委托代理复测 |
| npm published | 待 Beta 发布授权与 MFA |

Beta Go 待缺陷复查、两试点逐项验收及负责人书面决定。
