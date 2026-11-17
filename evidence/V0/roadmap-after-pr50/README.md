# #50 合入后的路线图应用与运行检查

2026-11-17。初始 V0 基线是 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7`；[PR #50](https://github.com/Labradorca/aheart-ui/pull/50) 于 `2026-11-17T06:02:23Z` 合入 `287058d6395460913b8013c9201c196e9b36c2c9`。负责人已选择“等 #50 合入后应用”，该条件解除后，本分支 rebase 到该合并提交，保留其布局和样式，仅修改路线图文案与阶段数据。准确远端状态、版本和文件 hash 见 [verification.json](verification.json)。

路线图源码提交：`17e72568e6197988fcea0df36c76c1c99e5a8bb2`；文件为 [V2Roadmap.vue](../../../docs/.vitepress/theme/V2Roadmap.vue)。本轮是审批前的历史运行快照；后续批准状态文案与新运行证据另行记录。M2 显示 1.3.0，M3 显示 AI/DND 1.1.0；M4 由 V0–V4 替换；页首与 V 阶段均保留 A2 未批准和未启动说明。M2/M3 公开交付与用户验收缺失分开。

## 运行证据

- 使用 `corepack pnpm docs:build` 生成生产站点；`corepack pnpm --dir docs preview --host 127.0.0.1 --port 61763 --strictPort` 服务本地结果。URL：`http://127.0.0.1:61763/roadmap/v2`。命令、退出码与执行基线在 [检查记录](../checks/README.md) 和 [results.json](../checks/results.json)。这是 Local，不是 Pages。
- 原生 Computer Use 的 `cua.getState()` 连续两次连接超时，未执行输入；结束其控制后，改用 `cua-driver 0.35.2` 启动独立 Google Chrome，后台检查页面并滚动。未访问个人登录配置；检查后已结束该 session。
- 实测宽视口 **1185×825**（窗口 1200×912），窄视口 **485×848**（窗口 500×935）。窗口高度由系统限制，以实际回读结果为准；不是物理手机。原始语义观察见 [browser-observations.json](browser-observations.json)，截图时间和 hash 见 [verification.json](verification.json)。
- 查看了页首、M2/M3、V0/V1 和后段 V3/V4。发布标签、未批准提示和长文案在上述视口可读，既有布局保留。原始截图保留浏览器地址栏：

| 画面 | 原始截图 |
| --- | --- |
| 宽视口页首 | [roadmap-wide.png](roadmap-wide.png) |
| 宽视口阶段 | [roadmap-wide-stages.png](roadmap-wide-stages.png) |
| 窄视口页首 | [roadmap-narrow.png](roadmap-narrow.png) |
| 窄视口 M2/M3/V0 | [roadmap-narrow-stages.png](roadmap-narrow-stages.png) |
| 窄视口 V3/V4 | [roadmap-narrow-final.png](roadmap-narrow-final.png) |

这是代理运行观察，没有代填用户任务或 G8 签字。未声称五浏览器验收、真机或全仓运行时通过。

## 检查与补充探针的边界

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 新主线 docs/quality-matrix/入口文档/跳过登记脚本 | 16/16，exit 0 | [脚本输出](../checks/docs-and-matrix.txt) |
| 生产文档构建 | exit 0；未放宽阈值 | [构建输出](../checks/docs-build.txt) |
| UI 机械检测 | 无发现 `[]`，exit 0；不等于人工验收 | `impeccable detect --json --changed`；[输出](design-detector.json) |
| 补充布局读取，100% | 1185、485、390 宽度均读到 9 阶段，无页面错误，无横向溢出 | [layout-observations.json](layout-observations.json) |
| 补充 CSS zoom 200% | 探针 exit **1**：485/390 宽度出现溢出；1185 下未报整页横向溢出 | [命令](layout-command.json)、[退出码](layout-observations.exit-code)；不记为通过 |

CSS zoom 的诊断：当前 VitePress `body` 本来有 `min-width: 320px`（`node_modules/vitepress/dist/client/theme-default/styles/base.css:34`）。390 宽度下，CSS zoom 2 后 body 的布局宽度被限制为 320、渲染宽度为 640；media query 仍按 390 判定。数据见 [css-zoom-diagnosis.json](css-zoom-diagnosis.json)。该探针不等同于浏览器原生缩放，不能据此宣称原生 200% 缩放验收通过。本轮没有扩大范围改动 #50 的全局最小宽度或响应式设计。

## 当前出口

#50 的同文件等待条件已解除，路线图本地应用已完成。负责人其后单独授权创建 [V0 草稿 PR #51](https://github.com/Labradorca/aheart-ui/pull/51)。A2 批准与负责人 v2 Go 已在后续直接回复中收到；合并及自动 Pages 部署授权仍缺失；V0 不标 Pass，V1 不启动。完整审阅入口见 [差异摘要](../diff-summary.md)。
