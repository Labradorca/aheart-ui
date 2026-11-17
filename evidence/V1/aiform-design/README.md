# AIForm 设计评审证据

最新设计：[AIForm按需设计与复合入口分类](../../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md)。负责人已经 [拒绝S1并澄清A2-3](../owner-a2-3-clarification-2026-11-17.md)；当前是分类候选待确认，V1实现保持停止。这里的 [先前设计授权](authorization.json)、verification.json及测量文件均为当时快照，不代表当前仍等待S1许可，也不是新口径验收。

| 项目 | 结果 |
| --- | --- |
| 实验命令 | `node evidence/V1/aiform-design/measure-css.mjs` |
| 实验执行退出码 | [0](measurement.exit-code)，只说明测量完成 |
| 输入 | 真实 tarball 的 full/theme/AIForm 自身 CSS，以及 [原停止点](../aiform-budget/README.md) 已核对的完整样式闭包 |
| 方法 | 隔离 realpath 目录，Vite 5.0.12，两个输入均 minify:true / production，write:false；未修改包源码或产物 |
| 历史比例结果 | full177,470 B，闭包88,415 B，49.820%；在澄清前25%及合计30%口径下失败，不重写原始记录 |
| 减量估算 | 仅减共享基础样式且 full 同步缩小时，至少需减少 66,228 B，约相关基础样式的 69.52% |
| 原始数据 | [参数、摘要和结果](css-measurement.json)；四份 `*.min.css` 是实验产物，不是已发布包资源 |

精确导入仍须解决根barrel解析越界。拆文件/普通压缩的历史实验不证明新复合并集门禁已通过；S1已被负责人明确拒绝，不再作为建议下一步。后续须先确认复合/叶子清单，再按负责人澄清恢复实现。

历史复现要求：预算探针results.json中的隔离consumer需仍存在；若已清理，需重建同样候选输入再执行原探针和测量。旧探针保留比例断言，预期exit1只复现当时结论，不是新口径门禁。本轮未重跑实验或pack，不执行发布、部署或业务改写。

Local：负责人澄清已登记，分类候选待确认；原测量作为历史保留，新门禁未实施/未验收；PR：V1未开；Merged：V1否；Main CI：V1缺失；Pages：V1未部署；npm pack：沿用前次本地候选成功记录；npm published：未发布；用户验收：未代填，分类确认不代替V1验收。
