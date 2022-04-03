import React, { useState, useContext } from "react";
import defaultBcg from "../images/house-1.jpg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import NavBar from "../components/Navbar";
import Loader from "../components/Loader";
import { contractWrapper } from "../contractWrapper";
import StyledHero from "../components/StyledHero";

const SingleRoom = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const contract = contractWrapper();

  const handleSubmit = async (event) => {
    const landlordId = event.target.dataset.userid;
    setShowLoader(true);
    const result = await contract.sendBackground(parseInt(landlordId));
    setShowLoader(false);
    if (!result.error) {
      alert("Your interest has been sent to this landlord!");
    }
  };

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
    userID,
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
            {sessionStorage["userType"] === "tenant" &&
              (showLoader ? (
                <Loader />
              ) : (
                <button
                  className="btn-primary"
                  data-userid={userID}
                  onClick={handleSubmit}
                >
                  express interest
                </button>
              ))}
          </article>
        </div>
      </section>
    </>
  );
};

export default SingleRoom;
