# B3 AI 与 DND 解耦

AI 根入口保留其他 named 导出和不依赖 DND 的默认 Plugin。Workbench 从根导出和根 Plugin 注册移除。公开 `/agent-workbench`、`/workbench` 和 `/full` 均保留 Workbench 对象身份。旧 `es/index.js`、`lib/index.js` 兼容入口转发至 `/full`。DND 由必装依赖改为 `^1.1.0` 可选 peer。

在仓库外空目录仅安装 core 和 AI 两个实包，不安装 DND。AI 根和 Chat 子入口的 strict 类型、SSR、生产构建均通过，安装锁及模块图没有 DND。使用 Workbench 或 full 时，Node 的 ESM/CJS 错误均指出缺少 `@aheart-ui/dnd`，安装该 peer 后实包 M3 和 Workbench 模块图检查通过。[隔离验证](checks.json) · [旧路径](legacy-resolution.json)

两条 Workbench 路径继续使用发布前已记录的 1.x 根 named 基线 90,003 B。本阶段的根已移除对应导出，仍以同一 Vite/Vue 配置和原增量公式验证。其余入口直接对比现行根 named，65 个入口全部通过。[发布基线](../baseline/ai-workbench-root-named.json)
