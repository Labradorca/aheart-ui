# V1 全量按需铺路

状态：**已按 AIForm 预算停止点停止后续实现，未验收**。基线 `b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；分支 `codex/v1.4-entries`，独立 worktree。V0 已按负责人单独授权合并，准确合并 SHA 的 Main CI 12/12 与 Pages 已 SUCCESS，见 [合并后回执](v0-postmerge/README.md)；不以这些结果代替 V1 验收。初始 [基线](baseline.json) 保留当时运行中状态。

## 决策与授权

| 项目 | 决定 / 当前边界 |
| --- | --- |
| V1 范围 | 按已批准 A2-3 和原任务执行，全 Ready 子入口/CSS、Resolver、漂移测试、弃用提示、迁移表/codemod、数值与兼容验收 |
| 旧测试能力断言与全量覆盖的冲突 | 负责人允许仅更新过时能力断言：M1 保留原四组件范围；M3 的 ATable 否定断言改为正向能力断言。预算和两试点业务源码不改，见 [直接答复](owner-decisions-2026-11-17.json) |
| 身份兼容与有针对性的弃用提示 | 负责人选择保留对象身份，B1/B3 改用开发构建诊断；以本次直接决定调整 A2 提示方式，不把推荐路径误报弃用，见 [直接答复](owner-decisions-2026-11-17.json) |
| AIForm 预算停止点 | 完整静态样式闭包 100,048 B / full.css 201,510 B = 49.649%，超过 25%；theme 合计也超过 30%，真实 tarball 图还解析 106 个不在声明控件族内的基础模块。停止后续实现，等待后续架构/范围决定，见 [根因](aiform-budget/README.md) |
| AIForm 可行性设计 | 负责人仅授权先出设计供评审；[设计候选](../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md) 与 [隔离测量](aiform-design/README.md) 已准备，普通压缩后仍为 49.820%。设计尚未认可，V1 实现未恢复；是否批准 S1 试验留给负责人 |
| V1 开 PR | 未授权，候选就绪后交差异摘要并单独询问 |
| V1 合并 / Pages | 未授权 |
| 版本修改 | 未授权；保持三包现有版本 |
| npm published / tag | 均未授权 |

## 一张验收表（A2-7）

| 项目 | 分项状态 | 证据 | SHA / 时间 | 责任人 |
| --- | --- | --- | --- | --- |
| G1 设计 | A2 已生效；两处约束冲突已获负责人明确选择 | [A2](../../docs/superpowers/specs/2026-11-17-aheart-ui-v2-amendment-a2-draft.md)、[预检](preflight.md)、[答复](owner-decisions-2026-11-17.json) | 基线 `b1eef9b6` | wzfdhr |
| G2 代码 | Local：基础 45 家族的子入口/CSS 与 named 别名已铺设；Resolver 声明 81 个组件名；未完成 V1 | [声明覆盖](entry-coverage.json)、实际 diff；[57 份保护源码核对](protected-source-check.json)，仅获准的两个过时测试改动；两试点业务与版本不变 | 基线 + 工作差异 | Codex |
| G3 自动检查 | 组件构建、四方漂移 6 项、三包 pack 成功；AIForm 完整依赖预算/图失败，exit 1 | [命令与退出码](checks/results.json)、[失败根因与实际 tarball](aiform-budget/README.md)。其余量化验收未执行完，不以声明覆盖代替运行契约 | 基线 + 工作差异 | Codex |
| G4 视觉 | 未取得本阶段运行证据 | 后续真实消费页面检查；不代填人工操作验收 | 缺失 | Codex 观察 / wzfdhr 验收 |
| G5 包 | npm pack：本地三包候选通过；完整按需契约尚未通过 | [pack 输出](checks/pack.txt)、[包摘要](aiform-budget/results.json)；无 npm 发布或版本修改 | 基线 + 工作差异 | Codex |
| G6 PR / 合并 | PR：未开；Merged：否 | 需 V1 单独授权 | 缺失 | wzfdhr |
| G7 主线 CI / Pages | Main CI：本候选缺失；Pages：未部署 | V0 主线结果单独跟踪，不冒充 V1 | 缺失 | 待授权后 CI |
| G8 用户验收 | 缺失；A2/Go 与 V0 合并批准不替代 V1 实际操作 | 冻结 5–8 条真实任务后由负责人验收，代理不代签 | 缺失 | wzfdhr |
| npm published | 本轮未发布 | 现有公开版本只作基线 | 基线 | N/A |

若某组件实际模块图或 CSS 超预算且不能干净拆分，停止并报告该组件根因；不放宽 M1 任一数值，不跳过组件。P0/P1 未完成审计，不预填为 0。

## 此停止点的剩余工作

AIForm 完整依赖口径需先解决或由负责人明确澄清；代理未自行豁免 AI/DND。开发构建诊断、完整迁移表/codemod、全量子入口模块图与数值、兼容消费与两试点、strict types、SSR/hydration、五浏览器均未完成 V1 验收。没有开 V1 PR，没有修改版本、发布 npm 或打 tag。
