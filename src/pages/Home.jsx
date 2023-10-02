import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import axios from "axios";
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
    <div>
      <Hero />
      <CarouselSection posts={latestPosts} />
    </div>
  );
}

export default Home;
