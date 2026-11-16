# 发布

当前 v1.x 交付范围见 [范围与验收约定](./v1x-closeout.md)。本线发布 `aheart-ui@1.2.0`；AI / DND 对应版本为 `1.0.0`。1.2 仅发布核心；1.3 发布三个包。已存在的版本不能重发。

## 发布前检查

从受审的干净提交执行：

```bash
corepack pnpm install --frozen-lockfile
CI=true corepack pnpm release:check
```

保留组件和脚本测试、严格类型、确定性构建、文档构建、实际 tarball、五浏览器和消费端检查。物理 iOS Safari 真机测试已于 2026-11-16 由负责人取消，状态为 Cancelled / N/A；不作为发布阻塞，不声称测试通过。QG5 的自动化和主线稳定性证据继续分别归档。

## 交付

负责人已在本次任务授权完成 v2 启动前的 v1.x 发布闭环。发布前核对包名、版本、依赖、官方 registry、维护者身份、源码 SHA 和 tarball SHA-256，确认目标版本尚未存在。最终提交必须通过完整 CI，构建后的包与验证输入一致。只能发布已验证的确切 tarball；1.3 的顺序为核心、DND、AI。

公开 registry 可读取版本后，在全新独立工程安装精确版本，验证 ESM / CommonJS、严格类型、CSS、SSR / hydration、模块图和关键交互。升级 / 回退使用已发布的 core 1.1.1 及原领域包 1.0.0，并保留任务状态。npm 发布、tag、GitHub Release 和 Pages 状态分别记录。

公开消费通过后，为生成这些 tarball 的同一源码提交创建注释 tag 和 GitHub Release。附件包括确切 tarball、SHA-256 以及公开安装 / 回退证据。任何失败保留日志，停止后续 rollout；不覆盖 npm 版本、不移动既有 tag。常规恢复使用修复版本，禁止把 unpublish 当作常规回滚。
