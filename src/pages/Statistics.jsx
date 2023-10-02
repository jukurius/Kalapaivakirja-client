import { useEffect, useState } from "react";
import UploadDrodown from "../components/Catches/upload/inputs/UploadDropdown";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import DoughnutChart from "../components/reuseables/DoughnutChart";
import BarChart from "../components/reuseables/BarChart";

const Statistics = () => {
  const [species, setSpecies] = useState([]);
  const [queryParam, setQueryParam] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const [weather, setWeather] = useState({});

  const toggleDropdown = (index) => {
    if (index === openDropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  useEffect(() => {
    const fetchSpecies = async () => {
      const response = await axiosPrivate.get("/species");
      setSpecies(response.data);
    };
    fetchSpecies();
  }, []);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axiosPrivate.get(
        `/analytics?specie=${queryParam?.specie}`
      );
      setWeather(response.data);
    };
    fetchWeatherData();
  }, [queryParam]);

  const checkIfNoData = () => {
    var flag = false;
    const obj = weather.weather;
    for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        const element = obj[key];
        if (element.length > 0) {
          flag = true;
        }
      }
    }
    return flag;
  };

  return (
    <div className="container mx-auto px-4 mt-10 sm:max-w-md md:max-w-none xl:max-w-[1600px]">
      <div className="flex justify-end">
        <div className="w-96 mb-20">
          <UploadDrodown
            data={species}
            identifier="specie"
            value={queryParam}
            setValue={setQueryParam}
            isOpen={openDropdown === 0}
            onToggle={() => toggleDropdown(0)}
          />
        </div>
      </div>
      {checkIfNoData() ? (
        <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-10 gap-8">
          {weather.weather?.conditions?.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow-lg md:col-span-2 xl:col-span-3 custom-breakpoint:col-span-2">
              <h2 className="text-gray-500 text-xs tracking-widest mb-2">
                Keliolosuhteet
              </h2>
              <DoughnutChart weather={weather?.weather?.conditions} />
            </div>
          )}
          {weather.weather?.airTemps.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow-lg md:col-span-4 xl:col-span-7 custom-breakpoint:col-span-4">
              <h2 className="text-gray-500 text-xs tracking-widest mb-2">
                Ilman lämpötilat
              </h2>
              <BarChart weather={weather?.weather?.airTemps} />
            </div>
          )}
          {weather.weather?.waterTemps.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow-lg md:col-span-3 xl:col-span-7 custom-breakpoint:col-span-4">
              <h2 className="text-gray-500 text-xs tracking-widest mb-2">
                Veden lämpötilat
              </h2>
              <BarChart weather={weather?.weather?.waterTemps} />
            </div>
          )}
          {weather.weather?.windSpeeds.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow-lg md:col-span-3 xl:col-span-7 custom-breakpoint:col-span-4 xl:order-2 custom-breakpoint:order-none">
              <h2 className="text-gray-500 text-xs tracking-widest mb-2">
                Tuulen nopeudet
              </h2>
              <BarChart weather={weather?.weather?.windSpeeds} />
            </div>
          )}
          {weather.weather?.fishingMethods?.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow-lg md:col-span-2 xl:col-span-3 custom-breakpoint:col-span-3 ">
              <h2 className="text-gray-500 text-xs tracking-widest mb-2">
                Kalastustavat
              </h2>
              <DoughnutChart weather={weather?.weather?.fishingMethods} />
            </div>
          )}
          {weather.weather?.singleColoredLures?.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow-lg md:col-span-2 xl:col-span-3">
              <h2 className="text-gray-500 text-xs tracking-widest mb-2">
                Vieheenväritykset
              </h2>
              <DoughnutChart weather={weather?.weather?.singleColoredLures} />
            </div>
          )}
        </div>
      ) : Object.keys(queryParam).length === 0 ? (
        <div className="flex flex-col items-center">
          <h1>Statistiikka</h1>
          <p>Valitse sivuston yläreunasta kalalaji, jonka tilastoja haluaisit tutkia</p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-xl font-bold text-gray-600">
            Sovellus ei valitettavasti tällä hetkellä sisällä analytiikkaa
            kalalajille: {queryParam?.specie}
          </p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
