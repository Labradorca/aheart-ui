<script setup lang="ts">
import { computed, ref } from "vue";
import DocsPlayground from "./DocsPlayground.vue";
import { withBase } from "vitepress";
import { getCoreComponentDomains, statusText } from "../data/components";
const domains = getCoreComponentDomains("zh");
const query = ref("");
const filtered = computed(() =>
  domains
    .map((domain) => ({
      ...domain,
      components: domain.components.filter((item) =>
        `${item.name} ${item.zhName} ${item.description}`
          .toLowerCase()
          .includes(query.value.trim().toLowerCase()),
      ),
    }))
    .filter((domain) => domain.components.length),
);
const count = computed(() =>
  filtered.value.reduce((sum, domain) => sum + domain.components.length, 0),
);
</script>
<template>
  <section
    class="aheart-component-overview"
    aria-label="基础组件能力域"
    data-catalog="core"
  >
    <header class="aheart-component-overview__header">
      <h1>基础组件</h1>
      <p>
        从布局和输入，到导航与反馈。按使用场景找到组件，再查看可操作的示例与
        API。
      </p>
    </header>
    <DocsPlayground />
    <div class="docs-catalog-tools">
      <label for="component-search">查找组件</label
      ><input
        id="component-search"
        v-model="query"
        type="search"
        placeholder="名称、用途或关键词"
        autocomplete="off"
      /><span role="status">{{ count }} 个组件</span>
    </div>
    <nav class="docs-category-nav" aria-label="组件分类">
      <a
        v-for="domain in filtered"
        :key="domain.key"
        :href="`#catalog-${domain.key}`"
        >{{ domain.name }}</a
      >
    </nav>
    <section
      v-for="domain in filtered"
      :id="`catalog-${domain.key}`"
      :key="domain.key"
      class="aheart-component-domain"
      :data-domain="domain.key"
    >
      <header class="aheart-component-domain__header">
        <div>
          <h2>{{ domain.name }}</h2>
          <p>{{ domain.description }}</p>
        </div>
        <span class="aheart-component-domain__count"
          >{{ domain.components.length }} 个组件</span
        >
      </header>
      <TransitionGroup
        name="docs-filter"
        tag="div"
        class="aheart-component-domain__items"
      >
        <a
          v-for="component in domain.components"
          :key="component.key"
          :href="withBase(component.link)"
          class="aheart-component-item"
          ><span
            ><strong>{{ component.name }}</strong
            ><small
              >{{ component.zhName }}，{{ component.description }}</small
            ></span
          ><span
            :class="[
              'aheart-status',
              `aheart-status--${component.status.toLowerCase()}`,
            ]"
            >{{ statusText.zh[component.status] }}</span
          ></a
        >
      </TransitionGroup>
    </section>
    <div v-if="!filtered.length" class="docs-empty">
      <h2>没有匹配的组件</h2>
      <p>试试英文组件名，或用“输入”“布局”等用途搜索。</p>
      <button type="button" @click="query = ''">清除搜索</button>
    </div>
  </section>
</template>
