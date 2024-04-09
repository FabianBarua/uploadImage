import { UploadImageContextProvider } from '../../utils/context/uploadImage'
import { UploadZone } from './UploadZone'

export const App = () => {
  return (
    <UploadImageContextProvider>
      <UploadZone />
    </UploadImageContextProvider>
  )
}
