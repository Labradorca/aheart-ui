import Cascader from './cascader.vue'
import { withInstall } from '../utils/install'

export type { CascaderKey, CascaderOption, CascaderPath, CascaderValue, CascaderLoadContext, CascaderVirtual, CascaderVirtualConfig } from './types'
const InstalledCascader = withInstall(Cascader, 'ACascader')

export { InstalledCascader as Cascader }
export default InstalledCascader
