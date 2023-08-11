import React from "react";

function UploadRadio(props) {
  const handleOptionChange = (event) => {
    const num = parseInt(event.target.value);
    props.setValue({
      ...props.value,
      isMultiColor: num,
      ...(num === 0
        ? { lureColorOne: "", lureColorTwo: "", lureColorThree: "" }
        : { lureColorOne: "" }),
    });
  };

  return (
    <div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value={0}
            checked={props.value?.isMultiColor === 0}
            onChange={handleOptionChange}
            className="form-radio h-5 w-5"
          />
          <span className="ml-2 text-gray-700">Yksivärinen</span>
        </label>
      </div>
      <div>
        <label className="inline-flex items-center">
          <input
            type="radio"
            value={1}
            checked={props.value?.isMultiColor === 1}
            onChange={handleOptionChange}
            className="form-radio h-5 w-5 text-indigo-600"
          />
          <span className="ml-2 text-gray-700">Monivärinen</span>
        </label>
      </div>
    </div>
  );
}

export default UploadRadio;
