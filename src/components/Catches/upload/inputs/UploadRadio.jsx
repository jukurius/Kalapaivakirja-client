import PropTypes from "prop-types";

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
  const radioStyle = {
    accentColor: "#3C50E0"
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
            style={radioStyle}
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
            className="form-radio h-5 w-5"
            style={radioStyle}
          />
          <span className="ml-2 text-gray-700">Monivärinen</span>
        </label>
      </div>
    </div>
  );
}

UploadRadio.propTypes = {
  value: PropTypes.object,
  setValue: PropTypes.func.isRequired,
};

export default UploadRadio;
