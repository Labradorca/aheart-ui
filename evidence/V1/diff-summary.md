# V1 本地检查点：AIForm精确导入，停在peer修改前

**最新状态（2026-11-17）**：负责人已单独授权AI peer ^1.4.0与本地core1.4.0/AI1.2.0/DND1.1.0组合，已通过实际pack、旧M1/M3消费及全部声明严格类型检查；继续V1。[授权与回执](peer-version-combination/README.md)。下文peer停止点内容保留当时快照；没有PR、合并/Pages、npm或tag授权。
基线 `b1eef9b6f5e1b64706beee5d4d56e08891f27c26`；独立分支 `codex/v1.4-entries`。负责人已 [确认12复合/53叶子分类并授权恢复实现](owner-classification-confirmation-2026-11-17.md)，本轮推进到AIForm精确导入的peer停止点。peer、版本、消费/试点业务源码、锁文件未改；V1未开PR、未合并/部署/发布/tag。

| 已做 | 证据 |
| --- | --- |
| 既有基础45家族子入口/CSS、AI16/DND4路径、81名称Resolver和四方漂移 | [入口覆盖](entry-coverage.json)、[既有构建/漂移回执](checks/results.json)；仅声明覆盖不代表全部验收 |
| 负责人确认分类，复合先按25%/30%测量，达标继续硬门禁，Modal不降门槛 | [直接决定](owner-classification-confirmation-2026-11-17.md)、[已确认清单](classification/approved.json) |
| AIForm/form-field从13个精确公开子入口导入，AI构建将aheart-ui/*保持external，产物更新 | [局部回执](aiform-precise-imports/README.md)；去掉import后源正文不变，公开声明字节不变 |
| AIForm真实tarball模块图越界106→0，无基础根barrel；scoped JS gzip133,664 B，与root named相同，低于full187,221 B | [完整结果与图](aiform-precise-imports/results.json) |
| AI构建、原有AI200测试、包typecheck、三包pack，以及局部严格消费类型/13字段SSR/对象身份通过 | [检查命令与退出码](checks/results.json)、[独立tarball探针](aiform-precise-imports/results.json)；不代替全量SSR/hydration/五浏览器 |
| 复合入口首次测量：8项锁定叶子硬门禁，4项完整跨包公开闭包待测 | [逐项数值/门禁表](composite-css-gates.md)；开PR前必须填齐12项最终门禁并在摘要逐项展示 |
| S1明确拒绝，原测量保留历史；负责人澄清不是代理放宽预算 | [前次决定](owner-a2-3-clarification-2026-11-17.md)、[历史测量](aiform-design/README.md) |
| V0合并Main CI/Pages已核验，与V1分开 | [V0回执](v0-postmerge/README.md) |

## 当前停止点

AI精确导入依赖11个新增基础运行时路径，以及新的公开Tree类型路径；现有peer仍workspace:^1.1.0，不准确表达新代码的最低能力。需要负责人单独决定是否调整到^1.4.0，见 [具体影响及后续范围](aiform-precise-imports/peer-impact.md)。当前本地核心候选虽标1.3.0但含未发布exports，不能证明公开1.3支持新AI。收到答复前不继续实现。

## 仍未完成

四项跨包复合完整CSS/并集/基线、其余入口实际模块图/JS/CSS预算、开发构建诊断、1.3→2.0迁移表/codemod、完整旧消费与两试点、全量strict/SSR-hydration/五浏览器及P0/P1审计均未完成，不能标V1 Pass。

| 状态 | V1 |
| --- | --- |
| Local | AIForm精确导入和局部验证通过，peer修改前停止；完整V1未通过 |
| PR | 未开，未授权 |
| Merged | 否 |
| Main CI | 本候选缺失 |
| Pages | 本候选未部署 |
| npm pack | 本轮三包本地候选通过 |
| npm published | 未发布 |
| 用户验收 | 缺失，未代填；分类已确认 |
