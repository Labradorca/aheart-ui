# AIForm：V1 预算停止点

状态：**Fail，停止 V1 后续实现**。没有放宽比例、改变 full.css 分母、跳过 AIForm 或缩减其现有字段能力。探针命令为 `node evidence/V1/aiform-budget-probe.mjs`，实际退出码 **1**；[完整结果](results.json)、[退出码](exit-code)、[执行尝试记录](probe-attempts.json)。

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

若 A2 的完整依赖预算适用于 AIForm，当前结构无法仅靠新增 exports 和拆 CSS 达标；需要评审字段适配器/控件依赖的架构方案，再验证身份兼容与完整旧用法。预算适用范围或阶段范围若要调整，必须由负责人明确决定，代理未自行豁免 AI/DND。

## 分状态与未完成项

Local：基础 45 家族构建、四方漂移 6 项、三包 pack 通过；AIForm 样式闭包和模块图门禁失败。PR：未开；Merged：否；Main CI：V1 缺失；Pages：V1 未部署；npm pack：本地候选通过；npm published：未发布；用户验收：缺失。

开发构建诊断、完整迁移表/codemod、全部子入口模块图/预算、兼容消费与两试点、strict types、SSR/hydration、五浏览器的 V1 全量验收均未完成。当前只证明声明覆盖，不据此宣称 V1 Pass 或 P0/P1 为 0。按负责人停止点，等待对后续架构/范围的明确决定。
