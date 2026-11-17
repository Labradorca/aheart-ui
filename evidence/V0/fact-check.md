# V0 事实核对 · 2026-11-17

基线：`735d3d33e0e5a770c5cb83f782dbe33016b4ada7`，由最新 `origin/master` 创建 `codex/v2-a2-v0`。worktree：`/Users/start/code/aheart-ui-wt/v2-a2-v0`。干净克隆：`/Users/start/code/aheart-ui-a2-base`。旧检出未修改，只读取并复制 A2；旧检出的 AppleDouble 索引错误没有带入新仓库。

只读复核命令为 `node evidence/V0/collect-facts.mjs`；完整参数数组、退出码、采集时间在 [facts.json](facts.json)，输出在 [facts.txt](checks/facts.txt)。GitHub 将旧仓库名 `wzfdhr/aheart-ui` 重定向为 `Labradorca/aheart-ui`，以下使用 API 返回的正式链接。远端状态是采集时快照，合并前须重新检查。

后续 [#50 协调复核](coordination-recheck-2026-11-17.md)：#50 head 已前进到 `5c83519b`，仍开放且有同文件冲突；41 条登记和 49 个 Ready 计数未变。下表的 `f6ec14f7` 保留为首次核对事实。

| 核对项 | 结果 | 证据/口径 |
| --- | --- | --- |
| npm latest | `aheart-ui@1.3.0`、`@aheart-ui/ai@1.1.0`、`@aheart-ui/dnd@1.1.0`；与草稿一致 | `npm view <包> version dist-tags dist.integrity gitHead --json --registry=https://registry.npmjs.org`；facts.json 的 npm |
| PR #43 | merged；SHA `9889ce995e647ee6b6868bd826a973be074691b0` | [PR](https://github.com/Labradorca/aheart-ui/pull/43)，API 时间 `2026-11-11T05:02:32Z` |
| PR #44 | merged；SHA `25d0d4babfee5782377c787ac187d9728a3635a4` | [PR](https://github.com/Labradorca/aheart-ui/pull/44)，API 时间 `2026-11-11T08:08:49Z` |
| PR #50 | open；head `f6ec14f76e56bf5d1a30e639ba7f016737047728` | [PR](https://github.com/Labradorca/aheart-ui/pull/50)；files 中有 `docs/.vitepress/theme/V2Roadmap.vue` |
| E2E 跳过登记 | **41 条调用点** | [登记表](../../docs/superpowers/evidence/d9-skip-ledger.json) 的 `sites.length`；不是一次运行的 skipped 数。源文件 hash 见 facts.json |
| Ready 文档条目 | **49**：base 45、AI 3、DND 1 | [组件目录](../../docs/.vitepress/data/components.ts)，用 `parseReadyComponentKeys` 解析；[质量矩阵](../../docs/.vitepress/data/quality-matrix.mjs) 按 package 分组 |
| 入口 manifest | base **4**、AI **16**、DND **4**，共 **24** 子路径 | [entries.json](../../packages/components/src/constant/entries.json)，经 [entries.mjs](../../packages/components/build/entries.mjs) 与共享 loader 消费；场景、别名和导出组件名不等于 Ready 条目 |
| v1.3.0 Release | 已发布，tag 指向基线 SHA | [Release](https://github.com/Labradorca/aheart-ui/releases/tag/v1.3.0)，API `published_at=2026-11-17T01:10:36Z`（纽约时间 11 月 16 日） |

## CI 与 Pages 的精确边界

| 源码 SHA | Main CI | Pages | 结论 |
| --- | --- | --- | --- |
| M2 `9889ce995e647ee6b6868bd826a973be074691b0` | [42963104012](https://github.com/Labradorca/aheart-ui/actions/runs/42963104012) success | [42966860141](https://github.com/Labradorca/aheart-ui/actions/runs/42966860141) success；deployment `7702690937` success | 同 SHA 的证据可查 |
| M3 `25d0d4babfee5782377c787ac187d9728a3635a4` | [42984728965](https://github.com/Labradorca/aheart-ui/actions/runs/42984728965) **cancelled**；browser job cancelled，其余 11 项 success | **缺失**：actions 与 github-pages deployments 均未查到同 SHA 成功记录 | 不记 G7 Pass |
| v1.3.0 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7` | [43912659909](https://github.com/Labradorca/aheart-ui/actions/runs/43912659909) push CI，12/12 success | [43920744949](https://github.com/Labradorca/aheart-ui/actions/runs/43920744949) success；deployment `7831655329` success | 是后续交付证据，不补写 M3 合并时的状态 |

当前 [Pages](https://labradorca.github.io/aheart-ui/) 是可变地址，不是历史部署快照。部署身份以 workflow SHA 与 deployment status 为准。

## 发布证据与源码审计

- 已下载 [release-evidence.json](upstream-release/release-evidence.json)、[QG5 记录](upstream-release/qg5-master-stability.json)、[SHA256SUMS](upstream-release/SHA256SUMS)。远端附件 URL、digest、大小在 facts.json，下载命令及退出码在 [检查记录](checks/README.md)。这是上游发布记录的副本，不是本轮重跑消费端。
- Release 明写 `acceptance: automated; no manual user operation invented`。自动化试点通过不构成人工 G8，M2/M3 用户验收均记录“缺失”。
- [source-audit.json](source-audit.json)：三包已跟踪的 es/lib 文件分别 1096、202、100；生成 JS 共 648、98、48 份，静态 import/require 扫描均为 0 个真实 `.css` 导入。基础包仍有 `.css.js` 空占位导入，源码 `.vue/.ts` 的 CSS import 也仍存在；不能声称源码本身已经无 CSS import。
- 第四项候选据此改成保持发布运行时 style-free 的回归契约；前三项仍须 major 切换。完整入口、依赖、产物证据见 [弃用表](../../docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md)。

## #50 同文件协调决定

负责人本轮明确选择：“先提交 V0 其余内容和路线图文案方案，待 #50 合入后再应用”。因此本分支不修改 `V2Roadmap.vue`，文案放在 [roadmap-copy.md](roadmap-copy.md)。这不是 V0 路线图任务完成；#50 合入后须在最新结构上应用、构建并检查实际页面，再更新 V0 状态。

四份 2026-09-08 原文和 A1 均保留原样；基线 hash 在 source-audit.json。A2 的批准框保持未选，V0 的“是否启动 v2”未代填。
