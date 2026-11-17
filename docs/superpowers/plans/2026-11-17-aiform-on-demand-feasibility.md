# AIForm 按需设计与复合入口分类（A2-3 负责人澄清）

**最新状态（2026-11-17）**：负责人已单独授权AI peer ^1.4.0与本地core1.4.0/AI1.2.0/DND1.1.0组合，已通过实际pack、旧M1/M3消费及全部声明严格类型检查；继续V1。[授权与回执](../../../evidence/V1/peer-version-combination/README.md)。下文peer停止点内容保留当时快照；没有PR、合并/Pages、npm或tag授权。
状态：**负责人已确认12复合/53叶子分类与边界，并授权恢复V1实现；AIForm精确导入已做局部验证，现按约定停在peer修改前**。本轮基线 `e0c6f8034fef376702abdd98a261db40c16de612`。

## 已收到的负责人决定

负责人明确**不批准 S1**，不再推进 CSS 复用试验。原先约 69.5% 减量与一致压缩后 49.820% 的结论保留为历史分析；负责人现已给出 A2-3 的分类口径，后续不以旧的“所有复合入口也必须 ≤25%”解释继续判断。

**这是负责人决定，不是代理放宽预算。** 逐项原指令见 [负责人澄清记录](../../../evidence/V1/owner-a2-3-clarification-2026-11-17.md)。负责人随后已 [确认分类并追加“先测叶子线，已达标继续硬门禁”限制](../../../evidence/V1/owner-classification-confirmation-2026-11-17.md)，以下按此执行；peer和版本未改。四份原规范、A1、A2 原文不改。

| 验收项 | 叶子入口 | 复合入口 |
| --- | --- | --- |
| CSS | 沿用 M1：组件 ≤full 25%，theme≤5%，theme+组件≤30%；任何叶子超线仍停报 | **先按叶子25%/30%线测完整闭包**；达标者继续将这两条作为硬门禁，只有实测超线者使用精确并集/不回升门禁。Modal保留M1硬门禁 |
| 后续体积 | 继续执行原比例门槛 | 记录真实闭包大小、每项依赖大小/占比、共享部分与去重方法，冻结为后续不得回升的基线 |
| JS | gzip < full Plugin；相对 root named 增量 ≤max(512 B,1%) | 完全相同，不因复合分类变化 |
| 依赖图 | 只允许真实声明依赖及共享基础设施 | 完全相同，不以复合身份接受根 barrel 或任意扩充依赖 |

负责人已确认复合入口的并集/不回升分栏不套25%和30%，theme自身5%保留，并**追加适用前提**：复合入口先按叶子线实测，已经达标者锁定叶子硬门禁，只有实测超线者才可使用并集/不回升门禁。不能在后续回归超线后重新分类来消除失败。Modal在M1已验收，永久保留原叶子线及M1其他要求。每个复合入口最终门禁和数值必须存入evidence/V1，并逐条出现在开PR前差异摘要；未测完不先标通过。当前 [首次测量表](../../../evidence/V1/composite-css-gates.md) 已锁8项叶子硬门禁，另外4项完整跨包闭包待实现/实测。

## 分类方法（负责人已确认）

1. 按公开逻辑入口分类，覆盖 manifest 的基础45、AI16、DND4，共65条；不是按81个 Resolver 名称重复计数。
2. 内建渲染或聚合多个公开组件家族、承接跨家族产品组合的入口，列为复合。应用传入的任意 slot/VNode 不算库内建依赖。
3. 仅有Icon、Skeleton、Tooltip或浮层/表单上下文等辅助依赖时，仍按较严格的叶子线验收；负责人已确认此边界。
4. 同家族多个子组件不自动成为复合；AI ThoughtChain 是 Process 的同族转发包装，也保守保留叶子门槛。ThoughtChain 与 Process 不是因此被说成同一个对象；各自跨入口身份保持原样。
5. AI/DND中未构成跨族组合的原语也按叶子线执行，不按包名整包豁免；分类已获确认，门禁仍须实测。

