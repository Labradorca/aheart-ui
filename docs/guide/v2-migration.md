# 1.3 → 2.0 迁移表

这份指南用于V1铺路。当前本地候选为`aheart-ui@1.4.0`、`@aheart-ui/ai@1.2.0`、`@aheart-ui/dnd@1.1.0`，尚未发布；2.0行为是已批准的后续计划，尚未实施。V1保留旧根入口、对象身份和逻辑深路径，先把应用改成现在就存在的替代导入，再在V2验收实际2.0 tarball。

AI1.2.0需要aheart-ui≥1.4（peer `^1.4.0`）。新增基础子入口不能搭配公开1.3使用。当前验证使用本地tarball；只有版本实际发布后才使用对应registry版本，不能用`--force`或`--legacy-peer-deps`绕过范围。

## 逐项迁移

| 项目 | 1.3现状 | V1准备 / 2.0目标 | 自动改写与人工事项 |
| --- | --- | --- | --- |
| B1 核心根默认Plugin | `import UI from 'aheart-ui'` | 改从`aheart-ui/full`导入；2.0根不再有default，named组件/类型保留 | codemod处理静态default、named-default、混合import/re-export及明确的CommonJS/awaited `.default` |
| 根named组件与类型 | `import {Button,type ButtonProps} from 'aheart-ui'` | 继续兼容；需要隔离模块图时使用组件公开子入口 | 根named不是弃用API，不机械改成全量Plugin；组合import只移走旧default |
| B2 es/lib物理布局 | 包以es/lib为产物目录 | V2计划改为dist；旧逻辑es/lib通过compat facade继续解析 | codemod把已声明的等价ESM深入口、CommonJS lib入口及CSS深路径改成公开subpath；跨格式namespace语义、文件系统绝对路径及私有模块需人工检查 |
| B3 Workbench根named | `import {AIAgentWorkbench} from '@aheart-ui/ai'` | 改从`@aheart-ui/ai/agent-workbench`导入；`/workbench`别名保留 | codemod保留alias/type修饰并拆分混合import和re-export |
| B3 AI根全量Plugin | 默认Plugin会注册Workbench | 需要原全量注册集合时改为`@aheart-ui/ai/full` | codemod迁移默认Plugin；只需要Chat/Agent时优先使用对应场景入口，由应用明确选择注册范围 |
| B3 DND安装关系 | AI1.2仍强制dependencies.DND | V2计划改为optional peer；Workbench/full用户显式安装DND，Chat用户可不装 | 依赖范围与锁文件由应用人工调整；codemod不改package.json、不安装包。V1没有提前实施optional peer |
| B4 显式CSS | 发布JS已经style-free；应用显式导入样式 | 基础按需为theme+组件CSS，全量为full.css；style.css兼容路径保留 | 不虚构“自动CSS”弃用提示。新AI复合组件CSS包含声明的基础/DND闭包；theme仍由应用显式引入 |
| 应用样式入口 | 旧全量CSS可以继续使用 | 逐步选择公开组件CSS，或使用Resolver `importStyle:'css'` | 手动样式与Resolver任选一种；Workbench保留既有DND sideEffects兼容声明，重复导入同一依赖不代表额外能力 |
| 包与部署 | 1.3为公开基线 | V1为本地1.4/AI1.2组合验收；V2只按独立授权发布next alpha | 本指南和工具均不执行版本修改、发布、tag、合并或部署 |

