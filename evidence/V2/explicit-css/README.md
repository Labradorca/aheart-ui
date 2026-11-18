# B4 显式样式回归契约

移除核心、AI、DND 源码运行时入口的 CSS import，包括共享浮层样式。样式构建独立生成完整和组件层级。Resolver 的 false 只返回 JS，css 只附组件和声明的依赖样式，禁止注入 theme、full 或全局 style。旧 `aheart-ui/style.css` 继续指向 full CSS。

65/65 入口的实包 JS-only 构建没有 CSS 资源。显式组件 CSS 被保留，按原 JS/CSS 预算和选择器门禁通过。full.css 分母仍为 201,510 B，theme 1,767 B。三引擎、桌面和移动的六对 full/scoped 截图逐字节一致。M3、旧路径、无 DND 的 AI、文档和脚本检查通过。[检查](checks.json)

本地 DND 构建与公开 1.1.0 的产物只在两份根 JS 的空 CSS 占位有字节差异。实包消费仍使用公开 DND 1.1.0。[DND 对比](dnd-artifact-diff.json)
