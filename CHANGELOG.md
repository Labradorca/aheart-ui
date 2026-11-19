# 更新日志

Aheart UI 的重要变更统一记录在本文件中。

## [2.0.0-beta.1] 候选

- 修复 AI 工作台在 SSR hydration 后往返切换桌面和窄屏时，聊天面板和执行抽屉无法重新进入移动布局的问题。视口切换保留原有组件和聊天草稿。
- Core 和 AI 候选为 `2.0.0-beta.1`，DND 使用公开 `1.1.0`。预发布使用 `next`。[预发布安装与回退](docs/guide/v2-migration.md)

## [2.0.0-beta.0] 候选

- 修复 390px 视口下日期范围选择器截断起止日期的问题。全量和按需页面增加三种浏览器的视觉回归，并沿用逐字节截图门槛。[#53](https://github.com/Labradorca/aheart-ui/issues/53)
- Core 和 AI 候选为 `2.0.0-beta.0`，DND 使用公开 `1.1.0`。预发布使用 `next`。[预发布安装与回退](docs/guide/v2-migration.md)

## [2.0.0-alpha.0] 本地候选

- 核心根入口移除默认 Plugin。改用 `aheart-ui/full` 并显式导入 `aheart-ui/full.css`。根 named 组件和公开类型继续可用。
- core 和 AI 发布产物迁到 `dist/{esm,cjs,types,styles}`，Git 不再跟踪生成的 es/lib。旧逻辑深路径保留兼容 facade。直接读取包内部文件的应用须改用公开入口。
- AI 根导出和根 Plugin 移除 Workbench，改用 `@aheart-ui/ai/workbench`。需要原全量注册时使用 `@aheart-ui/ai/full`。两种用法都应显式安装可选 DND peer。Chat、Agent 和 AIForm 无需安装 DND。
- 运行时 JS 不加载 CSS。显式导入 theme 和组件样式，或使用 full.css。Resolver 的 CSS 模式只注入组件及其声明依赖样式。旧 style.css 保留。
- core 和 AI 候选均为 `2.0.0-alpha.0`，DND 沿用公开 `1.1.0`。预发布仅使用 `next`，公开 `latest` 保持 1.x。[迁移与回退指南](docs/guide/v2-migration.md)

## [1.4.0] - 2026-11-17

- `aheart-ui@1.4.0` 和 `@aheart-ui/ai@1.2.0` 已发布，`@aheart-ui/dnd@1.1.0` 保持不变。
- **AI 1.2.0 需要 aheart-ui ≥ 1.4.0**（peer 为 `^1.4.0`，即兼容的 1.x）。AIForm 改用精确公开子入口；公开 1.3 及更早版本缺少这些路径。
- 全部Ready组件的子入口/CSS与Resolver由同一清单驱动；复合AI样式包含声明依赖闭包，模块图/JS预算与分类CSS门禁进入独立tarball消费检查。
- 新增可选Vite开发import诊断，以及1.3→2.0迁移表与codemod；生产构建不输出弃用诊断，旧对象身份和兼容入口保留。
- V1 公开精确版本双试点通过，tag 与发布附件见 [v1.4.0 Release](https://github.com/Labradorca/aheart-ui/releases/tag/v1.4.0)。

## [1.3.0] - 2026-11-16

- 新增 Combobox 单选、筛选、键盘导航和独立入口 / CSS。
- Popover、Tooltip、Dropdown、Modal、Drawer、Select 及 Picker 族复用浮层定位、关闭和焦点逻辑。
- AI 1.1.0 新增 Chat / Agent / Workbench 子入口与显式 CSS；DND 1.1.0 新增 Sortable / Draggable / DropZone / DragOverlay 子入口及样式。
- 新增基于公开入口清单的 Resolver、实际 Vite 自动导入验证和迁移指南。
- 保留 v1 根插件与旧 AI / DND 根入口；本轮不进行 v2 破坏性变更。
- 公开 registry 消费试点支持精确版本；物理 iOS Safari 必测要求由负责人取消，浏览器自动化保留。

## [1.2.0] - 2026-11-16

- 新增 Button、Modal、Select 的公共子入口，提供 ESM / CommonJS 与严格类型。
- 新增显式 theme / 组件 / full CSS；保留根插件、旧样式和 es/lib 入口。
- 通过实际包的模块图、样式预算、SSR / hydration 和原生 Tab 回归验证按需消费。
- 仅发布核心包；AI / DND 继续使用公开 1.0.0。物理 iOS Safari 已由负责人取消必测要求。

## [1.1.1] - 2026-11-16

### 修复

- 修复 CardMeta、CardGrid 的公开声明在 `skipLibCheck: false` 与 Vue 3.5 类型下触发的 TS2344 错误，保留组件 props、slots、别名和安装类型。
- 修复默认颜色按钮悬停时的文字对比度。新增 `--aheart-color-primary-text-hover`，允许主题独立设置悬停文字颜色。
- 发布门禁增加实际 tarball 的严格消费类型检查，覆盖工作区 Vue 与 Vue 3.5.44。

### 发布范围

- 仅发布 `aheart-ui@1.1.1`；`@aheart-ui/dnd@1.0.0` 和 `@aheart-ui/ai@1.0.0` 继续使用已发布版本。
- 此补丁基于 `v1.1.0`，不包含后续组件子入口、CSS 拆分、Combobox 或浮层迁移。
- 主线 `63ddb9a` 的连续 10 次 QG5 测量通过，flaky rate 为 0；物理 iOS Safari 当时延期，现已由负责人取消。npm、tag 与 Release 已完成，公开安装验证通过。

## [1.1.0] - 2026-09-29

### 新增与改进

- Select、Tree、TreeSelect、Cascader 与 Table 增加大数据虚拟化能力及相应交互保护。
- Form.List、表格分页与选择、Picker/Upload、浮层焦点管理、DnD/Splitter 和 AI 工作流稳定性得到增强。
- 核心包根入口支持更有效的按需导入；CI 增加分支覆盖率、独立 tarball 消费和五浏览器质量门禁。
- 更新 PostCSS 与 nanoid 依赖以修复已知安全问题，并验证 ESM、CommonJS、类型、CSS、SSR 与 hydration 消费路径。

### 发布范围

- 核心组件包：`aheart-ui@1.1.0`。
- 首次发布的领域包：`@aheart-ui/dnd@1.0.0`、`@aheart-ui/ai@1.0.0`。
- 三个 tarball 必须从同一主线提交生成；公开 registry 安装验证和 tag/Release 状态以该提交的发布证据为准。

## [1.0.0] - 2026-09-01

### 新增

- 48 个中文 Ready 组件与完整 VitePress 演示站。
- `aheart-ui` 基础组件、表单、数据展示、浮层、日期时间、树和 Splitter。
- `@aheart-ui/dnd` 通用拖拽、排序、跨列表移动与键盘替代操作。
- `@aheart-ui/ai` AI 对话、智能表单和 Agent 工作台。
- 中英文运行时 locale pack、统一浮层定位、Presence 动效和 reduced-motion 支持。
- 基于共享 Picker 内核的 DatePicker、TimePicker、DateRangePicker 与 TimeRangePicker，支持多模式、预设、12 小时制、禁用规则和字符串业务值。
- AIForm 的 `date-range` 与 `time-range` 安全 schema 字段映射。
- 三包 tarball 合约验证、全量 CI 和发布前质量门禁。

### 发布状态

- 核心包 `aheart-ui@1.0.0` 已于 2026-09-01 发布到 npm。
- `@aheart-ui/dnd` 与 `@aheart-ui/ai` 尚未发布；Git tag 与 GitHub Release 尚未创建。
- 本版本按产品决策继续暂停英文文档。
