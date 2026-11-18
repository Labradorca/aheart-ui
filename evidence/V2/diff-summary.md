# V2 开 PR 前差异摘要

- 基线 `1344017414d203f75095b01c3cc952ab7bcb178d`。alpha 包与浏览器预览的运行时代码 SHA 为 `e71d333a375febe902b50edb817be1a8a5407374`。后续 `91862fb` 与 `616c841` 迁移 Card、CI 与 D1/D2/D4 的旧布局断言并保留构建诊断回执。运行时代码、文档构建配置及浏览器测试保持该 SHA 的内容。
- 预发布候选包括 core 与 AI `2.0.0-alpha.0`，两者 pack 的 `publishConfig.tag` 都是 `next`。DND 使用公开 `1.1.0`。两次 pack 逐字节一致。[包摘要](alpha/packs.json) · [实包布局](alpha/pack-layout.json)
- 核心体积变化来自产物换位和删除 Git 中的 es/lib 生成目录。1,484 条旧路径按公开包逐条验证，原解析结果全部保留，128 个 core/AI 历史深路径 CSS 与 1.x 逐字节一致。[兼容回执](facades/README.md)

## 破坏性变更清单

1. **B1 核心公共根入口移除 default Plugin。** 根 named API 保留，Plugin 改用 `aheart-ui/full`；原深路径借兼容 facade 保留到 2.x 结束。
2. **B2 core 和 AI 产物移到 dist。** 各包的 main、module、types、公开 exports 指向 dist，旧逻辑路径由 `dist/compat/{es,lib}` 转发。文件系统绝对物理路径需改成公开入口。文档从源码 alias 构建。
3. **B3 AI 根移除 Workbench 导出和注册。** 用 `@aheart-ui/ai/workbench`、`/agent-workbench` 或需要全量时用 AI `/full`。DND 成为可选 peer，Workbench 和 AI full 应显式安装 DND，AI Chat 可在完全没有 DND 的环境安装和构建。
4. **B4 显式 CSS 为回归契约。** JS 不加载真实 CSS，`style.css` 保留全量兼容；Resolver 只注入组件及声明依赖的样式，theme 由应用显式导入。

[冻结清单](../../docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md) · [迁移指南](../../docs/guide/v2-migration.md)

## 验收快照

- 65 个 JS 和 CSS 路径通过原预算。根 named 代表构建不解析 full/Plugin，最终成品不保留 Table、DatePicker、AI 或 DND。无 DND 的 AI Chat 严格类型、SSR 和生产构建通过。[根入口生产图](alpha/root-module-graphs.json)
- 两试点用真实 alpha tarball 及公开 DND 1.1.0，经 codemod 后在 Chromium、Firefox、WebKit 的桌面及移动视口通过。没有指南外源码改动。两个试点恢复 1.3 与 1.4 时，原锁字节、公开包 URL 和 SRI 一致。持久 Todo 分别通过 1.3 → alpha → 1.3 和 1.4 → alpha → 1.4，保留任务和完成状态。[1.3 回退回执](alpha/rollback-1.3.json) · [1.4 回退回执](alpha/checks.json)
- 五个浏览器项目共 868 通过、131 运行时跳过、0 失败、0 flaky。静态跳过登记仍为 41 条。全仓测试 2,073 项通过，含 D4 实包、SSR 和预检。文档构建通过，R1 汇总分支覆盖率 86.43%。[E2E 分项](alpha/e2e-summary.json) · [检查回执](alpha/checks.json)
- 候选 P0/P1 均为 0，唯一开放问题为既有 P2 #53。G8 由负责人按五项自用清单填写。[外部状态](alpha/external-state.json) · [任务清单](user-tasks.md)

申请开 PR、合并与 Pages、npm next 预发布、tag 和 Release 均为各自独立动作。发布前还需依 A2-7 核对同一主线 SHA 的 QG5 连续证据。
