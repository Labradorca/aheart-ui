# 负责人 peer 与本地候选版本授权

来源：负责人于2026-11-17在本对话的直接指令。

1. 仅修改AI对aheart-ui的peer下限：源码`workspace:^1.4.0`，出包`^1.4.0`；同步release-contract断言和必要锁记录。
2. 同时授权本地候选版本字段为`aheart-ui@1.4.0`、`@aheart-ui/ai@1.2.0`，`@aheart-ui/dnd`保持不变（1.1.0），**仅用于满足新peer的版本组合验收**。
3. CHANGELOG写明AI1.2.0需要aheart-ui≥1.4。
4. **不包含开PR、合并或Pages、npm发布、tag授权。** 不更改Vue peer或DND依赖范围；业务试点源码、对象身份和预算仍按此前决定保持。

前次 [peer停止点及影响说明](aiform-precise-imports/peer-impact.md) 已获上述有限授权，不再以等待该答复阻塞V1；完整V1工作按既定范围继续，新的预算/模块图停止点照旧适用。历史探针与版本快照保留，不追改成新版本组合证据。
