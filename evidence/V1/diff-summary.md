# V1 本地停止点：peer完成，Workbench初测完整性纠错待决定

基线`b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；独立分支`codex/v1.4-entries`，最新已提交版本授权检查点`4e494f9`，本轮差异另存本地检查点。**当前不可开PR/合并；原54,109 B基线未改，CSS门禁exit1。**

已按负责人单独授权把core/AI本地候选设为1.4.0/1.2.0，DND仍1.1.0；AI peer源码workspace:^1.4.0、出包^1.4.0，release-contract/一条锁记录/CHANGELOG同步。真实版本组合通过旧M1/M3消费和全部声明严格检查，见[版本组合证据](peer-version-combination/README.md)。

本轮实现与分项证据：

- 65逻辑子入口/CSS（base45/AI16/DND4）、81名称Resolver、四方漂移；跨包CSS按声明依赖去重，Workbench运行时也改为精确公开导入。
- 53叶子、12复合按负责人边界；61项硬叶子门禁、4项初测超线的并集/不回升；AIForm13控件族、原106越界模块归零，身份及业务契约保留。
- B1/B3 opt-in开发构建诊断、生产静默，迁移表、AST/SFC codemod和真实工具消费验证。见[工具证据](migration-tooling/README.md)。
- 全量unit、strict、65入口JS/module图/身份/代表SSR、docs/quality-matrix/文档构建曾分项exit0，见[快照](integration-checks/README.md)；随后独立审查发现漏规则，**此前CSS exit0不算完整闭包通过**。

## 当前预算停止点

拆分器只检查选择器起始AI类名，漏掉已有`.aheart-dnd-sortable-item:last-child .aheart-ai-workbench__timeline-item::before`规则。补齐后Workbench及其别名均54,212 B，比不完整初测54,109 B多103 B；不回升门禁实际exit1。其余63项逐字节不变，full和三包源样式与V0一致。未增加新样式、未改预算或跳组件。构建/pack和8契约测试exit0，独立967条源选择器缺失0；[完整证据](css-closure/selector-fix/README.md)。

需要负责人决定：是否允许纠正两个Workbench路径这次不完整首次测量为54,212 B并重算依赖占比，再自完整值执行不回升？原初测/失败保留；其余基线、所有比例/JS门禁、依赖集合不变。当前P1-V1-001开放。未获该决定前停止后续实现，不再请求S1。

## 12个复合入口实测（停止点，非最终通过）

| 复合入口 | 当前完整组件CSS B / full占比 | theme+组件 B / 占比 | 25% / 30%实测 | 适用门禁 / 当前状态 |
| --- | --- | --- | --- | --- |
| aheart-ui/dropdown | 18,689 / 9.274% | 20,456 / 10.151% | Pass / Pass | 25%/30%硬门禁 |
| aheart-ui/tree-select | 8,867 / 4.400% | 10,634 / 5.277% | Pass / Pass | 25%/30%硬门禁 |
| aheart-ui/table | 15,233 / 7.559% | 17,000 / 8.436% | Pass / Pass | 25%/30%硬门禁 |
| aheart-ui/modal | 16,305 / 8.091% | 18,072 / 8.968% | Pass / Pass | 25%/30%硬门禁；M1保留 |
| aheart-ui/popconfirm | 12,034 / 5.972% | 13,801 / 6.849% | Pass / Pass | 25%/30%硬门禁 |
| @aheart-ui/ai/bubble | 5,039 / 2.501% | 6,806 / 3.377% | Pass / Pass | 25%/30%硬门禁 |
| @aheart-ui/ai/form | 99,853 / 49.552% | 101,620 / 50.429% | Fail / Fail | 精确并集 + 不回升 |
| @aheart-ui/ai/chat-panel | 13,095 / 6.498% | 14,862 / 7.375% | Pass / Pass | 25%/30%硬门禁 |
| @aheart-ui/ai/agent-workbench | 54,212 / 26.903% | 55,979 / 27.780% | Fail / Pass | 精确并集 + 不回升；当前不回升失败 |
| @aheart-ui/ai/chat | 13,216 / 6.558% | 14,983 / 7.435% | Pass / Pass | 25%/30%硬门禁 |
| @aheart-ui/ai/agent | 100,927 / 50.085% | 102,694 / 50.962% | Fail / Fail | 精确并集 + 不回升 |
| @aheart-ui/ai/workbench | 54,212 / 26.903% | 55,979 / 27.780% | Fail / Pass | 精确并集 + 不回升；当前不回升失败 |

full201,510 B/theme1,767 B；[逐项门禁说明](composite-css-gates.md)。开PR前须再次给出最终有效实测表，本页不是开PR授权请求。

## 还差什么

解决本停止点后，需重新冻结完整初始基线、验证最终tarball；两试点新组合运行、完整hydration/五浏览器、R1覆盖率、构建确定性、视觉/缺陷审计未完成；P0/P1未声明为0。55份保护文件（含两试点源码）逐字节未改，仅前次批准的两处旧能力断言不同。用户验收缺失，未代填。

| 状态 | V1 |
| --- | --- |
| Local | 已有实现与分项验证；Workbench CSS门禁exit1，暂停 |
| PR | 未开，未授权 |
| Merged | 否 |
| Main CI | 本候选缺失 |
| Pages | 本候选未部署 |
| npm pack | core1.4.0/AI1.2.0/DND1.1.0本地三包成功 |
| npm published | 本轮未发布 |
| 用户验收 | 缺失，未代填 |
