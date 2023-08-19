import useUploadContext from "../../../../hooks/useUploadContext";

const ProgressBar = () => {
  const { page } = useUploadContext();
  return (
    <div className="flex justify-between max-w-md items-center py-10">
      <div className="h-5 w-10 shadow-lg border-2 border-custom-dark-blue bg-custom-dark-blue rounded-full"></div>
      <div className="border-t-2 shadow-lg border-custom-dark-blue w-full"></div>
      <div
        className={`h-5 w-10 shadow-lg border-2 border-custom-dark-blue ${
          page > 0 && "bg-custom-dark-blue"
        } rounded-full`}
      ></div>
      <div className="border-t-2 shadow-lg border-custom-dark-blue w-full"></div>
      <div
        className={`h-5 w-10 shadow-lg border-2 border-custom-dark-blue ${
          page > 1 && "bg-custom-dark-blue"
        } rounded-full`}
      ></div>
    </div>
  );
};

export default ProgressBar;
