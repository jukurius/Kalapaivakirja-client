import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { IconChevronDown } from "@tabler/icons-react";
import { AppContext } from "../../AppContext";
import { IconMenu2 } from "@tabler/icons-react";
import { IconX } from "@tabler/icons-react";
import logo from "../../assets/logo.png";

const Header = () => {
  const { auth } = useContext(AppContext);
  const [isUnAuthedMenuOpen, setIsUnAuthedMenuOpen] = useState(false);

  return (
    <nav className="h-16 lg:h-20 relative z-50 flex items-center justify-between px-5 md:px-10 shadow-md">
      <div>
        <Link to="/">
          <img className="w-10 h-10 lg:w-14 lg:h-14" src={logo} />
        </Link>
      </div>
      {auth?.user !== undefined ? (
          <div className="user lg:flex items-center gap-5">
            <span className="hidden lg:block font-semibold">{auth?.user}</span>
            <img
              className="w-10 h-10 lg:w-14 lg:h-14 rounded-[50%] object-cover"
              src={auth?.img ? auth.img : null}
            />
            <div className="hidden lg:block"><IconChevronDown /></div>
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
        </div>
      )}
    </nav>
  );
};

export default Header;
