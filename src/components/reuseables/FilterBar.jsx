import { useState, useEffect } from "react";
import Search from "./Search";
import { IconX } from "@tabler/icons-react";
import { IconAdjustments } from "@tabler/icons-react";
import SpeciesFilter from "./SpeciesFilter";
import LureFilter from "./LureFilter";
import LocationFilter from "./locationFilter";
import SelectedFilters from "./SelectedFilters";
import PropTypes from 'prop-types';

const FilterBar = (props) => {
  const [isMobileExpanded, setMobileExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);

  const toggleMobileExpand = () => {
    setMobileExpanded(!isMobileExpanded);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call once to initialize the state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Selected filters */}
      <div className="pb-4">
        <SelectedFilters
          filterOptions={props.filterOptions}
          setFilterOptions={props.setFilterOptions}
        />
      </div>
      {/* For large and medium screens */}
      <div className="hidden md:block">
        <div className="mb-4">
          <div className="flex gap-2 items-center">
            <div className="flex-1">{isLargeScreen && <Search />}</div>
            <div className="flex gap-2">
              {isLargeScreen && (
                <>
                  <SpeciesFilter
                    filterOptions={props.filterOptions}
                    setFilterOptions={props.setFilterOptions}
                  />
                  <LureFilter
                    filterOptions={props.filterOptions}
                    setFilterOptions={props.setFilterOptions}
                  />
                  <LocationFilter
                    filterOptions={props.filterOptions}
                    setFilterOptions={props.setFilterOptions}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Small screen */}
      <div className="md:hidden flex flex-col sm:flex-row gap-2 justify-between py-4">
        <Search />
        {isMobileExpanded ? (
          <div className="fixed top-0 left-0 h-full right-10 bg-gray-200 py-4 shadow-md z-10 overflow-y-auto animate-slideToRight">
            <div className="flex justify-end pr-4">
              <button onClick={toggleMobileExpand}>
                <IconX />
              </button>
            </div>
            <h2 className="font-bold text-lg mb-2 ml-4">Suodattimet</h2>
            <div className="flex flex-col gap-1">
              {!isLargeScreen && (
                <>
                  <SpeciesFilter
                    filterOptions={props.filterOptions}
                    setFilterOptions={props.setFilterOptions}
                  />
                  <LureFilter
                    filterOptions={props.filterOptions}
                    setFilterOptions={props.setFilterOptions}
                  />
                  <LocationFilter
                    filterOptions={props.filterOptions}
                    setFilterOptions={props.setFilterOptions}
                  />
                </>
              )}
            </div>
          </div>
        ) : null}
        <button
          className="flex justify-between gap-2 bg-blue-500 text-white py-2 px-4 rounded-sm focus:outline-none"
          onClick={toggleMobileExpand}
        >
          Suodattimet <IconAdjustments />
        </button>
      </div>
    </>
  );
};

FilterBar.propTypes = {
  filterOptions: PropTypes.array,
  setFilterOptions: PropTypes.func.isRequired,
};

export default FilterBar;
