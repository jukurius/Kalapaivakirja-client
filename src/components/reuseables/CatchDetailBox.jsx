import PropTypes from "prop-types";

const CatchDetailBox = ({ header, icon, children, iconPosition }) => {
  return (
    <div className={`bg-white rounded-lg p-4 flex gap-3 shadow-md ${iconPosition === "start" ? "items-start" : "items-center"}`}>
      <div className="bg-gray-100 rounded-full p-2">
        {icon}
      </div>
      <div className="flex flex-col">
        <h3 className="text-gray-500 text-xs tracking-widest">{header}</h3>
        {children}
      </div>
    </div>
  );
};

CatchDetailBox.propTypes = {
    header: PropTypes.string,
    icon: PropTypes.func,
    children: PropTypes.node.isRequired,
    iconPosition: PropTypes.string
  };

export default CatchDetailBox;
