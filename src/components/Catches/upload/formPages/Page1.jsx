import useUploadContext from "../../../../hooks/useUploadContext";
import React, { useEffect, useState } from "react";
const SPECIES_URL = "/species";
const LURES_URL = "/lures";
import axios from "../../../../api/axios";
import UploadDropdown from "../inputs/UploadDropdown";
import UploadRadio from "../inputs/UploadRadio";
import colorJSON from "../../../../data/colors.json";
import fishingStyleJSON from "../../../../data/fishingStyle.json"

function Page1() {
  const [speciesData, setSpeciesData] = useState([]);
  const [luresData, setLuresData] = useState([]);
  const colorData = colorJSON;
  const fishinStylesData = fishingStyleJSON;
  const { data, setData } = useUploadContext();

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
    fetchSpecies();
    fetchLures();
  }, []);

  console.log(data)

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Kalalaji *
        </label>
        <UploadDropdown
          data={speciesData}
          identifier='specie'
          value={data}
          setValue={setData}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="weight"
        >
          Saaliin paino <span className="text-gray-500">(kg)</span> *
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="weight"
          type="number"
          placeholder="Syötä saaliin paino"
          value={data.specieWeight}
          onChange={(e) => setData({...data, specieWeight: e.target.value})}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="length"
        >
          Saaliin pituus <span className="text-gray-500">(cm)</span> 
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="length"
          type="number"
          placeholder="Syötä saaliin pituus"
          value={data.specieLength}
          onChange={(e) => setData({...data, specieLength: e.target.value})}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Kalastusmuoto *
        </label>
        <UploadDropdown data={fishinStylesData} identifier='fishingStyle' value={data} setValue={setData} />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Viehevalmistaja *
        </label>
        <UploadDropdown data={luresData} identifier='lure' value={data} setValue={setData} />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lureLength"
        >
          Vieheen pituus <span className="text-gray-500">(cm)</span> 
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="lureLength"
          type="number"
          placeholder="Syötä vieheen pituus"
          value={data.lureLength}
          onChange={(e) => setData({...data, lureLength: e.target.value})}
        />
      </div>

      <div className="mb-4 flex flex-col md:flex-row gap-6 md:gap-32 border rounded-md p-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Valitse vieheen väritys *
          </label>
          <UploadRadio value={data} setValue={setData} />
        </div>
        {data?.isMultiColor ? (
          <div className="md:flex-1">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Selän väri
              </label>
              <UploadDropdown
                data={colorData}
                identifier='lureColorOne'
                value={data}
                setValue={setData}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Kyljen väri
              </label>
              <UploadDropdown
                data={colorData}
                identifier='lureColorTwo'
                value={data}
                setValue={setData}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mahan väri
              </label>
              <UploadDropdown
                data={colorData}
                identifier='lureColorThree'
                value={data}
                setValue={setData}
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
              identifier='lureColorOne'
              value={data}
              setValue={setData}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Page1;
