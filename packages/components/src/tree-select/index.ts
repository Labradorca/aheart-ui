import TreeSelect from './tree-select.vue'
import { withInstall } from '../utils/install'
export type { TreeSelectVirtual, TreeSelectVirtualConfig } from './virtual-options'

const InstalledTreeSelect = withInstall(TreeSelect, 'ATreeSelect')

export { InstalledTreeSelect as TreeSelect }
export default InstalledTreeSelect
