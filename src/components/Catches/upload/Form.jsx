import useUploadContext from "../../../hooks/useUploadContext";
import FormInputs from "./FormInputs";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./formPages/ProgressBar";

function Form() {
  const {
    page,
    setPage,
    data,
    title,
    canSubmit,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    submitHide,
  } = useUploadContext();

  const navigate = useNavigate();

  const handlePrev = () => setPage((prev) => prev - 1);

  const handleNext = () => setPage((prev) => prev + 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    // lets filter empty key value pairs off
    const filteredObject = Object.keys(data).reduce((acc, key) => {
      if (data[key] !== "") {
        acc[key] = data[key];
      }
      return acc;
    }, {});
    console.log(JSON.stringify(filteredObject));

    const uploadCatch = async () => {
      try {
        const response = await axiosPrivate.get("/singlePost", {
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
    uploadCatch();
    
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-auto my-10 container max-w-3xl mx-auto">
      <form className=" w-screen bg-white p-8 shadow-md">
        <div className="mb-8">
          <ProgressBar />
        </div>
        <header>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            {title[page]}
          </h2>
        </header>
        <div>
          <FormInputs />
        </div>
        <div className="flex justify-between mt-10">
          <div className="flex gap-2">
            <button
              type="button"
              className={`button ${prevHide} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                disablePrev
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }}`}
              onClick={handlePrev}
              disabled={disablePrev}
            >
              Edellinen
            </button>

            <button
              type="button"
              className={`button ${nextHide} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                disableNext
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }}`}
              onClick={handleNext}
              disabled={disableNext}
            >
              Seuraava
            </button>

            <button
              type="submit"
              className={`button ${submitHide} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !canSubmit
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-700"
              }}`}
              onClick={(e) => handleSubmit(e)}
              disabled={!canSubmit}
            >
              Lähetä
            </button>
          </div>
          <div>
            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              onClick={(e) => handleCancel(e)}
            >
              Peruuta
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Form;
