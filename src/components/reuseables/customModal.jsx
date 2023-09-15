import PropTypes from "prop-types";
// import useUploadContext from "../Catches/upload/context/UploadContext";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  // const {
  //   data,
  //   setData
  // } = useUploadContext();

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-opacity-50 bg-gray-800">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-end mb-2">
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="mb-2">
          <p className="text-gray-500 text-sm">
            Valitse tarkka sijainti klikkaamalla sijaintia kartalla. Kun olet
            valmis, paina Hyväksy -painiketta.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;
