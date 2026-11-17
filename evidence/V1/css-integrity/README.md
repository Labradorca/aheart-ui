# 独立完整性审查、有限纠错与冻结门禁

来源：[负责人限定授权](../owner-workbench-baseline-correction-2026-11-17.md)。本轮**仅**将两个Workbench路径的首次预算数据纠正为54,212 B、重算依赖占比，其余63条预算数据与原记录深度相等。54,109 B及原失败保留为[无效初测历史](../css-closure/selector-fix/README.md)。根因：拆分器漏掉**非开头位置的类名选择器**，遗漏现有DND→AI时间线末项规则；不是新增样式或代理自行放宽预算。

## 冻结前独立审查

[scripts/v1-css-integrity.mjs](../../../scripts/v1-css-integrity.mjs)不导入拆分器/其闭包与过滤函数，独立遍历声明依赖和源CSS AST，从任意类名位置识别所属族，保留声明顺序、值、important、media等上下文及重复次数。检查完整声明并集的缺失、额外规则及顺序，fixture上下文明确排除。源码身份/摘要和公开tarball CSS摘要均记入[冻结前完整审查](freeze-review.json)，65项全通过，12复合均已审查；之后才由[限定纠错脚本](freeze-reviewed-baselines.mjs)写有效基线。

该脚本仅能从保留的无效初测快照执行一次；不提供重设/扩大其他预算开关。[回执](freeze-review.txt)、[exit0](freeze-review.exit-code)。[有效基线](../css-baselines.json)内嵌12复合审查证明并引用完整报告。

消费门禁现在同时要求：

1. 任何复合冻结基线都有独立、通过、且字节/样式摘要匹配该首次基线的证明；缺失即拒绝。
2. 每次消费当前真实tarball都重新独立审查65入口，不能只信历史证明或生成器的自检。
3. 仍执行全部原数值、冻结依赖集合和不回升门禁；初次创建基线也须先全部审查通过才写出，已存在时拒绝重设。

测试覆盖跨命名空间选择器不在首位、缺失、额外、声明值、media、顺序、重复以及无证明/证明摘要不匹配时拒绝冻结。并保留真实基线+1 B必失败测试，见[契约测试](../checks/v1-contract-tests.txt)。本轮20条脚本用例通过。

## 当前消费结果

[当前结果](validated/results.json)和[全部模块图字典（gzip）](validated/module-graphs.json.gz)：真实core1.4.0 / AI1.2.0 / DND1.1.0 tarball独立安装，65/65样式和65/65 JS图/预算通过；AIForm旧106越界为0，基础root barrel未解析；ESM/CJS/root/full对象身份、代表SSR通过。[身份/SSR输出](validated/identity-ssr.log)。数值引擎固定Vite5.0.12 / Vue3.5.44，未改比例、分母、JS预算或依赖集合。

12复合逐项值和执行分栏见[门禁表](../composite-css-gates.md)。全部12项先测叶子线；8项（含Modal）继续硬叶子门禁，4项超线者按并集/不回升。theme5%仍对所有入口保留；Workbench的两路径同一物理CSS，不合并逻辑覆盖数。

全V1仍须完成两试点、hydration/五浏览器、覆盖率/确定性及最终缺陷审计；此页不代替用户验收或授权PR/合并/Pages/npm/tag。
