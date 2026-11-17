<script setup>
import { withBase } from 'vitepress'
</script>

# Aheart UI 使用指南

面向 Vue 3 产品界面的组件库。核心组件处理布局、输入、数据展示与反馈，AI 和 DND 作为独立包按需接入。

<div class="docs-start-links">
  <a :href="withBase('/guide/installation')"><strong>安装与配置</strong><span>安装依赖、引入样式，把第一个组件放进项目。</span></a>
  <a :href="withBase('/components/overview')"><strong>查找组件</strong><span>按名称或用途检索，查看真实示例和 API。</span></a>
  <a :href="withBase('/guide/theme')"><strong>定制主题</strong><span>通过 CSS 变量与 ConfigProvider 配置视觉。</span></a>
  <a :href="withBase('/guide/m3-migration')"><strong>按需导入与迁移</strong><span>选择组件入口和独立样式，保留兼容路径。</span></a>
</div>

## 选择需要的包

| 包 | 内容 | 文档 |
| --- | --- | --- |
| `aheart-ui` | 基础与组合组件、主题和配置 | [基础组件](../components/overview) / [组合组件](../composed/overview) |
| `@aheart-ui/ai` | Chat、Form 与 Agent Workbench | [AI 产品](../ai/overview) |
| `@aheart-ui/dnd` | 拖拽、排序和键盘操作 | [DND](../dnd/overview) |

## 开始之前

项目使用 Vue 3 与 TypeScript，提供 ES Module 和 CommonJS 构建产物。请按已安装的包版本选择导入方式；公开版本与验证证据见 [v1.x 交付记录](./v1x-closeout)。

Motion、Icons 与后续 v2 能力保留各自的状态说明。规划条目不等于已发布组件。

## 在 Codex 中使用 Aheart UI

安装 `aheart-ui` Skill 后，Codex 可以按需求查找组件、读取 API，再按项目已安装的版本编写 Vue 代码。

1. 在你的 Vue 项目根目录打开终端，使用 Node.js 22.20 或更新版本运行：

   ```sh
   npx skills add https://labradorca.github.io/aheart-ui/ai/aheart-ui/SKILL.md --skill aheart-ui -a codex
   ```

2. 用 Codex 打开同一个项目，发送下面这段提示词：

   ```text
   $aheart-ui
   用项目当前安装的 Aheart UI 版本做一个用户列表，支持按姓名筛选、分页和批量归档。
   ```

手动安装、组件检索和常见问题见 [AI 接入指南](./ai-integration)。
