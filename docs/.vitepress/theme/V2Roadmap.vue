<template>
  <section class="aheart-roadmap" aria-labelledby="aheart-roadmap-title">
    <header class="aheart-roadmap__hero">
      <h1 id="aheart-roadmap-title">v2 路线图</h1>
      <p>
        路线图按已批准的 A1 阶段划分。M2、M3 已公开交付，阶段验收证据待补。
        V0–V4 为负责人已批准、待合入生效的 A2 计划，合入前仍以 A1 为准。
      </p>
      <aside class="aheart-roadmap__guardrail">
        公开版本：aheart-ui 1.3.0，AI/DND 1.1.0。发布不代表用户验收。
        iOS Safari 仅经浏览器仿真验证，未经真机验证。
      </aside>
    </header>

    <ol class="aheart-roadmap__timeline">
      <li
        v-for="phase in phases"
        :key="phase.key"
        class="aheart-roadmap__phase"
      >
        <div class="aheart-roadmap__phase-marker" aria-hidden="true">
          {{ phase.key }}
        </div>
        <article>
          <div class="aheart-roadmap__phase-heading">
            <div>
              <h2>{{ phase.title }}</h2>
              <p>{{ phase.description }}</p>
            </div>
            <span
              class="aheart-status"
              :class="`aheart-status--${phase.state}`"
              >{{ phase.status }}</span
            >
          </div>
          <ul>
            <li v-for="item in phase.items" :key="item">{{ item }}</li>
          </ul>
        </article>
      </li>
    </ol>
  </section>
</template>

<script setup lang="ts">
const phases = [
  {
    key: "M0",
    title: "产品与契约冻结",
    description: "建立版本边界和两个消费试点。",
    status: "已验收",
    state: "ready",
    items: ["clean-consumer 和 ai-review-gate"],
  },
  {
    key: "M1",
    title: "v1.2 真实按需",
    description: "建立基础包子入口与显式样式契约。",
    status: "已验收 · 已发布 1.2.0",
    state: "ready",
    items: ["Button / Modal / Select 子入口", "消费端和发布契约"],
  },
  {
    key: "M2",
    title: "Combobox 与浮层",
    description: "普通 Combobox 与共享浮层已公开交付，用户验收证据待补。",
    status: "已发布 1.3.0",
    state: "ready",
    items: [
      "Combobox",
      "Popover / Tooltip / Dropdown、Modal / Drawer、Select 与 Picker 族",
      "namespaced Combobox 与 data 契约移至 V3 的方案已批准，待合入生效",
    ],
  },
  {
    key: "M3",
    title: "AI/DND 与文档",
    description: "场景入口、独立样式、Resolver 与迁移指南已公开交付。",
    status: "已发布 AI/DND 1.1.0",
    state: "ready",
    items: [
      "Chat / Agent / Workbench、DND Sortable",
      "按需导入、自动解析和回滚",
      "合并时主线 CI 被取消，Pages 与用户验收证据缺失",
    ],
  },
  {
    key: "V0",
    title: "收口与范围决策",
    description: "补齐阶段记录、冻结弃用清单，由负责人决定是否启动 v2。",
    status: "已决定 Go · 待合入",
    state: "planned",
    items: ["M2/M3 证据补录与合并计划", "负责人已决定启动 v2，V0 合入前不启动 V1"],
  },
  {
    key: "V1",
    title: "1.4.x 全量按需铺路",
    description: "覆盖全部 Ready 组件的子入口、样式与 Resolver，保持 1.x 兼容。",
    status: "A2 已批准 · 未启动",
    state: "planned",
    items: ["清单漂移检查、迁移表与 codemod", "沿用 M1 模块图与 CSS 预算"],
  },
  {
    key: "V2",
    title: "2.0.0-alpha 破坏性切换",
    description: "按批准的弃用清单切换根入口、产物布局与 AI/DND 安装边界。",
    status: "A2 已批准 · 未启动",
    state: "planned",
    items: ["root/full、dist 与兼容 facade、AI optional DND", "alpha 只用 next，latest 保持 1.x"],
  },
  {
    key: "V3",
    title: "2.1.x 组合 API 与 data 契约",
    description: "按需求增加 namespaced Combobox 和浮层统一状态属性。",
    status: "需求触发 · 未启动",
    state: "planned",
    items: ["Combobox.Root / Input / Trigger / Content / Item", "不阻塞 2.0"],
  },
  {
    key: "V4",
    title: "Beta → RC → Stable",
    description: "根据试点任务、稳定性、迁移与回退证据作书面发布决定。",
    status: "A2 已批准 · 未启动",
    state: "planned",
    items: ["两个试点的自用任务清单", "同一主线 SHA 连续十次稳定性验证"],
  },
];
</script>
