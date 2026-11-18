# V1 开发构建诊断、迁移表与 codemod

Local已实现B1/B3的opt-in Vite开发构建诊断（aheart-ui/resolver导出AheartV2DeprecationDiagnostics）；保持所有组件对象身份，生产构建不输出诊断。迁移表见[指南](../../../docs/guide/v2-migration.md)，机械改写入口为scripts/codemods/aheart-v2.mjs，默认dry-run、显式--write；Vue脚本以官方SFC parser处理，复杂动态/私有入口等列人工清单。

[实际三包tarball验证](validated/results.json)退出0：Vite serve编译JS和Vue产生4条预期旧用法提示，codemod后为0；旧/新源码production build均0条提示，产物无提示文案；CJS身份和插件SDK严格类型检查通过。[命令汇总](../checks/results.json)另外记录9条diagnostics测试、8条codemod测试，以及CSS/module预算测试。后续独立CSS审查发现的Workbench问题使完整V1仍失败，见[停止点](../css-closure/selector-fix/README.md)。

真实工具SDK测试固定Vite5.4.21/Vue3.5.44/TypeScript5.9.3/@types/node24.10.1；M1/V1数值预算仍固定Vite5.0.12，未换引擎。初次缺Node类型、相对输入路径、Vite5.0.12 SDK与现代Node类型的FSWatcher不兼容，以及Vitest默认jsdom导致esbuild Uint8Array跨realm错误均保留于attempts/；改为独立临时工具依赖、绝对输入、5.4.21工具SDK、明确node测试环境后通过，未放宽skipLibCheck或生产预算。上游修复参考：https://github.com/vitejs/vite/pull/15706 。

该测试使用选择器修复前tarball；工具JS未因样式修复改变，但最终候选仍需重新验证。不是2.0实现或发布，也不是用户验收。
