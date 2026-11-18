# 新 peer 的本地版本组合验收

依据 [负责人单独授权](../owner-peer-versions-2026-11-17.md)，本地候选改为core1.4.0、AI1.2.0，DND1.1.0不变；AI源码peer为workspace:^1.4.0，真实pack为^1.4.0。CHANGELOG明确AI1.2.0需要core≥1.4。**不是公开发布或完整V1验收。**

## 结果

[准确tarball元数据、摘要及命令回执](receipt.json)证明：

- release-contract的8项现有测试和三包实际pack退出0，出包无workspace协议；AI的core peer准确为^1.4.0。
- 原M1消费脚本退出0，实际安装core1.4.0，保留原四入口的模块图/JS/CSS预算与身份/SSR断言；[结果](m1-results.json)。
- 原M3消费脚本退出0，覆盖81个Resolver组件名、根/full/scoped身份、SSR、Vite自动导入与浏览器场景；[结果](m3-results.json)。这不是全量五浏览器证据。
- 全部出包声明严格消费检查（skipLibCheck:false）在Vue3.5.38和3.5.44均通过；三个实际安装版本均准确匹配上述组合，无workspace symlink；[结果](strict-results.json)。
- 57份保护源码自初始基线仍仅有前次获准的两个过时断言改动，本轮没有改消费脚本或两个试点业务源码。两试点的这次新组合运行验证仍待执行，不用源码保护代替运行证据。

锁文件只更新AI importer的一条core peer specifier，无外部依赖升级。首次offline lockfile-only因本机缺vitepress元数据失败，保留 [exit1命令记录](lock-update.json)；随后正常解析成功，见 [exit0记录](lock-update-online.json)。两次命令均不执行生命周期脚本。

前次 [AIForm peer停止点](../aiform-precise-imports/README.md) 是旧版本快照，新授权及本页结果替代“等待peer决定”状态，不追改旧数据。V1继续既定范围：四项完整CSS闭包/门禁、其余入口模块图/预算、开发诊断、迁移表/codemod、两试点、SSR/hydration、五浏览器与P0/P1审计。

Local：本地准确版本组合通过上述检查，V1未完成；PR：未开；Merged：V1否；Main CI：V1缺失；Pages：V1未部署；npm pack：core1.4.0/AI1.2.0/DND1.1.0通过；npm published：未发布；用户验收：未代填。
