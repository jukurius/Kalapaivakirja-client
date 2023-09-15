import useUploadContext from "../../../../hooks/useUploadContext";
import { useEffect, useState } from "react";
const SPECIES_URL = "/species";
const LURES_URL = "/lures";
import axios from "../../../../api/axios";
import UploadDropdown from "../inputs/UploadDropdown";
import UploadRadio from "../inputs/UploadRadio";
import colorJSON from "../../../../data/colors.json";
import fishingStyleJSON from "../../../../data/fishingStyle.json";

function Page1() {
  const [speciesData, setSpeciesData] = useState([]);
  const [luresData, setLuresData] = useState([]);
  const colorData = colorJSON;
  const fishinStylesData = fishingStyleJSON;
  const { data, setData } = useUploadContext();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (index === openDropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

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

  console.log("open", openDropdown);

  return (
    <div>
      <div className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Kalalaji<span className="text-red-500">*</span>
          </label>
          <UploadDropdown
            data={speciesData}
            identifier="specie"
            value={data}
            setValue={setData}
            isOpen={openDropdown === 0}
            onToggle={() => toggleDropdown(0)}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="specieWeight"
          >
            Saaliin paino<span className="text-red-500">*</span>
          </label>
          <input
            className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="specieWeight"
            type="number"
            placeholder="Saaliin paino (kg)"
            value={data.specieWeight}
            onChange={(e) => setData({ ...data, specieWeight: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="specieLength"
          >
            Saaliin pituus
          </label>
          <input
            className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="specieLength"
            type="number"
            placeholder="Saaliin pituus (cm)"
            value={data.specieLength}
            onChange={(e) => setData({ ...data, specieLength: e.target.value })}
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Kalastusmuoto<span className="text-red-500">*</span>
        </label>
        <UploadDropdown
          data={fishinStylesData}
          identifier="fishingStyle"
          value={data}
          setValue={setData}
          isOpen={openDropdown === 1}
          onToggle={() => toggleDropdown(1)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Viehevalmistaja<span className="text-red-500">*</span>
        </label>
        <UploadDropdown
          data={luresData}
          identifier="lure"
          value={data}
          setValue={setData}
          isOpen={openDropdown === 2}
          onToggle={() => toggleDropdown(2)}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="lureLength"
        >
          Vieheen pituus
        </label>
        <input
          className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="lureLength"
          type="number"
          placeholder="cm"
          value={data.lureLength}
          onChange={(e) => setData({ ...data, lureLength: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="depth"
        >
          Uinti syvyys
        </label>
        <input
          className="appearance-none border-b-2 border-gray-800 bg-transparent w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="depth"
          type="number"
          placeholder="Missä syvyydessä isku tapahtui?"
          value={data.depth}
          onChange={(e) => setData({ ...data, depth: e.target.value })}
        />
      </div>
      <div className="mb-4 flex flex-col md:flex-row gap-6 md:gap-32 rounded-md">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Valitse vieheen väritys<span className="text-red-500">*</span>
          </label>
          <UploadRadio value={data} setValue={setData} />
        </div>
        {data?.isMultiColor ? (
          <div className="md:flex-1">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Selän väri<span className="text-red-500">*</span>
              </label>
              <UploadDropdown
                data={colorData}
                identifier="lureColorOne"
                value={data}
                setValue={setData}
                isOpen={openDropdown === 3}
                onToggle={() => toggleDropdown(3)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Kyljen väri<span className="text-red-500">*</span>
              </label>
              <UploadDropdown
                data={colorData}
                identifier="lureColorTwo"
                value={data}
                setValue={setData}
                isOpen={openDropdown === 4}
                onToggle={() => toggleDropdown(4)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mahan väri<span className="text-red-500">*</span>
              </label>
              <UploadDropdown
                data={colorData}
                identifier="lureColorThree"
                value={data}
                setValue={setData}
                isOpen={openDropdown === 5}
                onToggle={() => toggleDropdown(5)}
              />
            </div>
          </div>
        ) : (
          <div className="md:flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Vieheenväri<span className="text-red-500">*</span>
            </label>
            <UploadDropdown
              data={colorData}
              identifier="lureColorOne"
              value={data}
              setValue={setData}
              isOpen={openDropdown === 6}
              onToggle={() => toggleDropdown(6)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Page1;
