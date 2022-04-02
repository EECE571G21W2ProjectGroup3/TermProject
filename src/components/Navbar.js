import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";
import logo from "../images/logo.gif";

const Navbar = () => {
  let [showNavBar, setShowNavBar] = useState(false);
  let currentUserType = sessionStorage["userType"];
  let currentUser = sessionStorage["name"];
  let currentWallet = sessionStorage["walletAddress"];

  let handleToggle = () => {
    setShowNavBar(!showNavBar);
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
        <ul className={showNavBar ? "nav-links show-nav" : "nav-links"}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/rooms">Houses</Link>
          </li>
        </ul>
        <ul
          className={showNavBar ? "nav-links show-nav" : "nav-links"}
          style={{ marginLeft: "auto" }}
        >
          {currentUserType === "landlord" && currentWallet && (
            <>
              <li>
                <Link to="/myHouse">My House</Link>
              </li>
              <li>
                <Link to="/myTenants">My Tenants</Link>
              </li>
            </>
          )}
          {currentUserType === "tenant" && currentWallet && (
            <>
              <li>
                <Link to="/myBackgrounds">My Background</Link>
              </li>
              <li>
                <Link to="/availableHouse">Sign Agreement</Link>
              </li>
            </>
          )}
          {currentUser && currentWallet && (
            <li>
              <a className="welcome_user">
                Hi {currentUser} !
                <br />({currentUserType})
              </a>
            </li>
          )}
          {(!currentWallet || !currentUser) && (
            <li>
              <a>You have not signed in nor connected your wallet</a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
