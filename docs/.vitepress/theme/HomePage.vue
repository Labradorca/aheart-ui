<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import { withBase, useData } from "vitepress";
import { getComponentCatalogs } from "../data/components";
import "./homepage.css";

const installCommand = "pnpm add aheart-ui";
const copyLabel = ref("复制");
let timer: ReturnType<typeof setTimeout> | undefined;
const { isDark } = useData();
const name = ref("我的下一个项目");
const notifications = ref(true);
const saved = ref(false);
const palette = ref("blue");
const palettes = [
  { id: "blue", name: "湖蓝", color: "#1677ff", hover: "#0958d9" },
  { id: "green", name: "松绿", color: "#16734c", hover: "#105b3b" },
  { id: "orange", name: "陶橙", color: "#ad451b", hover: "#8c3513" },
];
const selected = computed(() =>
  palettes.find((item) => item.id === palette.value)!,
);
const theme = computed(() => ({
  primaryColor: selected.value.color,
  primaryHoverColor: selected.value.hover,
  ...(isDark.value
    ? {
        textColor: "#edf1f6",
        textSecondaryColor: "#b4bfcd",
        backgroundColor: "#1e2630",
        borderColor: "#7b8794",
        fillColor: "#253950",
      }
    : {}),
}));
const catalogs = getComponentCatalogs("zh");
const publishedComponentCount = catalogs.core.length + catalogs.composed.length;
const features = [
  {
    name: "Table",
    text: "分页、筛选、固定列与虚拟滚动。",
    href: "/components/table",
  },
  {
    name: "Select",
    text: "可控状态、键盘导航与可选虚拟列表。",
    href: "/components/select",
  },
  {
    name: "Modal",
    text: "焦点管理、嵌套浮层和退出动效。",
    href: "/components/modal",
  },
  {
    name: "AIForm",
    text: "把 Schema 映射为可校验的表单。",
    href: "/components/ai-form",
  },
];
async function copyInstallCommand() {
  if (timer) clearTimeout(timer);
  try {
    await navigator.clipboard.writeText(installCommand);
    copyLabel.value = "已复制";
  } catch {
    copyLabel.value = "请手动复制";
  }
  timer = setTimeout(() => {
    copyLabel.value = "复制";
  }, 1800);
}
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer);
});
</script>

