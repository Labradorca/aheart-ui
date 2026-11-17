# TreeSelect E2E 选择目标修正

PR 候选 `2011892b3cb7cf97557e9a6b49a192a6c94f8528` 的 push 与 pull_request CI 均为 11/12 SUCCESS，完整 browser job 各有同样两个 Firefox 失败，804 passed、128 skipped。这里的 128 是该次运行的跳过数量，不是 41 条跳过登记口径，也没有新增跳过。

## 基线与根因

- 当前 master `287058d6395460913b8013c9201c196e9b36c2c9` 的 [主线 CI](https://github.com/Labradorca/aheart-ui/actions/runs/44028274954) 已在相同两处失败；不是把 PR CI 冒充新主线结果。见 [三个运行回执](ci-failures.json)、[基线失败](baseline-failure.txt)、[PR 失败](pr-failure.txt)、[push 失败](push-failure.txt)。
- `e2e/d4-tree-select-virtual.spec.ts`、Tree/TreeSelect 源码在初始发布基线 `735d3d33`、#50 后 master `287058d` 和本候选 `2011892` 之间没有差异；#50 改了文档布局、字体和可用宽度。原断言前的操作使用整个 treeitem 的 `click()`，其中心可能落在嵌套的重试按钮上。
- [CI trace 摘要](trace-excerpt.json) 的 `call@2169` 在 1280×720 视口点击行中心 `(511, 532)`；[点击前截图](ci-before-row-click.jpeg) 显示该点处于重试按钮。结合随后加载出 child、根节点仍未选中的失败截图，以及 `tree-node.vue` 中重试按钮的 `@click.stop`，判断该操作实际触发重试而非选择。原始 trace 归档在上述 CI artifact，摘要保留下载内容 SHA-256。
- 本机 macOS 的原版两个 Firefox 用例能通过，因此未把本机通过写成 Linux 复现；CI 的字体/几何差异是判定依据，也不靠盲目重跑求绿。

## 修改与验证

日志摘录只去除行尾空白，前后摘要在 [规范化记录](log-normalization.json)；原始完整日志仍在对应 CI 运行中。

两个“选择根节点”操作改为点击 `.aheart-tree__title`，仍通过真实鼠标事件冒泡触发选择。关闭、重新打开、选中、键盘重试、attempts=2/aborts=0、焦点、child 选择及 4.5 对比度断言全部保留；第二个用例另增加关闭断言。没有改运行时代码、CSS、跳过登记、重试次数、超时或预算。

Local：两个用例在五个配置项目共 **10/10 passed**，命令、环境、退出码 0 和输出见 [local-check.json](local-check.json)、[输出](local-after.txt)。这属于 macOS 本地浏览器结果，不代表 Linux CI 已通过，也不代表真机或用户验收。

PR：修复后的准确 head 与完整 CI 以 [PR #51](https://github.com/Labradorca/aheart-ui/pull/51) 为准；上述失败记录永久保留为修复前证据。Merged：否；Main CI：本候选缺失；Pages：未部署；npm pack：修复前两个 consumer job 已通过，不推导修复后结果；npm published：未发布；用户验收：未代填。
