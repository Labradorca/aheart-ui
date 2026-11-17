# V1 兼容契约预检

本页保留提出问题时的依据。负责人已选择“仅更新过时能力断言；保留对象身份，弃用提示改用开发构建诊断”，见 [直接答复](owner-decisions-2026-11-17.json)。后续实现按该选择执行；不再等待本页列出的选项。

基线：`b1eef9b6f5e1b64706beee5d4d56e08891f27c26`，即已授权合并的 V0 / PR #51。独立分支 `codex/v1.4-entries`。基础包/AI/DND 版本仍为 1.3.0 / 1.1.0 / 1.1.0；没有版本修改、V1 PR、合并、发布或 tag 授权。原消费脚本和两个试点的逐文件摘要已冻结在 [baseline.json](baseline.json)。

## 需要负责人澄清的相互冲突要求

### 全量入口与旧测试的否定断言

- A2-3 要求基础包 45 个 Ready 组件及 Resolver 全覆盖，包含 Table。
- [旧 M1 消费脚本](../../scripts/m1-consumer.mjs) 从 `build/entries.mjs` 动态遍历 `componentEntries`，但对其中每项 CSS 都断言不得包含 `.aheart-table`。它原本只服务四个已有子入口；扩大清单后，不能拿这个否定断言验收 Table 自己的 CSS。
- [旧 M3 probe](../../scripts/fixtures/m3-consumer/probe.mjs) 明确把 `ATable` 与 `AMotionFade`、`AUnknown` 放在同一组，要求 Resolver 返回 `undefined`。V1 又要求 `ATable` 可解析，因此不能既保留该脚本字节不变又让该断言通过。
- 可审阅方案：保留 M1 四组件历史验证及其所有数值，新增 V1 全量 45/45 模块图/CSS/类型验证；仅更新过时的测试范围/能力否定断言。业务消费源码与两试点不改。如果负责人坚持所有旧测试脚本字节不变，此处保持未解决，不以另一个 Resolver 模式、漏掉 Table、跳过测试或放宽预算求绿。

### 入口对象身份与有针对性的运行时弃用提示

- [基础 root](../../packages/components/src/index.ts) 和 [full](../../packages/components/src/full.ts) 均导出同一个 [Plugin](../../packages/components/src/plugin.ts)。旧 M1 probe 强校验 ESM/CJS 的 `Root === Full`。
- 旧 M3 probe 同样要求 AI/DND 的 root/full Plugin 为同一对象，以及 root/scoped 的组件对象严格相同，包括 Workbench。
- 保持同一对象时，调用 `app.use(plugin)` 或渲染组件的运行时不能得知用户曾从哪个 import 路径取得它；给共享对象加提示也会提示推荐入口，单独包装旧入口则会改变这些身份断言。
- 可审阅方案 A：保留身份兼容，把 B1/B3 提示改为开发构建中的旧 import 诊断；需要负责人明确批准对 A2 弃用提示方式的调整。
- 可审阅方案 B：仅为旧入口提供提示包装，使用注册/渲染行为等价验证替换上述跨入口身份断言；同样需要负责人明确允许这项旧测试例外，且必须验证双路径安装不重复注册。

两个方案均不改变预算，不删除兼容入口，不授权版本或发布。未取得答复前不修改旧测试或弃用策略，先实施独立的全量清单与漂移校验。
