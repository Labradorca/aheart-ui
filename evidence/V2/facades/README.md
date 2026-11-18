# B2 兼容 facade 与生成物退出 Git

core 和 AI 构建后在 `dist/compat/{es,lib}` 生成运行时、声明和样式兼容文件，旧逻辑路径经 exports 指向这些文件。核对公开 1.x 实包中的 1,484 条旧路径，1,446 条允许路径仍解析成功，38 条私有路径仍被拒绝。core 和 AI 的 128 个旧 CSS 路径与基线逐字节一致。DND 继续生成原 1.1.0 发布布局，实包摘要与已发布包一致。[解析和样式对比](legacy-resolution.json)

Git 不再跟踪三个包的 es/lib。文档 Vite 配置用 alias 消费源码与组件样式，无 package 输出也能构建。开发服务器的 Combobox、DND、AI 工作台三页使用 1440 × 1000 Chromium 加载，实际请求源码，浏览器错误为零。[开发服务器证据](docs-dev.json)

构建确定性、连续两次 pack 的字节比对、两个 Vue 版本的严格声明检查、M1 和 65 入口实包检查均通过。[检查回执](checks.json)
