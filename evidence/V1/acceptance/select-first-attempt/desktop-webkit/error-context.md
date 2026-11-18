# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: d4-select-virtual.spec.ts >> Select virtual preserves stable middle keys through insertion deletion reorder and active removal
- Location: e2e/d4-select-virtual.spec.ts:52:5

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false

Call Log:
- Timeout 5000ms exceeded while waiting on the predicate
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - link "跳至正文" [ref=e4]:
    - /url: "#VPContent"
  - banner:
    - generic:
      - generic:
        - generic:
          - link "Aheart UI" [ref=e6]:
            - /url: /
            - generic [ref=e7]: Aheart UI
          - generic [ref=e8]:
            - button "搜索文档" [ref=e11] [cursor=pointer]:
              - generic [ref=e14]: 搜索文档
              - generic [ref=e15]:
                - generic [ref=e16]: ⌘
                - generic [ref=e17]: K
            - navigation "Main Navigation" [ref=e18]:
              - generic [ref=e19]: Main Navigation
              - link "指南" [ref=e20]:
                - /url: /guide/introduction.html
                - generic [ref=e21]: 指南
              - button "组件" [ref=e23] [cursor=pointer]:
                - generic [ref=e25]: 组件
              - link "AI 产品" [ref=e27]:
                - /url: /ai/overview.html
                - generic [ref=e28]: AI 产品
              - button "扩展能力" [ref=e30] [cursor=pointer]:
                - generic [ref=e32]: 扩展能力
              - button "项目" [ref=e35] [cursor=pointer]:
                - generic [ref=e37]: 项目
            - switch "Switch to dark theme" [ref=e40] [cursor=pointer]
            - link "GitHub" [ref=e46]:
              - /url: https://github.com/Labradorca/aheart-ui
              - img [ref=e47]
  - complementary [ref=e49]:
    - navigation "Sidebar Navigation" [ref=e51]:
      - generic [ref=e52]: Sidebar Navigation
      - link "组合组件 · 产品模式" [ref=e59]:
        - /url: /composed/overview.html
        - paragraph [ref=e60]: 组合组件 · 产品模式
      - generic [ref=e62]:
        - button "表单与选择工作流" [ref=e63]:
          - heading "表单与选择工作流" [level=2] [ref=e65]
        - generic [ref=e66]:
          - link "Select" [ref=e70]:
            - /url: /components/select.html
            - paragraph [ref=e71]: Select
          - link "DatePicker" [ref=e75]:
            - /url: /components/date-picker.html
            - paragraph [ref=e76]: DatePicker
          - link "TimePicker" [ref=e80]:
            - /url: /components/time-picker.html
            - paragraph [ref=e81]: TimePicker
          - link "Cascader" [ref=e85]:
            - /url: /components/cascader.html
            - paragraph [ref=e86]: Cascader
          - link "TreeSelect" [ref=e90]:
            - /url: /components/tree-select.html
            - paragraph [ref=e91]: TreeSelect
          - link "Upload" [ref=e95]:
            - /url: /components/upload.html
            - paragraph [ref=e96]: Upload
          - link "Form" [ref=e100]:
            - /url: /components/form.html
            - paragraph [ref=e101]: Form
      - generic [ref=e103]:
        - button "数据与工作区" [ref=e104]:
          - heading "数据与工作区" [level=2] [ref=e106]
        - generic [ref=e107]:
          - link "Table" [ref=e111]:
            - /url: /components/table.html
            - paragraph [ref=e112]: Table
          - link "Pagination" [ref=e116]:
            - /url: /components/pagination.html
            - paragraph [ref=e117]: Pagination
          - link "Tree" [ref=e121]:
            - /url: /components/tree.html
            - paragraph [ref=e122]: Tree
          - link "Splitter" [ref=e126]:
            - /url: /components/splitter.html
            - paragraph [ref=e127]: Splitter
      - generic [ref=e129]:
        - button "浮层与上下文交互" [ref=e130]:
          - heading "浮层与上下文交互" [level=2] [ref=e132]
        - generic [ref=e133]:
          - link "Dropdown" [ref=e137]:
            - /url: /components/dropdown.html
            - paragraph [ref=e138]: Dropdown
          - link "Tooltip" [ref=e142]:
            - /url: /components/tooltip.html
            - paragraph [ref=e143]: Tooltip
          - link "Popover / Popconfirm" [ref=e147]:
            - /url: /components/popover.html
            - paragraph [ref=e148]: Popover / Popconfirm
          - link "Modal / Drawer" [ref=e152]:
            - /url: /components/modal.html
            - paragraph [ref=e153]: Modal / Drawer
      - generic [ref=e155]:
        - button "Combobox 与组合能力" [ref=e156]:
          - heading "Combobox 与组合能力" [level=2] [ref=e158]
        - link "Combobox" [ref=e163]:
          - /url: /components/combobox.html
          - paragraph [ref=e164]: Combobox
  - generic [ref=e167]:
    - navigation "本页内容" [ref=e173]:
      - generic [ref=e174]:
        - heading "本页内容" [level=2] [ref=e176]
        - list [ref=e177]:
          - listitem [ref=e178]:
            - link "基础用法" [ref=e179]:
              - /url: "#基础用法"
          - listitem [ref=e180]:
            - link "多选与清除" [ref=e181]:
              - /url: "#多选与清除"
          - listitem [ref=e182]:
            - link "焦点控制" [ref=e183]:
              - /url: "#焦点控制"
          - listitem [ref=e184]:
            - link "搜索" [ref=e185]:
              - /url: "#搜索"
          - listitem [ref=e186]:
            - link "字段映射与排序" [ref=e187]:
              - /url: "#字段映射与排序"
          - listitem [ref=e188]:
            - link "前后缀与变体" [ref=e189]:
              - /url: "#前后缀与变体"
          - listitem [ref=e190]:
            - link "默认值与加载" [ref=e191]:
              - /url: "#默认值与加载"
          - listitem [ref=e192]:
            - link "自定义清除与语义化样式" [ref=e193]:
              - /url: "#自定义清除与语义化样式"
          - listitem [ref=e194]:
            - link "Tags 与数量限制" [ref=e195]:
              - /url: "#tags-与数量限制"
          - listitem [ref=e196]:
            - link "状态与全局配置" [ref=e197]:
              - /url: "#状态与全局配置"
          - listitem [ref=e198]:
            - link "大量选项与虚拟列表" [ref=e199]:
              - /url: "#大量选项与虚拟列表"
            - list [ref=e200]:
              - listitem [ref=e201]:
                - link "Virtual 配置" [ref=e202]:
                  - /url: "#virtual-配置"
              - listitem [ref=e203]:
                - link "打开期间的布局与数据变化" [ref=e204]:
                  - /url: "#打开期间的布局与数据变化"
          - listitem [ref=e205]:
            - link "API" [ref=e206]:
              - /url: "#api"
            - list [ref=e207]:
              - listitem [ref=e208]:
                - link "SelectOption" [ref=e209]:
                  - /url: "#selectoption"
              - listitem [ref=e210]:
                - link "SelectVirtualConfig" [ref=e211]:
                  - /url: "#selectvirtualconfig"
              - listitem [ref=e212]:
                - link "SelectFieldNames" [ref=e213]:
                  - /url: "#selectfieldnames"
              - listitem [ref=e214]:
                - link "SelectFilterSortInfo" [ref=e215]:
                  - /url: "#selectfiltersortinfo"
          - listitem [ref=e216]:
            - link "Methods" [ref=e217]:
              - /url: "#methods"
          - listitem [ref=e218]:
            - link "Events" [ref=e219]:
              - /url: "#events"
          - listitem [ref=e220]:
            - link "Slots" [ref=e221]:
              - /url: "#slots"
          - listitem [ref=e222]:
            - link "Semantic DOM" [ref=e223]:
              - /url: "#semantic-dom"
          - listitem [ref=e224]:
            - link "Theme Tokens" [ref=e225]:
              - /url: "#theme-tokens"
    - generic [ref=e227]:
      - generic [ref=e228]:
        - navigation "文档路径" [ref=e229]:
          - link "Aheart UI" [ref=e230]:
            - /url: /
          - generic [ref=e231]: /
          - link "组件文档" [ref=e232]:
            - /url: /components/overview
        - navigation "组件定位" [ref=e233]:
          - generic [ref=e234]: 组合组件
          - generic [ref=e235]: aheart-ui
          - generic [ref=e236]:
            - generic [ref=e237]: 相关组件
            - link "Splitter" [ref=e238]:
              - /url: /components/splitter
            - link "Dropdown" [ref=e239]:
              - /url: /components/dropdown
            - link "DatePicker" [ref=e240]:
              - /url: /components/date-picker
            - link "TimePicker" [ref=e241]:
              - /url: /components/time-picker
      - main [ref=e242]:
        - generic [ref=e244]:
          - heading "Select 选择器 已完成 Permalink to \"Select 选择器 <span class=\"aheart-status aheart-status--ready\">已完成</span>\"" [level=1] [ref=e245]:
            - text: Select 选择器
            - generic [ref=e246]: 已完成
            - link "Permalink to \"Select 选择器 <span class=\"aheart-status aheart-status--ready\">已完成</span>\"" [ref=e247]:
              - /url: "#select-选择器-已完成"
              - text: "#"
          - paragraph [ref=e248]: Select lets users choose one or more values from a fixed option list, with search, variants, adornments, and multi-value limits.
          - heading "基础用法 Permalink to \"基础用法\"" [level=2] [ref=e249]:
            - text: 基础用法
            - link "Permalink to \"基础用法\"" [ref=e250]:
              - /url: "#基础用法"
              - text: "#"
          - generic [ref=e251]:
            - generic [ref=e252]: 交互示例
            - button "查看代码" [ref=e253] [cursor=pointer]
          - generic [ref=e254]:
            - generic [ref=e255]: Choose fruit
            - combobox "Choose fruit" [ref=e257] [cursor=pointer]:
              - generic [ref=e259]: Banana
              - img [ref=e262]
          - heading "多选与清除 Permalink to \"多选与清除\"" [level=2] [ref=e264]:
            - text: 多选与清除
            - link "Permalink to \"多选与清除\"" [ref=e265]:
              - /url: "#多选与清除"
              - text: "#"
          - generic [ref=e266]:
            - generic [ref=e267]: 交互示例
            - button "查看代码" [ref=e268] [cursor=pointer]
          - combobox [ref=e271] [cursor=pointer]:
            - generic [ref=e272]:
              - generic [ref=e273]:
                - generic [ref=e274]: Apple
                - button "移除 Apple" [ref=e275]: ×
              - generic [ref=e276]:
                - generic [ref=e277]: Banana
                - button "移除 Banana" [ref=e278]: ×
            - button "清除" [ref=e279]: ×
            - img [ref=e282]
          - heading "焦点控制 Permalink to \"焦点控制\"" [level=2] [ref=e284]:
            - text: 焦点控制
            - link "Permalink to \"焦点控制\"" [ref=e285]:
              - /url: "#焦点控制"
              - text: "#"
          - generic [ref=e286]:
            - generic [ref=e287]: 交互示例
            - button "查看代码" [ref=e288] [cursor=pointer]
          - generic [ref=e290]:
            - combobox [ref=e293] [cursor=pointer]:
              - generic [ref=e295]: Focusable select
              - img [ref=e298]
            - button "Focus" [ref=e301] [cursor=pointer]:
              - generic [ref=e302]: Focus
            - button "Blur" [ref=e304] [cursor=pointer]:
              - generic [ref=e305]: Blur
          - heading "搜索 Permalink to \"搜索\"" [level=2] [ref=e306]:
            - text: 搜索
            - link "Permalink to \"搜索\"" [ref=e307]:
              - /url: "#搜索"
              - text: "#"
          - generic [ref=e308]:
            - generic [ref=e309]: 交互示例
            - button "查看代码" [ref=e310] [cursor=pointer]
          - generic [ref=e313] [cursor=pointer]:
            - combobox "Search fruit" [ref=e315]
            - img [ref=e318]
          - heading "字段映射与排序 Permalink to \"字段映射与排序\"" [level=2] [ref=e320]:
            - text: 字段映射与排序
            - link "Permalink to \"字段映射与排序\"" [ref=e321]:
              - /url: "#字段映射与排序"
              - text: "#"
          - generic [ref=e322]:
            - generic [ref=e323]: 交互示例
            - button "查看代码" [ref=e324] [cursor=pointer]
          - generic [ref=e327] [cursor=pointer]:
            - combobox [ref=e329]
            - img [ref=e332]
          - heading "前后缀与变体 Permalink to \"前后缀与变体\"" [level=2] [ref=e334]:
            - text: 前后缀与变体
            - link "Permalink to \"前后缀与变体\"" [ref=e335]:
              - /url: "#前后缀与变体"
              - text: "#"
          - generic [ref=e336]:
            - generic [ref=e337]: 交互示例
            - button "查看代码" [ref=e338] [cursor=pointer]
          - generic [ref=e340]:
            - combobox [ref=e343] [cursor=pointer]:
              - generic [ref=e344]: Level
              - generic [ref=e346]: "2"
              - generic [ref=e347]: ⌄
            - combobox [ref=e350] [cursor=pointer]:
              - generic [ref=e352]: Apple
              - img [ref=e355]
            - combobox [ref=e359] [cursor=pointer]:
              - generic [ref=e361]: Apple
              - img [ref=e364]
          - heading "默认值与加载 Permalink to \"默认值与加载\"" [level=2] [ref=e366]:
            - text: 默认值与加载
            - link "Permalink to \"默认值与加载\"" [ref=e367]:
              - /url: "#默认值与加载"
              - text: "#"
          - generic [ref=e368]:
            - generic [ref=e369]: 交互示例
            - button "查看代码" [ref=e370] [cursor=pointer]
          - generic [ref=e372]:
            - combobox [ref=e375] [cursor=pointer]:
              - generic [ref=e377]: Banana
              - img [ref=e380]
            - generic [ref=e383]:
              - combobox [ref=e384] [cursor=pointer]:
                - generic [ref=e386]: Loading options
                - generic [ref=e387]: Loading
              - status [ref=e388]: 加载中
          - heading "自定义清除与语义化样式 Permalink to \"自定义清除与语义化样式\"" [level=2] [ref=e389]:
            - text: 自定义清除与语义化样式
            - link "Permalink to \"自定义清除与语义化样式\"" [ref=e390]:
              - /url: "#自定义清除与语义化样式"
              - text: "#"
          - generic [ref=e391]:
            - generic [ref=e392]: 交互示例
            - button "查看代码" [ref=e393] [cursor=pointer]
          - combobox [ref=e396] [cursor=pointer]:
            - generic [ref=e398]: Apple
            - button "清除" [ref=e399]: clear
            - img [ref=e402]
          - heading "Tags 与数量限制 Permalink to \"Tags 与数量限制\"" [level=2] [ref=e404]:
            - text: Tags 与数量限制
            - link "Permalink to \"Tags 与数量限制\"" [ref=e405]:
              - /url: "#tags-与数量限制"
              - text: "#"
          - generic [ref=e406]:
            - generic [ref=e407]: 交互示例
            - button "查看代码" [ref=e408] [cursor=pointer]
          - generic [ref=e411] [cursor=pointer]:
            - generic [ref=e412]:
              - generic [ref=e413]:
                - generic [ref=e414]: Apple
                - button "移除 Apple" [ref=e415]: ×
              - combobox [ref=e416]
            - img [ref=e419]
          - paragraph [ref=e421]:
            - code [ref=e422]: tags
            - text: 模式会自动提供文本输入；
            - code [ref=e423]: showSearch
            - text: 在示例中显式写出，以强调可搜索和按 Enter 创建标签的交互。
          - heading "状态与全局配置 Permalink to \"状态与全局配置\"" [level=2] [ref=e424]:
            - text: 状态与全局配置
            - link "Permalink to \"状态与全局配置\"" [ref=e425]:
              - /url: "#状态与全局配置"
              - text: "#"
          - generic [ref=e426]:
            - generic [ref=e427]: 交互示例
            - button "查看代码" [ref=e428] [cursor=pointer]
          - combobox [disabled] [ref=e432]:
            - generic [ref=e434]: Disabled
            - img [ref=e437]
          - heading "大量选项与虚拟列表 Permalink to \"大量选项与虚拟列表\"" [level=2] [ref=e439]:
            - text: 大量选项与虚拟列表
            - link "Permalink to \"大量选项与虚拟列表\"" [ref=e440]:
              - /url: "#大量选项与虚拟列表"
              - text: "#"
          - paragraph [ref=e441]:
            - code [ref=e442]: virtual
            - text: 默认关闭。启用后 Select 只渲染视口附近的选项，适合 1000 项以上的静态列表；下面的示例保留稳定的字符串 id，并用交错文案模拟不同高度的行：
          - generic [ref=e443]:
            - generic [ref=e444]: 交互示例
            - button "查看代码" [ref=e445] [cursor=pointer]
          - region "Select 虚拟列表示例" [ref=e446]:
            - button "切换首项高度" [ref=e447] [cursor=pointer]:
              - generic [ref=e448]: 切换首项高度
            - combobox "虚拟选项" [ref=e450] [cursor=pointer]:
              - generic [ref=e452]: Row 0999 · detail line
              - img [ref=e455]
          - heading "Virtual 配置 Permalink to \"Virtual 配置\"" [level=3] [ref=e457]:
            - text: Virtual 配置
            - link "Permalink to \"Virtual 配置\"" [ref=e458]:
              - /url: "#virtual-配置"
              - text: "#"
          - paragraph [ref=e459]: 搜索无匹配项时保留正常的空状态提示，不把提示压入零高度的虚拟窗口：
          - region "Select 虚拟搜索示例" [ref=e460]:
            - generic [ref=e462] [cursor=pointer]:
              - combobox "虚拟搜索选项" [ref=e464]
              - img [ref=e467]
          - paragraph [ref=e469]:
            - code [ref=e470]: virtual
            - text: 可以是布尔值或配置对象。
            - code [ref=e471]: height
            - text: 是浮层外框的高度上限（默认
            - code [ref=e472]: "288"
            - text: ），
            - code [ref=e473]: estimateSize
            - text: 只是初始行高估计（默认
            - code [ref=e474]: "32"
            - text: ），实际行高会动态测量，不会因估计值裁切内容；
            - code [ref=e475]: overscan
            - text: 为视口两侧额外渲染的行数（默认
            - code [ref=e476]: "3"
            - text: ）。无效字段会独立回退到默认值并在开发环境告警。
          - paragraph [ref=e477]: 虚拟列表只属于 Select，不会泛化到其他组件。它是静态依赖，关闭虚拟化仍会产生相应包体成本；默认关闭保持完整 DOM 与现有行为。
          - heading "打开期间的布局与数据变化 Permalink to \"打开期间的布局与数据变化\"" [level=3] [ref=e478]:
            - text: 打开期间的布局与数据变化
            - link "Permalink to \"打开期间的布局与数据变化\"" [ref=e479]:
              - /url: "#打开期间的布局与数据变化"
              - text: "#"
          - paragraph [ref=e480]:
            - text: 下面的控制模拟外部布局和数据更新。宽度通过容器及
            - code [ref=e481]: popupMatchSelectWidth
            - text: 同步控制；字体通过既有
            - code [ref=e482]: styles.option
            - text: 设置。稳定 value 不随数组索引变化，重排并不承诺像素位置绝对不动。
          - region "Select 虚拟契约补证" [ref=e483]:
            - button "窄容器" [ref=e484] [cursor=pointer]:
              - generic [ref=e485]: 窄容器
            - button "大字体" [ref=e486] [cursor=pointer]:
              - generic [ref=e487]: 大字体
            - button "视口前插入" [ref=e488] [cursor=pointer]:
              - generic [ref=e489]: 视口前插入
            - button "删除前置项" [ref=e490] [cursor=pointer]:
              - generic [ref=e491]: 删除前置项
            - button "稳定key重排" [ref=e492] [cursor=pointer]:
              - generic [ref=e493]: 稳定key重排
            - button "删除跟踪项" [ref=e494] [cursor=pointer]:
              - generic [ref=e495]: 删除跟踪项
            - combobox "虚拟契约选项" [active] [ref=e498] [cursor=pointer]:
              - generic [ref=e500]: Entry 0500
              - img [ref=e503]
            - status [ref=e505]: probe-0500
          - heading "API Permalink to \"API\"" [level=2] [ref=e506]:
            - text: API
            - link "Permalink to \"API\"" [ref=e507]:
              - /url: "#api"
              - text: "#"
          - table [ref=e508]:
            - rowgroup [ref=e509]:
              - row "属性 说明 类型 默认值" [ref=e510]:
                - columnheader "属性" [ref=e511]
                - columnheader "说明" [ref=e512]
                - columnheader "类型" [ref=e513]
                - columnheader "默认值" [ref=e514]
            - rowgroup [ref=e515]:
              - row "modelValue 当前值 string | number | (string | number)[] -" [ref=e516]:
                - cell "modelValue" [ref=e517]
                - cell "当前值" [ref=e518]
                - cell "string | number | (string | number)[]" [ref=e519]:
                  - code [ref=e520]: string
                  - text: "|"
                  - code [ref=e521]: number
                  - text: "|"
                  - code [ref=e522]: (string | number)[]
                - cell "-" [ref=e523]
              - row "id combobox 触发器 id string -" [ref=e524]:
                - cell "id" [ref=e525]
                - cell "combobox 触发器 id" [ref=e526]
                - cell "string" [ref=e527]:
                  - code [ref=e528]: string
                - cell "-" [ref=e529]
              - row "labelledBy 为 combobox 提供可访问名称的标签元素 id string -" [ref=e530]:
                - cell "labelledBy" [ref=e531]
                - cell "为 combobox 提供可访问名称的标签元素 id" [ref=e532]
                - cell "string" [ref=e533]:
                  - code [ref=e534]: string
                - cell "-" [ref=e535]
              - row "ariaLabelledby labelledBy 的兼容别名 string -" [ref=e536]:
                - cell "ariaLabelledby" [ref=e537]
                - cell "labelledBy 的兼容别名" [ref=e538]:
                  - code [ref=e539]: labelledBy
                  - text: 的兼容别名
                - cell "string" [ref=e540]:
                  - code [ref=e541]: string
                - cell "-" [ref=e542]
              - row "name 表单提交字段名 string -" [ref=e543]:
                - cell "name" [ref=e544]
                - cell "表单提交字段名" [ref=e545]
                - cell "string" [ref=e546]:
                  - code [ref=e547]: string
                - cell "-" [ref=e548]
              - row "defaultValue 非受控默认值 string | number | (string | number)[] -" [ref=e549]:
                - cell "defaultValue" [ref=e550]
                - cell "非受控默认值" [ref=e551]
                - cell "string | number | (string | number)[]" [ref=e552]:
                  - code [ref=e553]: string
                  - text: "|"
                  - code [ref=e554]: number
                  - text: "|"
                  - code [ref=e555]: (string | number)[]
                - cell "-" [ref=e556]
              - row "options 选项列表 SelectOption[] []" [ref=e557]:
                - cell "options" [ref=e558]
                - cell "选项列表" [ref=e559]
                - cell "SelectOption[]" [ref=e560]:
                  - code [ref=e561]: SelectOption[]
                - cell "[]" [ref=e562]:
                  - code [ref=e563]: "[]"
              - row "placeholder 占位提示 string -" [ref=e564]:
                - cell "placeholder" [ref=e565]
                - cell "占位提示" [ref=e566]
                - cell "string" [ref=e567]:
                  - code [ref=e568]: string
                - cell "-" [ref=e569]
              - row "prefix 选择器前缀内容 VNodeChild -" [ref=e570]:
                - cell "prefix" [ref=e571]
                - cell "选择器前缀内容" [ref=e572]
                - cell "VNodeChild" [ref=e573]:
                  - code [ref=e574]: VNodeChild
                - cell "-" [ref=e575]
              - row "suffixIcon 选择器后缀图标内容 VNodeChild -" [ref=e576]:
                - cell "suffixIcon" [ref=e577]
                - cell "选择器后缀图标内容" [ref=e578]
                - cell "VNodeChild" [ref=e579]:
                  - code [ref=e580]: VNodeChild
                - cell "-" [ref=e581]
              - row "loadingIcon 自定义加载图标 VNodeChild -" [ref=e582]:
                - cell "loadingIcon" [ref=e583]
                - cell "自定义加载图标" [ref=e584]
                - cell "VNodeChild" [ref=e585]:
                  - code [ref=e586]: VNodeChild
                - cell "-" [ref=e587]
              - row "size 选择器尺寸 large | middle | small ConfigProvider size" [ref=e588]:
                - cell "size" [ref=e589]
                - cell "选择器尺寸" [ref=e590]
                - cell "large | middle | small" [ref=e591]:
                  - code [ref=e592]: large
                  - text: "|"
                  - code [ref=e593]: middle
                  - text: "|"
                  - code [ref=e594]: small
                - cell "ConfigProvider size" [ref=e595]
              - row "disabled 是否禁用 boolean ConfigProvider disabled" [ref=e596]:
                - cell "disabled" [ref=e597]
                - cell "是否禁用" [ref=e598]
                - cell "boolean" [ref=e599]:
                  - code [ref=e600]: boolean
                - cell "ConfigProvider disabled" [ref=e601]
              - row "status 校验状态 error | warning -" [ref=e602]:
                - cell "status" [ref=e603]
                - cell "校验状态" [ref=e604]
                - cell "error | warning" [ref=e605]:
                  - code [ref=e606]: error
                  - text: "|"
                  - code [ref=e607]: warning
                - cell "-" [ref=e608]
              - row "variant 选择器变体 outlined | borderless | filled | underlined outlined" [ref=e609]:
                - cell "variant" [ref=e610]
                - cell "选择器变体" [ref=e611]
                - cell "outlined | borderless | filled | underlined" [ref=e612]:
                  - code [ref=e613]: outlined
                  - text: "|"
                  - code [ref=e614]: borderless
                  - text: "|"
                  - code [ref=e615]: filled
                  - text: "|"
                  - code [ref=e616]: underlined
                - cell "outlined" [ref=e617]:
                  - code [ref=e618]: outlined
              - row "bordered 是否显示边框，设为 false 时等同 borderless boolean true" [ref=e619]:
                - cell "bordered" [ref=e620]
                - cell "是否显示边框，设为 false 时等同 borderless" [ref=e621]:
                  - text: 是否显示边框，设为
                  - code [ref=e622]: "false"
                  - text: 时等同
                  - code [ref=e623]: borderless
                - cell "boolean" [ref=e624]:
                  - code [ref=e625]: boolean
                - cell "true" [ref=e626]:
                  - code [ref=e627]: "true"
              - 'row "allowClear 是否显示清除按钮，可配置清除图标 boolean | { clearIcon?: VNodeChild } false" [ref=e628]':
                - cell "allowClear" [ref=e629]
                - cell "是否显示清除按钮，可配置清除图标" [ref=e630]
                - 'cell "boolean | { clearIcon?: VNodeChild }" [ref=e631]':
                  - code [ref=e632]: "boolean | { clearIcon?: VNodeChild }"
                - cell "false" [ref=e633]:
                  - code [ref=e634]: "false"
              - row "mode 选择模式 multiple | tags -" [ref=e635]:
                - cell "mode" [ref=e636]
                - cell "选择模式" [ref=e637]
                - cell "multiple | tags" [ref=e638]:
                  - code [ref=e639]: multiple
                  - text: "|"
                  - code [ref=e640]: tags
                - cell "-" [ref=e641]
              - row "open 受控下拉面板状态 boolean -" [ref=e642]:
                - cell "open" [ref=e643]
                - cell "受控下拉面板状态" [ref=e644]
                - cell "boolean" [ref=e645]:
                  - code [ref=e646]: boolean
                - cell "-" [ref=e647]
              - row "defaultOpen 非受控初始展开状态 boolean false" [ref=e648]:
                - cell "defaultOpen" [ref=e649]
                - cell "非受控初始展开状态" [ref=e650]
                - cell "boolean" [ref=e651]:
                  - code [ref=e652]: boolean
                - cell "false" [ref=e653]:
                  - code [ref=e654]: "false"
              - row "placement 下拉面板位置 topLeft | topRight | bottomLeft | bottomRight bottomLeft" [ref=e655]:
                - cell "placement" [ref=e656]
                - cell "下拉面板位置" [ref=e657]
                - cell "topLeft | topRight | bottomLeft | bottomRight" [ref=e658]:
                  - code [ref=e659]: topLeft
                  - text: "|"
                  - code [ref=e660]: topRight
                  - text: "|"
                  - code [ref=e661]: bottomLeft
                  - text: "|"
                  - code [ref=e662]: bottomRight
                - cell "bottomLeft" [ref=e663]:
                  - code [ref=e664]: bottomLeft
              - row "autoAdjustOverflow 是否在视口边缘自动翻转和位移 boolean true" [ref=e665]:
                - cell "autoAdjustOverflow" [ref=e666]
                - cell "是否在视口边缘自动翻转和位移" [ref=e667]
                - cell "boolean" [ref=e668]:
                  - code [ref=e669]: boolean
                - cell "true" [ref=e670]:
                  - code [ref=e671]: "true"
              - 'row "getPopupContainer 自定义浮层挂载容器 (triggerNode: HTMLElement) => HTMLElement document.body" [ref=e672]':
                - cell "getPopupContainer" [ref=e673]
                - cell "自定义浮层挂载容器" [ref=e674]
                - 'cell "(triggerNode: HTMLElement) => HTMLElement" [ref=e675]':
                  - code [ref=e676]: "(triggerNode: HTMLElement) => HTMLElement"
                - cell "document.body" [ref=e677]:
                  - code [ref=e678]: document.body
              - row "popupMatchSelectWidth 浮层是否匹配触发器宽度，也可指定像素宽度 boolean | number true" [ref=e679]:
                - cell "popupMatchSelectWidth" [ref=e680]
                - cell "浮层是否匹配触发器宽度，也可指定像素宽度" [ref=e681]
                - cell "boolean | number" [ref=e682]:
                  - code [ref=e683]: boolean
                  - text: "|"
                  - code [ref=e684]: number
                - cell "true" [ref=e685]:
                  - code [ref=e686]: "true"
              - row "virtual 是否启用虚拟列表，也可配置浮层高度、行高估计与额外渲染行数 boolean | SelectVirtualConfig false" [ref=e687]:
                - cell "virtual" [ref=e688]
                - cell "是否启用虚拟列表，也可配置浮层高度、行高估计与额外渲染行数" [ref=e689]
                - cell "boolean | SelectVirtualConfig" [ref=e690]:
                  - code [ref=e691]: boolean
                  - text: "|"
                  - code [ref=e692]: SelectVirtualConfig
                - cell "false" [ref=e693]:
                  - code [ref=e694]: "false"
              - row "showSearch 是否显示搜索输入 boolean false" [ref=e695]:
                - cell "showSearch" [ref=e696]
                - cell "是否显示搜索输入" [ref=e697]
                - cell "boolean" [ref=e698]:
                  - code [ref=e699]: boolean
                - cell "false" [ref=e700]:
                  - code [ref=e701]: "false"
              - row "searchValue 受控搜索文本 string -" [ref=e702]:
                - cell "searchValue" [ref=e703]
                - cell "受控搜索文本" [ref=e704]
                - cell "string" [ref=e705]:
                  - code [ref=e706]: string
                - cell "-" [ref=e707]
              - row "optionFilterProp 默认搜索匹配的选项字段 string label" [ref=e708]:
                - cell "optionFilterProp" [ref=e709]
                - cell "默认搜索匹配的选项字段" [ref=e710]
                - cell "string" [ref=e711]:
                  - code [ref=e712]: string
                - cell "label" [ref=e713]:
                  - code [ref=e714]: label
              - 'row "filterOption 自定义过滤逻辑，设为 false 时不进行本地过滤 boolean | (inputValue: string, option: SelectOption) => boolean true" [ref=e715]':
                - cell "filterOption" [ref=e716]
                - cell "自定义过滤逻辑，设为 false 时不进行本地过滤" [ref=e717]:
                  - text: 自定义过滤逻辑，设为
                  - code [ref=e718]: "false"
                  - text: 时不进行本地过滤
                - 'cell "boolean | (inputValue: string, option: SelectOption) => boolean" [ref=e719]':
                  - code [ref=e720]: boolean
                  - text: "|"
                  - code [ref=e721]: "(inputValue: string, option: SelectOption) => boolean"
                - cell "true" [ref=e722]:
                  - code [ref=e723]: "true"
              - row "filterSort 自定义过滤后排序 (optionA, optionB, info) => number -" [ref=e724]:
                - cell "filterSort" [ref=e725]
                - cell "自定义过滤后排序" [ref=e726]
                - cell "(optionA, optionB, info) => number" [ref=e727]:
                  - code [ref=e728]: (optionA, optionB, info) => number
                - cell "-" [ref=e729]
              - 'row "fieldNames 自定义选项字段名 SelectFieldNames { label: ''label'', value: ''value'', disabled: ''disabled'' }" [ref=e730]':
                - cell "fieldNames" [ref=e731]
                - cell "自定义选项字段名" [ref=e732]
                - cell "SelectFieldNames" [ref=e733]:
                  - code [ref=e734]: SelectFieldNames
                - 'cell "{ label: ''label'', value: ''value'', disabled: ''disabled'' }" [ref=e735]':
                  - code [ref=e736]: "{ label: 'label', value: 'value', disabled: 'disabled' }"
              - row "notFoundContent 无匹配选项时的提示内容 string Not Found" [ref=e737]:
                - cell "notFoundContent" [ref=e738]
                - cell "无匹配选项时的提示内容" [ref=e739]
                - cell "string" [ref=e740]:
                  - code [ref=e741]: string
                - cell "Not Found" [ref=e742]:
                  - code [ref=e743]: Not Found
              - row "maxCount 多选/tags 模式最多提交的选项数量 number -" [ref=e744]:
                - cell "maxCount" [ref=e745]
                - cell "多选/tags 模式最多提交的选项数量" [ref=e746]
                - cell "number" [ref=e747]:
                  - code [ref=e748]: number
                - cell "-" [ref=e749]
              - row "maxTagCount 最多展示的标签数量，超出部分聚合显示 number -" [ref=e750]:
                - cell "maxTagCount" [ref=e751]
                - cell "最多展示的标签数量，超出部分聚合显示" [ref=e752]
                - cell "number" [ref=e753]:
                  - code [ref=e754]: number
                - cell "-" [ref=e755]
              - row "optionRender 自定义选项内容 (option, info) => VNodeChild -" [ref=e756]:
                - cell "optionRender" [ref=e757]
                - cell "自定义选项内容" [ref=e758]
                - cell "(option, info) => VNodeChild" [ref=e759]:
                  - code [ref=e760]: (option, info) => VNodeChild
                - cell "-" [ref=e761]
              - row "tagRender 自定义多选标签内容 (info) => VNodeChild -" [ref=e762]:
                - cell "tagRender" [ref=e763]
                - cell "自定义多选标签内容" [ref=e764]
                - cell "(info) => VNodeChild" [ref=e765]:
                  - code [ref=e766]: (info) => VNodeChild
                - cell "-" [ref=e767]
              - row "loading 是否显示加载状态 boolean false" [ref=e768]:
                - cell "loading" [ref=e769]
                - cell "是否显示加载状态" [ref=e770]
                - cell "boolean" [ref=e771]:
                  - code [ref=e772]: boolean
                - cell "false" [ref=e773]:
                  - code [ref=e774]: "false"
              - row "className 根节点类名 string -" [ref=e775]:
                - cell "className" [ref=e776]
                - cell "根节点类名" [ref=e777]
                - cell "string" [ref=e778]:
                  - code [ref=e779]: string
                - cell "-" [ref=e780]
              - row "rootClassName 根节点类名 string -" [ref=e781]:
                - cell "rootClassName" [ref=e782]
                - cell "根节点类名" [ref=e783]
                - cell "string" [ref=e784]:
                  - code [ref=e785]: string
                - cell "-" [ref=e786]
              - row "style 根节点样式 StyleValue -" [ref=e787]:
                - cell "style" [ref=e788]
                - cell "根节点样式" [ref=e789]
                - cell "StyleValue" [ref=e790]:
                  - code [ref=e791]: StyleValue
                - cell "-" [ref=e792]
              - 'row "classNames 语义化 DOM 类名 SelectClassNames {}" [ref=e793]':
                - cell "classNames" [ref=e794]
                - cell "语义化 DOM 类名" [ref=e795]
                - cell "SelectClassNames" [ref=e796]:
                  - code [ref=e797]: SelectClassNames
                - 'cell "{}" [ref=e798]':
                  - code [ref=e799]: "{}"
              - 'row "styles 语义化 DOM 样式 SelectStyles {}" [ref=e800]':
                - cell "styles" [ref=e801]
                - cell "语义化 DOM 样式" [ref=e802]
                - cell "SelectStyles" [ref=e803]:
                  - code [ref=e804]: SelectStyles
                - 'cell "{}" [ref=e805]':
                  - code [ref=e806]: "{}"
          - heading "SelectOption Permalink to \"SelectOption\"" [level=3] [ref=e807]:
            - text: SelectOption
            - link "Permalink to \"SelectOption\"" [ref=e808]:
              - /url: "#selectoption"
              - text: "#"
          - table [ref=e809]:
            - rowgroup [ref=e810]:
              - row "字段 说明 类型 默认值" [ref=e811]:
                - columnheader "字段" [ref=e812]
                - columnheader "说明" [ref=e813]
                - columnheader "类型" [ref=e814]
                - columnheader "默认值" [ref=e815]
            - rowgroup [ref=e816]:
              - row "label 选项文本 string -" [ref=e817]:
                - cell "label" [ref=e818]
                - cell "选项文本" [ref=e819]
                - cell "string" [ref=e820]:
                  - code [ref=e821]: string
                - cell "-" [ref=e822]
              - row "value 选项值 string | number -" [ref=e823]:
                - cell "value" [ref=e824]
                - cell "选项值" [ref=e825]
                - cell "string | number" [ref=e826]:
                  - code [ref=e827]: string
                  - text: "|"
                  - code [ref=e828]: number
                - cell "-" [ref=e829]
              - row "disabled 是否禁用 boolean false" [ref=e830]:
                - cell "disabled" [ref=e831]
                - cell "是否禁用" [ref=e832]
                - cell "boolean" [ref=e833]:
                  - code [ref=e834]: boolean
                - cell "false" [ref=e835]:
                  - code [ref=e836]: "false"
          - heading "SelectVirtualConfig Permalink to \"SelectVirtualConfig\"" [level=3] [ref=e837]:
            - text: SelectVirtualConfig
            - link "Permalink to \"SelectVirtualConfig\"" [ref=e838]:
              - /url: "#selectvirtualconfig"
              - text: "#"
          - table [ref=e839]:
            - rowgroup [ref=e840]:
              - row "字段 说明 类型 默认值" [ref=e841]:
                - columnheader "字段" [ref=e842]
                - columnheader "说明" [ref=e843]
                - columnheader "类型" [ref=e844]
                - columnheader "默认值" [ref=e845]
            - rowgroup [ref=e846]:
              - row "height 浮层外框高度上限（CSS 像素） number（有限且大于 0） 288" [ref=e847]:
                - cell "height" [ref=e848]
                - cell "浮层外框高度上限（CSS 像素）" [ref=e849]
                - cell "number（有限且大于 0）" [ref=e850]:
                  - code [ref=e851]: number
                  - text: （有限且大于 0）
                - cell "288" [ref=e852]:
                  - code [ref=e853]: "288"
              - row "estimateSize 初始行高估计，不强制行高 number（有限且大于 0） 32" [ref=e854]:
                - cell "estimateSize" [ref=e855]
                - cell "初始行高估计，不强制行高" [ref=e856]
                - cell "number（有限且大于 0）" [ref=e857]:
                  - code [ref=e858]: number
                  - text: （有限且大于 0）
                - cell "32" [ref=e859]:
                  - code [ref=e860]: "32"
              - row "overscan 视口两侧额外渲染的行数 number（非负安全整数） 3" [ref=e861]:
                - cell "overscan" [ref=e862]
                - cell "视口两侧额外渲染的行数" [ref=e863]
                - cell "number（非负安全整数）" [ref=e864]:
                  - code [ref=e865]: number
                  - text: （非负安全整数）
                - cell "3" [ref=e866]:
                  - code [ref=e867]: "3"
          - heading "SelectFieldNames Permalink to \"SelectFieldNames\"" [level=3] [ref=e868]:
            - text: SelectFieldNames
            - link "Permalink to \"SelectFieldNames\"" [ref=e869]:
              - /url: "#selectfieldnames"
              - text: "#"
          - table [ref=e870]:
            - rowgroup [ref=e871]:
              - row "字段 说明 类型 默认值" [ref=e872]:
                - columnheader "字段" [ref=e873]
                - columnheader "说明" [ref=e874]
                - columnheader "类型" [ref=e875]
                - columnheader "默认值" [ref=e876]
            - rowgroup [ref=e877]:
              - row "label 选项文本字段名 string label" [ref=e878]:
                - cell "label" [ref=e879]
                - cell "选项文本字段名" [ref=e880]
                - cell "string" [ref=e881]:
                  - code [ref=e882]: string
                - cell "label" [ref=e883]:
                  - code [ref=e884]: label
              - row "value 选项值字段名 string value" [ref=e885]:
                - cell "value" [ref=e886]
                - cell "选项值字段名" [ref=e887]
                - cell "string" [ref=e888]:
                  - code [ref=e889]: string
                - cell "value" [ref=e890]:
                  - code [ref=e891]: value
              - row "disabled 禁用状态字段名 string disabled" [ref=e892]:
                - cell "disabled" [ref=e893]
                - cell "禁用状态字段名" [ref=e894]
                - cell "string" [ref=e895]:
                  - code [ref=e896]: string
                - cell "disabled" [ref=e897]:
                  - code [ref=e898]: disabled
          - heading "SelectFilterSortInfo Permalink to \"SelectFilterSortInfo\"" [level=3] [ref=e899]:
            - text: SelectFilterSortInfo
            - link "Permalink to \"SelectFilterSortInfo\"" [ref=e900]:
              - /url: "#selectfiltersortinfo"
              - text: "#"
          - table [ref=e901]:
            - rowgroup [ref=e902]:
              - row "字段 说明 类型" [ref=e903]:
                - columnheader "字段" [ref=e904]
                - columnheader "说明" [ref=e905]
                - columnheader "类型" [ref=e906]
            - rowgroup [ref=e907]:
              - row "searchValue 当前搜索文本 string" [ref=e908]:
                - cell "searchValue" [ref=e909]
                - cell "当前搜索文本" [ref=e910]
                - cell "string" [ref=e911]:
                  - code [ref=e912]: string
          - heading "Methods Permalink to \"Methods\"" [level=2] [ref=e913]:
            - text: Methods
            - link "Permalink to \"Methods\"" [ref=e914]:
              - /url: "#methods"
              - text: "#"
          - table [ref=e915]:
            - rowgroup [ref=e916]:
              - row "名称 说明" [ref=e917]:
                - columnheader "名称" [ref=e918]
                - columnheader "说明" [ref=e919]
            - rowgroup [ref=e920]:
              - row "focus() 聚焦选择器；开启 showSearch 时聚焦搜索输入框" [ref=e921]:
                - cell "focus()" [ref=e922]
                - cell "聚焦选择器；开启 showSearch 时聚焦搜索输入框" [ref=e923]:
                  - text: 聚焦选择器；开启
                  - code [ref=e924]: showSearch
                  - text: 时聚焦搜索输入框
              - row "blur() 移除选择器焦点" [ref=e925]:
                - cell "blur()" [ref=e926]
                - cell "移除选择器焦点" [ref=e927]
          - heading "Events Permalink to \"Events\"" [level=2] [ref=e928]:
            - text: Events
            - link "Permalink to \"Events\"" [ref=e929]:
              - /url: "#events"
              - text: "#"
          - table [ref=e930]:
            - rowgroup [ref=e931]:
              - row "事件名 说明 回调参数" [ref=e932]:
                - columnheader "事件名" [ref=e933]
                - columnheader "说明" [ref=e934]
                - columnheader "回调参数" [ref=e935]
            - rowgroup [ref=e936]:
              - 'row "update:modelValue 选中值变化时触发 (value: SelectValue) => void" [ref=e937]':
                - cell "update:modelValue" [ref=e938]
                - cell "选中值变化时触发" [ref=e939]
                - 'cell "(value: SelectValue) => void" [ref=e940]':
                  - code [ref=e941]: "(value: SelectValue) => void"
              - 'row "change 选中值变化时触发 (value: SelectValue) => void" [ref=e942]':
                - cell "change" [ref=e943]
                - cell "选中值变化时触发" [ref=e944]
                - 'cell "(value: SelectValue) => void" [ref=e945]':
                  - code [ref=e946]: "(value: SelectValue) => void"
              - row "clear 点击清除按钮时触发 () => void" [ref=e947]:
                - cell "clear" [ref=e948]
                - cell "点击清除按钮时触发" [ref=e949]
                - cell "() => void" [ref=e950]:
                  - code [ref=e951]: () => void
              - 'row "search 搜索文本变化时触发 (value: string) => void" [ref=e952]':
                - cell "search" [ref=e953]
                - cell "搜索文本变化时触发" [ref=e954]
                - 'cell "(value: string) => void" [ref=e955]':
                  - code [ref=e956]: "(value: string) => void"
              - 'row "focus 选择器或搜索输入框聚焦时触发 (event: FocusEvent) => void" [ref=e957]':
                - cell "focus" [ref=e958]
                - cell "选择器或搜索输入框聚焦时触发" [ref=e959]
                - 'cell "(event: FocusEvent) => void" [ref=e960]':
                  - code [ref=e961]: "(event: FocusEvent) => void"
              - 'row "blur 选择器或搜索输入框失焦时触发 (event: FocusEvent) => void" [ref=e962]':
                - cell "blur" [ref=e963]
                - cell "选择器或搜索输入框失焦时触发" [ref=e964]
                - 'cell "(event: FocusEvent) => void" [ref=e965]':
                  - code [ref=e966]: "(event: FocusEvent) => void"
              - 'row "openChange 下拉面板状态请求变化时触发 (open: boolean) => void" [ref=e967]':
                - cell "openChange" [ref=e968]
                - cell "下拉面板状态请求变化时触发" [ref=e969]
                - 'cell "(open: boolean) => void" [ref=e970]':
                  - code [ref=e971]: "(open: boolean) => void"
          - heading "Slots Permalink to \"Slots\"" [level=2] [ref=e972]:
            - text: Slots
            - link "Permalink to \"Slots\"" [ref=e973]:
              - /url: "#slots"
              - text: "#"
          - table [ref=e974]:
            - rowgroup [ref=e975]:
              - row "名称 说明" [ref=e976]:
                - columnheader "名称" [ref=e977]
                - columnheader "说明" [ref=e978]
            - rowgroup [ref=e979]:
              - row "prefix 自定义前缀内容" [ref=e980]:
                - cell "prefix" [ref=e981]
                - cell "自定义前缀内容" [ref=e982]
              - row "suffixIcon 自定义后缀图标内容" [ref=e983]:
                - cell "suffixIcon" [ref=e984]
                - cell "自定义后缀图标内容" [ref=e985]
              - row "loadingIcon 自定义加载图标" [ref=e986]:
                - cell "loadingIcon" [ref=e987]
                - cell "自定义加载图标" [ref=e988]
              - row "clearIcon 自定义清除图标" [ref=e989]:
                - cell "clearIcon" [ref=e990]
                - cell "自定义清除图标" [ref=e991]
          - heading "Semantic DOM Permalink to \"Semantic DOM\"" [level=2] [ref=e992]:
            - text: Semantic DOM
            - link "Permalink to \"Semantic DOM\"" [ref=e993]:
              - /url: "#semantic-dom"
              - text: "#"
          - table [ref=e994]:
            - rowgroup [ref=e995]:
              - row "名称 说明" [ref=e996]:
                - columnheader "名称" [ref=e997]
                - columnheader "说明" [ref=e998]
            - rowgroup [ref=e999]:
              - row "root 根节点" [ref=e1000]:
                - cell "root" [ref=e1001]
                - cell "根节点" [ref=e1002]
              - row "prefix 前缀区域" [ref=e1003]:
                - cell "prefix" [ref=e1004]
                - cell "前缀区域" [ref=e1005]
              - row "search 搜索输入" [ref=e1006]:
                - cell "search" [ref=e1007]
                - cell "搜索输入" [ref=e1008]
              - row "selector combobox 触发与输入区域" [ref=e1009]:
                - cell "selector" [ref=e1010]
                - cell "combobox 触发与输入区域" [ref=e1011]
              - row "option 选项节点" [ref=e1012]:
                - cell "option" [ref=e1013]
                - cell "选项节点" [ref=e1014]
              - row "notFound 空结果选项" [ref=e1015]:
                - cell "notFound" [ref=e1016]
                - cell "空结果选项" [ref=e1017]
              - row "clear 清除按钮" [ref=e1018]:
                - cell "clear" [ref=e1019]
                - cell "清除按钮" [ref=e1020]
              - row "suffix 后缀区域" [ref=e1021]:
                - cell "suffix" [ref=e1022]
                - cell "后缀区域" [ref=e1023]
              - row "loading 加载图标区域" [ref=e1024]:
                - cell "loading" [ref=e1025]
                - cell "加载图标区域" [ref=e1026]
              - row "selection 当前选中内容区域" [ref=e1027]:
                - cell "selection" [ref=e1028]
                - cell "当前选中内容区域" [ref=e1029]
              - row "tag 多选标签" [ref=e1030]:
                - cell "tag" [ref=e1031]
                - cell "多选标签" [ref=e1032]
              - row "tagRemove 标签移除按钮" [ref=e1033]:
                - cell "tagRemove" [ref=e1034]
                - cell "标签移除按钮" [ref=e1035]
              - row "popup 下拉浮层" [ref=e1036]:
                - cell "popup" [ref=e1037]
                - cell "下拉浮层" [ref=e1038]
              - row "list listbox 选项列表" [ref=e1039]:
                - cell "list" [ref=e1040]
                - cell "listbox 选项列表" [ref=e1041]
          - heading "Theme Tokens Permalink to \"Theme Tokens\"" [level=2] [ref=e1042]:
            - text: Theme Tokens
            - link "Permalink to \"Theme Tokens\"" [ref=e1043]:
              - /url: "#theme-tokens"
              - text: "#"
          - list [ref=e1044]:
            - listitem [ref=e1045]:
              - code [ref=e1046]: "--aheart-color-primary"
            - listitem [ref=e1047]:
              - code [ref=e1048]: "--aheart-color-primary-hover"
            - listitem [ref=e1049]:
              - code [ref=e1050]: "--aheart-color-border"
            - listitem [ref=e1051]:
              - code [ref=e1052]: "--aheart-color-danger"
            - listitem [ref=e1053]:
              - code [ref=e1054]: "--aheart-color-warning"
            - listitem [ref=e1055]:
              - code [ref=e1056]: "--aheart-control-height"
            - listitem [ref=e1057]:
              - code [ref=e1058]: "--aheart-radius"
      - contentinfo [ref=e1059]:
        - generic [ref=e1060]:
          - link "在 GitHub 编辑此页" [ref=e1062]:
            - /url: https://github.com/Labradorca/aheart-ui/edit/master/docs/components/select.md
            - text: 在 GitHub 编辑此页
          - paragraph [ref=e1065]:
            - text: "最后更新:"
            - time [ref=e1066]: 9/7/26, 6:06 AM
        - navigation "Pager" [ref=e1067]:
          - generic [ref=e1068]: Pager
          - link "上一页 组合组件 · 产品模式" [ref=e1070]:
            - /url: /composed/overview.html
            - generic [ref=e1071]: 上一页
            - generic [ref=e1072]: 组合组件 · 产品模式
          - link "下一页 DatePicker" [ref=e1074]:
            - /url: /components/date-picker.html
            - generic [ref=e1075]: 下一页
            - generic [ref=e1076]: DatePicker
