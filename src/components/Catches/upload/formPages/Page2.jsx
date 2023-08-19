import { useState, useEffect } from "react";
import UploadDropdown from "../inputs/UploadDropdown";
const LOCATION_URL = "/locations";
const CITIES_URL = "/citys";
import useUploadContext from "../../../../hooks/useUploadContext";
import axios from "../../../../api/axios";
// import { IconPin } from "@tabler/icons-react";
// import { IconWind } from "@tabler/icons-react";
// import { IconClockHour10 } from "@tabler/icons-react";
import weatherConditionsJSON from "../../../../data/weatherConditions.json";

function Page2() {
  const { data, setData } = useUploadContext();
  const [locationData, setLocationData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const [currentDatetime, setCurrentDatetime] = useState("");
  const weatherConditions = weatherConditionsJSON;

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

  console.log(citiesData);

  return (
    <div className="min-w-[600px]">
      <div className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Maakunta *
          </label>
          <UploadDropdown
            data={locationData}
            identifier="locationProvince"
            value={data}
            setValue={setData}
          />
        </div>
        {data?.locationProvince ? (
          <div className="mb-4">
            <label
              htmlFor="specie"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Kunta *
            </label>
            <UploadDropdown
              data={citiesData}
              identifier="locationCity"
              value={data}
              setValue={setData}
            />
          </div>
        ) : null}
      </div>
      <div className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="dateTime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Päivämäärä ja kellonaika *
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
          Keli *
        </label>
        <UploadDropdown
          data={weatherConditions}
          identifier="weatherCondition"
          value={data}
          setValue={setData}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="weight"
        >
          Ilman lämpötila *
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
