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
| G2 代码 | #53 已合入基线。已按授权修改 Core 和 AI 的 Beta 版本，源码验证于 `af5f8ef7` |
| G3 自动检查 | 2,073 项单元与脚本测试、构建、文档、严格类型、旧路径、无 DND 的 AI 和迁移诊断通过。65 个入口的模块图及 JS/CSS 预算通过。[本地核验](local-checks.json) |
| G4 视觉 | Beta 实包在 Chromium、Firefox、WebKit 通过。六对整页截图及三对 390 × 844 日期框截图逐字节一致。[本地核验](local-checks.json) |
| G5 包 | Core、AI 的 Beta 试包及 DND 本地打包通过。Core 和 AI 与 #53 修复候选相比，包内差异仅为 manifest 版本。两个 Beta 包配置 `next`，消费试点使用公开 DND 1.1.0。[包摘要](local-checks.json) |
| G6 PR / 合并 | 待 Beta PR 和单独合并授权 |
| G7 Main CI / Pages | 待 Beta 合入后分别核对 |
| G8 用户验收 | 待两个试点从公开 registry 精确安装。U3、U4 由负责人本人实测，其他任务按清单记录委托代理复测 |
| npm published | 待 Beta 发布授权与 MFA |

Beta Go 待缺陷复查、两试点逐项验收及负责人书面决定。

本地实包的双试点在三个浏览器自动回归通过，指南外改动为 0。Beta G8 的公开 registry 验收待发布后执行。[本地实包回执](local-checks.json)

## Beta.1 工作台 P1

公开 Beta.0 的委托代理复测发现 SSR 工作台从桌面往返切换窄屏后，聊天面板无法回到移动布局。验证本地修复时，执行抽屉也复现同类锚点错误。该缺陷在公开 Alpha 和 1.x 回退基线上也能复现，按 Beta 范围 P1 登记。上表保留 Beta.0 发布前的验收记录。

负责人于 2026-11-18 授权在独立 worktree 修复并验证，并单独授权将本地 Core 和 AI 候选改为 `2.0.0-beta.1` 以完成版本组合验收。DND 使用公开 `1.1.0`，AI 的 Core peer 为 `^2.0.0-alpha.0`。PR、合并及 Pages、npm 发布、tag 和 GitHub Release 各自等单独授权。Beta Go 待公开候选双试点复验、P1 关闭和负责人书面决定。

本地实包在两个试点通过严格类型、生产构建与 SSR/hydration。五个浏览器项目的聊天与执行抽屉跨视口复测 15/15 通过，保留原节点与聊天草稿。65 个公开入口的模块图及 JS/CSS 预算通过，三个浏览器的全量与按需视觉对照通过。公开 `next` 当前指向 Beta.0。
