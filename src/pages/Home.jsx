import { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import axios from "axios";
import RenderCards from "../components/reuseables/RenderCards";
import { ToastContainer } from 'react-toastify';

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
    <div className="container max-w-7xl mx-auto px-5">
      <Hero />
      <div>
        <h2 className="text-4xl font-bold text-custom-dark-blue">Uusimmat kalasaaliit</h2>
      </div>
      <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-20">
        <RenderCards items={latestPosts} />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Home;
