# 更新日志

Aheart UI 的重要变更统一记录在本文件中。

## 本地候选（未发布）- 2026-11-17

- 经负责人单独授权，为新 peer 版本组合验收将本地版本设为 `aheart-ui@1.4.0`、`@aheart-ui/ai@1.2.0`；`@aheart-ui/dnd@1.1.0` 保持不变。
- **AI 1.2.0 需要 aheart-ui ≥ 1.4.0**（peer 为 `^1.4.0`，即兼容的 1.x）。AIForm 改用精确公开子入口；公开 1.3 及更早版本缺少这些路径。
- 本节只记录本地候选，不表示已开 PR、合并、部署、发布 npm 或打 tag；V1 全量验收仍在进行。

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
