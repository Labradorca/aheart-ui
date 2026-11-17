<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, watch } from "vue";
import { useData } from "vitepress";
const { page } = useData();
let dispose: (() => void)[] = [];
let timer: ReturnType<typeof setTimeout>;
function setup() {
  dispose.forEach((fn) => fn());
  dispose = [];
  document
    .querySelectorAll<HTMLElement>(".aheart-demo-panel")
    .forEach((panel) => {
      const code = panel.nextElementSibling as HTMLElement | null;
      if (!code?.className.includes("language-")) return;
      const toolbar = document.createElement("div");
      toolbar.className = "docs-demo-toolbar";
      const caption = document.createElement("span");
      caption.textContent = "交互示例";
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = "查看代码";
      button.setAttribute("aria-expanded", "false");
      const previousId = code.id;
      code.id ||= `demo-source-${Math.random().toString(36).slice(2)}`;
      button.setAttribute("aria-controls", code.id);
      code.hidden = true;
      const toggle = () => {
        code.hidden = !code.hidden;
        button.textContent = code.hidden ? "查看代码" : "收起代码";
        button.setAttribute("aria-expanded", String(!code.hidden));
        if (
          !code.hidden &&
          !matchMedia("(prefers-reduced-motion: reduce)").matches &&
          document.documentElement.dataset.docsInput !== "keyboard"
        )
          code.animate(
            [
              { opacity: 0, transform: "translateY(-6px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            { duration: 200, easing: "cubic-bezier(.16,1,.3,1)" },
          );
      };
      button.addEventListener("click", toggle);
      toolbar.append(caption, button);
      panel.before(toolbar);
      dispose.push(() => {
        toolbar.remove();
        code.hidden = false;
        code.id = previousId;
        button.removeEventListener("click", toggle);
      });
    });
}
function keyboard() {
  document.documentElement.dataset.docsInput = "keyboard";
}
function pointer() {
  document.documentElement.dataset.docsInput = "pointer";
}
function schedule() {
  clearTimeout(timer);
  timer = setTimeout(setup, 80);
}
onMounted(() => {
  document.documentElement.classList.add("js");
  schedule();
  document.addEventListener("keydown", keyboard);
  document.addEventListener("pointerdown", pointer);
});
watch(
  () => page.value.relativePath,
  async () => {
    await nextTick();
    schedule();
  },
);
onUnmounted(() => {
  clearTimeout(timer);
  dispose.forEach((fn) => fn());
  document.removeEventListener("keydown", keyboard);
  document.removeEventListener("pointerdown", pointer);
});
</script>
<template><span hidden aria-hidden="true" /></template>
