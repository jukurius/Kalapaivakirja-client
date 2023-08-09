import React from 'react'
import UploadCatch from '../components/Catches/upload/UploadCatch'
import Form from '../components/Catches/upload/Form'
import { UploadContextProvider } from '../components/Catches/upload/context/UploadContext'

function UploadPost() {
  return (
    <UploadContextProvider>
    {/* <UploadCatch /> */}
    <Form />
    </UploadContextProvider>
  )
}

export default UploadPost