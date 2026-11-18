import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { publicRuntimeExports, publicStyleExports } from '../packages/components/build/entries.mjs'
import { getComponentEntries, optionalPackageExports } from '../packages/build/package-entries.mjs'
import { distRuntimeExport } from '../packages/build/dist-layout.mjs'

const repositoryRoot = resolve(fileURLToPath(new URL('..', import.meta.url)))

const commonPackageFiles = ['README.md', 'LICENSE', 'package.json', 'es/package.json', 'es/index.js', 'es/index.d.ts', 'es/style.css', 'lib/package.json', 'lib/index.js', 'lib/index.d.ts', 'lib/style.css']
const distPackageFiles = ['README.md', 'LICENSE', 'package.json', 'dist/esm/package.json', 'dist/cjs/package.json']
const filesForExports = (exports, common = commonPackageFiles) => [...new Set([...common, ...Object.values(exports)
  .flatMap(value => typeof value === 'string' ? [value] : Object.values(value))
  .map(target => target.slice(2))])]
const baseExports = { '.': distRuntimeExport('index'), './style.css': './dist/styles/full.css', ...publicRuntimeExports, ...publicStyleExports }
const dndExports = optionalPackageExports(getComponentEntries('dnd'))
const aiExports = {
  '.': distRuntimeExport('index'),
  './style.css': './dist/styles/style.css',
  ...optionalPackageExports(getComponentEntries('ai'), { dist: true, fullEntry: 'full' })
}

export const packageContracts = [
  {
    name: 'aheart-ui',
    version: '2.0.0-alpha.0',
    packageDir: 'packages/components',
    expectedExports: baseExports,
    dist: true,
    cssSideEffects: true,
    requiredFiles: filesForExports(baseExports, distPackageFiles)
  },
  {
    name: '@aheart-ui/dnd',
    version: '1.1.0',
    packageDir: 'packages/dnd',
    expectedExports: dndExports,
    cssSideEffects: true,
    expectedDependencies: {
      '@atlaskit/pragmatic-drag-and-drop': '2.0.1',
      '@atlaskit/pragmatic-drag-and-drop-auto-scroll': '3.0.0'
    },
    requiredFiles: filesForExports(dndExports)
  },
  {
    name: '@aheart-ui/ai',
    version: '2.0.0-alpha.0',
    packageDir: 'packages/ai',
    expectedExports: aiExports,
    dist: true,
    cssSideEffects: true,
    expectedVuePeer: '>=3.5.0 <4',
    expectedPeerDependencies: { 'aheart-ui': '^2.0.0-alpha.0', '@aheart-ui/dnd': '^1.1.0' },
    expectedOptionalPeers: ['@aheart-ui/dnd'],
    requiredFiles: filesForExports(aiExports, distPackageFiles)
  }
]

const hasWorkspaceProtocol = (value) => {
  if (typeof value === 'string') return value.startsWith('workspace:')
  if (Array.isArray(value)) return value.some(hasWorkspaceProtocol)
  if (value && typeof value === 'object') return Object.values(value).some(hasWorkspaceProtocol)
  return false
}

