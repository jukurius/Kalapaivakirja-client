import { useContext } from "react";
import { Link } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";
import { IconFishHook } from "@tabler/icons-react";
import { IconUser } from "@tabler/icons-react";
import { AppContext } from "../../AppContext";
import { IconLogout } from "@tabler/icons-react";
import { IconSettings } from "@tabler/icons-react";
import { IconFishChristianity } from "@tabler/icons-react";
import { IconUsersGroup } from "@tabler/icons-react";
import { IconUpload } from "@tabler/icons-react";
import { IconCalendar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout"

const Menu = () => {
  const { auth } = useContext(AppContext);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="menu">
      <div className="item">
        <div className="title font-semibold text-3xl pt-5">Kalapäiväkirja</div>
      </div>
      <div className="item mt-20">
        <div className="text-gray-400 mb-6 text-lg px-4">MENU</div>
        <div className="links flex flex-col gap-2">
          <Link
            className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
            to="/"
          >
            <IconHome size={20} />
            Koti
          </Link>
          <Link
            className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
            to="/saaliit"
          >
            <IconFishHook size={20} />
            Kalasaaliit
          </Link>
          <Link
            className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
            to="/"
          >
            <IconUsersGroup size={20} />
            Käyttäjät
          </Link>
          <Link
            className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
            to="/"
          >
            <IconHome size={20} />
            Statistiikka
          </Link>
        </div>
        {auth?.user && (
          <div className="links flex flex-col gap-2">
            <div className="text-gray-400 mb-6 text-lg px-4 mt-10">
              {auth?.user.toUpperCase()}
            </div>
            <div className="links flex flex-col gap-2"></div>
            <Link
              className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
              to="/"
            >
              <IconUser size={20} />
              Profiili
            </Link>
            <Link
              className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
              to="/"
            >
              <IconFishChristianity size={20} />
              Omat kalasaaliit
            </Link>
            <Link
              className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
              to="/lisaa-saalis"
            >
              <IconUpload size={20} />
              Lisää saalis
            </Link>
            <Link
              className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
              to="/"
            >
              <IconCalendar size={20} />
              Kalenteri
            </Link>
            <Link
              className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
              to="/"
            >
              <IconSettings size={20} />
              Asetukset
            </Link>
            <button
              className="text-lg flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
              onClick={handleLogout}
            >
              <IconLogout />
              Kirjaudu ulos
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
