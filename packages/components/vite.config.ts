
import { readFileSync } from 'node:fs'
import { defineConfig, type Plugin } from "vite";
import vue from "@vitejs/plugin-vue"
import dts from 'vite-plugin-dts'

import { componentEntries, fullStyleSources } from './build/entries.mjs'
import { emitDistFile, emitDistModuleMetadata } from '../build/dist-layout.mjs'

const directory = new URL('./', import.meta.url)

function deterministicStyleBundle(): Plugin {
    return {
        name: 'aheart-deterministic-style-bundle',
        closeBundle() {
            const css = `${fullStyleSources
                .map((file) => readFileSync(new URL(`./src/${file}`, import.meta.url), 'utf8').trimEnd())
                .join('\n')}\n`

            const emitStyle = (file: string, contents: string) => emitDistFile(directory, `styles/${file}`, contents)
            emitStyle('full.css', css)
            emitStyle('theme.css', readFileSync(new URL('./src/theme/index.css', import.meta.url), 'utf8'))
            for (const entry of componentEntries) {
                emitStyle(`${entry.subpath}/style.css`, `${entry.styles.map((file: string) => readFileSync(new URL(`./src/${file}`, import.meta.url), 'utf8').trimEnd()).join('\n')}\n`)
            }

            for (const source of fullStyleSources) {
                const output = source.replace(/\.css$/, '.css.js')
                emitDistFile(directory, `esm/${output}`, '')
                emitDistFile(directory, `cjs/${output}`, '"use strict";\n')
            }

            emitDistModuleMetadata(directory)
        }
    }
}

export default defineConfig(
    {
        build: {
            target: 'modules',
            //打包文件目录
            outDir: 'dist',
            //压缩
            minify: false,
            //css分离
            //cssCodeSplit: true,
            rollupOptions: {
                //忽略打包vue文件
                external: ['vue', '@floating-ui/dom', '@lucide/vue', '@tanstack/vue-virtual', 'dayjs', /^dayjs\//],
                input: {
                    index: 'src/index.ts',
                    full: 'src/full.ts',
                    'compat/index': 'src/compat/index.ts',
                    'constant/index': 'src/constant/index.ts',
                    'resolver/index': 'src/resolver/index.ts',
                    ...Object.fromEntries(componentEntries.map(({ subpath, sourceEntry }) => [`${subpath}/index`, sourceEntry])),
                    'utils/floating': 'src/utils/floating.ts',
                    'utils/use-async-task': 'src/utils/use-async-task.ts',
                    'utils/use-collection': 'src/utils/use-collection.ts',
                    'utils/use-roving-focus': 'src/utils/use-roving-focus.ts',
                    'picker-core/index': 'src/picker-core/index.ts',
                    'date-picker/date-utils': 'src/date-picker/date-utils.ts'
                },
                output: [
                    {
                        format: 'es',
                        exports: 'named',
                        //不用打包成.es.js,这里我们想把它打包成.js
                        entryFileNames: '[name].js',
                        chunkFileNames: '[name].js',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        //配置打包根目录
                        dir: 'dist/esm',
                        preserveModulesRoot: 'src'
                    },
                    {
                        format: 'cjs',
                        exports: 'named',
                        entryFileNames: '[name].js',
                        chunkFileNames: '[name].js',
                        //让打包目录和我们目录对应
                        preserveModules: true,
                        //配置打包根目录
                        dir: 'dist/cjs',
                        preserveModulesRoot: 'src'
                    }
                ]
            },
            lib: {
                entry: './src/index.ts',
                name: 'AheartUI'
            }
        },
        plugins: [
            vue(),
            dts({ outDir: 'dist/types', tsconfigPath: './tsconfig.json' }),
            deterministicStyleBundle()
        ]
    }
)
