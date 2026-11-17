import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getComponentCatalogs } from "../docs/.vitepress/data/components";

test.describe("GitHub Pages homepage", () => {
  test("presents the current product positioning and primary routes", async ({
    page,
  }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "为产品而写的",
    );
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Vue 3 组件库",
    );
    const { core, composed } = getComponentCatalogs("zh");
    const componentCount = String(core.length + composed.length);
    await expect(page.locator(".home-fact")).toContainText(
      `${componentCount} 个核心与组合组件`,
    );
    await expect(page.getByLabel("AI Agent 产品工作台预览")).toBeVisible();

    const installation = page.getByRole("link", { name: /开始使用/ });
    const workbench = page.getByRole("link", { name: "查看 AI 产品" });
    await expect(installation).toHaveAttribute("href", /\/guide\/installation/);
    await expect(workbench).toHaveAttribute("href", /\/ai\/overview/);
    await expect(
      page.getByRole("link", { name: /查看组合组件/ }),
    ).toHaveAttribute("href", /\/composed\/overview/);

    await workbench.click();
    await expect(page).toHaveURL(/\/ai\/overview(?:\.html)?$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /AI 产品/ }),
    ).toBeVisible();
  });

  test("keeps the homepage inside the mobile viewport", async ({ page }) => {
    await page.goto("/");

    const viewport = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
    }));

    expect(viewport.scrollWidth).toBeLessThanOrEqual(viewport.clientWidth + 1);
    await expect(page.getByRole("link", { name: /开始使用/ })).toBeVisible();
    await expect(
      page.getByText("不只是看起来正确，也要经得起验证"),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "在 GitHub 查看" }),
    ).toBeVisible();
  });

  test("uses a full-bleed canvas on ultra-wide screens", async ({ page }) => {
    await page.setViewportSize({ width: 2443, height: 999 });
    await page.goto("/");

    const layout = await page.evaluate(() => {
      const pageElement = document.querySelector(".aheart-home-page");
      const hero = document.querySelector(".aheart-home-hero");
      const heroInner = document.querySelector(".aheart-home-hero__inner");
      if (!pageElement || !hero || !heroInner) return null;
      return {
        page: pageElement.getBoundingClientRect().toJSON(),
        hero: hero.getBoundingClientRect().toJSON(),
        heroInner: heroInner.getBoundingClientRect().toJSON(),
      };
    });

    expect(layout).not.toBeNull();
    expect(layout!.page.x).toBeLessThanOrEqual(1);
    expect(layout!.page.width).toBeGreaterThanOrEqual(2441);
    expect(layout!.hero.x).toBeLessThanOrEqual(1);
    expect(layout!.hero.width).toBeGreaterThanOrEqual(2441);
    expect(layout!.heroInner.width).toBeGreaterThanOrEqual(1400);
  });

  test("has no critical or serious automated accessibility violations", async ({
    page,
  }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page }).analyze();
    const blockingViolations = results.violations.filter(
      (violation) =>
        violation.impact === "critical" || violation.impact === "serious",
    );

    expect(blockingViolations).toEqual([]);
  });

  test("lets visitors try a theme and preview settings without saving data", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "松绿", exact: true }).click();
    await expect(
      page.getByRole("button", { name: "松绿", exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await page.getByLabel("项目名称", { exact: true }).fill("我的组件项目");
    await page.getByRole("button", { name: "预览设置", exact: true }).click();
    await expect(
      page.getByText("已预览「我的组件项目」，未保存数据"),
    ).toBeVisible();
    await page.getByLabel("项目名称", { exact: true }).fill(" ");
    await expect(
      page.getByRole("button", { name: "预览设置", exact: true }),
    ).toBeDisabled();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(page.locator(".home-intro")).toHaveCSS(
      "animation-name",
      "none",
    );
  });
});
