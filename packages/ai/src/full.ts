import type { Plugin } from 'vue'
import AheartAI from './index'
import AIAgentWorkbench from './agent-workbench.vue'

export * from './index'
export { AIAgentWorkbench }

const plugin: Plugin = {
  install(app) {
    app.use(AheartAI)
    app.component('AAIAgentWorkbench', AIAgentWorkbench)
  }
}

export default plugin
