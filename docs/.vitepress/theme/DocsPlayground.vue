<script setup lang="ts">
import { computed, ref } from "vue";
const active = ref("按钮");
const tabs = ["按钮", "输入", "开关"];
function moveTab(event: KeyboardEvent, direction: number) {
  const index =
    (tabs.indexOf(active.value) + direction + tabs.length) % tabs.length;
  active.value = tabs[index];
  const buttons = (
    event.currentTarget as HTMLElement
  ).parentElement?.querySelectorAll<HTMLButtonElement>("button");
  buttons?.[index].focus();
}
const label = ref("创建项目");
const enabled = ref(true);
const clicked = ref(false);
const source = computed(() =>
  active.value === "按钮"
    ? '<AButton type="primary">创建项目</AButton>'
    : active.value === "输入"
      ? '<AInput v-model="name" placeholder="项目名称" />'
      : '<ASwitch v-model="enabled" />',
);
</script>
<template>
  <section class="docs-playground" aria-label="组件交互试验台">
    <div class="docs-playground__intro">
      <h2>先动手，再开始。</h2>
      <p>三个基础组件，直接试用。每一次操作，都对应真实的组件状态。</p>
    </div>
    <div class="docs-playground__surface">
      <div class="docs-playground__tabs" role="tablist" aria-label="试用组件">
        <button
          v-for="tab in tabs"
          :key="tab"
          role="tab"
          :aria-selected="active === tab"
          :tabindex="active === tab ? 0 : -1"
          :id="`try-${tab}`"
          aria-controls="try-panel"
          @click="
            active = tab;
            clicked = false;
          "
          @keydown.right.prevent="moveTab($event, 1)"
          @keydown.left.prevent="moveTab($event, -1)"
        >
          {{ tab }}<span class="docs-tab-line" />
        </button>
      </div>
      <div
        id="try-panel"
        role="tabpanel"
        :aria-labelledby="`try-${active}`"
        class="docs-playground__stage"
      >
        <Transition name="docs-swap" mode="out-in">
          <div :key="active" class="docs-playground__example">
            <template v-if="active === '按钮'"
              ><AButton type="primary" @click="clicked = !clicked">{{
                clicked ? "已体验，再点一次" : "创建项目"
              }}</AButton
              ><span role="status">{{
                clicked
                  ? "点击已响应，未创建或保存数据。"
                  : "点击看看按钮的反馈。"
              }}</span></template
            >
            <template v-else-if="active === '输入'"
              ><AInput
                v-model="label"
                placeholder="项目名称"
                aria-label="试用项目名称"
              /><span role="status">{{
                label ? `当前输入：${label}` : "写下你的项目名称。"
              }}</span></template
            >
            <template v-else
              ><ASwitch v-model="enabled" aria-label="试用通知开关" /><span
                role="status"
                >{{
                  enabled ? "通知已开启（本地演示）" : "通知已关闭（本地演示）"
                }}</span
              ></template
            >
          </div>
        </Transition>
      </div>
      <div class="docs-playground__code">
        <code>{{ source }}</code>
      </div>
    </div>
  </section>
</template>
