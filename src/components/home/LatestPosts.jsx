import React, { useState, useEffect } from "react";
import axios from "axios";

function LatestPosts() {
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
    <div className="container max-w-7xl px-5 mx-auto mt-10 mb-5">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold pb-10 pt-10 text-custom-light-blue">
        Katso uusimmat kalasaaliit
      </h2>
      <RenderLatestPosts items={latestPosts} />
    </div>
  );
}

const RenderLatestPosts = (props) => {
  const data = props.items.map((item) => {
    return (
      <div
        key={item.id}
        className="min-w-full bg-custom-light shadow"
      >
        <a href="#">
          <img
            className="card-img object-cover h-48 w-full"
            src={item.img}
            alt=""
          />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-custom-light-blue">
              {item.species_name} {item.weight}kg
            </h5>
          </a>
          <p className="mb-1 font-normal">{item.date}</p>
          <p className="mb-3 font-normal">
            {item.location_province}, {item.location_city}
          </p>
          <a
            href="#"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center border border-gray-400 rounded-sm hover:bg-gray-700 hover:border-gray-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300"
          >
            Lue lisää
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
      </div>
    );
  });
  return (
    <div className="grid grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data}
    </div>
  );
};

export default LatestPosts;
