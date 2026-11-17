<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import ComponentContext from "./ComponentContext.vue";
const { page } = useData();
const section = computed(() => {
  const path = page.value.relativePath;
  if (path.startsWith("guide/"))
    return { name: "使用指南", href: "/guide/introduction" };
  if (path.startsWith("roadmap/"))
    return { name: "路线图", href: "/roadmap/v2" };
  const sections = {
    components: "组件文档",
    composed: "组合组件",
    ai: "AI 产品",
    dnd: "拖拽",
    motion: "动效",
    icons: "图标",
  };
  const key = path.split("/")[0] as keyof typeof sections;
  return sections[key]
    ? { name: sections[key], href: `/${key}/overview` }
    : null;
});
</script>
<template>
  <div v-if="section" class="docs-context">
    <nav aria-label="文档路径" class="docs-breadcrumb">
      <a :href="withBase('/')">Aheart UI</a><span aria-hidden="true">/</span
      ><a :href="withBase(section.href)">{{ section.name }}</a>
    </nav>
    <ComponentContext />
  </div>
</template>
