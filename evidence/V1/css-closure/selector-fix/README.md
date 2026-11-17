# Workbench CSS 完整性修复与不回升停止点

2026-11-17，本地候选core1.4.0 / AI1.2.0 / DND1.1.0。**完整V1未通过；按负责人预算停止点暂停后续实现。** AIForm的peer和本地版本授权已执行，见[准确版本组合回执](../../peer-version-combination/README.md)。本停止点不涉及新增版本或发布。

## 根因和实测

独立源规则审查发现，初版拆分器只接受选择器开头的AI类名，遗漏现有完整AI样式中的这一条：

```css
.aheart-dnd-sortable-item:last-child .aheart-ai-workbench__timeline-item::before {
  display: none;
}
```

此规则同时属于Workbench自身和已声明的DND sortable依赖，必须保留；缺失会让时间线最后一项仍显示连接线。不是新增功能，也没有修改完整包的源样式。前次[未过滤审查](before-unfiltered-source-audit.json)还列出4条demo fixture上下文，这4条按既定边界排除，不能混进组件闭包。

拆分器现按声明的跨包上下文保留该规则，并有独立回归用例。依赖之外的Table/fixture选择器仍被拒绝。两个逻辑入口指向同一份物理样式；真实tarball的ESM/CJS均一致：

| 逻辑入口 | 初测记录 B | 补齐后实际 B | 差值 | 组件/full | theme+组件/full | 当前门禁 |
| --- | --- | --- | --- | --- | --- | --- |
| @aheart-ui/ai/agent-workbench | 54,109 | 54,212 | +103 | 26.903% | 27.780% | 并集完整，不回升失败 |
| @aheart-ui/ai/workbench | 54,109 | 54,212 | +103 | 26.903% | 27.780% | 并集完整，不回升失败 |

full分母仍201,510 B，theme仍1,767 B/0.877%。其余63条公开样式与初测逐字节相同，AIForm仍99,853 B、Agent仍100,927 B。三包full源样式/基础full.css均与V0一致。967条符合声明边界的源选择器独立核对缺失0；四条fixture排除；55份保护源码未改，另两处为负责人前次已批准的过时断言修改。见[独立实际产物核对](verification.json)。

**初测54,109 B不完整，不能继续用前次exit0声称完整闭包验收通过。** 原[冻结候选基线](../../css-baselines.json)和[字节备份](unchanged-initial-baseline.json)完全保留；没有将预算改为54,212 B，也没有删除该规则以制造通过。各依赖字节及占比的补齐后实测存于verification.json；不是有效冻结基线。

## 命令与退出码

| 命令 | 退出码 | 回执 |
| --- | --- | --- |
| node evidence/V1/run-checks.mjs build pack | 0 | [全量构建/实际pack记录](../../checks/results.json)，build/pack两项均在选择器修复后 |
| node --test scripts/v1-entry-contract.test.mjs | 0；8/8 | [输出](contract-tests.txt)、[exit](contract-tests.exit-code) |
| node scripts/v1-consumer.mjs --styles-only --out test-results/v1-css-selector-fix | **1** | [输出](packed-gate.txt)、[实际安装元数据/错误](packed/results.json)、[exit](packed-gate.exit-code) |
| node evidence/V1/css-closure/selector-fix/verify.mjs | 0 | [输出](verification.txt)、[exit](verification.exit-code)；只证明修复/测量/原基线未改，**不是预算通过** |

首次独立核对脚本误用不存在的基础src/style.css，退出1；[原失败输出](attempt-source-path.txt)保留。脚本修正为核对基础es/full.css后通过；未改变产品或预算。

## 待负责人决定

是否允许把**本轮尚未通过完整性审查的首次候选测量**更正为两个Workbench路径54,212 B，重算其依赖占比，并自该完整值执行不回升？若允许，保留旧54,109 B及失败证据作为无效初测历史；其余63条基线、所有叶子/Modal硬门禁、theme5%、JS预算、依赖集合均不变。不涉及S1、不涉及PR/版本/合并/Pages/npm/tag授权。

负责人尚未决定，代理不代填。当前P1-V1-001（闭包完整性/基线冲突）仍开放；不宣称P0=P1=0。后续两试点、hydration/五浏览器、R1覆盖率、构建确定性和最终缺陷审计尚未执行完，不以此前局部成功替代。
