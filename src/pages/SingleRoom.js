import React, { useContext } from "react";
import defaultBcg from "../images/house-1.jpg";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";

import StyledHero from "../components/StyledHero";
const SingleRoom = (props) => {
  function handleSubmit() {

  }

  let state = {
    slug: props.match.params.slug,
    defaultBcg: defaultBcg,
  };

  const { getRoom } = useContext(RoomContext);
  const house = getRoom(state.slug);
  console.log(house);
  if (!house) {
    return (
      <div className="error">
        <h3> no such house could be found...</h3>
        <Link to="/rooms" className="btn-primary">
          back to rooms
        </Link>
      </div>
    );
  }
  const {
    name,
    description,
    capacity,
    size,
    price,
    extras,
    airconditioning,
    garden,
    images,
  } = house;
  const [...defaultImages] = images;

  return (
    <>
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
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>price : £{price}</h6>
            <h6>size : {size} SQM</h6>
            <h6>
              Rooms :{capacity > 1 ? `${capacity} rooms` : `${capacity} room`}
            </h6>
            <h6>{garden ? "with garden" : "no garden"}</h6>
            <h6>{airconditioning && "airconditioning included"}</h6>
            <button className="btn-primary" onClick={handleSubmit}>Send Background</button>
          </article>
        </div>
      </section>
      <section className="house-extras">
        <h6>extras </h6>
        <ul className="extras">
          {extras.map((item, index) => (
            <li key={index}>- {item}</li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SingleRoom;
