import React from "react";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Services from "../components/Services";
import NavBar from "../components/Navbar";

const home = () => {
  return (
    <>
      <NavBar />
      <Hero>
        <Banner
          title="just buy a house"
          subtitle="rooms starting at $300 per month"
        >
          <Link to="/rooms" className="btn-primary">
            our houses
          </Link>
        </Banner>
      </Hero>
      <Services />
    </>
  );
};

export default home;
