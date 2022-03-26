import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import RoomsContainer from "../components/RoomsContainer";
import NavBar from "../components/Navbar";

const Rooms = () => {
  return (
    <>
      <NavBar />
      <Hero hero="roomsHero">
        <Banner title="our rooms">
          <Link to="/home" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Hero>
      <RoomsContainer />
    </>
  );
};

export default Rooms;
