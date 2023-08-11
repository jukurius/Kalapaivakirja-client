import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import axios from "axios";
import RenderCards from "../components/reuseables/RenderCards";

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
      <div className="container max-w-7xl mx-auto px-5">
        <h2 className="text-4xl font-bold text-custom-dark-blue">Uusimmat kalasaaliit</h2>
      </div>
      <div className="container px-5 max-w-7xl mx-auto py-20">
        <RenderCards items={latestPosts} />
      </div>
    </div>
  );
}

export default Home;
