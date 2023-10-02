import { useState, useEffect, useContext } from "react";
import UploadDropdown from "../inputs/UploadDropdown";
const LOCATION_URL = "/locations";
const CITIES_URL = "/citys";
import useUploadContext from "../../../../hooks/useUploadContext";
import axios from "../../../../api/axios";
import weatherConditionsJSON from "../../../../data/weatherConditions.json";
import { AppContext } from "../../../../AppContext";
import { IconX } from "@tabler/icons-react";

function Page2() {
  const { data, setData } = useUploadContext();
  const [locationData, setLocationData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [currentDatetime, setCurrentDatetime] = useState("");
  const weatherConditions = weatherConditionsJSON;
  const { openModal } = useContext(AppContext);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (index === openDropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(LOCATION_URL);
        const data = await res.data;
        setLocationData(data);
      } catch (error) {
        console.log(error);
      }
    };

    const setCurrentDateTime = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      const formattedDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;
      setCurrentDatetime(formattedDatetime);
    };
    setCurrentDateTime();
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(CITIES_URL, {
          params: { locationCode: data?.locationId },
        });
        const resData = await res.data;
        setCitiesData(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
    setData({ ...data, locationCity: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.locationProvince]);

  useEffect(() => {
    setData({ ...data, catchDate: currentDatetime });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDatetime]);

  return (
    <div>
      <div className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maakunta<span className="text-red-500">*</span>
          </label>
          <UploadDropdown
            data={locationData}
            identifier="locationProvince"
            value={data}
            setValue={setData}
            isOpen={openDropdown === 0}
            onToggle={() => toggleDropdown(0)}
          />
        </div>
        {data?.locationProvince ? (
          <div className="mb-4">
            <label
              htmlFor="locationCity"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Kunta<span className="text-red-500">*</span>
            </label>
            <UploadDropdown
              data={citiesData}
              identifier="locationCity"
              value={data}
              setValue={setData}
              isOpen={openDropdown === 1}
              onToggle={() => toggleDropdown(1)}
            />
          </div>
        ) : null}
        {data?.locationProvince && data?.locationCity ? (
          <div className="mb-4">
            <label
              htmlFor="specie"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tarkka sijainti
            </label>
            <div className="flex gap-5">
              <button
                onClick={() => openModal()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Avaa kartta
              </button>
              {data?.lat && (
                <div className="flex border items-center justify-center px-4 gap-2 rounded-md bg-slate-50">
                  <p>Tarkka sijainti lisätty.</p>
                  <button
                    onClick={() => setData({ ...data, lat: null, lng: null })}
                  >
                    <IconX />
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="dateTime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Päivämäärä ja kellonaika<span className="text-red-500">*</span>
          </label>
          <input
            className="gap-1 bg-transparent"
            type="datetime-local"
            id="meeting-time"
            name="meeting-time"
            value={currentDatetime}
            max={currentDatetime}
            onChange={(e) => setCurrentDatetime(e.target.value)}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Keli<span className="text-red-500">*</span>
        </label>
        <UploadDropdown
          data={weatherConditions}
          identifier="weatherCondition"
          value={data}
          setValue={setData}
          isOpen={openDropdown === 2}
          onToggle={() => toggleDropdown(2)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="weight"
        >
          Ilman lämpötila<span className="text-red-500">*</span>
        </label>
        <input
          className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="weight"
          type="number"
          placeholder="Ilman lämpötila °C"
          value={data.airTemp}
          onChange={(e) => setData({ ...data, airTemp: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="weight"
        >
          Veden lämpötila
        </label>
        <input
          className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="weight"
          type="number"
          placeholder="Veden lämpötila °C"
          value={data.waterTemp}
          onChange={(e) => setData({ ...data, waterTemp: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="weight"
        >
          Tuulen nopeus
        </label>
        <input
          className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="weight"
          type="number"
          placeholder="Tuulen nopeus m/s"
          value={data.wind}
          onChange={(e) => setData({ ...data, wind: e.target.value })}
        />
      </div>
    </div>
  );
}

export default Page2;
