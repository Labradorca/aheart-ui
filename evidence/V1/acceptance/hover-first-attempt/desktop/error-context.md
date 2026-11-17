# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: button-hover-contrast.spec.ts >> hover text token can be themed separately from the button border
- Location: e2e/button-hover-contrast.spec.ts:28:5

# Error details

```
Error: expect(locator).toHaveCSS(expected) failed

Locator:  locator('.aheart-demo-panel').first().getByRole('button', { name: '默认按钮', exact: true })
Expected: "rgb(91, 33, 130)"
Received: "rgb(31, 35, 41)"
Timeout:  5000ms

Call log:
  - Expect "toHaveCSS" with timeout 5000ms
  - waiting for locator('.aheart-demo-panel').first().getByRole('button', { name: '默认按钮', exact: true })
    14 × locator resolved to <button type="button" aria-busy="false" class="aheart-button aheart-button--default aheart-button--normal aheart-button--color-default aheart-button--variant-outlined">…</button>
       - unexpected value "rgb(31, 35, 41)"

```

```yaml
- button "默认按钮"
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright'
  2  | import { expect, test } from '@playwright/test'
  3  |
  4  | test('default outlined, dashed, link and text buttons keep AA text contrast when hovered', async ({ page }) => {
  5  |   test.setTimeout(60_000)
  6  |   await page.emulateMedia({ reducedMotion: 'reduce' })
  7  |   await page.goto('/components/button')
  8  |   const demo = page.locator('.aheart-demo-panel').first()
  9  |
  10 |   for (const label of ['默认按钮', '虚线按钮', '链接按钮', '文本按钮']) {
  11 |     const button = demo.getByRole('button', { name: label, exact: true })
  12 |     await button.evaluate(element => element.setAttribute('data-hover-contrast-target', 'true'))
  13 |     for (const state of ['normal', 'hover']) {
  14 |       if (state === 'hover') await button.hover()
  15 |       else await page.mouse.move(0, 0)
  16 |       await expect.poll(() => button.evaluate(element => element.matches(':hover'))).toBe(state === 'hover')
  17 |       const audit = await new AxeBuilder({ page })
  18 |         .include('[data-hover-contrast-target]')
  19 |         .withRules(['color-contrast'])
  20 |         .analyze()
  21 |       expect(audit.violations, `${label}: ${state}`).toEqual([])
  22 |       expect(audit.incomplete, `${label}: ${state} must be measurable`).toEqual([])
  23 |     }
  24 |     await button.evaluate(element => element.removeAttribute('data-hover-contrast-target'))
  25 |   }
  26 | })
  27 |
  28 | test('hover text token can be themed separately from the button border', async ({ page }) => {
  29 |   await page.emulateMedia({ reducedMotion: 'reduce' })
  30 |   await page.goto('/components/button')
  31 |   const demo = page.locator('.aheart-demo-panel').first()
  32 |   await demo.evaluate(element => {
  33 |     const style = (element as HTMLElement).style
  34 |     style.setProperty('--aheart-color-primary-hover', '#4096ff')
  35 |     style.setProperty('--aheart-color-primary-text-hover', '#5b2182')
  36 |   })
  37 |   const button = demo.getByRole('button', { name: '默认按钮', exact: true })
  38 |   await button.hover()
> 39 |   await expect(button).toHaveCSS('color', 'rgb(91, 33, 130)')
     |                        ^ Error: expect(locator).toHaveCSS(expected) failed
  40 |   await expect(button).toHaveCSS('border-top-color', 'rgb(64, 150, 255)')
  41 | })
  42 |
```