export const validatePackageContract = (contract, manifest, packedFiles) => {
  const errors = []
  const prefix = `${contract.name}:`
  const files = new Set(packedFiles)

  if (manifest.name !== contract.name) errors.push(`${prefix} packed name must be ${contract.name}`)
  if (manifest.version !== contract.version) errors.push(`${prefix} packed version must be ${contract.version}`)

  for (const field of ['description', 'license', 'homepage']) {
    if (typeof manifest[field] !== 'string' || !manifest[field].trim()) errors.push(`${prefix} ${field} is required`)
  }

  if (!manifest.repository?.url) errors.push(`${prefix} repository.url is required`)
  if (!manifest.bugs?.url) errors.push(`${prefix} bugs.url is required`)
  if (manifest.publishConfig?.access !== 'public') errors.push(`${prefix} publishConfig.access must be public`)
  if (manifest.publishConfig?.registry !== 'https://registry.npmjs.org/') {
    errors.push(`${prefix} publishConfig.registry must be https://registry.npmjs.org/`)
  }
  if (contract.version.includes('-') && manifest.publishConfig?.tag !== 'next') {
    errors.push(`${prefix} prereleases must use the next dist-tag`)
  }

  const rootExport = manifest.exports?.['.']
  const expectedRoot = contract.expectedExports?.['.'] ?? { types: './es/index.d.ts', import: './es/index.js', require: './lib/index.js' }
  for (const [condition, target] of Object.entries(expectedRoot)) {
    if (rootExport?.[condition] !== target) errors.push(`${prefix} exports["."].${condition} must be ${target}`)
  }
  const expectedStyle = contract.expectedExports?.['./style.css'] ?? './es/style.css'
  if (manifest.exports?.['./style.css'] !== expectedStyle) errors.push(`${prefix} style export must be ${expectedStyle}`)
  if (contract.dist) {
    for (const [field, condition] of [['main', 'require'], ['module', 'import'], ['types', 'types']]) {
      if (manifest[field] !== expectedRoot[condition].slice(2)) errors.push(`${prefix} ${field} must resolve to the dist root entry`)
    }
    for (const file of files) {
      if (!file.startsWith('dist/') && !distPackageFiles.includes(file)) errors.push(`${prefix} tarball must not include ${file}`)
    }
  }
  if (manifest.exports?.['./package.json'] !== './package.json') errors.push(`${prefix} package.json export is required`)
  for (const [subpath, expected] of Object.entries(contract.expectedExports ?? {})) {
    if (JSON.stringify(manifest.exports?.[subpath]) !== JSON.stringify(expected)) errors.push(`${prefix} export ${subpath} must match its public entry contract`)
  }
  if (contract.cssSideEffects && JSON.stringify(manifest.sideEffects) !== JSON.stringify(['**/*.css'])) {
    errors.push(`${prefix} sideEffects must retain CSS and allow JavaScript tree shaking`)
  }
  const expectedVuePeer = contract.expectedVuePeer ?? '>=3.4.0 <4'
  if (manifest.peerDependencies?.vue !== expectedVuePeer) errors.push(`${prefix} Vue peer range must be ${expectedVuePeer}`)

  if (hasWorkspaceProtocol(manifest)) errors.push(`${prefix} packed manifest contains an unresolved workspace: protocol`)

  for (const [name, range] of Object.entries(contract.expectedDependencies ?? {})) {
    if (manifest.dependencies?.[name] !== range) errors.push(`${prefix} dependency ${name} must be ${range}`)
  }

  for (const [name, range] of Object.entries(contract.expectedPeerDependencies ?? {})) {
    if (manifest.peerDependencies?.[name] !== range) errors.push(`${prefix} peer dependency ${name} must be ${range}`)
  }
  for (const name of contract.expectedOptionalPeers ?? []) {
    if (manifest.peerDependenciesMeta?.[name]?.optional !== true) errors.push(`${prefix} ${name} must be an optional peer`)
    if (manifest.dependencies?.[name] || manifest.optionalDependencies?.[name]) {
      errors.push(`${prefix} ${name} must be installed explicitly by the consumer`)
    }
  }

  for (const file of contract.requiredFiles) {
    if (!files.has(file)) errors.push(`${prefix} packed file ${file} is required`)
  }

  for (const file of files) {
    if (file.startsWith('src/') || file.includes('/src/') || file.startsWith('__tests__/') || file.includes('/__tests__/')) {
      errors.push(`${prefix} tarball must not include ${file}`)
    }
  }

  return errors
}

const readPackedManifest = (tarball) => {
  const output = execFileSync('tar', ['-xOf', tarball, 'package/package.json'], { encoding: 'utf8' })
  return JSON.parse(output)
}

const packPackage = (contract, destination) => {
  const output = execFileSync(
    'corepack',
    ['pnpm', '--dir', contract.packageDir, 'pack', '--json', '--pack-destination', destination],
    { cwd: repositoryRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }
  )
  const result = JSON.parse(output)
  const tarball = resolve(result.filename)
  const manifest = readPackedManifest(tarball)
  const files = result.files.map((file) => file.path)
  return { manifest, files, tarball }
}

export const verifyReleasePackages = ({ packDestination } = {}) => {
  const destination = packDestination ? resolve(packDestination) : mkdtempSync(resolve(tmpdir(), 'aheart-ui-release-'))
  mkdirSync(destination, { recursive: true })
  const summaries = []
  const errors = []

  try {
    for (const contract of packageContracts) {
      try {
        const packed = packPackage(contract, destination)
        errors.push(...validatePackageContract(contract, packed.manifest, packed.files))
        summaries.push(`${contract.name}@${contract.version}: ${packed.files.length} files`)
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        errors.push(`${contract.name}: pack failed: ${message}`)
      }
    }
  } finally {
    if (!packDestination) rmSync(destination, { recursive: true, force: true })
  }

  if (errors.length) throw new Error(`Release contract failed:\n- ${errors.join('\n- ')}`)
  return summaries
}

const isCli = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href

if (isCli) {
  try {
    const destinationIndex = process.argv.indexOf('--pack-destination')
    const packDestination = destinationIndex < 0 ? undefined : process.argv[destinationIndex + 1]
    if (destinationIndex >= 0 && (!packDestination || packDestination.startsWith('--'))) {
      throw new Error('--pack-destination requires a directory')
    }
    for (const summary of verifyReleasePackages({ packDestination })) console.log(`✓ ${summary}`)
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error))
    process.exitCode = 1
  }
}
