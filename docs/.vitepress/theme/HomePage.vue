<script setup lang="ts">
import { computed, ref, onBeforeUnmount, onMounted } from "vue";
import { withBase } from "vitepress";
import "./editorial.css";
onMounted(() => document.documentElement.classList.add("js"));
const name = ref("我的下一个项目");
const notifications = ref(true);
const palette = ref("blue");
const saved = ref(false);
const copied = ref(false);
const copyError = ref(false);
const palettes = [
  { id: "blue", name: "湖蓝", color: "#245be0", hover: "#1645b8" },
  { id: "green", name: "松绿", color: "#16734c", hover: "#105b3b" },
  { id: "orange", name: "陶橙", color: "#ad451b", hover: "#8c3513" },
];
const selected = computed(() => palettes.find((p) => p.id === palette.value)!);
const theme = computed(() => ({
  primaryColor: selected.value.color,
  primaryHoverColor: selected.value.hover,
  textColor: "#252724",
  textSecondaryColor: "#63665f",
  backgroundColor: "#ffffff",
  borderColor: "#7b8275",
  fillColor: "#f4f5f2",
}));
let timer: ReturnType<typeof setTimeout>;
async function copy() {
  copyError.value = false;
  try {
    await navigator.clipboard.writeText("pnpm add aheart-ui");
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1600);
  } catch {
    copied.value = false;
    copyError.value = true;
  }
}
onBeforeUnmount(() => clearTimeout(timer));
const links = [
  {
    name: "基础组件",
    text: "按钮、输入、布局与反馈。",
    href: "/components/overview",
  },
  {
    name: "组合组件",
    text: "表格、表单与更完整的工作流。",
    href: "/composed/overview",
  },
  {
    name: "AI 产品",
    text: "Chat、AI Form 与 Agent 工作台。",
    href: "/ai/overview",
  },
  {
    name: "扩展能力",
    text: "按需接入拖拽与工作区交互。",
    href: "/dnd/overview",
  },
];
</script>
<template>
  <main class="editorial-home">
    <section class="edition-intro">
      <h1>把想法，<br />做成界面。</h1>
      <div class="edition-intro__copy">
        <p>
          为产品而写的 Vue 3 组件库。<br />从第一个按钮，到完整的工作流，<br />用
          Aheart UI，认真做好每一个细节。
        </p>
        <div class="edition-actions">
          <a class="edition-primary" :href="withBase('/guide/installation')"
            >开始使用</a
          ><a class="edition-secondary" :href="withBase('/components/overview')"
            >浏览组件</a
          >
        </div>
      </div>
    </section>
    <section class="edition-showcase" aria-label="组件交互体验">
      <div class="edition-showcase__bar">
        <span>界面，由你定义。</span>
        <div class="edition-palette" aria-label="主题色">
          <button
            v-for="item in palettes"
            :key="item.id"
            :class="item.id"
            :aria-label="item.name"
            :aria-pressed="palette === item.id"
            @click="palette = item.id"
          >
            <span aria-hidden="true" />{{ item.name }}
          </button>
        </div>
      </div>
      <AConfigProvider :theme="theme">
        <div class="edition-specimens">
          <form class="edition-project" @submit.prevent="saved = true">
            <h2>下一个项目，从这里开始。</h2>
            <p>试试这些组件。操作只在当前页面生效。</p>
            <label for="homepage-project">项目名称</label
            ><AInput
              id="homepage-project"
              v-model="name"
              placeholder="输入项目名称"
              @update:model-value="saved = false"
            />
            <div class="edition-notification">
              <div>
                <label id="homepage-notification">接收项目通知</label
                ><small>为重要进展留一个提醒。</small>
              </div>
              <ASwitch
                v-model="notifications"
                aria-labelledby="homepage-notification"
              />
            </div>
            <div class="edition-project__footer">
              <AButton
                type="primary"
                html-type="submit"
                :disabled="!name.trim()"
                >预览设置</AButton
              ><Transition name="edition-feedback" mode="out-in"
                ><span :key="String(saved)" role="status">{{
                  saved ? `已预览「${name}」，未保存数据` : "无需登录，直接体验"
                }}</span></Transition
              >
            </div>
          </form>
          <div class="edition-samples">
            <div class="edition-samples__buttons">
              <h3>恰到好处的操作层级。</h3>
              <div>
                <AButton type="primary" @click="saved = true">确认选择</AButton
                ><AButton>次要操作</AButton
                ><AButton type="text">稍后处理</AButton>
              </div>
            </div>
            <div class="edition-samples__type">
              <span>Aa</span>
              <div>
                <h3>留白，也是界面的一部分。</h3>
                <p>让内容清楚，让交互自然。</p>
                <a :href="withBase('/components/typography')"
                  >探索 Typography</a
                >
              </div>
            </div>
          </div>
        </div>
      </AConfigProvider>
      <div class="edition-install">
        <code>pnpm add aheart-ui</code
        ><button
          @click="copy"
          :aria-label="copied ? '已复制安装命令' : '复制安装命令'"
        >
          {{
            copyError ? "复制失败，请手动复制" : copied ? "已复制" : "复制命令"
          }}</button
        ><span role="status">{{
          copyError
            ? "复制失败，请选中左侧命令手动复制"
            : copied
              ? "安装命令已复制"
              : "Vue 3 / TypeScript"
        }}</span>
      </div>
    </section>
    <section class="edition-library">
      <div>
        <h2>从基础出发，<br />为复杂场景准备。</h2>
        <p>按你的产品需要选择，<br />从文档里的真实示例开始。</p>
      </div>
      <div class="edition-links">
        <a v-for="link in links" :key="link.href" :href="withBase(link.href)"
          ><div>
            <h3>{{ link.name }}</h3>
            <p>{{ link.text }}</p>
          </div>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            <path
              d="M5 12h14m-6-6 6 6-6 6"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            /></svg
        ></a>
      </div>
    </section>
    <footer class="edition-footer">
      <span>Aheart UI</span
      ><a :href="withBase('/guide/introduction')">阅读指南</a
      ><a :href="withBase('/roadmap/v2')">路线图与版本状态</a
      ><a href="https://github.com/Labradorca/aheart-ui">GitHub</a>
    </footer>
  </main>
</template>
