import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { entryInput, getComponentEntries } from '../build/package-entries.mjs'
import { splitPackageStyles } from '../build/split-styles.mjs'

const entries = getComponentEntries('ai')

export default defineConfig({
  build: {
    outDir: 'dist',
    target: 'modules',
    minify: 'esbuild',
    rollupOptions: {
      external: (id) => id === 'vue' || id.startsWith('vue/') || id === 'aheart-ui' || id.startsWith('aheart-ui/') || (id === '@aheart-ui/dnd' || id.startsWith('@aheart-ui/dnd/')),
      input: entryInput(entries),
      output: [
        { format: 'es', exports: 'named', entryFileNames: '[name].js', preserveModules: true, dir: 'dist/esm', preserveModulesRoot: 'src' },
        { format: 'cjs', exports: 'named', entryFileNames: '[name].js', preserveModules: true, dir: 'dist/cjs', preserveModulesRoot: 'src' }
      ]
    },
    lib: { entry: './src/index.ts', name: 'AheartAI' }
  },
  plugins: [vue(), dts({ outDir: 'dist/types', tsconfigPath: './tsconfig.json' }), splitPackageStyles(new URL('./', import.meta.url), 'ai', entries, { dist: true })]
})
