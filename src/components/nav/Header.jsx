import React, { useContext } from "react";
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { IconLogin } from "@tabler/icons-react";
import { IconChevronDown } from "@tabler/icons-react";
import { AppContext } from "../../AppContext";
import axios from "../../api/axios";
import { IconMenu2 } from "@tabler/icons-react";


const Header = (props) => {
  const { auth, setAuth } = useContext(AppContext);

  const toggleNavbar = () => {
    props.setIsOpen(!props.isOpen);
  };

  return (
      <nav className="h-20 relative flex items-center justify-between lg:justify-end px-5 md:px-10 shadow-md">
        <button onClick={toggleNavbar} className="lg:hidden"><IconMenu2 /></button>
        {auth?.user ? (
          <div className="user flex items-center gap-5">
            <span className="font-semibold">{auth?.user}</span>
            <img
              className="w-14 h-14"
              src="https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295430_1280.png"
            />
            <IconChevronDown />
          </div>
        ) : (
          <div>
            <Link className="flex gap-2" to="/login"><IconLogin/>Kirjaudu sisään</Link>
          </div>
        )}
      </nav>
  );
};

export default Header;
