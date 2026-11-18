import Upload from './upload.vue'
import { withInstall } from '../utils/install'

export type { UploadFile, UploadRequest, UploadRequestOption, UploadStatus } from './types'
const InstalledUpload = withInstall(Upload, 'AUpload')

export { InstalledUpload as Upload }
export default InstalledUpload
