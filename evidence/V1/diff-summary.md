# V1 本地检查点：预算停止，尚不可开 PR

基线 `b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；独立分支 `codex/v1.4-entries`。版本不改，未创建 V1 PR、合并、部署、发布 npm 或 tag。

停止点之后仅按负责人要求补 [AIForm 拆分可行性设计](../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md) 和 [隔离压缩测量](aiform-design/README.md)。包/业务源码及产物保持检查点 `631b7cd`，未恢复 V1 实现；设计和后续 S1 试验均未代替实现验收。

| 已做 | 证据 |
| --- | --- |
| 单一 manifest 从 4 扩为基础 45 Ready 家族；每个子入口和 CSS 导出、已有 AI16/DND4 路径均登记 | [声明覆盖](entry-coverage.json)、[源依赖审计](source-audit-baseline.json)；静态声明覆盖不代表样式闭包/模块图已合格 |
| 41 个组件 index 新增 named 别名以支持 Resolver，保持原 default 对象；Grid 家族通过 Row/Col 解析 | packages/components/src 各 index 及对应生成产物，未新增包装对象 |
| Resolver 读取同一 manifest，覆盖 81 个组件名；新增四方漂移门禁 | scripts/v1-entry-manifest.mjs 与测试；实际 VitePress 侧栏、质量矩阵、exports 和 Resolver 6 项测试成功 |
| 仅按负责人许可更新两个过时测试：M1 维持原四组件预算；M3 ATable 从未知变为已支持 | [直接答复](owner-decisions-2026-11-17.json)、[57 份源码保护核对](protected-source-check.json)；其余受保护源码、两试点业务、所有预算和三包版本不变 |
| 组件构建和三包实际 npm pack 成功 | [命令与退出码](checks/results.json)；未发布这些本地候选 tarball |
| V0 合并后的 Main CI / Pages 已核验，明确与 V1 分开 | [V0 回执](v0-postmerge/README.md) |

## 必须停止的根因

[AIForm 预算报告](aiform-budget/README.md)：保留全部现有字段能力所需的最小去重样式闭包为 **100,048 B / 201,510 B = 49.649%**，超过组件 25% 和 theme+组件 30% 上限；真实 tarball 的模块图仍通过基础 root barrel 解析 106 个非声明族模块，包括 Table。探针退出 1，预算和分母不改，没有跳过 AIForm。

当前 AIForm 自身 CSS 仅 4,788 B，旧消费页面另导入全量基础 CSS。只看该 4,788 B 会遗漏字段控件依赖，本检查点没有据此宣称独立按需通过。关于完整依赖口径或后续架构方案，需要负责人明确决定。

## 未完成

开发构建诊断、完整 1.3→2.0 迁移表与 codemod、全部入口的实际模块图/JS/CSS预算、完整旧消费/两试点验证、strict types、SSR/hydration、五浏览器及 P0/P1 清零均未完成。新漂移门禁 49/49 只证明清单一致，V1 不标 Pass。

| 状态 | V1 |
| --- | --- |
| Local | 构建、漂移、pack 成功；AIForm 量化门禁失败，停止实现 |
| PR | 未开，未获单独授权 |
| Merged | 否 |
| Main CI | 本候选缺失 |
| Pages | 本候选未部署 |
| npm pack | 三包本地候选通过 |
| npm published | 本轮未发布 |
| 用户验收 | 缺失，未代填 |
