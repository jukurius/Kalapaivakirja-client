import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { IconQuestionMark } from "@tabler/icons-react";
import RenderCards from "../components/reuseables/RenderCards";

const SingleUser = () => {
  const [user, setUser] = useState([]);
  const [usersPosts, setUsersPosts] = useState([]);
  const { username } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [toggle, setToggle] = useState(true); // true = profile and false = posts

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axiosPrivate.get(`/user?username=${username}`);
      setUser(response.data);
    };
    fetchUserData();
    const fetchUserPosts = async () => {
      const response = await axiosPrivate.get(`/catches?username=${username}`);
      setUsersPosts(response.data);
    };
    fetchUserPosts();
  }, []);

  return (
    <div className="container max-w-7xl mx-auto mt-6 p-5">
      {user.length > 0 && (
        <div className="bg-[url('./assets/fisher2.jpg')] flex bg-cover bg-center rounded-lg h-80 items-end p-6">
          <div className="flex gap-3 justify-center items-center rounded-full bg-gray-200 opacity-80">
            <div className="bg-white inline-block rounded-full p-2">
              {user[0]?.image ? (
                <img src={user[0]?.image} alt="" className="w-16" />
              ) : (
                <div className="rounded-full">
                  <IconQuestionMark size={64} />
                </div>
              )}  
            </div>
            <div className="">
              <h2 className="pe-20 text-xl font-medium">{user[0]?.username}</h2>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setToggle(!toggle)}
          className={`${
            toggle
              ? "bg-custom-dark-blue px-8 py-2 rounded-full text-white border"
              : "px-8 py-2 rounded-full text-gray-500 border border-gray-400"
          }`}
          disabled={toggle}
        >
          Profiili
        </button>
        <button
          onClick={() => setToggle(!toggle)}
          className={`${
            !toggle
              ? "bg-custom-dark-blue px-8 py-2 rounded-full text-white border"
              : "px-8 py-2 rounded-full text-gray-500 border border-gray-400"
          }`}
          disabled={!toggle}
        >
          Kalasaaliit
        </button>
      </div>
      {toggle ? (
        <section className="flex gap-4 mt-4">
          <div className="flex flex-col gap-4 bg-white p-4 py-8 rounded-lg shadow-md w-1/2">
            <h2 className="text-xl pb-4 text-gray-800">Perustiedot</h2>
            {user[0]?.username && (
              <div className="flex justify-between w-full">
                <div className="flex-1 text-gray-500 text-sm tracking-widest">
                  Käyttäjänimi
                </div>
                <div className="text-sm">{user[0]?.username}</div>
              </div>
            )}
            {user[0]?.firstname && (
              <>
                <div className="border-b"></div>
                <div className="flex justify-between w-full">
                  <div className="flex-1 text-gray-500 text-sm tracking-widest">
                    Etunimi
                  </div>
                  <div className="text-sm ">{user[0]?.firstname}</div>
                </div>
              </>
            )}
            {user[0]?.lastname && (
              <>
                <div className="border-b"></div>
                <div className="flex justify-between w-full">
                  <div className="flex-1 text-gray-500 text-sm tracking-widest">
                    Sukunimi
                  </div>
                  <div className="text-sm ">{user[0]?.lastname}</div>
                </div>
              </>
            )}
            {user[0]?.created && (
              <>
                <div className="border-b"></div>
                <div className="flex justify-between w-full">
                  <div className="flex-1 text-gray-500 text-sm tracking-widest">
                    Liittynyt
                  </div>
                  <div className="text-sm ">{user[0]?.created}</div>
                </div>
              </>
            )}
            {user[0]?.fishingMethod && (
              <>
                <div className="border-b"></div>
                <div className="flex justify-between w-full">
                  <div className="flex-1 text-gray-500 text-sm tracking-widest">
                    Kalastus tyyli
                  </div>
                  <div className="text-sm">{user[0]?.fishingMethod}</div>
                </div>
              </>
            )}
            {user[0]?.experience && (
              <>
                <div className="border-b"></div>
                <div className="flex justify-between w-full">
                  <div className="flex-1 text-gray-500 text-sm tracking-widest">
                    Aktiivisuus
                  </div>
                  <div className="text-sm">{user[0]?.experience}</div>
                </div>
              </>
            )}
          </div>
          {user[0]?.description && (
            <div className="flex flex-col bg-white p-4 py-8  rounded-lg shadow-md w-1/2">
              <h2 className="text-xl pb-8 text-gray-800">Kuvaus</h2>
              <p className="text-sm">{user[0]?.description}</p>
            </div>
          )}
        </section>
      ) : (
        <section className="py-4 grid grid-flow-col gap-2 grid-cols-3">
          <RenderCards items={usersPosts} />
        </section>
      )}
    </div>
  );
};

export default SingleUser;
