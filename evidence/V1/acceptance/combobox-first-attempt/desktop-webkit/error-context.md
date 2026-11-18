# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: combobox.spec.ts >> Combobox filters, selects and dismisses while preserving native focus
- Location: e2e/combobox.spec.ts:4:5

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('listbox', { name: '城市' }).getByRole('option')
Expected: 4
Received: 0
Timeout:  5000ms

Call log:
  - Expect "toHaveCount" with timeout 5000ms
  - waiting for getByRole('listbox', { name: '城市' }).getByRole('option')
    14 × locator resolved to 0 elements
       - unexpected value "0"

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
      - link "基础组件总览" [ref=e59]:
        - /url: /components/overview.html
        - paragraph [ref=e60]: 基础组件总览
      - generic [ref=e62]:
        - button "设计基础 · 3" [ref=e63]:
          - heading "设计基础 · 3" [level=2] [ref=e65]
        - generic [ref=e66]:
          - link "ConfigProvider 全局配置" [ref=e70]:
            - /url: /components/config-provider.html
            - paragraph [ref=e71]: ConfigProvider 全局配置
          - link "Typography 排版" [ref=e75]:
            - /url: /components/typography.html
            - paragraph [ref=e76]: Typography 排版
          - link "Icon 图标" [ref=e80]:
            - /url: /components/icon.html
            - paragraph [ref=e81]: Icon 图标
      - generic [ref=e83]:
        - button "通用构建 · 5" [ref=e84]:
          - heading "通用构建 · 5" [level=2] [ref=e86]
        - generic [ref=e87]:
          - link "Button 按钮" [ref=e91]:
            - /url: /components/button.html
            - paragraph [ref=e92]: Button 按钮
          - link "Space 间距" [ref=e96]:
            - /url: /components/space.html
            - paragraph [ref=e97]: Space 间距
          - link "Flex 弹性布局" [ref=e101]:
            - /url: /components/flex.html
            - paragraph [ref=e102]: Flex 弹性布局
          - link "Grid 栅格" [ref=e106]:
            - /url: /components/grid.html
            - paragraph [ref=e107]: Grid 栅格
          - link "Divider 分割线" [ref=e111]:
            - /url: /components/divider.html
            - paragraph [ref=e112]: Divider 分割线
      - generic [ref=e114]:
        - button "导航与流程 · 4" [ref=e115]:
          - heading "导航与流程 · 4" [level=2] [ref=e117]
        - generic [ref=e118]:
          - link "Menu 菜单" [ref=e122]:
            - /url: /components/menu.html
            - paragraph [ref=e123]: Menu 菜单
          - link "Tabs 标签页" [ref=e127]:
            - /url: /components/tabs.html
            - paragraph [ref=e128]: Tabs 标签页
          - link "Breadcrumb 面包屑" [ref=e132]:
            - /url: /components/breadcrumb.html
            - paragraph [ref=e133]: Breadcrumb 面包屑
          - link "Steps 步骤条" [ref=e137]:
            - /url: /components/steps.html
            - paragraph [ref=e138]: Steps 步骤条
      - generic [ref=e140]:
        - button "表单与选择 · 7" [ref=e141]:
          - heading "表单与选择 · 7" [level=2] [ref=e143]
        - generic [ref=e144]:
          - link "Input 输入框" [ref=e148]:
            - /url: /components/input.html
            - paragraph [ref=e149]: Input 输入框
          - link "Textarea 文本域" [ref=e153]:
            - /url: /components/textarea.html
            - paragraph [ref=e154]: Textarea 文本域
          - link "InputNumber 数字输入框" [ref=e158]:
            - /url: /components/input-number.html
            - paragraph [ref=e159]: InputNumber 数字输入框
          - link "Combobox 输入选择框" [ref=e163]:
            - /url: /components/combobox.html
            - paragraph [ref=e164]: Combobox 输入选择框
          - link "Checkbox 复选框" [ref=e168]:
            - /url: /components/checkbox.html
            - paragraph [ref=e169]: Checkbox 复选框
          - link "Radio 单选框" [ref=e173]:
            - /url: /components/radio.html
            - paragraph [ref=e174]: Radio 单选框
          - link "Switch 开关" [ref=e178]:
            - /url: /components/switch.html
            - paragraph [ref=e179]: Switch 开关
      - generic [ref=e181]:
        - button "数据与状态 · 8" [ref=e182]:
          - heading "数据与状态 · 8" [level=2] [ref=e184]
        - generic [ref=e185]:
          - link "Descriptions 描述列表" [ref=e189]:
            - /url: /components/descriptions.html
            - paragraph [ref=e190]: Descriptions 描述列表
          - link "Card 卡片" [ref=e194]:
            - /url: /components/card.html
            - paragraph [ref=e195]: Card 卡片
          - link "Tag 标签" [ref=e199]:
            - /url: /components/tag.html
            - paragraph [ref=e200]: Tag 标签
          - link "Badge 徽标" [ref=e204]:
            - /url: /components/badge.html
            - paragraph [ref=e205]: Badge 徽标
          - link "Empty 空状态" [ref=e209]:
            - /url: /components/empty.html
            - paragraph [ref=e210]: Empty 空状态
          - link "Spin 加载中" [ref=e214]:
            - /url: /components/spin.html
            - paragraph [ref=e215]: Spin 加载中
          - link "Skeleton 骨架屏" [ref=e219]:
            - /url: /components/skeleton.html
            - paragraph [ref=e220]: Skeleton 骨架屏
          - link "Alert 警告提示" [ref=e224]:
            - /url: /components/alert.html
            - paragraph [ref=e225]: Alert 警告提示
      - generic [ref=e227]:
        - button "浮层与反馈 · 1" [ref=e228]:
          - heading "浮层与反馈 · 1" [level=2] [ref=e230]
        - link "Message 全局提示" [ref=e235]:
          - /url: /components/message.html
          - paragraph [ref=e236]: Message 全局提示
  - generic [ref=e239]:
    - navigation "本页内容" [ref=e245]:
      - generic [ref=e246]:
        - heading "本页内容" [level=2] [ref=e248]
        - list [ref=e249]:
          - listitem [ref=e250]:
            - link "API" [ref=e251]:
              - /url: "#api"
    - generic [ref=e254]:
      - generic [ref=e255]:
        - navigation "文档路径" [ref=e256]:
          - link "Aheart UI" [ref=e257]:
            - /url: /
          - generic [ref=e258]: /
          - link "组件文档" [ref=e259]:
            - /url: /components/overview
        - navigation "组件定位" [ref=e260]:
          - generic [ref=e261]: 表单与选择
          - generic [ref=e262]: aheart-ui
          - generic [ref=e263]:
            - generic [ref=e264]: 相关组件
            - link "Input" [ref=e265]:
              - /url: /components/input
            - link "Textarea" [ref=e266]:
              - /url: /components/textarea
            - link "InputNumber" [ref=e267]:
              - /url: /components/input-number
            - link "Checkbox" [ref=e268]:
              - /url: /components/checkbox
      - main [ref=e269]:
        - generic [ref=e271]:
          - heading "Combobox 输入选择框 已完成 Permalink to \"Combobox 输入选择框 <span class=\"aheart-status aheart-status--ready\">已完成</span>\"" [level=1] [ref=e272]:
            - text: Combobox 输入选择框
            - generic [ref=e273]: 已完成
            - link "Permalink to \"Combobox 输入选择框 <span class=\"aheart-status aheart-status--ready\">已完成</span>\"" [ref=e274]:
              - /url: "#combobox-输入选择框-已完成"
              - text: "#"
          - paragraph [ref=e275]: 输入城市名筛选候选项。用 ↑ / ↓ 移动高亮，按 Enter 选中，按 Esc 关闭并返回当前选中值。Tab 会关闭列表并移到下一个控件。
          - generic [ref=e276]:
            - generic [ref=e277]: 交互示例
            - button "查看代码" [ref=e278] [cursor=pointer]
          - generic [ref=e279]:
            - generic [ref=e280]: 城市
            - combobox "城市" [active] [ref=e282]
            - paragraph [ref=e283]:
              - text: 已选城市
              - status [ref=e284]: 请选择
            - generic [ref=e285]: 街道
            - textbox "街道" [ref=e287]
          - heading "API Permalink to \"API\"" [level=2] [ref=e288]:
            - text: API
            - link "Permalink to \"API\"" [ref=e289]:
              - /url: "#api"
              - text: "#"
          - table [ref=e290]:
            - rowgroup [ref=e291]:
              - row "属性 说明" [ref=e292]:
                - columnheader "属性" [ref=e293]
                - columnheader "说明" [ref=e294]
            - rowgroup [ref=e295]:
              - row "v-model 受控选中值，类型为 string | number | undefined" [ref=e296]:
                - cell "v-model" [ref=e297]:
                  - code [ref=e298]: v-model
                - cell "受控选中值，类型为 string | number | undefined" [ref=e299]:
                  - text: 受控选中值，类型为
                  - code [ref=e300]: string | number | undefined
              - row "defaultValue 非受控模式下的初始选中值" [ref=e301]:
                - cell "defaultValue" [ref=e302]:
                  - code [ref=e303]: defaultValue
                - cell "非受控模式下的初始选中值" [ref=e304]
              - row "options 候选项数组。每项包含唯一的 value、文本 label 和可选的 disabled" [ref=e305]:
                - cell "options" [ref=e306]:
                  - code [ref=e307]: options
                - cell "候选项数组。每项包含唯一的 value、文本 label 和可选的 disabled" [ref=e308]:
                  - text: 候选项数组。每项包含唯一的
                  - code [ref=e309]: value
                  - text: 、文本
                  - code [ref=e310]: label
                  - text: 和可选的
                  - code [ref=e311]: disabled
              - row "id、placeholder、disabled 输入框 ID、占位文字和禁用状态" [ref=e312]:
                - cell "id、placeholder、disabled" [ref=e313]:
                  - code [ref=e314]: id
                  - text: 、
                  - code [ref=e315]: placeholder
                  - text: 、
                  - code [ref=e316]: disabled
                - cell "输入框 ID、占位文字和禁用状态" [ref=e317]
              - row "getPopupContainer 接收输入框，返回浮层容器，返回 false 时就地渲染" [ref=e318]:
                - cell "getPopupContainer" [ref=e319]:
                  - code [ref=e320]: getPopupContainer
                - cell "接收输入框，返回浮层容器，返回 false 时就地渲染" [ref=e321]:
                  - text: 接收输入框，返回浮层容器，返回
                  - code [ref=e322]: "false"
                  - text: 时就地渲染
          - paragraph [ref=e323]:
            - text: 选中值变化时触发
            - code [ref=e324]: change(value, option)
            - text: 。使用
            - code [ref=e325]: empty
            - text: 插槽自定义无匹配结果时的内容。
      - contentinfo [ref=e326]:
        - generic [ref=e327]:
          - link "在 GitHub 编辑此页" [ref=e329]:
            - /url: https://github.com/Labradorca/aheart-ui/edit/master/docs/components/combobox.md
            - text: 在 GitHub 编辑此页
          - paragraph [ref=e332]:
            - text: "最后更新:"
            - time [ref=e333]: 11/10/26, 10:00 PM
        - navigation "Pager" [ref=e334]:
          - generic [ref=e335]: Pager
          - link "上一页 InputNumber 数字输入框" [ref=e337]:
            - /url: /components/input-number.html
            - generic [ref=e338]: 上一页
            - generic [ref=e339]: InputNumber 数字输入框
          - link "下一页 Checkbox 复选框" [ref=e341]:
            - /url: /components/checkbox.html
            - generic [ref=e342]: 下一页
            - generic [ref=e343]: Checkbox 复选框
