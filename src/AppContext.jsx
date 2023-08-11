import { createContext, useState } from 'react'; 
const AppContext = createContext();
const LOGOUT_URL = "/logout";
import axios from './api/axios';
import PropTypes from 'prop-types';

const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);
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

    const handleLogout = async () => {
      try {
        const res = await axios.get(LOGOUT_URL);
        console.log("Login succesful:", res);
        setAuth({});
      } catch (error) {
        console.error("Login failed:", error);
      }
    };
  
    return (
      <AppContext.Provider value={{ auth, setAuth, filterOptions, setFilterOptions, handleLogout, persist, setPersist }}>
        { children }
      </AppContext.Provider>
    );
  };

  AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export { AppContext, AppContextProvider };
  