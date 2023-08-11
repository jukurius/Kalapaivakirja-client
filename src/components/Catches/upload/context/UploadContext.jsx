import { createContext, useState } from "react";
const UploadContext = createContext();
import PropTypes from "prop-types";

const UploadContextProvider = ({ children }) => {
  const title = {
    0: "Kalan ja vieheen tiedot",
    1: "Sijainti ja säätiedot",
    2: "Kuvat",
  };
  const [page, setPage] = useState(0);
  const [data, setData] = useState({
    isMultiColor: 0,
    images: [],
    specie: "",
    specieWeight: "",
    specieLength: "",
    lure: "",
    lureColorOne: "",
    lureColorTwo: "",
    lureColorThree: "",
    lureLength: "",
    depth: "",
    locationProvince: { id: "", value: "" },
    locationCity: "",
    locationLake: "",
    fishingStyle: "",
    weatherCondition: "",
    airTemp: "",
    waterTemp: "",
    wind: "",
    catchDate: "",
  });

  const requiredInputsForSubmit = {
    specie: data.specie,
    specieWeight: data.specieWeight,
    fishingStyle: data.fishingStyle,
    lure: data.lure,
    ...(data.isMultiColor === 1 && { lureColorTwo: data.lureColorTwo }),
    lureColorOne: data.lureColorOne,
    locationProvince: data.locationProvince,
    locationCity: data.locationCity,
    images: data.images.length > 0 ? true : false,
    weatherCondition: data.weatherCondition,
    catchDate: data.catchDate,
  };

  const requiredInputsPage1 = {
    specie: data.specie,
    specieWeight: data.specieWeight,
    fishingStyle: data.fishingStyle,
    lure: data.lure,
    ...(data.isMultiColor === 1 && { lureColorTwo: data.lureColorTwo }),
    lureColorOne: data.lureColorOne,
  };

  const requiredInputsPage2 = {
    locationProvince: data.locationProvince,
    locationCity: data.locationCity,
    weatherCondition: data.weatherCondition,
    catchDate: data.catchDate,
  };

  const canSubmit =
    [...Object.values(requiredInputsForSubmit)].every(Boolean) &&
    page === Object.keys(title).length - 1;

  const canNextPage1 = Object.keys(requiredInputsPage1)
    .map((key) => data[key])
    .every(Boolean);

  const canNextPage2 = Object.keys(requiredInputsPage2)
    .map((key) => data[key])
    .every(Boolean);

  const disablePrev = page === 0;

  const disableNext =
    page === Object.keys(title).length - 1 ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

  const prevHide = page === 0 && "hidden";

  const nextHide = page === Object.keys(title).length - 1 && "hidden";

  const submitHide = page !== Object.keys(title).length - 1 && "hidden";

  return (
    <UploadContext.Provider
      value={{
        title,
        page,
        setPage,
        data,
        setData,
        canSubmit,
        disablePrev,
        disableNext,
        prevHide,
        nextHide,
        submitHide,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};

UploadContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UploadContext, UploadContextProvider };
