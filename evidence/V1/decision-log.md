# V1 全量按需铺路

状态：**V1 本地技术验收通过，停在开 PR 授权点。G8 负责人操作、PR 审查及远端 CI 仍待确认。** 基线`b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；分支`codex/v1.4-entries`。V0的PR#51/主线/Pages回执单独存于[V0合并后记录](v0-postmerge/README.md)，不代替V1。

## 决策与授权

| 项目 | 负责人决定 / 当前执行边界 |
| --- | --- |
| V1范围 | 全Ready子入口/CSS/Resolver/四方漂移、开发构建诊断、迁移表/codemod、数值/兼容/类型/浏览器验收。已完成本地技术验收 |
| 旧能力断言 | 仅允许M1固定原四入口范围，M3把ATable否定改正向；[直接答复](owner-decisions-2026-11-17.json)。55份其余保护源码未改，包括两试点业务；[本轮核对](css-closure/selector-fix/verification.json) |
| 对象身份/提示 | 保留同一对象；负责人允许改为开发构建诊断，已实现opt-in Vite插件，生产禁用；[验证](migration-tooling/README.md) |
| S1 | **负责人明确不批准**，不执行、不重新请求；[原决定](owner-a2-3-clarification-2026-11-17.md) |
| A2-3澄清 | **负责人决定，不是代理放宽预算**；[预算澄清](owner-a2-3-clarification-2026-11-17.md)、[分类确认及追加限制](owner-classification-confirmation-2026-11-17.md)，详见下节 |
| peer | 按[单独授权](owner-peer-versions-2026-11-17.md)：AI源码workspace:^1.4.0，出包^1.4.0；release-contract/必要锁记录同步；Vue peer/DND范围不改 |
| 本地版本 | core1.4.0 / AI1.2.0 / DND1.1.0，仅本地组合验收；CHANGELOG明确AI1.2需core≥1.4；[真实pack/旧消费/strict](peer-version-combination/README.md) |
| Workbench初测纠错 | [负责人仅授权](owner-workbench-baseline-correction-2026-11-17.md)两路径纠正为54,212 B并重算依赖占比；其余63条预算数据不变；54,109 B与exit1保留为[无效初测历史](css-closure/selector-fix/README.md)；此后严格不回升 |
| PR | 未授权、未开；已提交包含 12 个复合入口最终门禁及数值的本地差异摘要，等待单独授权 |
| 合并 / Pages | V1未授权、未执行 |
| npm published / tag | 未授权、未执行 |
| 用户验收 | 缺失；不以分类/版本确认代替用户验收 |

## A2-3现行执行口径（负责人直接决定）

1. 确认12复合/53叶子、Icon/Skeleton/Tooltip辅助依赖与同族聚合边界、复合预算分栏；[65条已确认分类](classification/approved.json)。
2. 53叶子继续组件≤full25%、theme≤5%、合计≤30%，任何超线仍停止。12复合**先测同一25%/30%线**，通过者继续硬门禁；Modal在M1验收，不能降低。8个已通过复合锁定，合计61条叶子硬门禁。
3. 仅完整实测超叶子线的复合入口才能适用精确并集/不回升：CSS等于自身+声明依赖样式并集，声明外选择器0；记录闭包及各依赖大小/占比为后续不得回升基线。该栏不套25%/30%，theme自身5%仍执行。AIForm/Agent/Workbench两路径共4项符合超线前提，Workbench仅按本次限定授权纠正初测，当前门禁通过。**今后任何复合入口基线都须先通过独立完整性审查才算冻结**；本轮12项证明见[冻结审查](css-integrity/freeze-review.json)。
4. JS两类均不变：gzip<full Plugin，相对root named增量≤max(512 B,1%)。AIForm只允许13个字段控件族及声明传递依赖，106项越界必须归零。13字段、对象身份、props/events/expose、两个试点业务源码保持。
5. 每个复合入口最终门禁和实测值写入evidence/V1，开PR前摘要逐条列出；当前[12项完整测量/门禁表](composite-css-gates.md)记录有效基线与实测；全部通过适用门禁。
6. 恢复实现与peer先审停止点已分别收到答复；peer/本地版本授权按上表执行，未扩大为PR/合并/Pages/npm/tag授权。

AIForm精确公开导入与external已实现，旧106越界变0；[原局部探针](aiform-precise-imports/README.md)及[本轮65入口图快照](integration-checks/README.md)分别保存，旧版本/旧错误不追改。原CSS100,048 B/49.649%、压缩49.820%和exit1仍为[历史测量](aiform-budget/README.md)，不是新规则通过证据。

## 本轮发现、负责人纠错授权与独立冻结审查

独立源选择器审查发现：共享拆分器与旧验证共用过滤规则，只识别选择器开头AI类，漏掉Workbench已存在的DND→AI时间线末项规则。代码修复保留该103 B规则；表/fixture等声明外上下文仍排除。两个别名实际CSS54,212 B、相同摘要，其他63条与初测逐字节相同；full分母201,510 B/theme1,767 B不变。967条声明内源选择器核对缺失0。原54,109 B不完整，初测exit0已不能证明完整闭包。

首次停止时保持原基线，真实门禁exit1；[复现命令、前后数值与无效初测备份](css-closure/selector-fix/README.md)全部保留。负责人随后仅授权两路径纠正为54,212 B并重算依赖占比，追加所有复合基线须先独立完整性审查才冻结；[直接决定](owner-workbench-baseline-correction-2026-11-17.md)。本轮审查模块不导入拆分器或其闭包/过滤函数，独立核对源AST/声明并集/任意位置类名/顺序/上下文/重复，真实tarball65项及12复合全部通过后才冻结；其余63条预算数据深度相等。当前65入口CSS/JS/图/身份/代表SSR全部通过，[有效证明](css-integrity/README.md)。P1-V1-001 已关闭。独立完整性审查覆盖修复后的规则，两个 Workbench 子入口通过纠错后的不回升门禁。

## 一张验收表（A2-7）

| 项目 | 分项状态 | 证据 | SHA / 时间 | 责任人 |
| --- | --- | --- | --- | --- |
| G1设计 | A2生效；分类/预算追加限制及有限基线纠错已确认；所有复合冻结前须独立审查；S1拒绝 | [负责人确认](owner-classification-confirmation-2026-11-17.md)、[无效初测历史](css-closure/selector-fix/README.md) | 2026-11-17 | wzfdhr |
| G2代码 | Local 通过。65 个入口和样式、81 个 Resolver 名称、清单漂移检查、AIForm/Workbench 精确导入、开发诊断、迁移指南和 codemod 均已实现 | [入口覆盖](entry-coverage.json)、[差异摘要](diff-summary.md) | 运行时代码 `f20bc49`，浏览器候选 `5b80815` | Codex |
| G3自动检查 | Local 通过。65/65 包入口检查、20 条契约测试、旧消费、两试点、strict/SSR/hydration、构建确定性、覆盖率 86.44%、五浏览器 868 通过 / 131 跳过 / 0 失败 / 0 flaky。41 条静态跳过登记一致 | [命令与退出码](checks/results.json)、[完整复验按项目统计](acceptance/final-full/summary.json)、[证据核对](acceptance/provenance.json) | `5b80815` 与同一组三包摘要 | Codex |
| G4视觉 | Local 通过。AIForm 13 字段与 Workbench 在三个浏览器引擎、两套视口的 full/scoped 截图逐字节相同，代表性交互无报错 | [12 场景与截图](acceptance/visual/results.json) | `f20bc49` 三包 | Codex 观察 |
| G5包 | npm pack 通过。core 1.4.0、AI 1.2.0、DND 1.1.0。AI pack 的 core peer 为 `^1.4.0` | [准确组合](peer-version-combination/README.md)、[当前包摘要](acceptance/provenance.json) | 本地三包 | Codex |
| G6 PR / 合并 | PR 未开，Merged 否 | [开 PR 前差异摘要](diff-summary.md)，推送与开 PR 待单独授权 | 缺失 | wzfdhr |
| G7主线 CI / Pages | Main CI 缺失，V1 Pages 未部署 | [V0 回执](v0-postmerge/README.md)仅涵盖 V0 合并 SHA | 缺失 | CI |
| G8用户验收 | 缺失，六项任务等待负责人操作与证据 | [G8 任务清单](user-tasks.md) | 缺失 | wzfdhr |
| npm published | V1 未发布，未打 tag | 公开 `latest` 为 core 1.3.0、AI 1.1.0、DND 1.1.0 | 本地核验 | N/A |

## 本地候选缺陷审计

| 记录 | 处理及证据 |
| --- | --- |
| P1-V1-001，Workbench CSS 初测闭包缺规则 | 已关闭。补回跨 DND/AI 规则，保留初测 54,109 B 及失败记录，按授权纠正两个路径至 54,212 B。独立审查与实际包不回升门禁通过。[审查回执](css-integrity/README.md) |
| V1 首轮 E2E 的 4 处失败 | 已关闭。原因是文档工具栏延迟插入导致交互提前，Button hover、Combobox、Select virtual 测试各加入就绪等待。原断言与超时保留。复验同一 999 项，逐项核对仍跳过相同 131 项，原 4 个失败用例均通过。[首轮失败](acceptance/first-full/summary.json)、[复验](acceptance/final-full/summary.json) |

本地已验证范围内未解决 P0 = 0、P1 = 0。这个结论覆盖实际 tarball、旧消费、两试点、布局回归与本地浏览器项目。PR 审查、远端 CI 和 G8 尚无本候选证据。

## 当前还差什么 / 需要决定什么

请审阅[开 PR 前差异摘要](diff-summary.md)，决定是否授权推送 V1 分支并创建草稿 PR 供 CI 审查。负责人操作记录按 [G8 清单](user-tasks.md)逐项提交。合并及 Pages、发布 npm、打 tag 均须独立授权。
