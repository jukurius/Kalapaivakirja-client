import LoginForm from '../../components/login/LoginForm'
import { motion } from 'framer-motion';

function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <LoginForm />
    </motion.div>
  )
}

export default Login