```

# Test source

```ts
  1   | import { expect, test, type Frame, type Page } from '@playwright/test'
  2   |
  3   | async function evidenceState(page: Page) {
  4   |   return page.locator('#select-virtual-evidence').evaluate(trigger => {
  5   |     const active = trigger.ownerDocument.getElementById(trigger.getAttribute('aria-activedescendant') ?? '')
  6   |     const popup = active?.closest<HTMLElement>('[role="listbox"]')
  7   |     if (!active || !popup) return { exists: false, visible: false, key: '', id: '', index: -1, rowsValid: false, height: 0, width: 0, scrollTop: 0, scrollHeight: 0 }
  8   |     const box = popup.getBoundingClientRect(), rect = active.getBoundingClientRect()
  9   |     const rows = Array.from(popup.querySelectorAll<HTMLElement>('[role="option"]'))
  10  |     const rowsValid = rows.every((row, index) => {
  11  |       const content = row.querySelector<HTMLElement>('.aheart-select__option-content')!
  12  |       const previous = rows[index - 1]
  13  |       return content.scrollHeight <= content.clientHeight + 1 && (!previous || row.getBoundingClientRect().top >= previous.getBoundingClientRect().bottom - 0.75)
  14  |     })
  15  |     return { exists: true, visible: rect.top >= box.top - 1 && rect.bottom <= box.bottom + 1,
  16  |       key: active.querySelector('[data-proof-key]')?.getAttribute('data-proof-key') ?? '', id: active.id,
  17  |       index: Number(active.getAttribute('data-index')), rowsValid, height: rect.height, width: box.width,
  18  |       scrollTop: popup.scrollTop, scrollHeight: popup.scrollHeight }
  19  |   })
  20  | }
  21  |
  22  | async function externalUpdate(page: Page, label: string) {
  23  |   // Simulate an external reactive update while focus stays in the open Select.
  24  |   // A synthetic click invokes the fixture's actual Vue handler without an unrelated outside pointer dismissal.
  25  |   await page.getByRole('region', { name: 'Select 虚拟契约补证' }).getByRole('button', { name: label, exact: true }).evaluate(element => (element as HTMLButtonElement).click())
  26  | }
  27  |
  28  | test('Select virtual remeasures wrapping width and font changes without clipping active content', async ({ page }) => {
  29  |   const errors: string[] = []
  30  |   page.on('pageerror', error => errors.push(error.message))
  31  |   await page.goto('/components/select')
  32  |   await page.waitForFunction(() => Boolean((document.querySelector('#app') as any)?.__vue_app__))
  33  |   const trigger = page.locator('#select-virtual-evidence')
  34  |   await trigger.click()
  35  |   await expect.poll(async () => (await evidenceState(page)).visible).toBe(true)
  36  |   const before = await evidenceState(page)
  37  |   expect(before.key).toBe('probe-0500')
  38  |   await externalUpdate(page, '窄容器')
  39  |   await expect.poll(async () => (await evidenceState(page)).width).toBeCloseTo(180, 0)
  40  |   await expect.poll(async () => (await evidenceState(page)).height).toBeGreaterThan(before.height)
  41  |   await expect.poll(() => evidenceState(page)).toMatchObject({ rowsValid: true, visible: true, key: before.key })
  42  |   const narrow = await evidenceState(page)
  43  |   await externalUpdate(page, '大字体')
  44  |   await expect.poll(async () => (await evidenceState(page)).height).toBeGreaterThan(narrow.height)
  45  |   await expect.poll(() => evidenceState(page)).toMatchObject({ rowsValid: true, visible: true, key: before.key })
  46  |   await trigger.press('ArrowDown')
  47  |   await expect.poll(async () => { const state = await evidenceState(page); return state.key === 'probe-0502' && state.visible && state.rowsValid }).toBe(true)
  48  |   await page.screenshot({ path: test.info().outputPath('select-width-font.png') })
  49  |   expect(errors).toEqual([])
  50  | })
  51  |
  52  | test('Select virtual preserves stable middle keys through insertion deletion reorder and active removal', async ({ page }) => {
  53  |   const errors: string[] = []
  54  |   page.on('pageerror', error => errors.push(error.message))
  55  |   await page.goto('/components/select')
  56  |   await page.waitForFunction(() => Boolean((document.querySelector('#app') as any)?.__vue_app__))
  57  |   await page.locator('#select-virtual-evidence').click()
> 58  |   await expect.poll(async () => (await evidenceState(page)).visible).toBe(true)
      |                                                                      ^ Error: expect(received).toBe(expected) // Object.is equality
  59  |   const before = await evidenceState(page)
  60  |   expect(before.key).toBe('probe-0500')
  61  |   expect(before.index).toBe(500)
  62  |   expect(before.scrollTop).toBeGreaterThan(before.scrollHeight * 0.2)
  63  |   expect(before.scrollTop).toBeLessThan(before.scrollHeight * 0.8)
  64  |   for (const [label, index] of [['视口前插入', 501], ['删除前置项', 500], ['稳定key重排', 800]] as const) {
  65  |     await externalUpdate(page, label)
  66  |     await expect.poll(async () => { const state = await evidenceState(page); return state.key === before.key && state.id === before.id && state.index === index && state.visible && state.rowsValid }).toBe(true)
  67  |     await expect(page.locator('[data-select-evidence-value]')).toHaveText('probe-0500')
  68  |   }
  69  |   await externalUpdate(page, '删除跟踪项')
  70  |   await expect.poll(async () => { const state = await evidenceState(page); return state.exists && state.key === 'probe-0700' && state.id !== before.id && state.visible && state.rowsValid }).toBe(true)
  71  |   await expect(page.locator(`[id="${before.id}"]`)).toHaveCount(0)
  72  |   await expect(page.locator('[data-select-evidence-value]')).toHaveText('probe-0500')
  73  |   await page.screenshot({ path: test.info().outputPath('select-data-revision.png') })
  74  |   expect(errors).toEqual([])
  75  | })
  76  |
  77  | test('Select virtual no-results message remains visible and search can recover', async ({ page }) => {
  78  |   await page.goto('/components/select')
  79  |   await page.waitForFunction(() => Boolean((document.querySelector('#app') as any)?.__vue_app__))
  80  |   const input = page.locator('#select-virtual-search-demo')
  81  |   await input.click()
  82  |   await input.fill('no-match-anywhere')
  83  |   const popup = page.locator('.aheart-select__popup:has(.is-virtual)')
  84  |   await expect(popup.locator('.aheart-select__empty')).toBeVisible()
  85  |   await expect(input).not.toHaveAttribute('aria-activedescendant')
  86  |   await expect.poll(() => popup.evaluate(element => {
  87  |     const empty = element.querySelector('.aheart-select__empty')!.getBoundingClientRect()
  88  |     const panel = element.getBoundingClientRect()
  89  |     return panel.height > 40 && empty.top >= panel.top && empty.bottom <= panel.bottom
  90  |   })).toBe(true)
  91  |   await page.waitForFunction(() => getComputedStyle(document.querySelector('.aheart-select__popup')!).opacity === '1')
  92  |   await page.screenshot({ path: test.info().outputPath('select-virtual-empty.png') })
  93  |   await input.fill('Row 0999')
  94  |   await expect(popup.getByRole('option')).toHaveCount(1)
  95  |   await expect(input).toHaveAttribute('aria-activedescendant', /option/)
  96  | })
  97  |
  98  | async function checkActive(context: Page | Frame, suffix: string) {
  99  |   const trigger = context.locator('#select-virtual-demo')
  100 |   await expect.poll(() => trigger.getAttribute('aria-activedescendant')).toBeTruthy()
  101 |   await expect.poll(() => trigger.evaluate(element => {
  102 |     const row = element.ownerDocument.getElementById(element.getAttribute('aria-activedescendant')!)
  103 |     const popup = row?.closest('.aheart-select__popup')
  104 |     if (!row || !popup) return { text: '', visible: false }
  105 |     const r = row.getBoundingClientRect(), p = popup.getBoundingClientRect()
  106 |     return { text: row.textContent ?? '', visible: r.top >= p.top - 1 && r.bottom <= p.bottom + 1 }
  107 |   })).toEqual({ text: expect.stringContaining(suffix), visible: true })
  108 | }
  109 |
  110 | test('Select virtual tail, disabled navigation, dynamic height and scroll anchoring', async ({ page }) => {
  111 |   const errors: string[] = []
  112 |   page.on('pageerror', error => errors.push(error.message))
  113 |   await page.goto('/components/select')
  114 |   await page.waitForFunction(() => Boolean((document.querySelector('#app') as any)?.__vue_app__))
  115 |   const trigger = page.locator('#select-virtual-demo')
  116 |   await trigger.scrollIntoViewIfNeeded()
  117 |   await trigger.click()
  118 |   await checkActive(page, 'Row 0999')
  119 |   const popup = page.locator('.aheart-select__popup:has(.is-virtual)')
  120 |   await expect(popup.locator('[role="option"]')).not.toHaveCount(1000)
  121 |   await trigger.press('Home')
  122 |   await checkActive(page, 'Row 0000')
  123 |   for (let i = 0; i < 20; i++) await trigger.press('ArrowDown')
  124 |   await checkActive(page, 'Row 0021')
  125 |   await trigger.press('Home')
  126 |   await checkActive(page, 'Row 0000')
  127 |   await popup.dispatchEvent('wheel', { deltaY: 1500 })
  128 |   await popup.evaluate(element => { element.scrollTop = 1500 })
  129 |   await expect.poll(() => popup.evaluate(el => el.scrollTop)).toBeGreaterThan(1400)
  130 |   // Allow the scroll window to settle before selecting a visible anchor by stable ID.
  131 |   await expect.poll(() => popup.evaluate(element => {
  132 |     const bounds = element.getBoundingClientRect()
  133 |     return Array.from(element.querySelectorAll('[role="option"]')).some(row => {
  134 |       const rect = row.getBoundingClientRect()
  135 |       return rect.top >= bounds.top && rect.bottom <= bounds.bottom
  136 |     })
  137 |   })).toBe(true)
  138 |   // iOS defers estimate compensation until scrolling ends to preserve momentum.
  139 |   // Establish the baseline after a quiet scroll interval, not before a queued correction.
  140 |   await popup.evaluate(element => new Promise<void>(resolve => {
  141 |     const view = element.ownerDocument.defaultView!
  142 |     let timer: number
  143 |     const arm = () => {
  144 |       view.clearTimeout(timer)
  145 |       timer = view.setTimeout(() => { element.removeEventListener('scroll', arm); resolve() }, 200)
  146 |     }
  147 |     element.addEventListener('scroll', arm, { passive: true })
  148 |     arm()
  149 |   }))
  150 |   await popup.evaluate(async element => {
  151 |     let previous = '', stable = 0
  152 |     for (let frame = 0; frame < 40; frame++) {
  153 |       await new Promise(resolve => requestAnimationFrame(resolve))
  154 |       const sample = `${element.scrollTop}|${Array.from(element.querySelectorAll('[role="option"]'), row => `${row.id}:${row.getBoundingClientRect().top}:${row.getBoundingClientRect().height}`).join('|')}`
  155 |       stable = sample === previous ? stable + 1 : 0
  156 |       if (stable >= 3) return
  157 |       previous = sample
  158 |     }
```
