# Aheart UI v2 规范修订 A2（已批准，待合入生效）：v2 范围、路线与验收标准

> 状态：**wzfdhr 于 2026-11-17 批准，待合入 `master` 生效**。合入前仍以 A1 为准；本次批准不包含合并或自动 Pages 部署授权。见 [负责人决定](../../../evidence/V0/owner-decisions-2026-11-17.md)。
>
> 修订对象：[产品与技术总体方案](./2026-09-08-aheart-ui-product-and-technical-master-plan.md)、[技术 RFC](./2026-09-08-aheart-ui-v2-architecture-optimization-design.md)、[阶段验收标准](./2026-09-08-aheart-ui-v2-phase-acceptance-criteria.md)、[整体任务流程清单](./2026-09-08-aheart-ui-v2-task-flow-checklist.md)、[修订 A1](./2026-11-05-aheart-ui-v2-solo-scope-amendment.md)。
>
> 日期：2026-11-17。初始核对基线：`735d3d33`；当前实施基线：`287058d`；公开 npm `aheart-ui@1.3.0`、`@aheart-ui/ai@1.1.0`、`@aheart-ui/dnd@1.1.0`。

## 2026-11-17 事实复核与批准记录

核对分支 `codex/v2-a2-v0`，初始基线完整 SHA 为 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7`。#50 合入后，当前实施基线更新到 `287058d6395460913b8013c9201c196e9b36c2c9`。旧检出仅作为草稿来源。详细命令与 API 快照见 [V0 事实核对](../../../evidence/V0/fact-check.md)。

- npm 版本与草稿一致：基础包 1.3.0，AI/DND 各 1.1.0。
- #43、#44 均已合并。#50 最初开放且修改 `V2Roadmap.vue`；负责人选择等其合入后应用。#50 已于 `2026-11-17T06:02:23Z` 合入 `287058d`，本分支保留其布局应用路线图文案。负责人其后批准 A2 并决定 v2 Go；V0–V4 标为已批准、待合入生效的计划，未启动阶段保持未启动。
- 补充量化基线：跳过登记 **41 条调用点**；文档/质量矩阵 **49 个 Ready 条目**（基础包 45、AI 3、DND 1）。入口 manifest 是另一口径：base 4、AI 16、DND 4，共 24 条子路径；AI/DND 中场景、别名不等同于 Ready 组件条目。
- 修正 M3 证据表述：#44 合并 SHA 的主线 CI 为 cancelled，同 SHA Pages **缺失**；后续 1.3.0 发布 SHA 的 CI/Pages 成功，分开记录。
- 修正第四项破坏性候选：1.3.0 发布 JS 已不隐式加载真实 CSS；V2 固化显式样式契约，不虚构新的破坏或弃用提示。
- 明确 V1 沿用 M1 的**全部**数值限制，包括相对 root named 的 JS 增量和 theme + 单组件 CSS 合计限制。
- 明确兼容 facade 位于 `dist/compat/`，通过 exports 保留逻辑 `es/*`、`lib/*`，使仅发布 dist 与保留旧逻辑路径的要求一致。四项处置与源码依据见 [弃用表](../plans/2026-11-17-aheart-ui-v2-deprecations.md)。

负责人已书面批准 A2，并决定“Go，按 A2 计划推进 v2”。下述条款仍须合入 master 才生效；此前按 A1 执行。V1 依赖 V0 合入，合并和 Pages 继续等待单独授权。

## 修订原因

1. **v2 没有可执行阶段。** A1 的 M4 只有“v2 发布决策”。[v1.x 收口文档](../../guide/v1x-closeout.md)把 Primitive / Compound、根入口破坏性切换和 dist 布局划给 v2，但没有阶段、任务和验收标准承接。
2. **M2、M3 缺验收记录。** PR #43、#44 已合并，能力已随 1.3.0 发布，但 [M2 摘要](../../../evidence/M2/implementation-2026-11-10/summary.md)和 [M3 摘要](../../../evidence/M3/implementation-2026-11-11/summary.md)仍写“待评审 / 待验收”，没有当前的决策日志和八门禁表（本 V0 候选补齐记录，不补造历史验收）。路线图页面仍把 M3 标为“候选”。
3. **M2 实际交付少于 A1 定义。** A1 的 M2 为“Primitive 与浮层”。已交付 Combobox 普通 API 和浮层共享逻辑；namespaced Combobox、`data-scope/part/state` 契约未交付，也未记为范围变更。
4. **用户验收和 RC 条件不可验证。** M0、M1 的 G8 依据是负责人的一句“确认 / 认可”。A1-6 要求“自用项目在 Beta 上使用至少 7 天”，但 `ai-review-gate` 是仓库内新建的验证工程，不是在用项目。
5. **文档需要叠读。** 四份原文加两层修订，阶段编号有原 M0–M8 和 A1 的 M0–M4 两套。

技术方向不变。本修订只调整阶段划分、范围归属和验收方式。

## A2-1 阶段结构（替换 A1-4 中的 M4；M0–M3 结论保留）

后续阶段改用 V 编号，不再新增 M 编号。

| 阶段 | 版本 | 范围 | 启动条件 |
| --- | --- | --- | --- |
| V0 收口与范围决策 | 无发布 | 见 A2-2 | 本修订批准后 |
| V1 全量按需铺路 | 1.4.x（additive） | 见 A2-3 | V0 Go |
| V2 破坏性切换 | 2.0.0-alpha | 见 A2-4 | V1 Pass |
| V3 组合 API 与 data 契约 | 2.1.x（additive） | 见 A2-5 | 不阻塞 2.0；需求触发 |
| V4 Beta → RC → Stable | 2.0.0 | 见 A2-6 | V2 Pass |

Icons、Motion 继续按 A1 作为需求触发项。

## A2-2 V0：收口与范围决策

**Must**

- 为 M2、M3 各补一份决策日志和验收表（`evidence/M2/decision-log.md`、`evidence/M3/decision-log.md`），链接 PR #43 / #44、合并 SHA、主线 CI、Pages 和 v1.3.0 Release。无法补到的证据写明缺失，不补造。
- 在 M2 决策日志中登记范围变更：namespaced Combobox 与 data 属性契约移至 V3。
- 更新路线图页面 `docs/.vitepress/theme/V2Roadmap.vue`：M2、M3 状态与公开版本一致，M4 替换为 V0–V4。与 PR #50（文档站重设计）协调，避免冲突。
- 冻结 v2 破坏性清单和弃用表。每项按 RFC §18.4 格式记录：旧 API、替代 API、开始弃用版本、移除版本、是否有运行时提示、迁移示例。初始候选见 A2-4。
- 将四份规范、A1 和本修订合并为一份现行计划文档；原文保留为历史，不再要求叠读。
- 负责人对“是否启动 v2”作出书面决定：Go、延期（继续 1.x）或缩小范围。

**出口标准**：上述文档合入 `master`；破坏性清单无“待定”项；决定写入 `evidence/V0/decision-log.md`。

**No-Go 时**：停在 1.x，V1 仍可作为 additive 版本独立进行，V2、V4 不启动。

## A2-3 V1：全量按需铺路（1.4.x）

**Must**

- 由 `packages/components/build/entries.mjs` 这一份入口清单驱动全部 Ready 组件的子入口和组件 CSS 导出。当前基础包 45 个 Ready 条目中，仅 Button、Combobox、Modal、Select 有此完整契约；AI/DND 的 20 条既有子路径继续全覆盖。清单消费链为 `entries.mjs → packages/build/package-entries.mjs → src/constant/entries.json`，V1 保留一个事实来源。
- Resolver 覆盖全部已有子入口。
- 对 V2 将移除或改变的入口加开发环境弃用提示，生产构建不输出。
- 提供 1.3 → 2.0 的迁移表；能机械改写的部分提供 codemod。

**量化验收**

- Ready 组件的子入口和样式导出覆盖率 100%，由清单漂移测试在 CI 校验（exports、Resolver、文档导航、质量矩阵四者一致）。
- 每个子入口的模块图不越过其声明依赖；数值预算沿用 [M1 契约](../../../evidence/M1/contract.md)：组件 CSS ≤ full.css 的 25%，theme.css ≤ 5%，theme + 单组件 CSS ≤ 30%；子入口 JS gzip 小于 full Plugin，相对对应 root named 增量 ≤ max(512 bytes, 1%)。M1 的其他依赖和消费条件同样保留。
- 零破坏：1.3.0 的消费端脚本和两个试点不改源码，全部通过。
- 严格类型（`skipLibCheck: false`）、SSR / hydration、五浏览器项目通过；P0 = 0、P1 = 0。

**回滚**：1.4 为 additive，回退到 1.3.0 及原锁文件即可。

## A2-4 V2：破坏性切换（2.0.0-alpha）

**初始破坏性候选（V0 冻结后以清单为准）**

| 变更 | 依据 |
| --- | --- |
| 根入口只导出 named 组件和类型，默认 Plugin 移到 `aheart-ui/full` | RFC §7.5 |
| 产物改为 `dist/{esm,cjs,types,styles}`；`es/`、`lib/` 不再提交 Git，tarball 的 `dist/compat/` 内生成 facade，通过 exports 保留旧逻辑路径 | RFC §7.2、§7.6 |
| `@aheart-ui/ai` 对 `@aheart-ui/dnd` 由 dependencies 改为可选 peer；AI 根入口不再导出 Workbench | RFC §15.2、§18.2 |
| 固化运行时 style-free 与显式 CSS；1.3.0 产物已满足，列为回归契约，不计新增破坏 | RFC §7.3；V0 源码审计 |

**量化验收**

- 根 named import 的生产模块图不含 `full`、Table、DatePicker、AI、DND。
- 不安装 `@aheart-ui/dnd` 时，`@aheart-ui/ai/chat` 可安装、通过严格类型并完成生产构建。
- `aheart-ui/es/*`、`aheart-ui/lib/*`、`aheart-ui/style.css` 旧路径在 2.0 tarball 中仍可解析。
- tarball 的 `files` 只含 `dist`、README、LICENSE 和必要元数据；构建确定性检查通过。
- 两个试点从 1.3.0 升到 2.0.0-alpha：codemod 之外的手工改动逐项列入迁移指南，指南外改动数为 0。
- 升级回退演练 1.3 → 2.0-alpha → 1.3 通过，业务状态保留。

**回滚**：alpha 只用 `next` dist-tag 发布；`latest` 保持 1.x。

## A2-5 V3：组合 API 与 data 契约（2.1.x）

范围：namespaced Combobox（`Combobox.Root/Input/Trigger/Content/Item`）；浮层族统一 `data-scope`、`data-part`、`data-state`（RFC §10、§13.3）。

两者均为新增能力，不需要破坏性变更，因此不进入 2.0。立项时按原验收标准 M3 的 Must 和量化条件执行。若 V0 评估发现其中某项必须破坏现有 API，则该项回到 V2 清单。

## A2-6 V4：发布决策（替换 A1-6）

- **Beta Go**：P0 = 0、Beta 范围 P1 = 0；两个试点从公开 registry 以精确版本安装 beta 并完成自用任务清单（见 A2-7）。
- **RC Go**：全部 P1 关闭；升级回退演练通过；同一主线 SHA 连续 10 次运行 flaky 率低于 1%（沿用 QG5 机制）。
- **Stable Go**：RC 无新增 P0 / P1；迁移指南、变更日志和弃用表齐全；负责人书面决定。
- **删除**：A1-6 的“自用项目使用至少 7 天”。出现真实在用项目或外部用户后，恢复使用期要求。
- **发布纪律**：Beta、RC 使用 `next` dist-tag；回滚只用 dist-tag 切换和 `npm deprecate`，不 unpublish。

## A2-7 验收方式（修订验收标准 §3、§6 与 A1-3）

1. **一张验收表。** 八门禁与八状态合并为八行：设计、代码、自动检查、视觉、包、PR 合并、主线 CI 与 Pages、用户验收；另加一行 npm published。不再重复填写。
2. **G8 改为自用任务清单。** 每阶段冻结 5–8 条真实操作，每条附截图或录屏、URL、浏览器、视口和提交 SHA。仅有“确认”类回复不构成 G8 Pass。
3. **数值门槛。**
   - 包体与 CSS：沿用 M1 契约数值，失败时不放宽预算。
   - E2E 跳过：以 V0 基线 SHA 的跳过登记表 **41 条调用点**为基线（不是某次运行的 skipped 数），后续阶段不得增加；新增跳过须先登记理由。
   - 稳定性：发布前按 QG5 机制连续 10 次，flaky 率低于 1%。
4. **决策日志随 PR 提交。** 阶段的合并 PR 必须包含该阶段的决策日志和验收表，写入 PR 模板。
5. **声明与证据一致。** 物理 iOS Safari 测试已取消。支持矩阵和文档写明“iOS Safari 仅经浏览器仿真验证，未经真机验证”。

证据等级 E0–E5、缺陷级别 P0–P2 和 A1-2 的两项试点不变。

## 批准

- [x] wzfdhr 于 2026-11-17 明确回复“批准 A2 修订”；合入 `master` 后生效，见 [V0 决策日志](../../../evidence/V0/decision-log.md)。
- [x] wzfdhr 于 2026-11-17 决定“Go，按 A2 计划推进 v2”，见 [负责人决定原文](../../../evidence/V0/owner-decisions-2026-11-17.md)。
