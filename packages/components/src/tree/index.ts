import Tree from './tree.vue'
import { withInstall } from '../utils/install'

export type { TreeKey, TreeNodeData, TreeLoadContext, TreeLoadData, TreeCheckInfo, TreeVirtual, TreeVirtualConfig } from './types'
const InstalledTree = withInstall(Tree, 'ATree')

export { InstalledTree as Tree }
export default InstalledTree
