import RegisterForm from "../../components/login/RegisterForm";
import { motion } from "framer-motion";

function Register() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <RegisterForm />
    </motion.div>
  );
}

export default Register;
