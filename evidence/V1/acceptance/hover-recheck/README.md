# Button hover 用例前置布局竞态

首轮全量999用例运行时，同一hover主题用例在desktop/mobile读到普通态颜色，原颜色断言失败；[首轮日志](../e2e-five-projects.txt)、[原用例与desktop trace](../hover-first-attempt/)保留，不能把首轮记为exit0。

根因是docs/.vitepress/theme/DocInteractions.vue在mounted后80 ms插入工具栏并隐藏代码块，导致按钮在hover后移位，真实指针不再命中；不是Button样式回归。Button源码/full.css均与V0一致。真实事件探针记录pointer坐标、scroll、几何和: hover丢失，见[原探针](../button-hover-events-probe.json)；只等hydration/js/fonts仍9/12成功，不能作为修复。等待真实“查看代码”工具栏出现后，独立12/12探针通过，见[最终前置探针](../button-hover-toolbar-ready-probe.json)。

e2e/button-hover-contrast.spec.ts的两项用例现在先等待.docs-demo-toolbar可见，再移动指针；原主题色、边框色、对比度断言、超时及用例数量都不变，不加重试、不加固定sleep、不动组件/预算。受保护的消费脚本与试点源码均未改。

针对原失败主题用例，`pnpm exec playwright test --config=test-results/v1-hover-recheck.config.ts --grep 'hover text token' --repeat-each=20 --workers=1`在已运行同一生产文档站上执行40次：desktop20/mobile20全部通过，见[结果](results.json)、[原始输出](../button-hover-recheck.txt)、[退出码0](exit-code)。独立配置只缩小此次复核范围，未修改全量正式配置或跳过登记表。首轮全量仍需等其余项目结束并分别归档。