<template>
  <div class="aheart-home-page">
    <section class="aheart-home-hero" aria-labelledby="aheart-home-title">
      <div class="aheart-home-hero__inner home-wrap">
        <div class="home-intro">
          <h1 id="aheart-home-title">为产品而写的<br />Vue 3 组件库。</h1>
          <p class="home-lead">
            从一个按钮，到表单、数据工作区与 AI Agent。用 Aheart
            UI，把界面里的细节交给组件。
          </p>
          <div class="home-actions">
            <a
              class="home-button primary"
              :href="withBase('/guide/installation')"
              >开始使用</a
            >
            <a
              class="home-button secondary"
              :href="withBase('/components/overview')"
              >浏览组件</a
            >
          </div>
          <div class="home-install">
            <code>{{ installCommand }}</code>
            <button type="button" @click="copyInstallCommand">
              {{ copyLabel }}
            </button>
            <span class="sr-only" role="status">{{
              copyLabel === "复制" ? "" : copyLabel
            }}</span>
          </div>
          <p class="home-fact">
            {{ publishedComponentCount }} 个核心与组合组件，TypeScript
            类型随包交付。
          </p>
        </div>
        <div
          class="home-lab"
          :data-palette="palette"
          role="group"
          aria-label="组件交互体验"
        >
          <div class="lab-heading">
            <h2>先试试手感。</h2>
            <span>真实组件，直接操作</span>
          </div>
          <AConfigProvider :theme="theme">
            <form class="lab-form" @submit.prevent="saved = true">
              <label for="homepage-project">项目名称</label>
              <AInput
                id="homepage-project"
                v-model="name"
                placeholder="输入项目名称"
                @update:model-value="saved = false"
              />
              <div class="lab-switch">
                <div>
                  <label id="homepage-notification">接收项目通知</label>
                  <p>在这个页面体验开关状态。</p>
                </div>
                <ASwitch
                  v-model="notifications"
                  aria-labelledby="homepage-notification"
                />
              </div>
              <fieldset class="lab-colors">
                <legend>主题色</legend>
                <div>
                  <button
                    v-for="item in palettes"
                    :key="item.id"
                    type="button"
                    :class="['swatch', item.id]"
                    :aria-label="item.name"
                    :aria-pressed="palette === item.id"
                    @click="palette = item.id"
                  >
                    <span aria-hidden="true"></span>{{ item.name }}
                  </button>
                </div>
              </fieldset>
              <div class="lab-submit">
                <AButton
                  type="primary"
                  html-type="submit"
                  :disabled="!name.trim()"
                  >预览设置</AButton
                ><span role="status">{{
                  saved ? `已预览「${name}」，未保存数据` : "只在当前页面体验"
                }}</span>
              </div>
            </form>
          </AConfigProvider>
          <div class="lab-source">
            <span>同一个组件，自己的主题。</span
            ><code>&lt;AConfigProvider :theme="theme"&gt;</code>
          </div>
        </div>
      </div>
    </section>

    <section class="home-library" aria-labelledby="home-library-title">
      <div class="home-wrap">
        <div class="home-section-head">
          <h2 id="home-library-title">把时间留给<br />你的产品。</h2>
          <p>
            输入、选择、展示、反馈。常用交互有一致的状态、尺寸与主题，从日常页面一路用到复杂工作区。
          </p>
        </div>
        <div class="component-index">
          <a
            v-for="item in features"
            :key="item.name"
            :href="withBase(item.href)"
            ><h3>{{ item.name }}</h3>
            <p>{{ item.text }}</p>
            <span>查看文档</span></a
          >
        </div>
        <div class="library-bottom">
          <p>基础组件负责细节，组合组件组织工作流。</p>
          <div>
            <a :href="withBase('/components/overview')">浏览基础组件</a
            ><a :href="withBase('/composed/overview')">查看组合组件</a>
          </div>
        </div>
      </div>
    </section>

    <section class="home-domains" aria-labelledby="home-domains-title">
      <div class="home-wrap">
        <h2 id="home-domains-title">界面不止于表单。</h2>
        <div class="domain-row">
          <div>
            <h3>AI 有过程，也有边界。</h3>
            <p>
              Chat、Agent 与
              Workbench，把来源、任务、人工审批和产物放在同一条工作流里。模型后端由你接入。
            </p>
            <a class="home-button secondary" :href="withBase('/ai/overview')"
              >查看 AI 产品</a
            >
          </div>
          <div class="workflow" aria-label="AI Agent 产品工作台预览">
            <div><span>资料来源</span><strong>需求简报</strong></div>
            <div><span>Agent 任务</span><strong>生成产品方案</strong></div>
            <div><span>人工审批</span><strong>由用户决定发布</strong></div>
            <a :href="withBase('/components/ai-agent-workbench')"
              >体验 Agent 工作台</a
            >
          </div>
        </div>
        <div class="domain-row dnd-row">
          <div>
            <h3>拖动之外，保留键盘。</h3>
            <p>
              排序、跨容器移动与拖拽浮层，提供桌面、触摸和键盘操作路径。业务数据仍由应用控制。
            </p>
            <a class="home-button secondary" :href="withBase('/dnd/overview')"
              >查看拖拽能力</a
            >
          </div>
          <div class="dnd-spec">
            <strong>Draggable</strong><strong>DropZone</strong
            ><strong>SortableList</strong><strong>DragOverlay</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="home-quality" aria-labelledby="aheart-quality-title">
      <div class="home-wrap quality-layout">
        <div>
          <h2 id="aheart-quality-title">质量有据可查。</h2>
          <p>不只是看起来正确，也要经得起验证。</p>
          <a
            class="home-button secondary"
            :href="withBase('/guide/quality-matrix')"
            >查看质量矩阵</a
          >
        </div>
        <div class="quality-list">
          <p>
            <strong>类型与构建</strong
            ><span>TypeScript、ES / CJS、发布包合约</span>
          </p>
          <p>
            <strong>渲染与交互</strong><span>SSR、焦点管理、可访问交互</span>
          </p>
          <p>
            <strong>浏览器验证</strong><span>Chromium、Firefox、WebKit</span>
          </p>
          <p>
            <strong>发布记录</strong
            ><a href="https://github.com/Labradorca/aheart-ui/releases"
              >查看版本与验证证据</a
            >
          </p>
        </div>
      </div>
    </section>

    <section class="home-close" aria-labelledby="aheart-cta-title">
      <div class="home-wrap">
        <h2 id="aheart-cta-title">下一个界面，<br />从这里开始。</h2>
        <div class="home-actions">
          <a class="home-button primary" :href="withBase('/guide/installation')"
            >阅读安装指南</a
          ><a
            class="home-button secondary"
            href="https://github.com/Labradorca/aheart-ui"
            >在 GitHub 查看</a
          >
        </div>
        <div class="home-foot">
          <span>Aheart UI</span>
          <nav aria-label="更多产品能力">
            <a :href="withBase('/guide/ai-integration')">Codex 接入</a
            ><a :href="withBase('/motion/overview')">Motion</a
            ><a :href="withBase('/icons/overview')">Icons</a
            ><a href="https://github.com/Labradorca/aheart-ui/wiki">Wiki</a>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>
