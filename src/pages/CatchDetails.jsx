import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { AppContext } from "../AppContext";
import Slider from "../components/reuseables/Slider";
import GoogleMapShow from "../components/reuseables/GoogleMapShowLocation";

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
    <div>
      {post ? (
        <div className="container bg-slate-50 max-w-7xl mx-auto p-8 mt-10 rounded-md shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="shadow-xl rounded-lg">
              {post[0]?.images?.length && (
                <Slider images={post[0]?.images?.length && post[0].images} />
              )}
            </div>
            <div className="py-4 px-8">
              <div className="mb-6 flex flex-col gap-4">
                <h2 className="text-xl font-medium text-[#1c2434] mb-3">
                  Käyttäjä ja aika
                </h2>
                {post[0]?.date && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] mb-2 font-medium">Pvm:</p>
                    <p className="text-md font-Satoshi">{post[0]?.date}</p>
                  </div>
                )}
                {post[0]?.username && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Kalastaja:
                    </p>
                    <p className="text-md">{post[0]?.username}</p>
                  </div>
                )}
              </div>
              <div className="mb-6 flex flex-col gap-4">
                <h2 className="text-xl font-medium text-[#1c2434] mb-3">
                  Saaliin tiedot
                </h2>
                {post[0]?.species_name && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Kalalaji:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.species_name}
                    </p>
                  </div>
                )}
                {post[0]?.weight && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Paino:{" "}
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.weight} kg
                    </p>
                  </div>
                )}
                {post[0]?.catch_length && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Pituus:{" "}
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.catch_length} cm
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="items-baseline py-4 px-8">
              <div className="mb-6 flex flex-col gap-4">
                <h2 className="text-xl font-medium text-[#1c2434] mb-3">
                  Sijainti ja sää
                </h2>
                {post[0]?.location_province && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Maakunta:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.location_province}
                    </p>
                  </div>
                )}
                {post[0]?.location_city && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Kunta:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.location_city}
                    </p>
                  </div>
                )}
                {post[0]?.location_lake && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Järvi:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.location_lake}
                    </p>
                  </div>
                )}
                {post[0]?.weather_condition && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Keliolosuhteet:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.weather_condition}
                    </p>
                  </div>
                )}
                {post[0]?.air_temp && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Ilman lämpötila:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.air_temp} °C
                    </p>
                  </div>
                )}
                {post[0]?.water_temp && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Veden lämpötila:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.water_temp} °C
                    </p>
                  </div>
                )}
                {post[0]?.wind && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Tuuli:
                    </p>
                    <p className="text-md font-Satoshi"> {post[0]?.wind} m/s</p>
                  </div>
                )}
              </div>
            </div>
            <div className="items-baseline py-4 px-8">
              <div className="mb-6 flex flex-col gap-4">
                <h2 className="text-xl font-medium text-[#1c2434] mb-3">
                  Vieheen tiedot
                </h2>
                {post[0]?.fishing_style && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Kalastustyyli:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.fishing_style}
                    </p>
                  </div>
                )}
                {post[0]?.maker_name && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Vieheen merkki:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.maker_name}
                    </p>
                  </div>
                )}
                {post[0]?.size && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Vieheen pituus:
                    </p>
                    <p className="text-md font-Satoshi"> {post[0]?.size} cm</p>
                  </div>
                )}
                {post[0]?.color_first && (
                  <div className="flex items-baseline justify-between border-b">
                    <p className="text-[#1c2434] text-md mb-2 font-medium">
                      Vieheen väritys:
                    </p>
                    <p className="text-md font-Satoshi">
                      {" "}
                      {post[0]?.color_first}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="items-baseline py-4 px-8">
              <GoogleMapShow />
            </div>
          </div>
        </div>
      ) : (
        <p>No Post to display</p>
      )}
    </div>
  );
}

export default CatchDetails;
