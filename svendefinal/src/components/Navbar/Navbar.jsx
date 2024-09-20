import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline } from "react-icons/io";
import header from "../../assets/Logo.png";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const handleNavLinkClick = (path) => {
    setActiveLink(path);
    setMenuOpen(false);
  };

  return (
    <nav>
      <div id="topNav">
        <img src={header} alt="Header" />

        <div className="burger-menu" onClick={toggleMenu}>
          {menuOpen ? <IoMdCloseCircleOutline /> : <GiHamburgerMenu />}
        </div>
      </div>
      <div id="lowerNav" className={menuOpen ? "open" : ""}>
        <ul>
          <li>
            <NavLink
              to="/"
              className={activeLink === "/" ? "active-link" : ""}
              onClick={() => handleNavLinkClick("/")}
            >
              Forside
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Boliger"
              className={activeLink === "/Boliger" ? "active-link" : ""}
              onClick={() => handleNavLinkClick("/Boliger")}
            >
              Boliger
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Kontakt"
              className={activeLink === "/Kontakt" ? "active-link" : ""}
              onClick={() => handleNavLinkClick("/Kontakt")}
            >
              Kontakt
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Login"
              className={activeLink === "/Login" ? "active-link" : ""}
              onClick={() => handleNavLinkClick("/Login")}
            >
              Login
            </NavLink>
          </li>
          <form action="">
            <input placeholder="Indtast søgeord" type="search" />
            <div>
              <FaSearch></FaSearch>
            </div>
          </form>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
