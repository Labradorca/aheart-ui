# v2 启动前的 v1.x 交付范围 · 2026-11-16

负责人指令：“取消真机这个东西测试，然后把 v2 之前所有任务功能完成闭环，推进到闭环完成”。本次包括修复、验证、合并、文档站和公开 npm / tag / Release 交付。无需重复请求已授权的发布确认；npm 自身需要的 MFA 仍由负责人完成。

- `aheart-ui@1.1.1` 已公开发布，作为升级和回退的稳定基线。
- `aheart-ui@1.2.0` 从已验收的 M1 / `a87bd741a4237d065cc26ea73714e896e3a49db9` 整理，发布 Button / Modal / Select 按需入口、显式 CSS 和兼容入口；两个领域包继续使用公开 `1.0.0`。
- `aheart-ui@1.3.0` 承接已合并的 M2 / M3 兼容能力：Combobox、浮层迁移、Resolver 与迁移指南；同时交付 `@aheart-ui/ai@1.1.0`、`@aheart-ui/dnd@1.1.0`。保留 v1 根插件和旧 AI Workbench 导出。
- v2 的 Primitive / Compound、根入口破坏性切换、dist 布局以及 v2 Beta / RC 决策不在本次交付范围。

## 验收约定

物理 iOS Safari 真机测试由负责人取消，状态为 **Cancelled / N/A**；不再保留设备待办，不声称通过。五浏览器自动化、严格类型、实际 tarball 消费、SSR / hydration、模块图、样式预算和升级回退继续执行。历史真机校验工具仅作为可选工具保留。

本地验证、远端 CI、主线部署、npm 公开安装与 Release 分别记录。仅通过本地测试不代表发布完成。精确源码 SHA、包哈希、公开安装及回退结果以对应 GitHub Release 附件为准：

- [v1.2.0 发布记录](https://github.com/Labradorca/aheart-ui/releases/tag/v1.2.0)
- [v1.3.0 与领域包发布记录](https://github.com/Labradorca/aheart-ui/releases/tag/v1.3.0)

后续实现范围遵循已生效 A1 修订。原 M2 / M3 文档中的“本地候选 / 待合并”是当时的历史快照；两项实现已由 PR #43 / #44 合入主线，当前公开交付状态以上述发布记录为准。
