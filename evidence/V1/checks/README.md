# V1 本地检查记录

具体命令、执行 HEAD、工作差异摘要、UTC 起止时间、退出码及输出在 [results.json](results.json)。构建产物与源码相同版本仅为未发布候选，不把 pack 当成发布。

| 检查 | 结果 | 输出 |
| --- | --- | --- |
| `corepack pnpm build:components` | exit 0 | [构建](build-components.txt) |
| `node --test scripts/v1-entry-manifest.test.mjs` | 6/6，exit 0 | [四方漂移](drift.txt) |
| `corepack pnpm release:pack --pack-destination test-results/release-tarballs` | 三包通过，exit 0 | [pack](pack.txt) |
| `git diff --check` | exit 0 | [diff](diff.txt) |
| `node evidence/V1/aiform-budget-probe.mjs` | **exit 1，真实预算停止点** | [详细结果](../aiform-budget/results.json)、[退出码](../aiform-budget/exit-code) |

第一次保存大差异的元数据时，Node 默认缓冲区导致校验 runner 在执行 diff 命令前报 `ENOBUFS`；扩大的是元数据捕获缓冲区，不是包体/CSS预算。随后重跑 diff 并独立运行 `git diff --cached --check` 成功。预算探针的首次 /var realpath 基础设施错误与后续真实门禁失败亦分别记在 [尝试记录](../aiform-budget/probe-attempts.json)。

本阶段全量 unit、strict types、SSR/hydration、五浏览器、旧消费和两试点尚未验收；按预算停止点不继续实现或宣称通过。V0 的主线/Pages 结果另见 [合并后回执](../v0-postmerge/README.md)。
