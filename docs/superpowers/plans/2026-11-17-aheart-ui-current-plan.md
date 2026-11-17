# Aheart UI 现行合并计划（A2已生效，含负责人V1澄清）

2026-11-17，初始审计基线 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7`；#50 合入后的实施基线为 `287058d6395460913b8013c9201c196e9b36c2c9`。这是供单文档执行与审查的合并视图；**负责人已批准 A2 并决定 v2 Go；自 PR #51 合入 master 起，A2 优先于 A1 的对应条款；合入前仍按 A1**。原文保持原样；每条下列规则的来源随条文给出。未提及的技术细节不得用作扩大当前阶段的授权。

**V1继续验收：负责人已限定授权纠正Workbench无效初测为54,212 B；所有复合基线先通过独立完整性审查才冻结。65入口门禁通过不代表完整阶段或用户验收，详见[V1日志](../../../evidence/V1/decision-log.md)。**

V0已由PR#51合入master（`b1eef9b6`），对应Main CI与Pages已成功，见 [合并后回执](../../../evidence/V1/v0-postmerge/README.md)。下列V1执行口径还纳入负责人2026-11-17的直接澄清与独立授权，原始四份规范、A1、A2不改。

## 来源与优先级

| 简称 | 原文 | 效力 |
| --- | --- | --- |
| P | [2026-09-08 总体方案](../specs/2026-09-08-aheart-ui-product-and-technical-master-plan.md) | 已批准；被 A1 对应条款覆盖的部分除外 |
| R | [2026-09-08 技术 RFC](../specs/2026-09-08-aheart-ui-v2-architecture-optimization-design.md) | 已批准技术方向；目标接口不是已实现事实 |
| Q | [2026-09-08 阶段验收标准](../specs/2026-09-08-aheart-ui-v2-phase-acceptance-criteria.md) | 已批准门禁；受 A1 修订 |
| T | [2026-09-08 任务流程](../specs/2026-09-08-aheart-ui-v2-task-flow-checklist.md) | 任务出处与历史编号；勾选不推导阶段 Accepted |
| A1 | [2026-11-05 修订](../specs/2026-11-05-aheart-ui-v2-solo-scope-amendment.md) | 已批准；未被 A2 替换的条款继续有效 |
| A2 | [2026-11-17 草稿](../specs/2026-11-17-aheart-ui-v2-amendment-a2-draft.md) | 已获负责人批准；下列替换条款须合入 master 后才优先于 A1 |
| D1 | [A2-3负责人澄清](../../../evidence/V1/owner-a2-3-clarification-2026-11-17.md) | S1拒绝；叶子/复合预算、JS不变、精确导入与peer先审 |
| D2 | [分类确认与追加限制](../../../evidence/V1/owner-classification-confirmation-2026-11-17.md) | 确认12/53及辅助/同族边界；复合先测叶子线，通过者硬门禁，Modal不降；优先于D1执行解释 |
| D3 | [peer与本地版本授权](../../../evidence/V1/owner-peer-versions-2026-11-17.md) | AI peer ^1.4.0，本地core1.4.0/AI1.2.0/DND1.1.0组合；不授权PR/合并/Pages/npm/tag |
| D4 | [Workbench初测纠错与冻结前审查](../../../evidence/V1/owner-workbench-baseline-correction-2026-11-17.md) | 仅两路径纠正为54,212 B；无效初测历史保留，今后所有复合基线先独立完整性审查才冻结 |

效力顺序：V1先按D1–D4的对应澄清/授权（后决定覆盖前决定），再按已生效A2 → A1未替换部分 → 四份原文未替换部分。P 的产品范围、R 的技术契约、Q 的门禁、T 的输出/降级任务互相约束；冲突记录到阶段日志，由 wzfdhr 决策，不静默选宽松规则。来源：P §11、§15；A1 开头、A1-3；A2 状态说明。

## 产品与治理（现行）

| ID | 有效规则 | 来源 |
| --- | --- | --- |
| C01 | 面向 Vue 3 AI 产品与业务后台的 styled component system；普通 API 保持易用，复杂组件渐进提供组合能力；AI UI 不代管模型、网络、鉴权或业务状态 | P §3–§5；R §3–§5 |
| C02 | 基础包 aheart-ui 保留；AI、DND 独立；Icons/Motion 需求触发。无具体需求不建默认图标或 Motion 发布承诺，继续 Lucide 兼容；不引入公共 core 包 | R §5、§24；A1-4 |
| C03 | 不一次重写全部组件、不逐组件发 npm 包、不复制 Reka/Ark 实现、不把简单组件强拆 parts、不将大型动画运行时放进基础包、不在无 bundle fixture 时宣称按需 | P §5.2；R §3、§23 |
| C04 | 唯一决策人 wzfdhr；原多角色签字替为一次注明日期与依据的书面决定。PR 自审，必需 CI 全 SUCCESS 后才可合并。阶段、合并、Pages、npm、tag、UA 不互相授权 | A1-3；P §11、§13；Q §7；本轮负责人停止点 |
| C05 | 两必需试点：仓库外 clean-consumer 与已登记 pilots/ai-review-gate。后者是新验证工程，不冒充已有业务采用；Todo 可选。只有声称 Nuxt 支持才必须加 Nuxt fixture，Vue/Vite SSR 不自动代表 Nuxt | A1-2/A1-5；Q §4；R §17.3；M0 记录 |
| C06 | 同一文件、包、构建目录、端口、试点同一时间一个写入者；并行用独立 worktree，不混入 Table/D5 维护。保留无关 dirty 内容，不提交 AppleDouble 或权限噪声 | P §12.1；T 使用规则/依赖；本轮负责人工作纪律 |
| C07 | 每项任务有范围、责任、证据、退出与回滚；新增范围先记决策。进入条件不满足不得推进；门禁证据缺失不得 Accepted。计划不是日历承诺 | P §1、§10–§12；T 使用规则、统一报告；Q §1 |

## 技术契约与实施边界（现行方向，按阶段实现）

| ID | 契约 | 来源 / 阶段归属 |
| --- | --- | --- |
| K01 | 一个 manifest 定义 name/globalName/package/domain/subpath/source/style/status/since；生成或验证 build inputs、exports、root named、constant、namespaced、Resolver、导航/概览、质量矩阵、release contract。Icons 另用 IconManifest | R §7.1、§8；P §5.1；T M7-TM-01。V1 提案扩至所有 Ready |
| K02 | root named、组件 subpath、full 三层：v1 根 default 保留；2.0 才让 root 只导出 named/types，不静态引用 full/Plugin。Plugin 不在模块求值时执行 app.use | R §6、§7.4–§7.5、§18.2；P §13.2；A1-1 |
| K03 | 三层 CSS：theme、组件依赖样式、full；发布 JS style-free，显式导入。Resolver false 不注入 CSS，css 仅注入组件 CSS；theme 应用导入一次；手动样式与 Resolver 二选一。sideEffects 精确标 CSS，不无证据设全包 false；style.css 兼容 full.css | R §7.3–§7.4、§8；M1 contract；A2-4 事实修正 |
| K04 | main/module/types/exports/files 与 tarball 一致；ESM/CJS/types/CSS 必须实际存在；isolated tarball 不含 workspace 协议、不走源码 alias/symlink；两次隔离构建 hash 比对；本地 tgz 记录版本/commit/SHA-256 | R §7.4/§7.6/§17.3；T M1-REL-01；Q G5 |
| K05 | 2.0 目标 dist/esm,cjs,types,styles；通过 dist/compat facade 保留旧 es/lib 逻辑路径整个 2.x，3.0 再删除；生成物不长期入 Git。v1 继续 es/lib 以保兼容 | R §7.2/§7.6/§18.2；A1-1；A2-4 提案；[具体弃用表](../plans/2026-11-17-aheart-ui-v2-deprecations.md) |
| K06 | Resolver 只读 constant 静态元数据，不导入组件运行时；按 domain 解析精确 JS/CSS。namespaced 为高级聚合入口，不承诺最小 bundle；Nuxt 模块不是首发阻塞 | R §6.2、§8；A1-4（Resolver 原 M1 Preview 移新 M3） |
| K07 | 内部 State/DOM/Primitive/Presence/Floating/Focus/Collection/Field 私有，至少两组件族复用、API 冻结及独立测试后才考虑公开；受控状态挂载时确定，默认值仅作初值，统一 request/set 更新，开发环境提示模式切换 | R §9.1–§9.2；T M3-TM-01 |
| K08 | Primitive as 改标签；asChild 合并唯一子节点的 ARIA/事件/class/style/ref；多根、文本、Fragment 给开发提示；preventDefault 合并策略书面定义。Presence 等真实 animation/transition 完成，timer 仅兜底，支持取消/嵌套/reduced-motion、forceMount 与阶段事件 | R §9.3–§9.4；T M3 3A→3B→3C。A2 提案将组合/data 交 V3，不据此宣称现阶段全通过 |
| K09 | ownerDocument 来自 trigger/target；Escape 仅 topmost，outside 用 composedPath；Portal、LayerStack、z-index、焦点 mount/restore/trap/loop 一致。iframe、ShadowRoot、多 app root 仅按冻结支持矩阵声明，未验证不扩大承诺 | R §9.5–§9.6；P §9；Q §4、原 M4 |
| K10 | RovingFocus 覆盖 orientation/loop/Home/End/disabled/tab stop；Collection 覆盖注册顺序、value/label/disabled/group/visible/typeahead/virtual index；FieldContext 提供 id/name/disabled/required/invalid/describedBy/controlProps，不依赖完整 Form 实例 | R §9.6–§9.7；T M3/M4，复用任务后续按需立项，不扩 V1 |
| K11 | data-scope/part/state 作为稳定用户契约，保留 class；disabled/readonly/required/invalid/highlighted/selected/empty/orientation/side/align 同名；记录 scope/parts/states/CSS vars。浮层统一 layer-index、trigger-width、available-width/height、transform-origin、anchor-x/y | R §10；原 Q M3；A2-5 提案归 V3 |
| K12 | ConfigProvider 配置 size/disabled/variant/locale/theme/dir/teleportTo/getPopupContainer/scrollBody/useId/nonce/icons/motion/zIndex；优先级 prop→最近 provider→ownerDocument→默认，显式容器也不得误用主文档 | R §11；原 Q M4 Should；非本轮新增全字段实现授权 |
| K13 | Combobox 与 Select 不合并；普通 API 单选、value/input/open 受控、对象/分组/异步 loading/empty/disabled/clearable、键盘、Field、SSR/iframe。高级 Root/Input/Trigger/Content/Item 与 Anatomy 增量；multiple/tags/creatable/virtualization/远程分页/command recipe 后置 | R §13；Q 原 M3；T M3-TM-02；A2-5 提案 |
| K14 | AI 的 Chat/Agent 与 Workbench 独立 subpath；Sender/Bubble/Form 不依赖 DND，Workbench 仅依赖 sortable。v1 根 Workbench 兼容；2.0 根移除并改 optional DND peer，AI/full 明确要求 DND。Motion optional，缺少可用 CSS。领域包独立版本，不无故同步 major | R §15、§18.2–§18.3；A1-4；A2-4 提案 |
| K15 | 文档一条推荐路径，full/subpath/namespaced 分层；组件页含包/安装/import、示例/API、状态、data/token、图标/motion、键盘/a11y、SSR/Teleport/iframe、bundle/迁移。未实现能力注明；所有推荐示例用 tarball 验证；llms/JSON/API/MCP 后置 | P §6；R §16；T M7；A1-4 |

## 质量、支持与证据（现行；提案另标）

| ID | 要求 | 来源 |
| --- | --- | --- |
| Q01 | Pass=全部 Must、适用门禁及 N/A 理由齐全；Conditional 必须登记问题、owner、截止与降级且不得真实发布；Fail=任一 P0、缺失或矛盾。V1 额外 P0/P1 必须都为 0 | Q §1；A2-3 提案 |
| Q02 | E0 意图；E1 静态本地；E2 本地运行；E3 PR；E4 合并 CI/Pages/pack；E5 真实消费。每项写路径/命令、退出码、SHA/时间；截图含 URL、浏览器、视口、场景。E2 不替 E4，自动化不替人工 UA | Q §2.1；R §21；A1-3 |
| Q03 | P0=安装/构建失败、数据丢失、核心键盘/阅读器、严重样式、公开包、许可证/凭据；P1=推荐路径/API/SSR/iframe/核心浏览器/预算/示例失败；P2=非核心偏差。两个独立环境复现或影响两组件升级一级；安全/凭据/许可证最低 P0 | Q §2.2 |
| Q04 | 五项目 desktop、mobile、desktop-firefox、desktop-webkit、mobile-webkit；light/dark、键盘、axe/ARIA、reduced-motion、iframe/容器/嵌套/SSR hydration 按范围执行；运行时错误与 axe 0。Node、Vue、构建器范围以冻结支持矩阵为准，不从本机版本外推 | Q §4；R §17；P §9；M1 contract |
| Q05 | 物理 iOS Safari 已由负责人于 2026-11-16 取消，Cancelled/N/A，不是 Pass、不留设备待办。支持说明：“iOS Safari 仅经浏览器仿真验证，未经真机验证” | [v1.x 收口](../../guide/v1x-closeout.md)；A2-7 提案统一文案 |
| Q06 | JS两类均沿用M1：gzip<full Plugin，相对root named增量≤max(512 B,1%)。53叶子仍≤25%/theme≤5%/合计≤30%；12复合先实测同一叶子线，8个已达标者（含Modal）锁定原硬门禁；仅4个实测超线者按精确声明依赖并集/不回升基线，theme5%仍保留。无声明外选择器/模块，JS-only无CSS，显式样式不被摇掉，style/full相同；V1 full.css分母与V0字节相同。逐项数值与依赖占比存evidence/V1，开PR前摘要逐条列出 | M1 contract；A2-3/A2-7；D1/D2/D4；所有复合基线须先通过独立完整性审查才冻结；[冻结门禁与测量](../../../evidence/V1/composite-css-gates.md) |
| Q07 | 本次提案的跳过基线 41 调用点；后续不增加，新增理由须先登记并通过总数门禁，不能用登记本身绕过总数。发布前同一主线 SHA 连续十次、flaky<1%，沿用 QG5 双阶段机制，不拿历史其他 SHA 顶替 | A2-7 提案；[QG5](../../guide/qg5-evidence.md) |

当前 G1 设计、G2 代码、G3 自动检查、G4 视觉、G5 包、G6 PR/合并、G7 主线 CI/Pages、G8 用户验收均保留；阶段只填一张表，N/A 写理由。Local、PR、Merged、Main CI、Pages、npm pack、npm published、UA 必须能分别读出。来源：Q §3/§6、A1-3。

**A2-7 提案**将表合并成八行再加 npm published，共九行；G6 行分别写 PR/Merged，G7 行分别写 Main CI/Pages，其他行保留 Local/pack/UA。G8 改为每阶段冻结 5–8 条真实自用操作，每条有截图/录屏、URL、浏览器、视口、SHA；仅“确认”不构成新的 G8 Pass。M0/M1 的既有负责人结论保留，不倒改原记录。决策日志随阶段 PR，PR 模板提供检查项。来源：A2-7；R §21。

## 当前交付和 A1 阶段（现行）

| 阶段 | 范围、证据与状态 | 来源 |
| --- | --- | --- |
| M0 | 契约与两试点基线已 Accepted；P0=0 的历史决策不外推到新阶段 | A1-5；[M0 日志](../../../evidence/M0/decision-log.md) |
| M1 / 1.2 | Button/Modal/Select、CSS、full、consumer/release contract 已 Accepted，1.2.0 已发布；Resolver 移到 M3 | A1-1/A1-4；[M1 日志](../../../evidence/M1/decision-log.md) |
| M2 / 1.3+ | 普通 Combobox、浮层迁移已合并发布；namespaced/data 未交付；UA 缺失，不写全部 Must Pass | A1-4；T 原 M3+M4；[M2 补录](../../../evidence/M2/decision-log.md) |
| M3 / 1.3 + AI/DND 1.1 | 场景/组件 CSS、Resolver、迁移已发布；同合并 SHA CI cancelled、Pages 缺失、UA 缺失；后续发布 SHA 成功另列 | A1-4；T 原 M6+M7；[M3 补录](../../../evidence/M3/decision-log.md) |
| M4 / v2决策（历史） | A1原门槛保留为历史来源；A2生效后由V0–V4替代，不再执行被删除的7天使用期，后续真实采用触发恢复条件 | A1-4/A1-6；A2-1/A2-6 |

A1 已删除原 14 天 Beta、三试点持续使用与 30/60/90 复盘；不能从旧任务清单重新恢复它们。A2生效后不再执行A1的7天RC条件，原任务清单中的历史 checkbox 不作为本计划进度。来源：A1-2/A1-6；T 原 M0–M8。

## V0–V4（A2生效；V0已合入，V1进行中）

| 阶段 / 前置 | Must 与出口 | 回滚、停止 | 来源与旧任务映射 |
| --- | --- | --- | --- |
| V0 无发布；已合入 | M2/M3补录与范围变更、路线图、弃用表、此合并计划、A2批准与v2 Go均已随PR#51合入。Main CI/Pages准确SHA成功；历史UA/证据缺失不补造 | 不推导V1/V2验收，不授权发布 | A2-1/A2-2；[V0日志](../../../evidence/V0/decision-log.md)、[合并后回执](../../../evidence/V1/v0-postmerge/README.md) |
| V1 / 1.4.x additive；V0已合入 | 单清单驱动全Ready子入口/CSS/Resolver，四方漂移；开发构建诊断、生产静默；迁移表/codemod。出口：65条逻辑路径覆盖100%，Q06分类门禁，旧消费与两试点业务源码保持、strict/SSR/hydration/五项目通过、P0=P1=0；V1九行表。当前本地候选core1.4.0/AI1.2.0/DND1.1.0；未公开发布 | 叶子超线、既有复合硬门禁回退、声明外模块/选择器、复合基线增长均停报，不降预算不跳组件。开PR前逐条交12复合数值；PR、合并/Pages、npm、tag仍单独授权。当前版本仅组合验收获准 | A2-3/A2-7；D1–D4；[V1日志](../../../evidence/V1/decision-log.md) |
| V2 / 2.0-alpha；V1 Pass | 按弃用表切 root/full、dist/facade、AI optional DND；B4为回归。根图不含full/Table/DatePicker/AI/DND；无DND的chat可安装/strict/build；旧es/lib/style路径解析；files最小且确定性；两试点指南外改动0；1.3→alpha→1.3状态保留 | 只用next，latest留1.x；任一推荐路径或回退失败不进Beta。候选若新增breaking先改清单批准 | A2-4；R §7/§15/§18；T M1/M6/M8技术任务 |
| V3 / 2.1 additive；需求触发，不阻塞2.0 | namespaced Combobox 与浮层统一data；按原Q M3 Must、12交互/8键盘a11y/SSR+iframe各1/五项目/P0P1=0/真实采用执行；普通与组合 API、数据模型/Anatomy/merge/focus/模块图齐全 | 若发现必须breaking，先回V2清单；失败保留普通API和旧Select，不冒称组合完成。按3A→3B→3C切片 | A2-5；Q 原M3；R §9/§10/§13；T M3、M4 |
| V4 / 2.0 Beta→RC→Stable；V2 Pass | Beta：P0=0、Beta范围P1=0，两试点精确registry beta完成5–8任务；RC：P1清零、回退通过、同主线SHA十次flaky<1%；Stable：RC无新增P0/P1，迁移/日志/弃用表齐、负责人书面决定；保留全部适用G1–G8与真实npm验证 | **A2-6已替换A1-6的7天要求**，未来有真实在用项目/外部用户再恢复使用期；next用于Beta/RC，回滚dist-tag/npm deprecate，不unpublish；RC只修阻塞不加新功能 | A2-6/A2-7；Q §7、原M8；R §19 Phase8；T M8 |

## 需求触发项与风险（不混入 V1）

| 项目 | 立项时必须保留的标准 | 来源 |
| --- | --- | --- |
| Icons | 无PAT公共npm、单图标ESM/CJS/types/currentColor/sideEffects:false、独立IconManifest、来源许可证/tag/provenance；AIcon slot→component→provider→默认→未知warning；装饰隐藏、icon-only可访问名称、loading语义；20核心单图标、5语义图标五项目、许可证P0P1=0、两试点按A1完成；失败继续Lucide。旧名称alias至少major周期 | R §12；P §8.3；Q 原M2；T M2；A1-2/A1-4 |
| Motion | Presence/Fade/Slide/Scale/Collapse/ReducedMotionProvider与tokens；Stagger/Typewriter/Marquee/AnimateNumber后置。CSS/WAAPI/Vue，不强依赖大型运行时；基础包独立正确，enter/leave各≥3，尊重系统reduced-motion、五项目、无持续长任务、未用组件图无Motion；失败全局关闭或仅CSS | P §8.2；R §14；Q 原M5；T M5；A1-4 |
| 风险与停止 | CSS顺序→真实截图；asChild丢ARIA/ref→合并契约测试；timer截动画→真实完成事件；全局document→ownerDocument；Escape串层→topmost；AI污染→子入口/peer；清单漂移→单源校验；许可证/不可回滚回归立即停止 | R §20；P §14.3；Q §2/§7；T 各阶段停止规则 |

## 验收与发布动作顺序

类型、包单测、release/export contract、确定性、consumer、docs、pack、定向E2E、五项目、空目录安装、用户prerelease验证后才作stable决定；每步保存命令/退出码/时间/SHA，按阶段关联，不能用本地通过代替主线。每次公开发布保留上一稳定tgz/锁文件/哈希/日志/回滚命令，发布后从registry复跑两试点、SSR/iframe与最小视觉。来源：R §19 Phase8；Q §7；A1-2。

V0已合入并完成主线/Pages回执；V1在独立分支进行。D3仅授权本地版本与peer组合验收，开PR、合并/Pages、npm、tag仍逐步单独授权；当前仍不得据Local成功宣称Merged/Main CI/Pages/npm published/用户验收通过。来源：本轮负责人指令；A2 状态与 A2-2。
