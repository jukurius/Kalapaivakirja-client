import useUploadContext from "../../../hooks/useUploadContext";
import { useState } from "react";
import FormInputs from "./FormInputs";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./formPages/ProgressBar";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import LoadingPage from "./formPages/LoadingPage";
import FinalPage from "./formPages/FinalPage";
import { IconX } from "@tabler/icons-react";

function Form() {
  const {
    page,
    setPage,
    data,
    resetData,
    title,
    canSubmit,
    disablePrev,
    disableNext,
    prevHide,
    nextHide,
    submitHide,
  } = useUploadContext();

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

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
    if (filteredObject.is_private === "Julkinen") {
      filteredObject.is_private = 0;
    } else {
      filteredObject.is_private = 1;
    }
    
    const controller = new AbortController();

    const uploadCatch = async () => {
      setIsLoading(true);
      try {
        const response = await axiosPrivate.post(
          "/upload/catch",
          JSON.stringify(filteredObject)
        );
        console.log(response);
        setIsSuccess(true);
        resetData();
        setPage(0);
      } catch (err) {
        setIsError(true);
        console.error(err);
        navigate("/login", { state: { from: location }, replace: true });
      } finally {
        setIsLoading(false);
      }
    };
    uploadCatch();
    return () => {
      controller.abort();
    };
  };

  const close = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <div className="flex justify-center items-center h-auto my-10 container lg:max-w-7xl mx-auto">
      <form
        className={`w-full p-8 min-h-[36vh] ${
          isLoading ||
          isSuccess ||
          (isError && "flex justify-center items-center")
        }`}
      >
        {isLoading ? (
          <LoadingPage />
        ) : isSuccess ? (
          <FinalPage isSuccess={true} />
        ) : isError ? (
          <FinalPage isSuccess={false} />
        ) : (
          <div>
            <div className="flex justify-end mb-8">
              <button onClick={(e) => close(e)}>
                <IconX />
              </button>
            </div>
            <div className="flex flex-col lg:flex-row fle justify-between gap-5 lg:gap-20">
              <div className="w-full lg:w-1/2">
                <h2 className="text-3xl lg:text-5xl font-normal mb-4">
                  Tervetuloa lisäämään kalasaaliisi.
                </h2>
                <p className="mb-5 hidden md:block">
                  Kiitämme sinua kalasaaliisi lisäämisestä ja tärkeiden tietojen
                  jakamisesta kanssamme. Täytäthän lomakkeen huolellisesti ja
                  rehellisesti, jotta saamme mahdollisimman tarkan kuvan
                  saaliistasi ja voimme käyttää tietoja parhaalla mahdollisella
                  tavalla.
                </p>
                <h3 className="text-xl lg:text-2xl">{title[page]}</h3>
                <div>
                  <ProgressBar />
                </div>
              </div>
              <div className="w-full lg:w-1/2">
                <FormInputs />
              </div>
            </div>

            <div className="flex justify-end mt-10">
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
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Form;
