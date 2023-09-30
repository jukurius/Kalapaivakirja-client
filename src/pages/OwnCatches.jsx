import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RenderCards from "../components/reuseables/RenderCards";

const OwnCatches = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axiosPrivate.get(`/catches?username=${username}`);
      setPosts(response.data);
    };
    fetchPosts();
  }, []);
  return (
    <section className="p-4 container mx-auto grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-1">
      <RenderCards items={posts} />
    </section>
  );
};

export default OwnCatches;
