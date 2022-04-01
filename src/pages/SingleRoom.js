import React, { useContext } from "react";
import defaultBcg from "../images/house-1.jpg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import NavBar from "../components/Navbar";

import StyledHero from "../components/StyledHero";
const SingleRoom = (props) => {
  function handleSubmit() {}

  let state = {
    name: props.match.params.name,
    defaultBcg: defaultBcg,
  };

  const { getRoom } = useContext(RoomContext);
  const house = getRoom(state.name);
  if (!house) {
    return (
      <>
        <NavBar />
        <div className="error">
          <h3> no such house could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      </>
    );
  }
  const {
    name,
    description,
    period,
    rental,
    images,
    houseAddress,
    isHouseAvailable,
  } = house;
  const [...defaultImages] = images;

  return (
    <>
      <NavBar />
      <StyledHero img={images[0] || state.defaultBcg}>
        <Banner title={`${name} house`}>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-house">
        <div className="single-house-images">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt={name} />
          ))}
        </div>
        <div className="single-house-info">
          <article className="desc">
            <h3>description</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>rent : ${rental}</h6>
            <h6>period : {period} </h6>
            <h6>address : {houseAddress} </h6>{" "}
            <h6>availability : {isHouseAvailable ? "Yes" : "No"} </h6>
            <button className="btn-primary" onClick={handleSubmit}>
              express interest
            </button>
          </article>
        </div>
      </section>
    </>
  );
};

export default SingleRoom;
