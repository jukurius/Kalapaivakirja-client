import React, { useContext } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { IconLogin } from "@tabler/icons-react";
import { AppContext } from "../../AppContext";
import axios from "../../api/axios";

const LOGOUT_URL = "/logout";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { auth, setAuth } = useContext(AppContext);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(LOGOUT_URL);
      console.log("Login succesful:", res);
      setAuth({});
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error scenario
    }
  };

  return (
    <>
      <nav className="bg-white border-b border-gray-200">
        <div className="container max-w-7xl mx-auto px-5">
          <div className="hidden md:flex items-center justify-between w-full h-16">
            {/* <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="/logo.svg"
                  alt="Logo"
                />
              </div> */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className=" hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
              >
                <span className="align-center">Etusivu</span>
              </Link>
              <Link
                to="/saaliit"
                className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
              >
                <span className="align-center">Selaa saaliita</span>
              </Link>
            </div>
            <div className="flex items-end justify-end">
              {auth.user ? (
                <Link className="relative inline-block text-left group">
                  <button className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
                    {auth.user}
                    <svg
                      className="w-2.5 h-2.5 ml-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div className="z-10 absolute origin-top-right overflow-auto px-2 max-h-96 right-0 w-full md:w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 transform scale-0 group-hover:scale-100 transition-transform duration-200">
                    <ul className="py-2">
                      <li className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
                        <Link>Profiili</Link>
                      </li>
                      <li className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
                        <Link>Asetukset</Link>
                      </li>
                      <li className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
                        <Link className="w-full" to="/lisaa-saalis">Lisää saalis</Link>
                      </li>
                      <li className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold">
                        <button
                          className="w-full text-left"
                          onClick={() => handleLogout()}
                        >
                          Kirjaudu ulos
                        </button>
                      </li>
                    </ul>
                  </div>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-semibold"
                >
                  <IconLogin className="w-5 h-5 mr-1" />
                  <span className="align-center">Kirjaudu sisään</span>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="-mr-2 flex justify-end md:hidden">
          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
          {isOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="flex hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <span className="align-center">Etusivu</span>
                </Link>

                <Link
                  to="/saaliit"
                  className="flex items-center hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <span className="align-center">Selaa saaliita</span>
                </Link>
              </div>
            </div>
          )}
      </nav>
      <Outlet />
    </>
  );
};

export default Header;
