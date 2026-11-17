# 路线图文案方案（#50 合入后已应用）

2026-11-17；初始基线 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7`。负责人选择先交付其余 V0 内容和本方案，待 [PR #50](https://github.com/Labradorca/aheart-ui/pull/50) 合入后再应用。#50 已合入 `287058d`，目标文件 `docs/.vitepress/theme/V2Roadmap.vue` 已保留其新布局应用文案，源提交为 `17e7256`；本方案仍不是用户验收，实际检查见 [运行证据](roadmap-after-pr50/README.md)。

## 页首

标题：v2 路线图

介绍：M0、M1 已验收；M2、M3 的兼容能力已随 1.3.0 公开交付。阶段验收缺口与公开版本分开记录。A2 的 V0–V4 已获批准，自 PR #51 合入 master 起生效；合入前按 A1 执行。

提示：公开版本：aheart-ui 1.3.0、AI/DND 1.1.0。发布、主线 CI、Pages 与用户验收分别记录；M2/M3 不标“已验收”。iOS Safari 仅经浏览器仿真验证，未经真机验证。

## 阶段数据

| 编号 | 标题 | 状态文案 | 描述与项目 |
| --- | --- | --- | --- |
| M0 | 产品与契约冻结 | 已验收 | 两试点登记：clean-consumer、ai-review-gate。链接 M0 决策日志 |
| M1 | v1.2 真实按需 | 已验收 / 已发布 1.2.0 | Button / Modal / Select、显式样式、消费与发布契约。链接 M1 决策日志 |
| M2 | Combobox 与浮层 | 已发布 1.3.0 · 验收证据待补 | 普通 Combobox 与浮层迁移；namespaced/data 契约拟移 V3。链接 M2 决策日志；范围变更合入生效前仍属 A1 未完成项 |
| M3 | AI/DND 与文档 | 已发布 · 验收证据待补 | AI/DND 1.1.0、Resolver、迁移指南；同合并 SHA 的 CI/Pages 缺口见 M3 决策日志 |
| V0 | 收口与范围决策 | v2 Go 已确认 | M2/M3 补录、弃用表、合并计划、负责人决定 |
| V1 | 1.4.x 全量按需铺路 | A2 已批准 · 未启动 | 全 Ready 子入口/CSS、Resolver、漂移检查、迁移与 codemod；沿用预算 |
| V2 | 2.0.0-alpha 破坏性切换 | A2 已批准 · 未启动 | root/full、dist 与 facade、AI optional DND；只用 next |
| V3 | 2.1.x 组合 API 与 data 契约 | 需求触发 · 未启动 | namespaced Combobox 与统一 data 属性；不阻塞 2.0 |
| V4 | Beta → RC → Stable | A2 已批准 · 未启动 | 试点任务清单、同 SHA 十次稳定性、迁移回退、书面发布决定 |

M4 在 A2 合入生效后由 V0–V4 取代；当前展示“已批准、待合入/未启动”，并保留合入前 A1 仍有效的说明。Icons、Motion 均需求触发。

## 应用条件与验证

1. 确认 #50 merged，更新到最新 origin/master，检查其新布局和阶段数据结构；保留其样式、交互、布局和导航。
2. 按当时 A2 的批准状态应用文案。A2 未生效时不能把 V 阶段写成现行已批准路线；所有 public 版本再次查 registry。
3. 在 PR 审阅资料中关联 M2/M3/V0 决策日志与合并计划；公开页面不得因版本发布把用户验收写成 Pass，也不链接尚未合入的主线文件冒充可访问证据。
4. 跑 docs/quality-matrix 脚本、文档构建、diff check；用真实页面检查桌面与窄视口、链接和状态。记录 URL、浏览器、视口、SHA，不能用本 Markdown 替代。
5. 再审 V0 出口。应用已在本地落地；负责人批准与 v2 Go 已登记，V0 PR 最终提交的 CI、合并和主线门禁尚未完成，不标 V0 Pass，不启动依赖 V0 合并的 V1。
