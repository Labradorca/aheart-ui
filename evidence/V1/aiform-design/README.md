# AIForm 设计评审证据

设计文档：[AIForm 按需拆分可行性设计](../../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md)。状态 Proposed；[负责人仅授权出设计](authorization.json)，未授权恢复 V1 实现。

| 项目 | 结果 |
| --- | --- |
| 实验命令 | `node evidence/V1/aiform-design/measure-css.mjs` |
| 实验执行退出码 | [0](measurement.exit-code)，只说明测量完成 |
| 输入 | 真实 tarball 的 full/theme/AIForm 自身 CSS，以及 [原停止点](../aiform-budget/README.md) 已核对的完整样式闭包 |
| 方法 | 隔离 realpath 目录，Vite 5.0.12，两个输入均 minify:true / production，write:false；未修改包源码或产物 |
| 预算结果 | full 177,470 B，闭包 88,415 B，49.820%；25% 与 theme 合计 30% 仍失败 |
| 减量估算 | 仅减共享基础样式且 full 同步缩小时，至少需减少 66,228 B，约相关基础样式的 69.52% |
| 原始数据 | [参数、摘要和结果](css-measurement.json)；四份 `*.min.css` 是实验产物，不是已发布包资源 |

精确导入可以解决根 barrel 解析越界；拆文件/普通压缩不能据此宣称完整 CSS 闭包通过。语义复用是否能满足预算仍未证明；设计建议下一步仅评审 S1 隔离试验，而非恢复整套 V1 实现。

复现要求：预算探针 `results.json` 中的隔离 consumer 仍存在；若已清理，先对当前本地候选执行 pack，再运行预算探针（预期退出 1），然后运行本测量脚本。完整命令均保留，实验不执行发布、部署或业务改写。

Local：设计和测量完成，预算仍 Fail；PR：V1 未开；Merged：V1 否；Main CI：V1 缺失；Pages：V1 未部署；npm pack：沿用前次本地候选成功记录；npm published：未发布；用户验收/设计认可：均未代填。
