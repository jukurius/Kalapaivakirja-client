import React, { useState, useEffect } from "react";
import axios from "../../../api/axios";
import UploadDropdown from "./inputs/UploadDropdown";
import colorsJSON from "./colors.json";
const SPECIES_URL = "/species";
const LURES_URL = "/lures";
const LOCATION_URL = "/locations";
const CITYS_URL = "/citys";
import UploadRadio from "./inputs/UploadRadio";

function UploadCatch() {
  const [specie, setSpecie] = useState({});
  const [speciesData, setSpeciesData] = useState([]);
  const [weight, setWeight] = useState({});
  const [length, setLength] = useState({});
  const [lure, setLure] = useState({});
  const [lureLength, setLureLength] = useState({});
  const [luresData, setLuresData] = useState([]);
  const [lureColorOne, setLureColorOne] = useState({});
  const [lureColorTwo, setLureColorTwo] = useState({});
  const [lureColorThree, setLureColorThree] = useState({});
  const [isMultiColor, setIsMultiColor] = useState(0);
  const colorData = colorsJSON;
  const [province, setProvince] = useState({});
  const [locationData, setLocationData] = useState([]);
  const [city, setCity] = useState({});
  const [citiesData, setCitiesData] = useState([]);

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const res = await axios.get(SPECIES_URL);
        const data = await res.data;
        setSpeciesData(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLures = async () => {
      try {
        const res = await axios.get(LURES_URL);
        const data = await res.data;
        setLuresData(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchLocations = async () => {
      try {
        const res = await axios.get(LOCATION_URL);
        const data = await res.data;
        setLocationData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSpecies();
    fetchLures();
    fetchLocations();
  }, []);

  useEffect(() => {
    const fetchCitys = async () => {
      try {
        const res = await axios.get(CITYS_URL, {
          params: { locationCode: province.id },
        });
        const data = await res.data;
        setCitiesData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCitys();
    setCity({});
  }, [province]);

  return (
    <div className="flex justify-center items-center h-auto mt-10 container max-w-3xl mx-auto">
      <form className=" w-screen bg-white p-8 shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          Lisää saalis
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kalalaji *
          </label>
          <UploadDropdown
            data={speciesData}
            value={specie}
            setValue={setSpecie}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="weight"
          >
            Saaliin paino *
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="weight"
            type="number"
            placeholder="Syötä saaliin paino"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="length"
          >
            Saaliin pituus
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="length"
            type="number"
            placeholder="Syötä saaliin pituus"
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kalastusmuoto *
          </label>
          <UploadDropdown data={luresData} value={lure} setValue={setLure} />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Viehevalmistaja *
          </label>
          <UploadDropdown data={luresData} value={lure} setValue={setLure} />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="lureLength"
          >
            Vieheen pituus
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="lureLength"
            type="number"
            placeholder="Syötä vieheen pituus"
            value={lureLength}
            onChange={(e) => setLureLength(e.target.value)}
          />
        </div>

        <div className="mb-4 flex flex-col md:flex-row gap-6 md:gap-32 border rounded-md p-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Valitse vieheen väritys *
            </label>
            <UploadRadio value={isMultiColor} setValue={setIsMultiColor} />
          </div>
          {isMultiColor ? (
            <div className="md:flex-1">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Selän väri
                </label>
                <UploadDropdown
                  data={colorData}
                  value={lureColorOne}
                  setValue={setLureColorOne}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Kyljen väri
                </label>
                <UploadDropdown
                  data={colorData}
                  value={lureColorTwo}
                  setValue={setLureColorTwo}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mahan väri
                </label>
                <UploadDropdown
                  data={colorData}
                  value={lureColorThree}
                  setValue={setLureColorThree}
                />
              </div>
            </div>
          ) : (
            <div className="md:flex-1">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Vieheenväri *
              </label>
              <UploadDropdown
                data={colorData}
                value={lureColorOne}
                setValue={setLureColorOne}
              />
            </div>
          )}
        </div>

        <div className="mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Maakunta *
            </label>
            <UploadDropdown
              data={locationData}
              value={province}
              setValue={setProvince}
            />
          </div>
          {province?.value ? (
            <div className="mb-4">
              <label
                htmlFor="specie"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Kunta *
              </label>
              <UploadDropdown
                data={citiesData}
                value={city}
                setValue={setCity}
              />
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}

export default UploadCatch;
