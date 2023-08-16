import Form from "../components/Catches/upload/Form";
import { UploadContextProvider } from "../components/Catches/upload/context/UploadContext";
import { motion } from "framer-motion";

function UploadPost() {
  return (
    <UploadContextProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <Form />
      </motion.div>
    </UploadContextProvider>
  );
}

export default UploadPost;
