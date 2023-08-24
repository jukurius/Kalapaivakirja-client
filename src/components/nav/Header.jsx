import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";
import { AppContext } from "../../AppContext";
import { IconMenu2 } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import logo from "../../assets/logo.png";
import PropTypes from "prop-types";

const Header = (props) => {
  const { auth } = useContext(AppContext);
  const [isUnAuthedMenuOpen, setIsUnAuthedMenuOpen] = useState(false);

  const toggleNavbar = () => {
    props.setIsOpen(!props.isOpen);
  };

  console.log(auth?.img)
  useEffect(() => {
    const handleResize = () => {
      props.setIsLargeScreen(window.innerWidth >= 1024); // Adjust the breakpoint as needed
      if (window.innerWidth >= 1024) {
        if (!props.isOpen) {
          props.setIsOpen(true);
        }
      }
    };

    handleResize(); // Call once to initialize the state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log("isLarge", props.isLargeScreen);
  console.log("isAuth", auth?.user !== "");
  console.log(auth?.user);
  return (
    <nav className="h-16 lg:h-20 relative z-50 flex items-center justify-between px-5 md:px-10 shadow-md">
      <div>
        <Link to="/">
          <img className="w-10 h-10 lg:w-14 lg:h-14" src={logo} />
        </Link>
      </div>
      {props.isLargeScreen === false && auth?.user !== undefined ? (
        <>
          {/* Hamburger for logged members */}
          <button onClick={toggleNavbar} className="lg:hidden">
            {props.isOpen ? <IconX /> : <IconMenu2 />}
          </button>
        </>
      ) : props.isLargeScreen && auth?.user !== undefined ? (
        <div className="hidden user lg:flex items-center gap-5">
          <span className="font-semibold">{auth?.user}</span>
          <img
            className="w-14 h-14 rounded-[50%] object-cover"
            src={auth?.img ? auth.img : null}
          />
          <IconChevronDown />
        </div>
      ) : (
        <div>
          <button
            onClick={() => setIsUnAuthedMenuOpen(!isUnAuthedMenuOpen)}
            className={`lg:hidden ${auth?.user !== undefined && "hidden"}`}
          >
            {isUnAuthedMenuOpen ? <IconX /> : <IconMenu2 />}
          </button>
          <div className={`flex gap-5 ${auth?.user !== undefined && "hidden"}`}>
            <Link
              className="hidden lg:flex bg-custom-dark-blue hover:bg-custom-dark-blue text-white font-bold py-2 px-3 justify-center rounded"
              to="/login"
            >
              Kirjaudu sisään
            </Link>
            <Link
              className="hidden lg:flex bg-custom-dark-blue hover:bg-custom-dark-blue text-white font-bold py-2 px-3 justify-center rounded"
              to="/register"
            >
              Luo tunnus
            </Link>
          </div>
        </div>
      )}
      {isUnAuthedMenuOpen && (
        <div className="absolute flex flex-col gap-4 top-full right-0 left-0 z-10 p-5 shadow-md bg-white border">
          <div className="flex gap-5 mb-4">
            <Link
              className="flex gap-2 bg-custom-dark-blue hover:bg-custom-dark-blue text-white font-bold py-2.5 flex-1 justify-center rounded mt-4"
              to="/login"
            >
              Kirjaudu sisään
            </Link>
            <Link
              className="flex gap-2 bg-custom-dark-blue hover:bg-custom-dark-blue text-white font-bold py-2.5 flex-1 justify-center rounded mt-4"
              to="/register"
            >
              Luo tunnus
            </Link>
          </div>
          <Link
            className="flex gap-2 text-lg font-medium text-[#3F5162]"
            to="/"
          >
            Etusivu
          </Link>
        </div>
      )}
    </nav>
  );
};

Header.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
  isLargeScreen: PropTypes.bool.isRequired,
  setIsLargeScreen: PropTypes.func,
};

export default Header;
