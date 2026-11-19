# V4 RC 决策与验收

## 进入 RC

负责人于 2026-11-19 回复「认可复测并确认 Beta Go」，认可 U3、U4 由代理复测。公开 Beta.1 双试点的 U1–U7 通过，工作台 P1 在公开实包的五个浏览器项目中复测 15/15，P0=0，范围内 P1=0。RC 从 `22aac15d86eae68651478626ce698c350cee182b` 建立。[Beta.1 预发布版](https://github.com/Labradorca/aheart-ui/releases/tag/v2.0.0-beta.1) · [Beta.1 主线 CI](https://github.com/Labradorca/aheart-ui/actions/runs/44462431247)

负责人单独授权准备本地 `2.0.0-rc.0`。变更涉及 Core 和 AI 的版本、发布契约、安装说明、CHANGELOG 和验收记录。DND 使用公开 `1.1.0`。公开发布通道为 `next`。PR、合并及 Pages、npm 发布、tag 和 GitHub Release 各有独立授权。

## A2-7 验收表

| 门禁 | 结论 | 证据 |
| --- | --- | --- |
| G1 设计 | Beta Go 已确认，范围内 P1 为 0 | [Beta.1 预发布与验收摘要](https://github.com/Labradorca/aheart-ui/releases/tag/v2.0.0-beta.1) |
| G2 代码 | 版本、发布契约和说明已更新 | Core 与 AI 包清单仅变更版本，冻结锁文件安装通过 |
| G3 自动检查 | 本地构建、类型检查、1,791 项包单测和 64 项相关脚本测试通过 | 两个实包试点通过严格类型、生产构建和 SSR。65 个公开入口的 JS/CSS 预算和模块图通过 |
| G4 视觉和交互 | 五个浏览器项目的 D8 25/25，工作台实包跨视口 15/15 | 三个引擎的六对全量与按需整页截图和三对 390px 日期框截图逐字节一致 |
| G5 包 | 本地 RC.0 实包通过 | Core 与 AI 解包内容相对公开 Beta.1 仅 `package.json` 的版本变化。安装组合使用公开 DND 1.1.0 |
| G6 PR / 合并 | 待单独授权 | 本地候选差异待审阅 |
| G7 Main CI / Pages | 待合并后核对 | RC 主线 SHA 的连续 10 轮 QG5 在主线确认后开始 |
| G8 用户验收 | 待 RC 实包公开复验与负责人书面决定 | 本地回退演练已通过，业务状态和原锁文件均恢复至预期 |
| npm published | 待 RC 发布授权 | Core 和 AI 的 `next` 为公开 Beta.1 |

在本地候选的 Core 实包上运行 `1.4.0 → 2.0.0-rc.0 → 1.4.0` 回退演练。两次切换保留业务状态，候选期间新增的已完成任务在回退后可读。起点和回退的锁文件逐字节一致，Core 的 `resolved` 和 SRI 均匹配公开 `1.4.0`。

## RC Go 门禁

- 复核全部 P1 关闭。
- 执行 `1.4.0 → 2.0.0-rc.0 → 1.4.0` 回退演练，核对业务状态、回退锁文件的 `resolved` 与 SRI。
- 同一 RC 主线 SHA 连续 10 轮 QG5，flaky rate 低于 1%。
- 等待负责人书面决定。
