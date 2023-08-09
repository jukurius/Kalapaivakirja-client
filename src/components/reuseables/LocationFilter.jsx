import React, { useEffect, useState } from "react";
import RenderCheckBoxes from "./RenderCheckBoxes";
import axios from "axios";

const LocationFilter = (props) => {
  const [locations, setLocations] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (optionValue) => {
    if (props.filterOptions[1]?.filterArr?.includes(optionValue)) {
      props.setFilterOptions(prevData => {
        const newData = prevData.map(item => {
          if (item.filterType === "location_province") {
            return { ...item, filterArr: item.filterArr.filter(value => value !== optionValue) };
          }
          return item;
        });
        return newData;
      });
    } else {
      props.setFilterOptions(prevData => {
        const newData = prevData.map(item => {
          if (item.filterType === "location_province") {
            return { ...item, filterArr: [...item.filterArr, optionValue] };
          }
          return item;
        });
        return newData;
      });
    }
  };

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axios.get("http://localhost:3000/locations");
        const data = await res.data;
        setLocations(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div className="relative inline-block text-left group">
      <button 
      className="hover:bg-gray-200 justify-between w-full flex text-center items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-4 py-2"
      >
        Maakunnat{" "}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div className="z-10 top-10 origin-top-right absolute overflow-auto px-2 max-h-96 right-0 w-full md:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 transform scale-0 group-hover:scale-100 transition-transform duration-200">
        <ul className="py-2">
          <RenderCheckBoxes
            data={locations}
            selectedOptions={props.filterOptions[1]}
            handleOptionChange={handleOptionChange}
          />
        </ul>
      </div>
    </div>
  );
};

export default LocationFilter;
