# B1 核心根入口与 full 分离

在 B1 的本地包中，ESM 和 CommonJS 根入口相比公开 1.4.0 只移除了 default。原 named 导出均保留。显式 `aheart-ui/full` 仍导出同一 Plugin，旧 `aheart-ui/es/index.js` 和 `aheart-ui/lib/index.js` 的兼容入口转发到它。两种旧深路径的运行时导出名与 1.4.0 相同，严格类型也通过。文档站注册改用显式 full。[公开形状对比](public-shape.json)

Button、Combobox、Modal、Select 从根做 named import 时，生产构建均未解析 full/Plugin，最终 bundle 未保留 Table、DatePicker、AI、DND。根仍导出 Table 和 DatePicker，因此打包器会解析它们的静态导出再摇掉未使用模块。组件子入口的声明依赖门禁仍检查完整解析图。

核心 build、文档 build 和实际 npm pack 均通过。实包 M1、V1 和两套 Vue 严格类型通过，V1 涵盖 65 条路径。完整命令和输出保存在本 worktree 的 `test-results/v2-root-split/`。[消费回执](consumers.json)
