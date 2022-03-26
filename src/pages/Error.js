import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import NavBar from "../components/Navbar";
import { Link } from "react-router-dom";
const Error = () => {
  return (
    <>
      <NavBar />
      <Hero>
        <Banner title="404" subtitle="page not found">
          <Link to="/home" className="btn-primary">
            return home
          </Link>
        </Banner>
      </Hero>
    </>
  );
};

export default Error;
