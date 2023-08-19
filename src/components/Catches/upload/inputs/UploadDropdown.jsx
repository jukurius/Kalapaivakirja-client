import { useState } from "react";
import PropTypes from "prop-types";

function UploadDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const options = props.data;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setIsOpen(false);
    console.log(props.identifier)
    if (props.identifier === "locationProvince") {
      console.log(option.value)
      props.setValue({...props.value, locationProvince: option.value, locationId: option.id});
    } else {
      props.setValue({...props.value, [props.identifier]: option.value})
    }
  };

  return (
    <div className="relative block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="px-4 flex items-center justify-between py-2 w-full text-gray-700 border-b-2 border-gray-800 focus:outline-none text-left"
      >
        {
          props.value?.[props.identifier] ? props.value?.[props.identifier] : "Valitse.."
        }
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
      {isOpen && (
        <div className="z-10 origin-top-right absolute right-0 overflow-auto px-2 max-h-96 mt-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOptionClick(item)}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                role="menuitem"
              >
                {item.value}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

UploadDropdown.propTypes = {
  identifier: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.object,
  data: PropTypes.array
};

export default UploadDropdown;
