import { expect, test } from "@playwright/test";
test("Button playground updates actual props and the copyable source", async ({
  page,
}) => {
  await page.goto("/components/button");
  const stage = page.locator(".button-playground");
  const button = stage.getByRole("button", { name: "创建项目", exact: true });
  await expect(button).toHaveCSS("height", "32px");
  await page.getByLabel("按钮尺寸").selectOption("large");
  await expect(button).toHaveCSS("height", "40px");
  await button.click();
  await expect(stage.locator(".button-playground__canvas").getByRole("status")).toContainText("1 次点击");
  await page.getByLabel("禁用", { exact: true }).check();
  await expect(button).toBeDisabled();
  await stage.getByRole("button", { name: "Vue 代码", exact: true }).click();
  await expect(stage.locator("pre")).toContainText('size="large" disabled');
  await page.emulateMedia({ reducedMotion: "reduce" });
  await stage.getByRole("button", { name: "交互预览", exact: true }).click();
  await expect(button).toBeDisabled();
});
