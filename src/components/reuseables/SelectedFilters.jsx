import React from "react";
import { IconX } from "@tabler/icons-react";

function SelectedFilters(props) {
  var selectedFilters = [];
  if (props.filterOptions.length > 0) {
    for (const iterator of props.filterOptions) {
      iterator?.filterArr?.forEach((element) => {
        selectedFilters = [...selectedFilters, element];
      });
    }
  }
  const handleFilterRemove = (itemToRemove) => {
    const i = selectedFilters.indexOf(itemToRemove);
    if (i > -1) {
      props.setFilterOptions((prev) =>
        prev.map((item) => ({
          ...item,
          filterArr: item.filterArr.filter((elem) => elem !== itemToRemove),
        }))
      );
    }
  };
  return (
    <div className="flex gap-2 origin-top-left transition-transform duration-200">
      {selectedFilters.map((item, index) => (
        <div
          key={index}
          className="flex text-sm bg-gray-200 py-1 px-3 rounded-lg"
        >
          {item}{" "}
          <button onClick={() => handleFilterRemove(item)}>
            <IconX size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default SelectedFilters;
