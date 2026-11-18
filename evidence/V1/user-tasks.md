# V1 G8 自用任务清单

A2-7要求5–8条真实操作；本轮冻结下列6条。**下面自动化证据仅用于复测定位；负责人结果和附件以本人提交为准，不因“确认”或代理测试通过自动转为G8 Pass。** 本地候选core1.4.0 / AI1.2.0 / DND1.1.0，非公开发布。

运行时代码SHA：`f20bc4986510d3cd7a4c8dd55439c297b6ad45df`（本轮后续只改预算审查/验收脚本与文档，三包运行时代码及已pack产物字节不变）。准确tarball SHA见[实际页面结果](acceptance/visual/results.json)及[试点](acceptance/pilots/chromium/results.json)。所有截图/视频须附实际URL、浏览器版本、视口、该运行时SHA和本轮最终验收提交SHA；若换包或改源码须另记。

由`node evidence/V1/serve-review.mjs`提供本机预览：clean-consumer为http://127.0.0.1:5191/ssr.html，ai-review-gate为http://127.0.0.1:5192/ssr.html，按需比较页为http://127.0.0.1:5193/scoped.html（将scoped换为full可看完整样式参照）。这些是新建验证应用，不冒称既有业务采用；AI消息与批准只更新本地演示状态，不执行Git/发布操作。

| ID | 真实操作与预期 | 自动化/截图定位 | 负责人结果 | 负责人截图/录屏、URL、浏览器、视口、SHA |
| --- | --- | --- | --- | --- |
| U1 | clean-consumer点击计数，Select选“紧凑”；计数为1，选中方式更新，页面无错误 | [Chromium结果](acceptance/pilots/chromium/clean-consumer/results.json)、[1440截图](acceptance/pilots/chromium/clean-consumer/browser-1440.png) |  |  |
| U2 | clean-consumer用Enter打开“组件检查”，Tab保持在弹窗内，Escape关闭并回到触发器；在同页iframe重复选择/关闭 | 同一结果内native Tab/iframe；[移动截图](acceptance/pilots/chromium/clean-consumer/browser-390.png) |  |  |
| U3 | ai-review-gate核对两个勾选项、查看本地变更、返回；只有两项完成才可批准，批准后产生记录且不能重复批准 | [原业务源码兼容结果](acceptance/pilots/chromium/ai-review-gate/results.json)、[1440截图](acceptance/pilots/chromium/ai-review-gate/browser-1440.png) |  |  |
| U4 | ai-review-gate发送“如何检查这次修订？”，看到完整本地回复；任务“验证本地结果”上移。390px视口从“执行”打开抽屉，顺序一致，Escape可关闭 | [移动截图](acceptance/pilots/chromium/ai-review-gate/browser-390.png)、同一结果的chat/reorder/approval记录 |  |  |
| U5 | 打开按需比较页：核对AIForm全部13类字段，编辑文本/数字并操作Select/日期/时间控件；查看Workbench桌面和移动执行抽屉，最后一项没有多余连线；与full.html参照比较 | [13字段/暴露方法/模型更新与reset/全量按需对比](acceptance/visual/results.json)、[桌面](acceptance/visual/chromium-1440-scoped.png)、[移动](acceptance/visual/chromium-390-scoped.png)；六组逐字节相同只针对这些夹具状态 |  |  |
| U6 | 从工作区执行`node scripts/codemods/aheart-v2.mjs --dry-run test-results/v2-migration-consumer/before.js`，核对只把旧默认Plugin/Workbench/公开深路径移到指南目标，named组件保留；不改试点业务源码 | [迁移指南](../../docs/guide/v2-migration.md)、[真实工具消费结果](migration-tooling/validated/results.json)；默认dry-run不写文件 | 负责人报告通过（2026-11-17） | 本人操作附件待补，见下方回执 |

## 负责人回执（2026-11-17）

负责人在本线程回复「U6 通过 — 依据 dry-run 输出和 evidence/V1/migration-tooling/validated/results.json」。已核对 [所引用的自动化报告](migration-tooling/validated/results.json) 为通过。回复未附本人 dry-run 输出或操作记录，也未填写本次操作对应的候选 SHA。U1–U5 的状态和附件为模板占位，保留待验。G8 总结论等待本人证据。

最终G8结论：

负责人：

时间：

通过/失败任务及附件：

未完成项与决定：
