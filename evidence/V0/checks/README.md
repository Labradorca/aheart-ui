# V0 检查命令与退出码

初始基线 `735d3d33e0e5a770c5cb83f782dbe33016b4ada7`；#50 合入后当前实施基线为 `287058d6395460913b8013c9201c196e9b36c2c9`。工作目录为独立 worktree 根目录，Node 24.17.0、pnpm 9.15.4。下表重跑时的实际 merge-base、HEAD 与 UTC 时间在 results.json；准备记录及首次事实快照保留原时间。它们是 Local 检查，不是 PR/Main CI/Pages、包重打或用户验收。

| 准备/核对 | 命令 | 退出码 | 输出 |
| --- | --- | --- | --- |
| 安装 | `corepack pnpm install --frozen-lockfile` | 0 | [install.txt](install.txt)；锁文件未改 |
| 远端事实 | `node evidence/V0/collect-facts.mjs` | 0 | [facts.txt](facts.txt)、[facts.json](../facts.json)；每个 gh/npm 命令数组与退出码在快照内 |
| 下载已有证据 | `gh release download v1.3.0 --repo Labradorca/aheart-ui --pattern release-evidence.json --pattern qg5-master-stability.json --pattern SHA256SUMS --dir evidence/V0/upstream-release` | 0 | [release-download.txt](release-download.txt)；仅下载，不执行发布 |
| 链接与完整性 | 一次性 Python 核对，完整命令见 [integrity-command.json](integrity-command.json) | 0 | [integrity.txt](integrity.txt)：本地链接、原文/A1 未变、路线图与运行证据 hash 一致、附件哈希、批准框与 v2 空白栏 |

执行 `node evidence/V0/run-checks.mjs` 重跑下表。没有重跑全包单测、全量浏览器、SSR/hydration 或 npm pack；此次修改规范、证据、PR 模板与路线图文案，这些不能从 docs 构建推导通过。#50 合入后的实际 UI 检查及补充 CSS zoom 探针限制见 [运行报告](../roadmap-after-pr50/README.md)。

仓库原 .gitignore 忽略 `*.log`，故原始 stdout/stderr 存为 `.txt`，并保留独立 `.exit-code` 文件。没有放宽 docs、quality matrix 或跳过登记校验。

<!-- generated results -->

| 检查 | 命令 | 退出码 | 输出 |
| --- | --- | --- | --- |
| docs-and-matrix | `node --test scripts/docs-copy.test.mjs scripts/docs-social-icon.test.mjs scripts/qg5-evidence-docs.test.mjs scripts/m3-doc-entries.test.mjs scripts/quality-matrix.test.mjs scripts/qg5-skip-ledger.test.mjs` | 0 | [输出](docs-and-matrix.txt) |
| docs-build | `corepack pnpm docs:build` | 0 | [输出](docs-build.txt) |
| diff-check | `git diff --check` | 0 | [输出](diff-check.txt) |
| staged-diff-check | `git diff --cached --check` | 0 | [输出](staged-diff-check.txt) |
