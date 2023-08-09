import React, { createContext, useState } from 'react';
const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [filterOptions, setFilterOptions] = useState([
      {
        filterType: "species_name",
        filterArr: [],
      },
      {
        filterType: "location_province",
        filterArr: [],
      },
      {
        filterType: "maker_name",
        filterArr: [],
      }
    ]);
  
    return (
      <AppContext.Provider value={{ auth, setAuth, filterOptions, setFilterOptions }}>
        {children}
      </AppContext.Provider>
    );
  };

  export { AppContext, AppContextProvider };
  