## 已确认复合入口：12 个逻辑入口

| 域 / 公开入口 | 组合与声明依赖 | 源码依据 |
| --- | --- | --- |
| 基础 `aheart-ui/dropdown` | Dropdown/Menu/DropdownButton 组合，基础 Button、Menu；Icon 与 floating 为传递/共享依赖 | [dropdown.vue](../../../packages/components/src/dropdown/dropdown.vue)、[dropdown-button.vue](../../../packages/components/src/dropdown/dropdown-button.vue) |
| 基础 `aheart-ui/tree-select` | 选择器与 Tree 组合；Tree、Icon、floating | [tree-select.vue](../../../packages/components/src/tree-select/tree-select.vue) |
| 基础 `aheart-ui/table` | 表格内建 Pagination | [table.vue](../../../packages/components/src/table/table.vue) |
| 基础 `aheart-ui/modal` | 对话框与 Button 操作区、Skeleton 占位组合；Icon 传递 | [modal.vue](../../../packages/components/src/modal/modal.vue) |
| 基础 `aheart-ui/popconfirm` | 确认浮层与 Button 操作组合；Icon/floating 传递 | [popconfirm.vue](../../../packages/components/src/popconfirm/popconfirm.vue) |
| AI `@aheart-ui/ai/bubble` | Bubble + Attachments、Process、Sources | [bubble.vue](../../../packages/ai/src/bubble.vue) |
| AI `@aheart-ui/ai/form` | 13 个直接基础家族，及其真实传递依赖；详见下节 | [form.vue](../../../packages/ai/src/form.vue)、[form-field.vue](../../../packages/ai/src/form-field.vue) |
| AI `@aheart-ui/ai/chat-panel` | ChatPanel + Attachments、Bubble、Conversations、Prompts、Sender、Welcome；由 Bubble 传递 Process/Sources | [chat-panel.vue](../../../packages/ai/src/chat-panel.vue) |
| AI `@aheart-ui/ai/agent-workbench` | 基础 Button、Drawer、Splitter、Tabs；AI ChatPanel/Conversations/Sources/Attachments；DND sortable；内部 AgentExecution | [agent-workbench.vue](../../../packages/ai/src/agent-workbench.vue)、[agent-execution.vue](../../../packages/ai/src/agent-execution.vue) |
| AI `@aheart-ui/ai/chat` | Chat 场景聚合：ChatPanel 与相关 AI 子组件、流 reducer；继承其真实样式闭包 | [chat/index.ts](../../../packages/ai/src/chat/index.ts) |
| AI `@aheart-ui/ai/agent` | Agent 场景聚合：Form、Process、ThoughtChain 与 schema helpers；继承 AIForm 的基础控件依赖 | [agent/index.ts](../../../packages/ai/src/agent/index.ts) |
| AI `@aheart-ui/ai/workbench` | agent-workbench 的现有逻辑别名，继承同一分类与闭包基线；不生成不同组件对象 | [AI exports](../../../packages/ai/package.json) |

共基础5、AI7、DND0。workbench 别名与 agent-workbench 共享一组规范产物，因此为12条逻辑路径、11组规范入口；仍逐条验证 aliases 的解析与兼容。

## 已确认叶子 / 原语：53 个逻辑入口

### 基础包 40 个

仅自身或同族聚合、没有跨公开家族内建组合的31个：

`config-provider`, `icon`, `typography`, `space`, `divider`, `splitter`, `flex`, `grid`, `tabs`, `breadcrumb`, `menu`, `steps`, `input`, `upload`, `textarea`, `input-number`, `checkbox`, `radio`, `combobox`, `tag`, `badge`, `card`, `empty`, `descriptions`, `pagination`, `alert`, `message`, `tooltip`, `popover`, `spin`, `skeleton`。

另有9个辅助依赖边界，**已确认保留25/5/30，不因辅助依赖豁免**：

