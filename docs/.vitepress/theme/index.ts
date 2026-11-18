import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import AheartUI from "aheart-ui/full";
import AheartAI from "@aheart-ui/ai";
import AheartDnd from "@aheart-ui/dnd";
import "aheart-ui/full.css";
import "@aheart-ui/ai/style.css";
import "@aheart-ui/dnd/style.css";
import "./style.css";
import DocContext from "./DocContext.vue";
import "./site.css";
import "./studio.css";
import "./editorial.css";
import "./reference.css";
import ComponentOverview from "./ComponentOverview.vue";
import QualityMatrix from "./QualityMatrix.vue";

const theme: Theme = {
  extends: DefaultTheme,
  Layout: () =>
    h(DefaultTheme.Layout, null, { "doc-before": () => h(DocContext) }),
  enhanceApp({ app }) {
    app.use(AheartUI);
    app.use(AheartAI);
    app.use(AheartDnd);
    app.component("ComponentOverview", ComponentOverview);
    app.component("QualityMatrix", QualityMatrix);
  },
};

export default theme;
