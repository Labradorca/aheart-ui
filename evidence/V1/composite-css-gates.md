# 复合入口 CSS 门禁与本轮完整测量

**当前停止：Workbench两路径的首次记录漏了103 B已有规则，修复后不回升门禁失败。原基线未改，待负责人决定。** [根因、实际tarball和命令](css-closure/selector-fix/README.md)。本表是停止点实测，不是可开PR/完整V1 Pass。

来源：[负责人分类确认和追加限制](owner-classification-confirmation-2026-11-17.md)。12复合先测25%/30%；8项达标者继续硬门禁，Modal保留M1。4项超线者执行精确并集/不回升；53叶子继续原门槛，合计61项叶子硬门禁。full201,510 B、theme1,767 B（0.877%）；所有入口theme≤5%不变，full与V0字节摘要相同。

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

Workbench最初记录54,109 B（26.852%），修复后54,212 B（26.903%），两个路径指向同一物理CSS。原[初测快照](css-closure/initial/results.json)、[原冻结候选](css-baselines.json)及[字节备份](css-closure/selector-fix/unchanged-initial-baseline.json)保留，尚未改为新值。不以删除规则、压缩分母、调整比例或跳组件消除失败。

各声明依赖原始字节和占比记录于冻结候选；补齐后的实际字节/占比见[独立产物核对](css-closure/selector-fix/verification.json)。占比包含重叠，不能相加当作互斥贡献。[源片段贡献](css-closure/source-parts.json)仍为纠错前历史，Workbench片段少103 B，不能代替当前完整产物。当前Resolver仍额外声明DND sortable sideEffect，未隐藏重复来源。

门禁拒绝闭包增长、任一依赖字节/占比回升或声明集合变化；原子规则检查缺失/额外选择器及声明、上下文、important、重复和顺序。--init-baselines只允许文件不存在时创建，不能重跑重设。独立审查另从源选择器任意类名位置核对，避免生成器和验证器共享遗漏；修复后967条缺失0，fixture4条排除。

开PR前差异摘要必须列出全部12项的最终有效基线和同条件实测值。JS两类均gzip<full Plugin、相对root named增量≤max(512 B,1%)，固定M1 Vite5.0.12/Vue3.5.44；工具SDK类型测试的Vite5.4.21不用于预算。
