# 发布

本维护分支准备 `aheart-ui@1.1.1` 补丁，基线为已发布的 `v1.1.0`。`@aheart-ui/dnd@1.0.0` 和 `@aheart-ui/ai@1.0.0` 仅参与兼容验证，不重新发布。日常开发与发布准备不得执行真实发布。

## 发布前门禁

从维护分支的干净提交执行：

```bash
corepack pnpm install --frozen-lockfile
CI=true corepack pnpm release:check
git status --short
```

验收要求：

- 单元测试、类型检查、三包构建和中文文档构建通过。
- 实际 tarball 在工作区 Vue 与 Vue 3.5.44 下通过 `skipLibCheck: false` 检查，保留 Card props、slots、别名和安装类型。
- Playwright 桌面与移动端用例无失败，按钮悬停对比度与自定义主题 token 回归通过。
- 三个 tarball 均通过 release contract，旧版 AI/DND 可与核心补丁一起安装。
- 构建后 `es/lib` 无漂移，Git 工作区保持干净。
- 物理 iOS Safari 与连续 10 次 QG5 主线稳定性分别按 [QG5 跨浏览器证据](./qg5-evidence.md) 归档；移动视口仿真不能替代真机。缺少证据时保持待验收，不宣告发布门禁全部通过。

## 检查 tarball

```bash
corepack pnpm release:pack --pack-destination test-results/release-tarballs
corepack pnpm check:consumer-types
npm publish test-results/release-tarballs/aheart-ui-1.1.1.tgz --dry-run --access public
```

验证器检查核心 `1.1.1`、DnD `1.0.0` 和 AI `1.0.0`。每个包必须包含 README、LICENSE、package.json、ESM、Node/SSR 可用的 CommonJS、TypeScript 声明和样式；不得包含源码、测试或未解析的 `workspace:` 协议。`es/package.json` 与 `lib/package.json` 分别声明 `module` 和 `commonjs` 模块类型。

正式候选必须来自同一受审提交，记录提交 SHA、tarball SHA-256、npm integrity 和兼容验证结果。只发布核心 tarball；禁止重发已经存在的两个领域包版本。

## 正式发布

以下步骤只能在负责人明确批准后执行。先关闭适用门禁，把 `CHANGELOG.md` 中的“未发布”替换为实际发布日期，提交后重新构建并复验。核对 `1.1.1` 尚不存在、npm 会话有效且 registry 为 `https://registry.npmjs.org/`。

```bash
git status --short
CI=true corepack pnpm release:check
npm whoami
npm config get registry
npm view aheart-ui versions --json
npm publish test-results/release-tarballs/aheart-ui-1.1.1.tgz --access public --tag latest
```

发布后从公开 registry 在空目录精确安装 `aheart-ui@1.1.1`，并与已发布的 `@aheart-ui/dnd@1.0.0`、`@aheart-ui/ai@1.0.0` 组合验证 ESM、CommonJS、严格类型、CSS、SSR 与关键任务。

确认结果后，为构建 tarball 的同一提交创建 tag 与 GitHub Release：

```bash
git tag -a v1.1.1 -m "Aheart UI v1.1.1"
git push origin v1.1.1
```

Git tag、GitHub Release 与 npm tarball 必须来自同一提交。v1.2+ 的主线不能代替 v1.1.1 维护分支的发布来源。

## 回滚与发布故障

npm 已发布版本不能用同一包名和版本号覆盖或重发。安装或 smoke test 失败时停止 rollout，保留版本、提交 SHA、tag、tarball hash 和失败日志，不移动或重建 tag。优先弃用有问题的版本并发布新的修复版本，不能用 `npm unpublish` 作为常规回滚。[npm 弃用说明](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions/)

只有在旧版本仍兼容且经回退验证后，才能把 `latest` 指回 `aheart-ui@1.1.0`；这会恢复旧版已知的 Card 类型和按钮对比度问题，需明确记录。dist-tag 不改变已发布 tarball。[npm dist-tag 文档](https://docs.npmjs.com/adding-dist-tags-to-packages/)

## 生成产物策略

源代码变化引起的 `es/lib` 输出必须随补丁提交。完整构建连续执行两次后，第二次不得产生任何差异。与本轮源码无关的声明顺序漂移必须先查明原因，不能通过暂存文件绕过检查。

## 日期时间迁移检查

- TimePicker 默认业务格式为 `HH:mm:ss`；旧项目保留分钟值时同时设置 `format="HH:mm"` 与 `value-format="HH:mm"`。
- `format` 只负责显示，`valueFormat` 决定字符串模型值；Dayjs 不属于公共值类型。
- 范围选择统一使用 `DateRangePicker` / `TimeRangePicker` 或对应的 `RangePicker` 静态成员，不再拼接两个单值组件。
- AIForm 范围字段使用 `date-range` / `time-range` 和二元字符串数组；发布前需验证空端、必填与受控拒绝更新。
