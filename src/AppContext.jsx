import { createContext, useState } from 'react'; 
const AppContext = createContext();
const LOGOUT_URL = "/logout";
import axios from './api/axios';
import PropTypes from 'prop-types';

const AppContextProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem("isLogged")) || false);
    const [modalIsOpen, setModalIsOpen] = useState(false)
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

    const openModal = () => {
      setModalIsOpen(true);
    }
    const closeModal = () => {
      setModalIsOpen(false);
    }
  
    return (
      <AppContext.Provider value={{ auth, setAuth, filterOptions, setFilterOptions, handleLogout, isLogged, setIsLogged, openModal, closeModal, modalIsOpen }}>
        { children }
      </AppContext.Provider>
    );
  };

  AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export { AppContext, AppContextProvider };
  