<script setup lang="ts">
import { computed, ref, onBeforeUnmount } from "vue";
const variant = ref<"primary" | "default" | "dashed" | "text">("primary");
const size = ref<"small" | "middle" | "large">("middle");
const disabled = ref(false);
const loading = ref(false);
const count = ref(0);
const copied = ref(false);
const copyError = ref(false);
const view = ref("preview");
const source = computed(
  () =>
    `<AButton type="${variant.value}" size="${size.value}"${disabled.value ? " disabled" : ""}${loading.value ? " loading" : ""}>\n  创建项目\n</AButton>`,
);
let timer: ReturnType<typeof setTimeout>;
async function copy() {
  copyError.value = false;
  try {
    await navigator.clipboard.writeText(source.value);
    copied.value = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied.value = false), 1600);
  } catch {
    copied.value = false;
    copyError.value = true;
  }
}
onBeforeUnmount(() => clearTimeout(timer));
</script>
<template>
  <section class="button-playground" aria-label="Button 交互示例">
    <div class="button-playground__nav">
      <div class="edition-segment" role="group" aria-label="示例视图">
        <button :aria-pressed="view === 'preview'" @click="view = 'preview'">
          交互预览</button
        ><button :aria-pressed="view === 'code'" @click="view = 'code'">
          Vue 代码
        </button>
      </div>
      <button class="edition-copy" @click="copy">
        {{
          copyError ? "复制失败，请手动复制" : copied ? "已复制" : "复制代码"
        }}
      </button>
    </div>
    <Transition name="edition-panel" mode="out-in">
      <div
        v-if="view === 'preview'"
        key="preview"
        class="button-playground__body"
      >
        <div class="button-playground__canvas">
          <AButton
            :type="variant"
            :size="size"
            :disabled="disabled"
            :loading="loading"
            @click="count++"
            >创建项目</AButton
          ><span role="status">{{
            count ? `已响应 ${count} 次点击` : "点击按钮，试试它的反馈。"
          }}</span>
        </div>
        <div class="button-playground__controls">
          <label
            >外观<select v-model="variant" aria-label="按钮外观">
              <option value="primary">主要按钮</option>
              <option value="default">默认按钮</option>
              <option value="dashed">虚线按钮</option>
              <option value="text">文本按钮</option>
            </select></label
          ><label
            >尺寸<select v-model="size" aria-label="按钮尺寸">
              <option value="small">小</option>
              <option value="middle">默认</option>
              <option value="large">大</option>
            </select></label
          ><label class="edition-check"
            ><input type="checkbox" v-model="disabled" />禁用</label
          ><label class="edition-check"
            ><input type="checkbox" v-model="loading" />加载中</label
          >
        </div>
      </div>
      <pre
        v-else
        key="code"
        class="button-playground__source"
      ><code>{{source}}</code></pre>
    </Transition>
    <div class="button-playground__caption">
      <code>import { Button as AButton } from 'aheart-ui'</code
      ><span role="status">{{
        copyError
          ? "复制失败，请打开 Vue 代码手动复制"
          : copied
            ? "代码已复制"
            : "参数实时生效"
      }}</span>
    </div>
  </section>
</template>