完整处置及原始依据见仓库中的 [弃用清单](https://github.com/Labradorca/aheart-ui/blob/master/docs/superpowers/plans/2026-11-17-aheart-ui-v2-deprecations.md)；V1预算分类和负责人后续决定见 [当前设计](https://github.com/Labradorca/aheart-ui/blob/master/docs/superpowers/plans/2026-11-17-aiform-on-demand-feasibility.md)。

## 典型导入

```ts
import UI from 'aheart-ui/full'
import 'aheart-ui/full.css'
app.use(UI)
```

按需手动消费AIForm：

```ts
import { AIForm } from '@aheart-ui/ai/form'
import 'aheart-ui/theme.css'
import '@aheart-ui/ai/form/style.css'
```

Workbench按需消费：

```ts
import { AIAgentWorkbench } from '@aheart-ui/ai/agent-workbench'
import 'aheart-ui/theme.css'
import '@aheart-ui/ai/agent-workbench/style.css'
```

V1的AI复合CSS已经合并其声明的依赖样式。为保持旧Resolver契约，Workbench仍声明DND sortable sideEffect；既有手动DND样式导入可继续使用。预算同时记录去重闭包、各依赖占比和实际生产CSS资源，不用重复导入规避预算。

## 开发构建诊断

保留根/full/scoped组件与Plugin对象身份，因此组件运行时无法可靠识别调用者的import来源。按负责人决定，V1采用可显式启用的Vite开发构建诊断：

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { AheartV2DeprecationDiagnostics } from 'aheart-ui/resolver'

export default defineConfig({
  plugins: [vue(), AheartV2DeprecationDiagnostics()]
})
```

诊断在非production模式的Vite开发服务器中运行，按文件与B1/B3各提示一次，覆盖编译后明确的默认Plugin、Workbench import/re-export、namespace属性访问和直接的dynamic/CommonJS属性访问。推荐的根named、`/full`和组件/场景子入口不会被当成弃用。类型专用导入由codemod与严格类型检查处理。任何`vite build`以及production模式都不输出这些诊断；应用产物不注入运行时warning或包装组件。

跨变量传播、反射和复杂动态加载不能可靠静态判断，需按下方迁移表人工复核；未启用该插件时也应使用codemod审阅。构建诊断不是v2已经实施的证明。

## Codemod

工具位于仓库的`scripts/codemods/aheart-v2.mjs`，使用工作区已安装的TypeScript与Vue SFC解析器。先在应用的独立分支查看差异，从仓库执行并传入应用源文件：

```sh
node scripts/codemods/aheart-v2.mjs --dry-run /path/to/app/src/App.vue /path/to/app/src/main.ts
node scripts/codemods/aheart-v2.mjs --write /path/to/app/src/App.vue /path/to/app/src/main.ts
node scripts/codemods/aheart-v2.mjs --check /path/to/app/src/App.vue /path/to/app/src/main.ts
```

默认只预览；`--write`才写文件。工具只处理显式传入文件，不改依赖或锁文件。`--check`在仍有可改写项或人工审阅项时退出1，无剩余项退出0，命令用法错误退出2。

Vue普通script和script setup按SFC真实位置处理，template/style不改；alias、type导入和普通注释保留，再次运行保持幂等。涉及类型/ESLint抑制指令的混合拆分会保留原文并列入人工审阅。模块绑定在内存中分析，局部同名变量不会被误写，Node createRequire的const别名可识别。访问default/Workbench或逃逸的namespace及复杂动态调用需要检查；仅访问兼容named成员的namespace不提示迁移；解析错误、私有入口及跨ESM/CJS格式语义也不能靠字符串替换处理。

人工修改后执行严格类型、生产构建与SSR/hydration，并逐项测试应用真实任务。两个仓库试点的业务源码保持冻结，codemod验证在独立夹具中执行，不改写试点来换取通过。

## 验证与回退

当前V1从真实本地tarball检查65条入口，不能冒充2.0消费验证。V2候选出现后，按同一任务清单从1.3升级到alpha；codemod之外的手工改动逐项登记，指南外改动为0。回退时恢复匹配的core/AI/DND版本与原锁文件，并验证业务状态保留；未发布的本地1.4/AI1.2候选不能被写成公开registry成功。

物理iOS Safari必测已取消。五浏览器中的移动WebKit属于浏览器仿真，未经真机验证；自动化、代理观察和负责人实际操作验收分别记录。
