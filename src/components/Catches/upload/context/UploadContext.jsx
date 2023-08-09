import React, { createContext, useState } from 'react';
const UploadContext = createContext();

const UploadContextProvider = ({ children }) => {
    const title = {
        0: "Kalan ja vieheen tiedot",
        1: "Sijainti tiedot",
        2: "Sää ja muut tiedot"
    }
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
        locationProvince: {id: "", value: ""},
        locationCity: "",
        locationLake: "",
        fishingStyle: "",
    });

    const requiredInputsForSubmit = {specie: data.specie, specieWeight: data.specieWeight, fishingStyle: data.fishingStyle, lure: data.lure, ...(data.isMultiColor === 1 && {lureColorTwo: data.lureColorTwo}) ,lureColorOne: data.lureColorOne, locationProvince: data.locationProvince, locationCity: data.locationCity, images: data.images}

    const requiredInputsPage1 = {specie: data.specie, specieWeight: data.specieWeight, fishingStyle: data.fishingStyle, lure: data.lure, ...(data.isMultiColor === 1 && {lureColorTwo: data.lureColorTwo}) ,lureColorOne: data.lureColorOne};
    const requiredInputsPage2 = {locationProvince: data.locationProvince, locationCity: data.locationCity};
    const requiredInputsPage3 = {images: data.images};

    const canSubmit = [...Object.values(requiredInputsForSubmit)].every(Boolean) && page === Object.keys(title).length - 1

    const canNextPage1 = Object.keys(requiredInputsPage1)
        .map(key => data[key])
        .every(Boolean)

    const canNextPage2 = Object.keys(requiredInputsPage2)
        .map(key => data[key])
        .every(Boolean)

    const disablePrev = page === 0

    const disableNext =
        (page === Object.keys(title).length - 1)
        || (page === 0 && !canNextPage1)
        || (page === 1 && !canNextPage2)

    const prevHide = page === 0 && "hidden"

    const nextHide = page === Object.keys(title).length - 1 && "hidden"

    const submitHide = page !== Object.keys(title).length - 1 && "hidden"

    return (
      <UploadContext.Provider value={{ title, page, setPage, data, setData, canSubmit, disablePrev, disableNext, prevHide, nextHide, submitHide }}>
        {children}
      </UploadContext.Provider>
    );
  };

  export { UploadContext, UploadContextProvider };
  