import Form from '../components/Catches/upload/Form'
import { UploadContextProvider } from '../components/Catches/upload/context/UploadContext'

function UploadPost() {
  return (
    <UploadContextProvider>
    <Form />
    </UploadContextProvider>
  )
}

export default UploadPost