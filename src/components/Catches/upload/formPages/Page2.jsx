import React, { useState, useEffect} from "react";
import UploadDropdown from "../inputs/UploadDropdown";
const LOCATION_URL = "/locations";
const CITIES_URL = "/citys";
import useUploadContext from "../../../../hooks/useUploadContext";
import axios from "../../../../api/axios";

function Page2() {
  const { data, setData } = useUploadContext();
  const [locationData, setLocationData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get(LOCATION_URL);
        const data = await res.data;
        console.log(data)
        setLocationData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(CITIES_URL, {
          params: { locationCode: data?.locationProvince?.id },
        });
        const resData = await res.data;
        setCitiesData(resData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
    setData({...data, locationCity: ""})
  }, [data?.locationProvince?.id]);

  return (
    <>
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
        {data?.locationProvince?.value ? (
          <div className="mb-4">
            <label
              htmlFor="specie"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Kunta *
            </label>
            <UploadDropdown data={citiesData} identifier="locationCity" value={data} setValue={setData} />
          </div>
        ) : null}
      </div>
    </>
  );
}

export default Page2;
