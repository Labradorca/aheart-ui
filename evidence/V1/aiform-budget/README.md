# AIForm：原 V1 预算停止点（历史证据）

**当前状态**：负责人已给出 [A2-3 叶子/复合口径澄清](../owner-a2-3-clarification-2026-11-17.md)，并拒绝S1。这是负责人决定，不是代理放宽预算。下文保留澄清前的比例验收、数值和退出码，不再将其作为复合入口现行比例门禁。106项模块图越界仍未修复；新并集/不回升门禁未实现。当前等待 [分类候选](../../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md) 确认，V1实现仍停止。

**原停止点快照**：Fail。探针命令为 `node evidence/V1/aiform-budget-probe.mjs`，实际退出码 **1**；[完整结果](results.json)、[退出码](exit-code)、[执行尝试记录](probe-attempts.json)。当时没有放宽比例、改变full.css分母、跳过AIForm或缩减字段能力。原探针代码仍保留旧比例断言，不能用重跑它代替未来新口径验收。

## 实测数值与口径

| 项目 | 原始字节 / 结果 |
| --- | --- |
| M1 同一基准 `aheart-ui/full.css` | 201,510 B；与 V0 基线字节摘要一致 |
| theme.css | 1,767 B |
| 当前 `@aheart-ui/ai/form/style.css` 自身 | 4,788 B；不含其使用的基础控件样式 |
| 保留全部既有字段能力所需的最小去重样式闭包 | **100,048 B，49.649% full.css** |
| 组件 CSS 的 25% 上限 | 50,377.5 B；失败 |
| theme + 单组件 CSS 的 30% 上限 | 60,453 B；实际 101,815 B，失败 |

这里按“单个按需入口必须具备其全部现有字段能力所需样式”的口径验收。100,048 B 是探针构造的、已核对真实 tarball 片段的完整依赖闭包，**不是把现有 4,788 B 文件说成 100,048 B**。不能只测 4,788 B 就声称独立按需样式通过：原 [M3 消费页面](../../../scripts/fixtures/m3-consumer/scenes.js) 仍显式加载 `aheart-ui/full.css` 才覆盖这些基础控件。

## 根因与复现依据

- [form.vue](../../../packages/ai/src/form.vue) 静态导入 Button、Form、FormItem；[form-field.vue](../../../packages/ai/src/form-field.vue) 静态导入 CheckboxGroup、DatePicker/DateRangePicker、Input、InputNumber、RadioGroup、Select、Switch、Textarea、TimePicker/TimeRangePicker、TreeSelect 和 Upload，保留 1.3 的全部 schema 字段能力。
- 探针由 TypeScript AST 读取这些真实导入，从同一入口 manifest 取得基础控件的传递样式；去重后再加 AIForm 自身样式。每个源片段都核对存在于本次实际打包、隔离安装的公开组件 CSS 中。三包 tarball SHA-256、逐片段字节与摘要、实际安装锁文件均在结果中。
- [完整必要样式](complete-required-styles.css) 仅为复现证据，不写入包产物。分母从 tarball 读取，并核对与 V0 `full.css` 摘要一致，避免通过增加分母改变门槛。
- [真实 tarball 模块图](module-graph.json) 同时证明 AIForm 的基础依赖仍从 `aheart-ui` 根 barrel 导入，解析了 Table、Typography 等无关模块。改成公开子入口可以解决这部分图越界，但不会减少全部既有字段实际需要的样式总量。

原结论是：在澄清前完整依赖比例口径下，当前结构无法仅靠新增exports和拆CSS达标。负责人随后已明确区分叶子与复合预算，且拒绝S1；现行约束改为依赖并集精确性和不回升基线，模块图与JS要求仍不变。旧测量不因此自动通过新门禁。

## 分状态与未完成项

Local：基础45家族构建、四方漂移6项、三包pack的既有成功记录保留；旧比例探针失败为历史，模块图仍未修复，新CSS门禁未验收。PR：未开；Merged：否；Main CI：V1缺失；Pages：V1未部署；npm pack：前次本地候选通过，本轮未重跑；npm published：未发布；用户验收：缺失。

开发构建诊断、完整迁移表/codemod、全部子入口模块图/预算、兼容消费与两试点、strict types、SSR/hydration、五浏览器的V1全量验收均未完成。当前只证明声明覆盖，不据此宣称V1 Pass或P0/P1为0。负责人预算决定已经记录；下一停止点是复合分类确认。
