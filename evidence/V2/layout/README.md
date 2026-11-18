# B2 产物布局

core 与 AI 的运行时、声明、样式分别进入 `dist/esm`、`dist/cjs`、`dist/types` 和 `dist/styles`。实包根只包含 dist、README、LICENSE 以及 package.json。发布主入口、模块、类型、样式和公开子入口均实际指向新产物。DND 沿用已发布的 1.1.0 布局，本阶段的实包消费检查使用从公开 registry 下载的 DND。[包摘要与检查](checks.json)

对照三个公开 1.x tarball 中的 1,484 条旧 es/lib 逻辑路径逐条检查实际解析结果。允许解析的 1,446 条保持可用，原来由 exports 拒绝的 38 条私有路径仍被拒绝。此提交先把旧逻辑路径指向 dist，下一提交负责生成独立兼容 facade 并移除 Git 中的产物。[旧路径对比](legacy-resolution.json)

M1、M3、65 条 V1 消费门禁、两套 Vue 的严格类型、文档构建和 30 条脚本测试通过。M3 首次失败来自断言还在匹配旧的物理路径，改为匹配 dist 后用同一组三包复跑通过。Ready 目录、exports、Resolver 和质量矩阵继续一致。[入口覆盖](entry-coverage.json)
