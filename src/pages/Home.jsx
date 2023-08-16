import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import axios from "axios";
import RenderCards from "../components/reuseables/RenderCards";
import { motion } from "framer-motion";

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
      <div>
        <h2 className="text-4xl font-bold text-custom-dark-blue">
          Uusimmat kalasaaliit
        </h2>
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-20">
        <RenderCards items={latestPosts} />
      </div>
    </motion.div>
  );
}

export default Home;
