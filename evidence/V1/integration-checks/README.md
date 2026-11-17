# V1 集成检查快照（选择器审查前）

[命令/退出码](../checks/results.json)中的2026-11-17T16:56–17:05Z一轮：全量unit、严格消费类型、65入口JS/CSS/对象身份/代表SSR、迁移工具、docs/quality-matrix及文档构建均退出0。原始[65入口结果](pre-selector-audit/results.json)、[模块图字典（gzip）](pre-selector-audit/module-graphs.json.gz)、[SSR/身份输出](pre-selector-audit/identity-ssr.log)保留，tarball摘要见结果文件。

**该轮后独立审查发现Workbench漏选择器，因此不算完整V1 Pass。** 修复后的新tarball CSS预算exit1，见[当前停止点](../css-closure/selector-fix/README.md)。不能用此快照覆盖当前失败。全量65入口JS/module图使用M1固定Vite5.0.12/Vue3.5.44，106项AIForm越界已清零；图保留所有parsed/rendered模块信息。style-free、对象身份及SSR只是各自分项证据，不代替hydration、视觉或用户验收。

单测首次因CI结构断言仍硬编码1.3 tarball失败，保留[旧输出](attempts/01-ci-stale-version.unit.txt)；已改为从release-contract读取准确版本并断言新增两项CI步骤，随后unit通过。旧消费/两个试点源码未随之修改。
