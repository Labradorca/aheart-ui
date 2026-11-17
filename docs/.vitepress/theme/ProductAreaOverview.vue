<template>
  <section v-if="area" class="aheart-product-area" :data-area="area.key">
    <header class="aheart-product-area__hero">
      <h1>{{ area.name }}</h1>
      <p class="aheart-product-area__lead">{{ area.description }}</p>
      <p class="aheart-product-area__note">{{ area.packageNote }}</p>
    </header>

    <div class="docs-catalog-tools">
      <label :for="`area-search-${area.key}`">查找能力</label
      ><input
        :id="`area-search-${area.key}`"
        v-model="query"
        type="search"
        placeholder="名称或关键词"
        autocomplete="off"
      /><span role="status">{{ resultCount }} 项</span>
    </div>
    <nav class="docs-category-nav" aria-label="专区分类">
      <a
        v-for="section in filteredSections"
        :key="section.key"
        :href="`#${section.key}`"
        >{{ section.title }}</a
      >
    </nav>
    <div v-if="!resultCount" class="docs-empty">
      <h2>没有匹配的能力</h2>
      <button type="button" @click="query = ''">清除搜索</button>
    </div>
    <section
      v-for="section in filteredSections"
      :key="section.key"
      class="aheart-product-area__section"
      :id="section.key"
    >
      <header class="aheart-product-area__section-header">
        <div>
          <h2>{{ section.title }}</h2>
          <p>{{ section.description }}</p>
        </div>
        <span class="aheart-product-area__section-count"
          >{{ section.items.length }} 项</span
        >
      </header>

      <div class="aheart-product-area__grid">
        <article
          v-for="item in section.items"
          :key="item.key"
          class="aheart-product-area__card"
        >
          <div class="aheart-product-area__card-topline">
            <span :class="['aheart-status', statusClass(item.status)]">{{
              item.statusLabel || productAreaStatusText[item.status]
            }}</span>
          </div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.description }}</p>
          <a
            v-if="item.href"
            :href="withBase(item.href)"
            class="aheart-product-area__card-link"
          >
            查看详细文档
          </a>
          <span v-else class="aheart-product-area__card-link is-disabled"
            >等待规划门禁</span
          >
        </article>
      </div>
    </section>

    <aside class="aheart-product-area__guardrail">
      <strong>版本与状态说明</strong>
      <span>规划需通过对应门禁；未标为已发布的能力，不承诺当前可安装。</span>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { withBase } from "vitepress";
import {
  getProductArea,
  productAreaStatusText,
  statusClass,
  type ProductAreaKey,
} from "../data/product-areas";

const props = defineProps<{ area: ProductAreaKey }>();
const area = computed(() => getProductArea(props.area));
const query = ref("");
const filteredSections = computed(() =>
  (area.value?.sections || [])
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        `${item.name} ${item.description}`
          .toLowerCase()
          .includes(query.value.trim().toLowerCase()),
      ),
    }))
    .filter((section) => section.items.length),
);
const resultCount = computed(() =>
  filteredSections.value.reduce(
    (sum, section) => sum + section.items.length,
    0,
  ),
);
</script>
