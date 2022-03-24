import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import logo from "../images/logo.svg";

const Navbar = () => {
  let [state, setState] = useState({
    isOpen: false,
  });
  let handleToggle = () => {
    setState({ isOpen: !state.isOpen });
  };
  return (
    <nav className="navbar">
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/">
            <img className="saleLogo" src={logo} alt="House Sale" />
          </Link>
          <button type="button" className="nav-btn" onClick={handleToggle}>
            <FaAlignRight className="nav-icon" />
          </button>
        </div>
        <ul className={state.isOpen ? "nav-links show-nav" : "nav-links"}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rooms">Houses</Link>
          </li>
        </ul>
        <ul
          className={state.isOpen ? "nav-links show-nav" : "nav-links"}
          style={{ marginLeft: "auto" }}
        >
          <li>
            <Link to="/myHouse">My House</Link>
          </li>
          <li>
            <Link to="/myTenants">My Tenants</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
