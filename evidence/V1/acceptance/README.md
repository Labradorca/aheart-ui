# V1 本地技术验收证据

准确本地组合core1.4.0 / AI1.2.0 / DND1.1.0；未发布。Workbench有限纠错已按负责人决定执行，[独立完整性审查/有效冻结基线](../css-integrity/README.md)。

| 分项 | 当前结果 | 证据 |
| --- | --- | --- |
| 65入口样式/JS/模块边界 | 65/65/65通过，13字段SSR、props/events与对象身份不变；固定M1数值引擎 | [当前结果](../css-integrity/validated/results.json)、[13字段SSR输出](../css-integrity/validated/identity-ssr.log) |
| 旧M1/M3消费 | 新组合均exit0；57份保护源码仅前次已授权两处过时断言不同 | [M1](budgets/m1-results.json)、[M3](budgets/m3-results.json)、[命令/退出码](../checks/results.json) |
| 迁移工具 | 同一组最终 tarball，开发诊断 4 条，生产 0 条，codemod、CJS 对象身份、插件严格类型通过 | [当前回执](migration-current.json) |
| strict | 全出包声明skipLibCheck:false，Vue3.5.38/3.5.44通过 | [结果](budgets/strict-results.json) |
| 两试点不改业务源码 | legacy完整原源码；三个引擎×两试点×桌面/移动视口共12场景通过；strict/build/SSR-hydration/操作/axe零错误 | [汇总](partial-summary.json)、[Chromium](pilots/chromium/results.json)、[Firefox](pilots/firefox/results.json)、[WebKit](pilots/webkit/results.json) |
| 按需与完整样式真实页面 | AIForm13类字段+Workbench，3引擎×2视口，6组full/scoped截图逐字节一致；暴露方法、模型更新/reset、末项连线均通过 | [12场景结果及截图](visual/results.json) |
| R1覆盖率 | 86.44%≥80%；每个清单文件均达标 | [命令输出](coverage-r1.txt)、[exit0](coverage-r1.exit-code) |
| 脚本测试 | 当前全部根脚本测试exit0，新独立审查/契约/codemod20例通过；CI配置追加检查单独通过 | [完整记录](../checks/results.json)、[CI配置](ci-config.txt) |
| 构建确定性 | pre/post generated检查、连续两次build和全部摘要相同，exit0 | [完整输出](../checks/determinism.txt) |
| 五浏览器全量 | 最终 868 通过、131 跳过、0 失败、0 flaky。和首轮逐项对比，测试及跳过身份一致，原 4 个失败项均通过 | [最终五项目回执](final-full/summary.json)、[完整 JSON 压缩归档](final-full/results.json.gz)、[日志](e2e-five-projects-r2.txt)、[首轮回执](first-full/summary.json) |
| 旧 root / FormList / D8 | 原脚本消费当前 tarball 通过 | [root](legacy-consumers/root-results.json)、[FormList](legacy-consumers/form-list-results.json)、[D8](legacy-consumers/d8-results.json) |
| 证据核对 | 包摘要一致，57 份保护文件仅两项已授权断言变更，V0 跳过登记 41 条逐字节一致 | [核对报告](provenance.json) |
| 用户验收 | 缺失，未代填；自动化和代理看图不等于负责人实际操作 | [已冻结6条真实任务](../user-tasks.md)，负责人结果栏留空；本机页面已提供，逐条附URL/截图/浏览器/视口/运行时代码SHA |

截图来自实际tarball渲染，不是生成图或静态替身；代理已查看Chromium1440/390两张按需页面，full/scoped逐字节一致的结论只针对该夹具和这些状态。原13字段视觉、完整页面与用户操作结论分开，不宣称所有交互状态已视觉验收。

首个pilot输出命令因缺父目录退出1，保留pilot-logs/attempt-01-output-parent-missing.txt；创建输出父目录后同一受保护runner通过，不改试点源码。独立视觉夹具先误用completed状态，后修正为公开complete并增加1/2完成数断言；[历史说明](visual-attempts/README.md)。这些夹具问题不伪造为库失败或删除历史。
