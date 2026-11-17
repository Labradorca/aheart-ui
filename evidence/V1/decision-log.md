# V1 全量按需铺路

状态：**负责人已限定授权纠正Workbench无效初测；12复合已先通过独立完整性审查才冻结，65入口消费门禁通过，V1剩余验收进行中。不是可开PR/可合并候选。** 基线`b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；分支`codex/v1.4-entries`。V0的PR#51/主线/Pages回执单独存于[V0合并后记录](v0-postmerge/README.md)，不代替V1。

## 决策与授权

| 项目 | 负责人决定 / 当前执行边界 |
| --- | --- |
| V1范围 | 全Ready子入口/CSS/Resolver/四方漂移、开发构建诊断、迁移表/codemod、数值/兼容/类型/浏览器验收；未完成 |
| 旧能力断言 | 仅允许M1固定原四入口范围，M3把ATable否定改正向；[直接答复](owner-decisions-2026-11-17.json)。55份其余保护源码未改，包括两试点业务；[本轮核对](css-closure/selector-fix/verification.json) |
| 对象身份/提示 | 保留同一对象；负责人允许改为开发构建诊断，已实现opt-in Vite插件，生产禁用；[验证](migration-tooling/README.md) |
| S1 | **负责人明确不批准**，不执行、不重新请求；[原决定](owner-a2-3-clarification-2026-11-17.md) |
| A2-3澄清 | **负责人决定，不是代理放宽预算**；[预算澄清](owner-a2-3-clarification-2026-11-17.md)、[分类确认及追加限制](owner-classification-confirmation-2026-11-17.md)，详见下节 |
| peer | 按[单独授权](owner-peer-versions-2026-11-17.md)：AI源码workspace:^1.4.0，出包^1.4.0；release-contract/必要锁记录同步；Vue peer/DND范围不改 |
| 本地版本 | core1.4.0 / AI1.2.0 / DND1.1.0，仅本地组合验收；CHANGELOG明确AI1.2需core≥1.4；[真实pack/旧消费/strict](peer-version-combination/README.md) |
| Workbench初测纠错 | [负责人仅授权](owner-workbench-baseline-correction-2026-11-17.md)两路径纠正为54,212 B并重算依赖占比；其余63条预算数据不变；54,109 B与exit1保留为[无效初测历史](css-closure/selector-fix/README.md)；此后严格不回升 |
| PR | 未授权、未开；完整候选后先交摘要，包括12复合最终门禁/数值 |
| 合并 / Pages | V1未授权、未执行 |
| npm published / tag | 未授权、未执行 |
| 用户验收 | 缺失；不以分类/版本确认代替用户验收 |

## A2-3现行执行口径（负责人直接决定）

1. 确认12复合/53叶子、Icon/Skeleton/Tooltip辅助依赖与同族聚合边界、复合预算分栏；[65条已确认分类](classification/approved.json)。
2. 53叶子继续组件≤full25%、theme≤5%、合计≤30%，任何超线仍停止。12复合**先测同一25%/30%线**，通过者继续硬门禁；Modal在M1验收，不能降低。8个已通过复合锁定，合计61条叶子硬门禁。
3. 仅完整实测超叶子线的复合入口才能适用精确并集/不回升：CSS等于自身+声明依赖样式并集，声明外选择器0；记录闭包及各依赖大小/占比为后续不得回升基线。该栏不套25%/30%，theme自身5%仍执行。AIForm/Agent/Workbench两路径共4项符合超线前提，Workbench仅按本次限定授权纠正初测，当前门禁通过。**今后任何复合入口基线都须先通过独立完整性审查才算冻结**；本轮12项证明见[冻结审查](css-integrity/freeze-review.json)。
4. JS两类均不变：gzip<full Plugin，相对root named增量≤max(512 B,1%)。AIForm只允许13个字段控件族及声明传递依赖，106项越界必须归零。13字段、对象身份、props/events/expose、两个试点业务源码保持。
5. 每个复合入口最终门禁和实测值写入evidence/V1，开PR前摘要逐条列出；当前[12项完整测量/门禁表](composite-css-gates.md)记录有效基线与实测；分项通过仍不算完整阶段/用户验收。
6. 恢复实现与peer先审停止点已分别收到答复；peer/本地版本授权按上表执行，未扩大为PR/合并/Pages/npm/tag授权。

AIForm精确公开导入与external已实现，旧106越界变0；[原局部探针](aiform-precise-imports/README.md)及[本轮65入口图快照](integration-checks/README.md)分别保存，旧版本/旧错误不追改。原CSS100,048 B/49.649%、压缩49.820%和exit1仍为[历史测量](aiform-budget/README.md)，不是新规则通过证据。

## 本轮发现、负责人纠错授权与独立冻结审查

独立源选择器审查发现：共享拆分器与旧验证共用过滤规则，只识别选择器开头AI类，漏掉Workbench已存在的DND→AI时间线末项规则。代码修复保留该103 B规则；表/fixture等声明外上下文仍排除。两个别名实际CSS54,212 B、相同摘要，其他63条与初测逐字节相同；full分母201,510 B/theme1,767 B不变。967条声明内源选择器核对缺失0。原54,109 B不完整，初测exit0已不能证明完整闭包。

首次停止时保持原基线，真实门禁exit1；[复现命令、前后数值与无效初测备份](css-closure/selector-fix/README.md)全部保留。负责人随后仅授权两路径纠正为54,212 B并重算依赖占比，追加所有复合基线须先独立完整性审查才冻结；[直接决定](owner-workbench-baseline-correction-2026-11-17.md)。本轮审查模块不导入拆分器或其闭包/过滤函数，独立核对源AST/声明并集/任意位置类名/顺序/上下文/重复，真实tarball65项及12复合全部通过后才冻结；其余63条预算数据深度相等。当前65入口CSS/JS/图/身份/代表SSR全部通过，[有效证明](css-integrity/README.md)。P1-V1-001的代码/首次基线冲突已解决；完整P0/P1审计仍待其余验收，不预填阶段缺陷为0。

## 一张验收表（A2-7）

| 项目 | 分项状态 | 证据 | SHA / 时间 | 责任人 |
| --- | --- | --- | --- | --- |
| G1设计 | A2生效；分类/预算追加限制及有限基线纠错已确认；所有复合冻结前须独立审查；S1拒绝 | [负责人确认](owner-classification-confirmation-2026-11-17.md)、[当前停止点](css-closure/selector-fix/README.md) | 2026-11-17 | wzfdhr |
| G2代码 | Local：65入口/CSS、81名Resolver、漂移、AIForm/Workbench精确导入、开发诊断、指南/codemod已实现；完整V1未完成 | [覆盖](entry-coverage.json)、[集成快照](integration-checks/README.md)、[工具](migration-tooling/README.md) | 4e494f9 + 本轮本地差异 | Codex |
| G3自动检查 | 纠错后65/65 CSS/JS图/预算/身份/SSR与迁移消费exit0；20条新契约/独立审查/codemod测试exit0；R1覆盖率86.44%（门槛80%）通过；两试点12场景、完整/按需13字段+Workbench SSR/hydration六组视觉、strict、旧root/form-list/D8/M1/M3消费、构建确定性已通过；五项目首轮4项文档前置布局竞态已修复并局部复核，待最终全量及缺陷审计 | [命令/退出码](checks/results.json)、[新失败与核对](css-closure/selector-fix/README.md) | 2026-11-17，本地候选 | Codex |
| G4视觉 | 实际tarball夹具视觉/交互通过：三引擎两视口full/scoped截图逐字节相同，代理已看图；负责人真实操作验收仍缺失 | [12场景与截图](acceptance/visual/results.json)、[已冻结6项负责人任务](user-tasks.md)；自动化/代理看图不代替用户验收 | 缺失 | Codex观察 / wzfdhr验收 |
| G5包 | npm pack：三包本地候选成功，AI peer准确^1.4.0；当前完整CSS分项通过，不算发布验收或完整V1通过 | [准确组合](peer-version-combination/README.md)、[新pack元数据](css-closure/selector-fix/packed/results.json) | 本地1.4.0/1.2.0/1.1.0 | Codex |
| G6 PR / 合并 | PR：未开；Merged：否 | 需单独授权，当前候选未完成 | 缺失 | wzfdhr |
| G7主线CI / Pages | Main CI：V1缺失；Pages：V1未部署 | V0回执独立，不冒充V1 | 缺失 | 待授权后CI |
| G8用户验收 | 缺失，未代填 | 完整实现后冻结5–8条真实任务由负责人验收 | 缺失 | wzfdhr |
| npm published | 本轮未发布，tag未打 | pack与公开发布分开 | 本地候选 | N/A |

## 当前还差什么 / 需要决定什么

Workbench限定纠错已执行并通过独立冻结审查，详见[当前差异摘要](diff-summary.md)。仍需最终tarball全量复验、两个试点新组合运行、严格SSR/hydration/五浏览器、覆盖率/确定性、视觉及P0/P1审计；完整通过后再交开PR前摘要。无PR/合并/Pages/npm/tag授权，不把局部Local成功写成Merged或用户验收。
