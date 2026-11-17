# AIForm 精确公开导入：peer 停止点

负责人已 [确认分类并恢复实现](../owner-classification-confirmation-2026-11-17.md)。本轮只推进到AIForm精确导入及其本地验证；**现在按要求停在peer修改前**。AI peer仍`workspace:^1.1.0`，三包版本未改。下一步决定见 [具体影响说明](peer-impact.md)。

## 改动与验证

- form.vue和form-field.vue的运行时依赖改为13个精确公开基础子入口；类型从对应公开路径导入，TreeNodeData从已声明传递依赖`aheart-ui/tree`导入。没有legacy深路径规避。
- AI构建将`aheart-ui/*`保持external，产物继续引用这些公开路径；不内嵌基础包实现。ESM/CJS产物随构建更新。
- [探针](probe.mjs) 从本地实际三包tarball隔离安装，不使用workspace symlink、源码alias、忽略peer或修改包版本。**本地未发布的1.3候选已有新路径，不代表公开1.3版本支持它们**。
- 源码AST去除import声明后与`e0c6f80`完全相同；ESM/CJS两份公开声明字节不变。根/full/scoped/legacy对象身份、props/events、全部13类字段SSR及严格消费类型检查（Vue3.5.44 / TS5.9.3，skipLibCheck:false）通过。

| 项目 | 本轮结果 |
| --- | --- |
| 基础根barrel | 未解析 |
| 原106个越界基础模块 | **0**；新出现的任何非声明基础模块同样失败 |
| 允许基础族 | 13个直接家族 + Icon/Tree/Tooltip传递依赖；实际utils/config/picker-core模块逐条保留 |
| scoped JS gzip | 133,664 B |
| root named gzip | 133,664 B；增量0 B，上限1,336.64 B |
| full AI Plugin gzip | 187,221 B；scoped严格更小 |
| JS隐式CSS | 0份资源 |
| CSS首次叶子线检查 | 8个复合入口达标并锁定硬门禁；另外4个完整跨包闭包尚待实现，未选择例外门禁 |

[完整结果/各命令退出码](results.json)、[总退出码0](exit-code)、[scoped完整parsed/rendered模块图](scoped-module-graph.json)、[root图](root-named-module-graph.json)、[full图](full-module-graph.json)、[12个复合入口首次测量](composite-css-first-pass.json)。Vite为5.0.12，三种JS模式参数相同；完整配置保存在探针。

组件构建、原有AI200项测试、包typecheck和三包pack退出0，记录在 [本轮检查](../checks/results.json)。严格消费类型与SSR是本探针的局部检查，不是全量strict/SSR-hydration/五浏览器验收。

[停止点核验](verification.json)与 [核验命令](verify-stop.mjs)另检查57份受保护消费/试点文件本轮未改、初始基线以来仍仅有前次获准的两个过时断言改动；peer、版本、锁文件、M1契约与原规范均未改。该命令 [退出0](verification.exit-code)，不代替V1验收。

## 仍未完成

AIForm/Agent/Workbench及别名的完整公开CSS闭包、精确并集/不回升门禁及最终数值仍未完成。8个已达标复合入口的叶子门槛不得后退，Modal继续执行M1。完整分类和锁定结果见 [复合门禁表](../composite-css-gates.md)，开PR前须填齐12项并在差异摘要逐项展示。

开发构建诊断、迁移表/codemod、全部入口JS/模块图/样式、两个原业务试点、全量strict/SSR-hydration/五浏览器及P0/P1审计仍待完成。没有把本局部成功标成V1验收通过。

Local：AIForm精确导入及上述局部验证通过，peer修改前停止；PR：未开；Merged：V1否；Main CI：V1缺失；Pages：V1未部署；npm pack：本轮三包候选通过；npm published：未发布；用户验收：未代填，分类确认不代替V1验收。
