# Codemod 与回退演练

在原试点源码的独立副本运行 codemod。clean-consumer 只自动更换全量 CSS 路径，ai-review-gate 自动改写 Workbench 的 JS 和类型导入及全量样式。两个试点均执行 npm 安装、普通和严格类型、构建、SSR/hydration、Chromium 桌面及移动操作。再次运行没有差异或人工提示，指南外源代码改动为 0。manifest 与 lock 的版本切换属于指南列出的人工步骤。[迁移指南](../../../docs/guide/v2-migration.md) · [检查回执](checks.json)

公开 1.3 基线组合和最新 1.4 基线组合均在原试点通过。回退两个试点时恢复原源码及 1.4 基线锁，用 npm ci 重装。回退锁文件 SHA-256、已解析 URL 和 SRI 与基线一致。

两个必需试点的交互状态仅存在于页面内存。另用现有 muxu-todo 在同一浏览器源中写入持久任务，切到本地 V2 包后校验并修改状态，回到公开 1.4.0 后确认跨版本的新增和已完成状态、删除交互及锁文件原摘要。此轮包为版本字段改为 alpha 前的本地实现，最终验收使用实际 alpha 包复跑。D8 与 FormList 的消费检查同样通过。

最终 `2.0.0-alpha.0` 实包复验覆盖两试点和三个浏览器引擎。两试点用原锁文件回退 1.3.0 及 1.4.0。原始业务源码摘要、锁文件字节、公开 registry URL 与 SRI 一致。持久 Todo 在两条回退路径中均保留新增任务和完成状态。[1.3 回退](../alpha/rollback-1.3.json) · [1.3 原锁文件](../baseline/1.3.0/) · [1.4 回退](../alpha/checks.json)
