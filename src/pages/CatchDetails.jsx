import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

function CatchDetails() {
  const params = useParams();
  const [post, setPost] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPost = async () => {
      try {
        const response = await axiosPrivate.get("/singlePost", {
          signal: controller.signal,
          params: { id: params.id },
        });
        console.log(response.data);
        isMounted && setPost(response.data);
      } catch (err) {
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getPost();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {post ? (
        <div className="container max-w-7xl mx-auto p-4">
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 p-4">
              <img
                src={post[0]?.catch_img}
                alt="Product Image"
                className="w-full h-auto"
              />
            </div>
            <div className="w-full md:w-1/2 p-4">
              <h1 className="text-3xl font-bold mb-4">{post[0]?.species_name}, {post[0]?.weight}kg</h1>
              <p className="text-gray-600 mb-4 font-bold">Kalastaja: {post[0]?.username}</p>
              <p className="text-gray-600 mb-4 font-bold">Lisätty: {post[0]?.catch_date}</p>
              <p className="text-gray-600 mb-4 font-bold">Sijainti: {post[0]?.location_province}, {post[0]?.location_city}</p>
              <p className="text-gray-600 mb-4 font-bold">{post[0]?.location_lake && <span>Järvi: {post[0]?.location_lake}</span>}</p>
              <p className="text-gray-600 mb-4 font-bold">{post[0]?.lure_name && <span>Viehe: {post[0]?.lure_name}</span>}</p>
              <p className="text-gray-600 mb-4 font-bold">{post[0]?.color && <span>Vieheen väri: {post[0]?.color}</span>}</p>
              <p className="text-gray-600 mb-4 font-bold">{post[0]?.size && <span>Vieheen koko: {post[0]?.size} cm</span>}</p>
              <p className="text-gray-600 mb-4 font-bold">{post[0]?.air_temperature && <span>Ilman lämpötila: {post[0]?.air_temperature} °C</span>}</p>
              <p className="text-gray-600 mb-4 font-bold">{post[0]?.water_tempature && <span>Veden lämpötila: {post[0]?.water_tempature} °C</span>}</p>
              <p className="text-gray-600 mb-4 font-bold">{post[0]?.wind && <span>Tuulen voimakkuus: {post[0]?.wind} m/s</span>}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No Post to display</p>
      )}
    </>
  );
}

export default CatchDetails;
