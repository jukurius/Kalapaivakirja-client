import { IconCheck } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const FinalPage = ({ isSuccess }) => {
    const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {isSuccess ? (
        <div className="flex flex-col justify-center items-center gap-10">
          <h2 className="font-medium">Saaliisi lisättiin onnistuneesti.</h2>
          <IconCheck color="green" size={42} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-10">
          <h2>Jokin meni pieleen. Kokeile uudestaan</h2>
          <IconX color="red" />
        </div>
      )}
      {isSuccess ?(
        <div className="self-end">
            <button className="bg-custom-dark-blue px-10 py-2" onClick={() => navigate("/")}>Ok</button>
        </div>
      ) : null}
    </div>
  );
};

FinalPage.propTypes = {
    isSuccess: PropTypes.bool
  };

export default FinalPage;
