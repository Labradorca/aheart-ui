# V0 合并后回执

[PR #51](https://github.com/Labradorca/aheart-ui/pull/51) 已按负责人“授权合并 V0 并自动部署 Pages”的直接答复合并，合并 SHA 为 `b1eef9b6f5e1b64706beee5d4d56e08891f27c26`。V0 仓库日志是提交快照，本目录补存合并后结果，不冒充 V1 结果。

| 状态 | V0 合并后结果 |
| --- | --- |
| Local | 文档、16 项脚本、定向 E2E 与 diff 的提交证据保留在 evidence/V0 |
| PR | #51 的最终 head `303ecfd`，24/24 SUCCESS |
| Merged | `b1eef9b6`；A2 已在 master 生效 |
| Main CI | [准确合并 SHA 的 push CI](https://github.com/Labradorca/aheart-ui/actions/runs/44054255820)，12/12 SUCCESS，见 [API 回执](main-ci.json) |
| Pages | [准确 SHA 的部署工作流](https://github.com/Labradorca/aheart-ui/actions/runs/44061316842)，build/deploy SUCCESS；deployment `7850046482` state success，见 [运行](pages-run.json)、[部署状态](deployment-statuses.json) |
| npm pack | 主线 consumer job SUCCESS，含三包 pack 和消费验证 |
| npm published | 本轮未发布 |
| 用户验收 | A2、v2 Go、V0 合并/Pages 授权已收到；真实操作验收未代填 |

[公开路线图](https://labradorca.github.io/aheart-ui/roadmap/v2.html) HTTP 200，SSR 内容含“v2 Go 已确认”、V0–V4、1.3.0/1.1.0 及 PR #51。见 [HTTP 摘要与标记](http.json)；这属于部署内容核对，不是交互浏览器或用户验收。
