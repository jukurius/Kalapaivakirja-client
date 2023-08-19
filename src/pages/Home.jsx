import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import axios from "axios";
import { motion } from "framer-motion";
import CarouselSection from "../components/home/CarouselSection";

function Home() {
  const [latestPosts, setLatestPosts] = useState([]);
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/latestPosts");
        const data = await res.data;
        setLatestPosts(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLatestPosts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <CarouselSection posts={latestPosts} />
    </motion.div>
  );
}

export default Home;
