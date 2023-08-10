import React from "react";
import useUploadContext from "../../../../hooks/useUploadContext";

const ProgressBar = () => {
  const { page } = useUploadContext();
  return (
    <div className="flex justify-between max-w-md items-center mx-auto">
      <div className="h-8 w-20  border border-custom-dark-blue bg-custom-dark-blue rounded-full"></div>
      <div className="border-t border-custom-dark-blue w-full"></div>
      <div className={`h-8 w-20  border border-custom-dark-blue ${page > 0 && "bg-custom-dark-blue"} rounded-full`}></div>
      <div className="border-t border-custom-dark-blue w-full"></div>
      <div className={`h-8 w-20  border border-custom-dark-blue ${page > 1 && "bg-custom-dark-blue"} rounded-full`}></div>
    </div>
  );
};

export default ProgressBar;
