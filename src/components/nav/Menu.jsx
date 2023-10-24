import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
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
import { IconChartBar } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { IconX } from "@tabler/icons-react";
import { IconMenu2 } from "@tabler/icons-react";

const Menu = () => {
  const { auth } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {isOpen ? (
        <nav className="absolute lg:static z-50 h-[calc(100vh-5rem)] overflow-y-auto lg:w-80 text-white bg-[#1C2434] px-5 py-5">
          <div className="flex justify-end mt-2 me-2">
            <button onClick={() => setIsOpen(!isOpen)}>
              <IconX />
            </button>
          </div>
          <div className="item">
            <div className="title font-semibold text-3xl pt-5">
              Kalapäiväkirja
            </div>
          </div>
          <div className="item mt-20">
            <div className="text-gray-400 mb-4 text-lg px-4">VALIKKO</div>
            <div className="links flex flex-col gap-2">
              <NavLink
                className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                to="/"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                    : {}
                }
              >
                <IconHome size={20} />
                Koti
              </NavLink>
              <NavLink
                className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                to="/saaliit"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                    : {}
                }
              >
                <IconFishHook size={20} />
                Kalasaaliit
              </NavLink>
              <NavLink
                className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                to="/kayttajat"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                    : {}
                }
              >
                <IconUsersGroup size={20} />
                Käyttäjät
              </NavLink>
              <NavLink
                className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                to="/statistiikka"
                style={({ isActive }) =>
                  isActive
                    ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                    : {}
                }
              >
                <IconChartBar size={20} />
                Statistiikka
              </NavLink>
            </div>
            {auth?.user && (
              <div className="links flex flex-col gap-2">
                <div className="text-gray-400 mb-2 text-lg px-4 mt-8">
                  {auth?.user.toUpperCase()}
                </div>
                <div className="links flex flex-col gap-2"></div>
                <NavLink
                  className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                  to="/oma-tili"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                      : {}
                  }
                >
                  <IconUser size={20} />
                  Oma tili
                </NavLink>
                <NavLink
                  className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                  to="/saaliini"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                      : {}
                  }
                >
                  <IconFishChristianity size={20} />
                  Omat kalasaaliit
                </NavLink>
                <NavLink
                  className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                  to="/lisaa-saalis"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                      : {}
                  }
                >
                  <IconUpload size={20} />
                  Lisää saalis
                </NavLink>
                <NavLink
                  className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                  to="/kalenteri"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                      : {}
                  }
                >
                  <IconCalendar size={20} />
                  Kalenteri
                </NavLink>
                <NavLink
                  className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                  to="/asetukset"
                  style={({ isActive }) =>
                    isActive
                      ? { backgroundColor: "#4a5568", borderRadius: "0.25rem" }
                      : {}
                  }
                >
                  <IconSettings size={20} />
                  Asetukset
                </NavLink>
                <button
                  className="text-md font-medium flex gap-2 text-gray-200 items-center hover:bg-gray-700 py-2 px-4 hover:rounded"
                  onClick={handleLogout}
                >
                  <IconLogout />
                  Kirjaudu ulos
                </button>
              </div>
            )}
          </div>
        </nav>
      ) : (
        <div className="absolute z-50 top-24 left-4 bg-[#F1F5F9]">
          <button
            className="bg-white shadow-lg rounded-sm p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <IconMenu2 size={32} color="#4B5563" />
          </button>
        </div>
      )}
    </>
  );
};

export default Menu;
