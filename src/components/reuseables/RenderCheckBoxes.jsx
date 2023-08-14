import PropTypes from "prop-types";

function RenderCheckBoxes(props) {
  var options = [];
  if (Object.keys(props.data).length !== 0) {
    options = props.data.map((item) => {
      return (
        <li key={item.id}>
          <div className="flex items-center p-2 rounded hover:bg-gray-100">
            <input
              id={`checkbox-item-${item.value}`}
              type="checkbox"
              value={item.id}
              checked={props?.selectedOptions?.filterArr.includes(item.value)}
              onChange={() => props.handleOptionChange(item.value)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label
              htmlFor={`checkbox-item-${item.value}`}
              className="w-full ml-2 text-sm font-medium text-gray-900 rounded cursor-pointer"
            >
              {item.value}
            </label>
          </div>
        </li>
      );
    });
  }

  return <>{options}</>;
}

RenderCheckBoxes.propTypes = {
  data: PropTypes.object.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
};

export default RenderCheckBoxes;