```

# Test source

```ts
  1  | import { expect, test } from '@playwright/test'
  2  | import AxeBuilder from '@axe-core/playwright'
  3  |
  4  | test('Combobox filters, selects and dismisses while preserving native focus', async ({ page }, testInfo) => {
  5  |   await page.goto('/components/combobox')
  6  |   const input = page.getByRole('combobox', { name: '城市' })
  7  |   const list = page.getByRole('listbox', { name: '城市' })
  8  |   const next = page.getByRole('textbox', { name: '街道' })
  9  |   const selected = page.locator('output')
  10 |
  11 |   await input.click()
> 12 |   await expect(list.getByRole('option')).toHaveCount(4)
     |                                          ^ Error: expect(locator).toHaveCount(expected) failed
  13 |   await expect(list.getByRole('option', { name: '南京 Nanjing' })).toHaveAttribute('aria-disabled', 'true')
  14 |   await input.press('ArrowDown')
  15 |   await input.press('ArrowDown')
  16 |   const shanghai = list.getByRole('option', { name: '上海 Shanghai' })
  17 |   await expect(input).toHaveAttribute('aria-activedescendant', (await shanghai.getAttribute('id'))!)
  18 |   await expect(input).toBeFocused()
  19 |   if (testInfo.project.name === 'desktop') {
  20 |     const result = await new AxeBuilder({ page }).include('.aheart-combobox').include('.aheart-combobox__popup').analyze()
  21 |     expect(result.violations).toEqual([])
  22 |   }
  23 |   await input.press('Enter')
  24 |   await expect(selected).toHaveText('shanghai')
  25 |   await expect(input).toHaveValue('上海 Shanghai')
  26 |   await expect(input).toBeFocused()
  27 |   await expect(list).toBeHidden()
  28 |
  29 |   await input.fill('SHEN')
  30 |   await expect(list.getByRole('option')).toHaveCount(1)
  31 |   await list.getByRole('option', { name: '深圳 Shenzhen' }).click()
  32 |   await expect(selected).toHaveText('shenzhen')
  33 |   await expect(input).toBeFocused()
  34 |   await input.fill('zzz')
  35 |   await expect(page.getByText('没有匹配的城市')).toBeVisible()
  36 |   await input.press('Escape')
  37 |   await expect(input).toHaveAttribute('aria-expanded', 'false')
  38 |   await expect(input).toHaveValue('深圳 Shenzhen')
  39 |   await expect(input).toBeFocused()
  40 |   await expect(page.locator('.aheart-combobox__popup')).toHaveCount(0)
  41 |
  42 |   await input.press('ArrowUp')
  43 |   await expect(list).toBeVisible()
  44 |   await input.press('Tab')
  45 |   await expect(next).toBeFocused()
  46 |   await expect(list).toBeHidden()
  47 | })
  48 |
```
