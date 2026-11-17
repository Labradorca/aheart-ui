# 合入前后均准确的生效条件文案复核

源提交：`83204817713e34bb4dbdf8fcb2102c80c40e606b`。最终文案写明“A2 自 PR #51 合入 master 起生效，合入前仍以 A1 为准”，V0 标为“v2 Go 已确认”。这样部署后不会继续把已生效修订标为“待合入”；V1 未启动状态保持真实。

文档构建和相关 16 项脚本均 exit 0，见 [检查记录](../checks/README.md)。在 `corepack pnpm --dir docs preview --host 127.0.0.1 --port 50590 --strictPort` 的生产预览上，以 Playwright Chromium 自动读取 1185×825 与 390×825 视口，均有 9 个阶段、无页面错误、无横向溢出；原始结果、浏览器版本和 URL 见 [results.json](results.json)，[退出码](results.exit-code) 为 0。

| 画面 | 截图 |
| --- | --- |
| 宽视口生效条件 | [1185.png](1185.png) |
| 窄视口生效条件 | [390.png](390.png) |
| 窄视口 v2 Go 与 V1 未启动 | [go.png](go.png) |

这是最终短文案的自动化运行检查，截图经代理查看；不称作人工用户验收。此前独立 Chrome 的 [宽窄实际页面观察](../roadmap-approved/README.md) 和 [早期 CSS zoom 限制](../roadmap-after-pr50/README.md) 保留原始时间与源 SHA。未声称修复 CSS zoom 限制或通过真机/原生缩放测试。源码与截图 hash 见 [verification.json](verification.json)。
