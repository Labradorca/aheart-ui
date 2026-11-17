# 复合入口分类候选审阅证据

**待负责人确认，未应用到生产清单或预算门禁，V1实现仍停止。** 负责人已经 [拒绝S1并澄清A2-3](../owner-a2-3-clarification-2026-11-17.md)，不是代理放宽预算。完整候选、辅助/同族边界、执行分栏和peer影响见 [设计文档](../../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md)。

| 域 | 复合候选 | 叶子/原语候选 | 合计 |
| --- | --- | --- | --- |
| 基础 | 5 | 40 | 45 |
| AI | 7 | 9 | 16 |
| DND | 0 | 4 | 4 |
| 全部 | 12 | 53 | 65 |

基础复合候选：dropdown、tree-select、table、modal、popconfirm。AI复合候选：bubble、form、chat-panel、agent-workbench、chat、agent、workbench（现有别名）。共12条逻辑路径、11组规范入口，不按81个Resolver名称重复计数。

## 依据与复现

- [proposal.json](proposal.json)：逐条覆盖当前manifest的65条逻辑入口；每条均为`pending_owner_confirmation`。
- [collect-source.mjs](collect-source.mjs)：只读AST导入/导出遍历，不把基础根barrel全库误算成实际依赖；[source-evidence.json](source-evidence.json) 记录AI/DND源文件摘要、import行和视图集合。它是源码审阅依据，不是真实tarball模块图或CSS门禁。
- [基础源审计](../source-audit-baseline.json)：基础45家族既有依赖/样式/源文件清单；本轮相关源码保持不变。
- [peer-impact.json](peer-impact.json)：对照V0的1.3公开路径，AIForm的13个直接家族中11个路径属于1.4候选。peer仍`workspace:^1.1.0`，本轮只交影响说明。
- [verify-review.mjs](verify-review.mjs)：校验覆盖无遗漏/重复、pending状态、当前源摘要、本轮及停止点以来实现差异为空、包版本/peer不变、文档本地链接存在；[verification.json](verification.json) 是执行记录，不代表分类已获确认。

命令与退出码见 [checks.json](checks.json)，对应文本输出及`*.exit-code`保存在本目录。文档/质量矩阵脚本与文档构建属于相关回归检查；设计和evidence不由公开站点逐条渲染，构建成功不代表设计、分类或V1门禁已通过。

Local：文档与候选清单已整理，检查详见回执；PR：V1未开；Merged：V1否；Main CI：V1缺失；Pages：V1未部署；npm pack：仅保留前次本地候选记录，本轮未重跑；npm published：本轮未发布；用户验收：未代填，分类确认待负责人。
