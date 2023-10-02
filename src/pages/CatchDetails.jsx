import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AppContext } from "../AppContext";
import Slider from "../components/reuseables/Slider";
import GoogleMap from "../components/reuseables/GoogleMapShowLocation";
import PostShowComments from "../components/reuseables/PostShowComments";
import PostWriteComment from "../components/reuseables/PostWriteComment";
import CatchDetailBox from "../components/reuseables/CatchDetailBox";
import { IconFish } from "@tabler/icons-react";
import { IconWeight } from "@tabler/icons-react";
import { IconMapPin } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { IconSunWind } from "@tabler/icons-react";
import { IconFishHook } from "@tabler/icons-react";

function CatchDetails() {
  const params = useParams();
  const [post, setPost] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useContext(AppContext);
  const [comments, setComments] = useState([]);
  const [insertFlag, setInsertFlag] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const fetchComments = async (postId) => {
      const response = await axiosPrivate.get(`/comments?catchId=${postId}`);
      setComments(response.data);
    };
    const getPost = async () => {
      try {
        const response = await axiosPrivate.get("/singlePost", {
          // signal: controller.signal,
          params: { id: params?.id },
        });
        isMounted && setPost(response.data);
        fetchComments(response.data[0]?.id);
      } catch (err) {
        console.error(err);
        setAuth({});
        navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getPost();

    fetchComments();
    return () => {
      isMounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insertFlag]);

  const insertNewComment = async (catchId, content) => {
    try {
      const body = {
        catchId: catchId,
        commentContent: content,
      };
      await axiosPrivate.post("/newComment", JSON.stringify(body));
      setInsertFlag(insertFlag + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container max-w-7xl mx-auto p-8 mt-10">
      {post ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <CatchDetailBox
              header={"KALALAJI"}
              icon={<IconFish size={32} color="blue" />}
            >
              <h4 className="text-md font-semibold">{post[0]?.species_name}</h4>
            </CatchDetailBox>
            <CatchDetailBox
              header={"PAINO JA PITUUS"}
              icon={<IconWeight size={32} color="blue" />}
            >
              <h4 className="text-md font-semibold">{post[0]?.weight} KG</h4>
              <h4 className="text-md font-semibold">
                {post[0]?.catch_length} CM
              </h4>
            </CatchDetailBox>
            <CatchDetailBox
              header={"PAIKKA JA AIKA"}
              icon={<IconMapPin size={32} color="blue" />}
            >
              <h4 className="text-md font-semibold">
                {post[0]?.location_province}, {post[0]?.location_city}
              </h4>
              <h4 className="text-md font-semibold">{post[0]?.date}</h4>
            </CatchDetailBox>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 shadow-lg rounded-md">
              {post[0]?.images?.length && (
                <Slider images={post[0]?.images?.length && post[0].images} />
              )}
            </div>
            <div className="flex flex-col gap-6 col-span-1">
              <CatchDetailBox
                header={"KALASTAJA"}
                icon={<IconUser color="blue" size={32} />}
              >
                <Link className="text-blue-800 font-bold text-md" to={`/kayttajat/${post[0]?.username}`}>
                  {post[0]?.username}
                </Link>
              </CatchDetailBox>
              <CatchDetailBox
                header={"SÄÄOLOSUHTEET"}
                icon={<IconSunWind color="blue" size={32} />}
                iconPosition={"start"}
              >
                {post[0]?.weather_condition && (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      KELI
                    </h4>
                    <p className="text-md font-medium">
                      {post[0]?.weather_condition}
                    </p>
                  </div>
                )}
                {post[0]?.wind && (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      TUULI
                    </h4>
                    <p className="text-md font-medium">{post[0]?.wind} M/S</p>
                  </div>
                )}
                {post[0]?.water_temp && (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      VEDEN LÄMPÖTILA
                    </h4>
                    <p className="text-md font-medium">
                      {post[0]?.water_temp} °C
                    </p>
                  </div>
                )}
                {post[0]?.water_temp && (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      ILMAN LÄMPÖTILA
                    </h4>
                    <p className="text-md font-medium">
                      {post[0]?.air_temp} °C
                    </p>
                  </div>
                )}
              </CatchDetailBox>
              <CatchDetailBox
                header={"VIEHE"}
                icon={<IconFishHook color="blue" size={32} />}
                iconPosition={"start"}
              >
                {post[0]?.fishing_style && (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      KALASTUSTYYLI
                    </h4>
                    <p className="text-md font-medium">
                      {post[0]?.fishing_style}
                    </p>
                  </div>
                )}
                {post[0]?.maker_name && (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      VALMISTAJA
                    </h4>
                    <p className="text-md font-medium">{post[0]?.maker_name}</p>
                  </div>
                )}
                {post[0]?.size && (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      VIEHEEN PITUUS
                    </h4>
                    <p className="text-md font-medium">{post[0]?.size} CM</p>
                  </div>
                )}
                {post[0]?.color_second == null &&
                post[0]?.color_third == null ? (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest">
                      VÄRITYS
                    </h4>
                    <p className="text-md font-medium">
                      {post[0]?.color_first}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-baseline py-2">
                    <h4 className="text-gray-500 text-xs tracking-widest mb-2">
                      VÄRITYS
                    </h4>
                    <div className="flex gap-x-8 gap-y-2 flex-wrap">
                      <div>
                        <h4 className="text-gray-500 text-xs tracking-widest">
                          SELKÄ
                        </h4>
                        <p className="text-md font-medium">
                          {post[0]?.color_first}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-gray-500 text-xs tracking-widest">
                          KYLKI
                        </h4>
                        <p className="text-md font-medium">
                          {post[0]?.color_second}
                        </p>
                      </div>
                      <div>
                        <h4 className="text-gray-500 text-xs tracking-widest">
                          VATSA
                        </h4>
                        <p className="text-md font-medium">
                          {post[0]?.color_third}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CatchDetailBox>
            </div>
            <div>
              <GoogleMap
                lat={post[0]?.lat !== null && parseFloat(post[0]?.lat)}
                lng={post[0]?.lat !== null && parseFloat(post[0]?.lng)}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No Post to display</p>
      )}
      <div className="bg-white rounded-lg shadow-md mt-10">
        <PostShowComments comments={comments} />
        <PostWriteComment
          insertNewComment={insertNewComment}
          catchId={post[0]?.id}
        />
      </div>
    </div>
  );
}

export default CatchDetails;