| 基础入口 | 已声明辅助依赖 | 分类理由 |
| --- | --- | --- |
| `button` | `icon` | 仅辅助渲染，按叶子线；已确认 |
| `date-picker` | `icon` | 仅辅助渲染，按叶子线；已确认 |
| `time-picker` | `icon` | 仅辅助渲染，按叶子线；已确认 |
| `tree` | `icon` | 仅辅助渲染，按叶子线；已确认 |
| `cascader` | `icon` | 仅辅助渲染，按叶子线；已确认 |
| `switch` | `icon` | 仅辅助渲染，按叶子线；已确认 |
| `select` | `icon` | 仅辅助渲染，按叶子线；已确认 |
| `form` | `tooltip` | 仅辅助渲染，按叶子线；已确认 |
| `drawer` | `skeleton` | 仅辅助渲染，按叶子线；已确认 |

Grid 的 Row/Col、Typography 的 Title/Text/Paragraph/Link、Form 的 FormItem/FormList，以及同族 Group/Meta/Panel 等，沿用其家族入口分类；不把同族多导出本身当作复合豁免。

### AI 9 个、DND 4 个

| 域 | 叶子/原语 | 依据与边界 |
| --- | --- | --- |
| AI | `actions`, `attachments`, `conversations`, `process`, `prompts`, `sender`, `sources`, `welcome` | 各自视图/原生元素及纯逻辑 helper，不内建跨公开组件族组合 |
| AI | `thought-chain` | 只转发 Process 同族视图，无独立样式族；保守保留叶子线，跨入口身份不变 |
| DND | `draggable`, `droppable`, `drag-overlay`, `sortable` | 原语/同 sortable 家族的 List+Item，依赖底层 DND hooks/context，不内建基础包或 AI 组件族；保守保留叶子线 |

只读审计见 [AI/DND 源码 import/视图证据](../../../evidence/V1/classification/source-evidence.json)；基础45的依赖依据见 [既有源审计](../../../evidence/V1/source-audit-baseline.json)。[proposal.json](../../../evidence/V1/classification/proposal.json)保留提出时快照；[approved.json](../../../evidence/V1/classification/approved.json)记录65条已确认分类。前次只读审计为当时源码快照，不代替本次精确导入后的tarball模块图。

### 比较基准与非组件模块

根 named 消费模式继续作为兼容/JS增量对照，`/full` 和 full.css 为全量比较基准；不能要求基准自身“gzip 小于自己”。constant/resolver 是非 UI 辅助模块，继续执行其无 Vue/无隐式 CSS 的现有门禁。theme 单独检查，style.css/full.css 继续字节相同。旧 es/lib 路径复用对应规范组件分类与兼容验证，不重复生成基线。以上不把任何65条组件/场景子路径移出验证范围。

## AIForm 精确导入与验收要求

直接允许集合保持原停止点的13个基础家族：

`button`, `form`, `checkbox`, `date-picker`, `input`, `input-number`, `radio`, `select`, `switch`, `textarea`, `time-picker`, `tree-select`, `upload`。

这里包含11类字段控件家族与 Button/Form 两个支撑家族；schema 的13类字段类型与家族数不是一一映射。Icon、Tree、Tooltip 等单列传递依赖；utils/config/picker-core、表单 context 等确实需要的共享模块也单列，不能把全库登记进去。

- 字段渲染必须改成精确公开路径导入，不保留运行时根 barrel，也不以 legacy 深路径规避 peer 下限问题。
- 重新采集真实 tarball 的 parsed/rendered 模块图。旧106项越界必须清零；新出现的任何未声明模块也失败，不仅比较数量减少。
- 保留全部13类字段、对象身份、props/events/expose、默认值/受控拒绝/条件显隐/异步取消/错误聚焦等行为，以及两个试点的业务源码。
- 本轮已将form.vue/form-field.vue改成精确公开子入口，AI构建将这些路径保留为外部依赖；[局部tarball验证](../../../evidence/V1/aiform-precise-imports/README.md)中原106项越界清零，JS预算、身份、13字段SSR、严格消费类型通过。新完整CSS门禁未完成；现按约定停在peer修改前。

