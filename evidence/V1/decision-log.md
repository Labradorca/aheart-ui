# V1 全量按需铺路

状态：**负责人已单独授权peer和本地候选版本，准确版本组合已通过旧消费及全量严格类型检查；继续V1实现，完整验收尚未完成。** 基线 `b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；分支 `codex/v1.4-entries`。V0按单独授权合并，准确SHA的Main CI 12/12与Pages SUCCESS见 [V0合并后回执](v0-postmerge/README.md)，不代替V1验收。初始 [基线](baseline.json) 保留当时状态。

## 决策与授权

| 项目 | 决定 / 当前边界 |
| --- | --- |
| V1范围 | 全Ready子入口/CSS、Resolver、漂移测试、开发构建诊断、迁移表/codemod、数值与兼容验收，未完成 |
| 过时能力断言 | 负责人允许M1固定原四组件范围、M3将ATable否定改正向；仅这两个受保护测试改动获准，两试点业务源码不改，见 [直接答复](owner-decisions-2026-11-17.json) |
| 身份与弃用提示 | 保留对象身份，B1/B3使用开发构建import诊断；该诊断仍未实现，见同一直接答复 |
| S1 | **负责人明确不批准**，约69.5%减量且保持full.css/视觉等价的成功概率低；不再执行或请求S1授权 |
| A2-3口径澄清 | **负责人决定，不是代理放宽预算**，见 [前次逐项记录](owner-a2-3-clarification-2026-11-17.md) 和 [本次确认/追加](owner-classification-confirmation-2026-11-17.md) |
| 分类 | 12复合/53叶子、辅助依赖、同族聚合、复合不套25%/30%而theme5%保留的分栏已获确认；新增“先测叶子线、通过者锁定硬门禁”限制优先，见下节 |
| AIForm导入与图 | 13个精确公开运行时入口已实现，产物保持external；真实tarball图原106项越界变0，基础root barrel未解析，见 [本轮回执](aiform-precise-imports/README.md) |
| AIForm兼容 | 13类字段、对象身份、props/events/expose不变；本轮仅改import声明和必要构建external，公开声明字节不变；两试点业务不改 |
| 原预算探针 | 原100,048 B/49.649%、压缩49.820%和exit1留为 [历史](aiform-budget/README.md)，不追改成新规则Pass；旧图106为当时事实，新图单独存档 |
| peer下限 | 已按 [本轮单独授权](owner-peer-versions-2026-11-17.md) 改为workspace:^1.4.0，真实pack为^1.4.0；准确版本组合通过，见 [新回执](peer-version-combination/README.md)。旧停止点保留为历史 |
| V1开PR | 未授权；完整候选就绪后先交差异摘要，包括12个复合入口最终门禁和实测值 |
| V1合并 / Pages | 未授权 |
| 版本 | 已获本地组合验收专用授权：基础1.4.0、AI1.2.0、DND1.1.0不变；release-contract/必要锁记录/CHANGELOG同步，不表示发布授权 |
| npm published / tag | 均未授权、未执行 |

## A2-3 分类确认与追加门禁（2026-11-17，现行）

以下由负责人直接决定，**不是代理放宽预算**，逐项来源为 [本轮负责人记录](owner-classification-confirmation-2026-11-17.md)。

1. 确认 [分类设计](../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md) 的12复合/53叶子、辅助/同族边界和执行分栏；[approved.json](classification/approved.json) 为确认后的65条清单，proposal.json保留原候选历史。
2. 叶子仍执行组件≤full25%、theme≤5%、theme+组件≤30%，任何叶子超线仍停止报告。复合**首先按相同25%/30%线完整测量**；达标者继续将这两条作为硬门禁，不能在后续回归时改用并集例外。Modal在M1已验收，原门槛不降。
3. **仅实测超出叶子线的复合入口**才用精确并集/不回升门禁：闭包等于自身+声明依赖入口样式并集，无声明外选择器；闭包大小及各依赖占比记录为后续不得回升基线。该分栏不套25%和30%；theme自身5%继续执行。
4. JS两类都不变：gzip小于full Plugin，相对root named增量≤max(512 B,1%)。AIForm只允许13个字段控件族及声明传递依赖，旧106项越界必须清零；13类字段、对象身份、props/events/expose和两个业务试点源码不变。
5. 每个复合入口的最终门禁与数值须存入evidence/V1，并在开PR前差异摘要逐条列出。本轮 [首次测量表](composite-css-gates.md) 已锁定8项叶子硬门禁（含Modal），另4项完整跨包闭包待实现/实测，未先选并集例外；**当前不可开PR**。
6. 已授权恢复实现，但AIForm精确导入后需要改peer时必须停下询问。该停止点后负责人已单独授权peer和本地候选版本，见下节；PR、合并/Pages、发布/tag仍未授权，S1继续不批准。

## peer与本地版本组合授权（2026-11-17）

[负责人直接决定](owner-peer-versions-2026-11-17.md)允许AI peer源码workspace:^1.4.0、出包^1.4.0，core1.4.0/AI1.2.0/DND1.1.0作为本地组合验收版本；不授权PR、合并/Pages、npm或tag。已同步release-contract断言、一条锁记录和CHANGELOG。准确三包实际pack、旧M1/M3消费、Vue3.5.38/44的全部出包声明严格检查通过，见 [回执](peer-version-combination/README.md)。不把这组检查当作完整V1通过，继续剩余实现。

## 一张验收表（A2-7）

| 项目 | 分项状态 | 证据 | SHA / 时间 | 责任人 |
| --- | --- | --- | --- | --- |
| G1设计 | A2已生效；负责人已确认分类并追加复合首次测量限制，S1拒绝 | [负责人决定](owner-classification-confirmation-2026-11-17.md)、[设计](../../docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md) | 基线 + 本轮差异 | wzfdhr |
| G2代码 | Local：基础45家族入口/CSS、81名称Resolver、四方漂移已铺设；新增AIForm精确公开导入与external；V1未完成 | [入口覆盖](entry-coverage.json)、[AIForm回执](aiform-precise-imports/README.md)、[57份受保护源码/试点核对](aiform-precise-imports/verification.json) | 基线 + 本轮差异 | Codex |
| G3自动检查 | AI构建、原有AI200测试、包typecheck、三包pack成功；本轮tarball局部SSR/严格消费类型、图0越界、JS预算通过；8个复合首次叶子线达标并锁定，4个完整闭包待测；全V1门禁未通过 | [构建/测试命令与退出码](checks/results.json)、[局部探针结果](aiform-precise-imports/results.json)、[复合门禁表](composite-css-gates.md)。历史文档/清单检查不代替新实现验收 | 基线 + 本轮差异 | Codex |
| G4视觉 | 本阶段真实页面视觉/交互验收缺失 | 本次13字段SSR不代替真实运行、hydration或用户操作 | 缺失 | Codex观察 / wzfdhr验收 |
| G5包 | npm pack：本轮本地三包候选通过；准确本地组合为core1.4.0/AI1.2.0/DND1.1.0，AI peer ^1.4.0已验证；不声称公开1.3兼容新AI | [本轮准确版本pack/消费/严格类型回执](peer-version-combination/README.md)；版本仅本地候选，没有发布 | 基线 + 本轮差异 | Codex |
| G6 PR / 合并 | PR：未开；Merged：否 | V1需单独授权，当前仍未完成候选 | 缺失 | wzfdhr |
| G7主线CI / Pages | Main CI：本候选缺失；Pages：未部署 | V0回执单独跟踪，不冒充V1 | 缺失 | 待授权后CI |
| G8用户验收 | 缺失，未代填；分类确认不替代实际操作验收 | 完整实现后冻结5–8条真实任务，由负责人验收 | 缺失 | wzfdhr |
| npm published | 本轮未发布 | 本地pack与npm公开状态分开 | 基线 | N/A |

## 当前剩余工作

peer及本地候选版本已获单独授权并通过准确版本组合检查，继续既定V1范围。下一预算/模块图停止点与开PR前审阅仍按负责人要求执行。

剩余包括：四个跨包复合入口的完整公开CSS闭包及首次比例测量、适用精确并集/不回升的最终基线、全部53叶子原预算和全部JS/模块图、开发构建诊断、迁移表/codemod、原消费与两试点、完整strict、SSR/hydration、五浏览器、P0/P1审计。8个已锁定复合硬门禁不得后退，Modal原M1门槛不降。P0/P1未预填为0；V1仍不可合并。
