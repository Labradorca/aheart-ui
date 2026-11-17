# V1 本地检查点：负责人澄清已登记，分类待确认

基线 `b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；独立分支 `codex/v1.4-entries`。版本不改，未创建 V1 PR、合并、部署、发布 npm 或 tag。

停止点之后补了设计和 [隔离压缩测量](aiform-design/README.md)，负责人现已明确拒绝S1并给出 [A2-3口径澄清](owner-a2-3-clarification-2026-11-17.md)。本轮将决定记入决策日志，更新 [分类设计](../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md) 为12复合/53保守叶子候选，并交peer影响说明。**这是负责人决定，不是代理放宽预算**。包/业务源码及产物仍保持检查点 `631b7cd`，本轮没有恢复实现或修改peer/版本。

| 已做 | 证据 |
| --- | --- |
| 单一 manifest 从 4 扩为基础 45 Ready 家族；每个子入口和 CSS 导出、已有 AI16/DND4 路径均登记 | [声明覆盖](entry-coverage.json)、[源依赖审计](source-audit-baseline.json)；静态声明覆盖不代表样式闭包/模块图已合格 |
| 41 个组件 index 新增 named 别名以支持 Resolver，保持原 default 对象；Grid 家族通过 Row/Col 解析 | packages/components/src 各 index 及对应生成产物，未新增包装对象 |
| Resolver 读取同一 manifest，覆盖 81 个组件名；新增四方漂移门禁 | scripts/v1-entry-manifest.mjs 与测试；实际 VitePress 侧栏、质量矩阵、exports 和 Resolver 6 项测试成功 |
| 仅按负责人许可更新两个过时测试：M1 维持原四组件预算；M3 ATable 从未知变为已支持 | [直接答复](owner-decisions-2026-11-17.json)、[57 份源码保护核对](protected-source-check.json)；其余受保护源码、两试点业务、所有预算和三包版本不变 |
| 组件构建和三包实际 npm pack 成功 | [命令与退出码](checks/results.json)；未发布这些本地候选 tarball |
| V0 合并后的 Main CI / Pages 已核验，明确与 V1 分开 | [V0 回执](v0-postmerge/README.md) |

## 历史停止点与当前门禁

[历史预算报告](aiform-budget/README.md)：保留全部现有字段能力所需的去重样式闭包为100,048 B / 201,510 B =49.649%，在当时比例口径下失败，原exit1保留。该比例不再充当负责人澄清后的复合门禁；新的精确并集/不回升基线尚未实现和验收。真实tarball模块图仍经基础root barrel解析106个越界模块，包括Table，必须清零。

当前AIForm自身CSS仅4,788 B，旧消费页面另导入全量基础CSS。只看该文件会遗漏控件依赖，不据此宣称独立按需通过。下一步先由负责人确认复合分类、辅助/同族边界和设计执行分栏，再恢复实现；任何叶子超原25%仍停止报告。

## 未完成

开发构建诊断、完整 1.3→2.0 迁移表与 codemod、全部入口的实际模块图/JS/CSS预算、完整旧消费/两试点验证、strict types、SSR/hydration、五浏览器及 P0/P1 清零均未完成。新漂移门禁 49/49 只证明清单一致，V1 不标 Pass。

| 状态 | V1 |
| --- | --- |
| Local | 既有构建/漂移/pack成功记录保留；本轮文档和分类候选已整理；分类确认前停止实现，新门禁未验收 |
| PR | 未开，未获单独授权 |
| Merged | 否 |
| Main CI | 本候选缺失 |
| Pages | 本候选未部署 |
| npm pack | 三包本地候选通过 |
| npm published | 本轮未发布 |
| 用户验收 | 缺失，未代填 |
