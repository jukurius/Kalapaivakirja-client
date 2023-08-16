import PostsInfinite from '../components/Catches/PostsInfinite'
import { motion } from 'framer-motion';

function Catches() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PostsInfinite />
    </motion.div>
  )
}

export default Catches