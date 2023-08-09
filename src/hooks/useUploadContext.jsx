import { useContext } from "react"
import { UploadContext } from "../components/Catches/upload/context/UploadContext"

const useUploadContext = () => {
    return useContext(UploadContext)
}

export default useUploadContext