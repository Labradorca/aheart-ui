# PR #52 初次 consumer CI 与修复

[草稿 PR #52](https://github.com/Labradorca/aheart-ui/pull/52) 按负责人 2026-11-17 的授权创建，首次 head 为 `b394bd0`。两组 CI 均成功打包三包并通过严格类型。此后 consumer 运行 V1 审查时，默认的 `fetch-depth: 1` 让冻结的 V0 提交不可读。

| 触发 | 首次 consumer 结果 |
| --- | --- |
| [PR CI](https://github.com/Labradorca/aheart-ui/actions/runs/44208836005/job/134481697170) | `git show b1eef9b6:packages/components/es/full.css` 失败，报 `fatal: invalid object name 'b1eef9b6'` |
| [分支 push CI](https://github.com/Labradorca/aheart-ui/actions/runs/44208815627/job/134481626646) | 同一 Git 读取失败 |

consumer 的 Checkout 改为 `fetch-depth: 0`，仍从同一 V0 提交读取原始 CSS。按 depth 1 克隆复现同一错误，补全历史后 `git show` 和 `cmp` 退出 0。V0 原始 CSS 与候选 full.css SHA-256 均为 `bd1006443101d0335a14c0ae0bcdaf351de95d0a76cddf4239c89e76cae95c83`。`node --test scripts/ci-config.test.mjs` 10 项通过，退出 0。`git diff --check` 退出 0。修复范围为 consumer 的检出配置及对应断言，CI 重跑状态见 PR 检查。
