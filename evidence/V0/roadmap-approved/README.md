# A2 批准与 v2 Go 后的路线图复核

2026-11-17；源提交 `c70c5a53f045f8506d38533829e93c4ab5e52141`。负责人已在 [直接回复](../owner-decisions-2026-11-17.md) 中批准 A2 并选择 v2 Go。本轮是批准后、最终生效条件措辞前的运行快照；最终短文案复核见 [当前记录](../roadmap-effective/README.md)。本轮仅同步文案与决定记录，保留 #50 布局；合入 master 前仍按 A1，不把批准计划写成阶段已启动或 V0 已通过。

- `node evidence/V0/run-checks.mjs docs-and-matrix docs-build`：16 项脚本和文档生产构建均 exit 0，详见 [检查记录](../checks/README.md)。
- `corepack pnpm --dir docs preview --host 127.0.0.1 --port 65367 --strictPort` 服务生产结果；URL 为 `http://127.0.0.1:65367/roadmap/v2`。
- 延续已说明的原生 Computer Use 不可用回退，使用 cua-driver 0.35.2 的独立 Google Chrome，检查宽视口 **1200×822**、窄视口 **485×822**。准确返回的 viewport、原始语义和 source SHA 在 [browser-observations.json](browser-observations.json)；截图时间、hash 在 [verification.json](verification.json)。
- 实际查看了“已批准、待合入生效”、V0“已决定 Go · 待合入”以及 V1“已批准 · 未启动”。宽窄文案可读，未覆盖原布局；这是代理观察，未代填用户实际操作验收。session 已结束。
- UI 机械检测 `impeccable detect --json .vitepress/theme/V2Roadmap.vue` 为 `[]`，exit 0；不替代运行检查或用户验收。

| 画面 | 原始截图 |
| --- | --- |
| 宽视口批准说明 | [wide.png](wide.png) |
| 窄视口批准说明 | [narrow.png](narrow.png) |
| 窄视口 v2 Go 与 V1 未启动 | [go.png](go.png) |

前一轮 [审批前运行报告](../roadmap-after-pr50/README.md) 保留历史截图及 CSS zoom 探针的既有最小宽度限制。本轮不重复该失败探针，也不将它写成已通过。仍未声称物理手机、原生浏览器 200% 缩放、五浏览器或完整用户任务通过。

此后仍需最终 head 的 PR CI、明确的合并及 Pages 授权、合并后的主线与 Pages 证据。V1 等 V0 合入后另建分支。