## 复合 CSS 并集与不回升基线

只对首次完整实测超出叶子线的复合入口使用该门禁；先记录叶子线实测和例外依据。用真实tarball生成基线，至少记录：入口/版本/SHA、声明依赖、每项样式入口与内容摘要、构建/格式参数、去重规则、完整闭包字节、各依赖原始字节和占比、共享重叠及去重归因。

并集必须保留规则的 media/supports/container/layer 上下文、selector、declarations、important 和顺序语义。验证同时检查缺失与多余规则/选择器；同 selector 在不同上下文不被错误合并。外置共享 CSS、@import 和 Resolver sideEffects 全计入，不能把 full.css 伪装成一项声明依赖掩盖无关选择器。

建议并列记录各依赖的包含共享部分占比与固定顺序去重归因占比，说明归因顺序，防止重叠使数字不可比。后续出现闭包大小或依赖占比回升时如实报告，不由代理借重新归因、换格式或重设较大基线消除回升。

旧100,048 B 是澄清前对当前样式片段的复现，不直接冻结成新门禁已通过的基线。新基线必须来自实现后的完整公开样式并集、通过无额外 selector 和模块图检查，并保留负责人确认及测量条件。

## peer 下限影响说明：先看，未改

[影响数据](../../../evidence/V1/classification/peer-impact.json) 对照 V0 的1.3公开 API：AIForm 所需13个直接家族中，Button/Select 已有公开子入口；其余11个精确路径属于本次1.4候选。当前 AI peer 是 `workspace:^1.1.0`，出包为 `^1.1.0`。

| 若采用 `^1.4.0` 下限 | 影响 |
| --- | --- |
| 必要性 | 表达实际使用11个新公开路径所需的最低基础包能力；1.3及更早安装组合不能被继续声称可解析这些路径 |
| 用户安装 | 固定基础包1.1–1.3的用户升级新 AI 候选时也需升级基础包及锁文件；严格 peer 解析可能拒绝旧组合 |
| 业务源码 | 两试点业务源码仍保持不变；依赖安装组合的改变须在验收/迁移说明中显式列出 |
| 本地验收 | 当前本地候选仍标1.3.0，不能通过忽略 peer 冲突来伪造准确版本验收 |
| 发布顺序 | 需先有能提供新路径的基础包版本，再发布依赖它的 AI 版本；具体版本、PR、发布、tag 仍分别授权 |
| 回退 | 基础包、AI 包及锁文件回到配套旧组合；不声称新 AI 的 ^1.4 peer 支持旧基础包 |

精确导入后的 [具体影响与待决定项](../../../evidence/V1/aiform-precise-imports/peer-impact.md) 已就绪；**没有改peer、package version、Vue peer或DND依赖**。分类确认不捆绑 peer 修改授权，真正修改前仍等负责人另行决定。

## 当前状态与下一停止点

| 项目 | 当前状态 |
| --- | --- |
| S1 | 负责人已明确不批准，不再请求授权或执行 |
| A2-3 分叶子/复合的口径澄清 | 负责人已作决定，见直接记录；不是代理决定 |
| 12复合/53叶子、辅助/同族边界及执行分栏 | 负责人已确认，并追加先测叶子线、已达标继续硬门禁；Modal门槛不降 |
| 恢复V1实现 | 已授权并完成AIForm精确导入局部验证；现停在peer修改前 |
| peer/版本、V1 PR、合并/Pages、npm、tag | 本轮未获授权，未执行 |

Local：AIForm精确导入及局部验证通过，peer修改前停止；V1 PR：未开；Merged：V1 否；Main CI：V1 缺失；Pages：V1 未部署；npm pack：本轮三包候选通过；npm published：本轮未发布；用户验收：未代填，分类确认不替代G8。
