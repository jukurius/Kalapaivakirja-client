import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import Slider from "../components/reuseables/Slider";

function CatchDetails() {
  const params = useParams();
  const [post, setPost] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useContext(AppContext);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPost = async () => {
      try {
        const response = await axiosPrivate.get("/singlePost", {
          // signal: controller.signal,
          params: { id: params?.id },
        });
        console.log(response.data);
        isMounted && setPost(response.data);
      } catch (err) {
        console.error(err);
        setAuth({});
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getPost();
    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {post ? (
        <div className="container mx-auto p-4 mt-10">
          <div className="flex gap-10 justify-center">
            <div className="max-w-[800px] shadow-xl border">
              {post[0]?.images?.length && (
                <Slider images={post[0]?.images?.length && post[0].images} />
              )}
            </div>
            <div className="bg-white min-w-[600px] p-4 shadow-md border">
              <div className="mb-6">
                <h2 className="text-xl font-medium text-[#1c2434] mb-3">
                  Käyttäjä ja aika
                </h2>
                {post[0]?.catch_date && (
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#1c2434] mb-2 font-medium">Pvm:</p>
                    <p className="text-md font-Satoshi">
                      {post[0]?.catch_date}
                    </p>
                  </div>
                )}
                {post[0]?.username && (
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Kalastaja:
                    </p>
                    <p className="text-md">{post[0]?.username}</p>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-medium text-[#1c2434] mb-3">
                  Saaliin tiedot
                </h2>
                {post[0]?.species_name && (
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">Kalalaji:</p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.species_name}
                    </p>
                  </div>
                )}
                {post[0]?.weight && (
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">Paino: </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.weight} kg
                    </p>
                  </div>
                )}
                {post[0]?.catch_length && (
                  <div className="flex items-baseline gap-2">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">Pituus: </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.catch_length} cm
                    </p>
                  </div>
                )}
              </div>
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
