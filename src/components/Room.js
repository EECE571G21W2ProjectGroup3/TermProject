import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/house-1.jpg";
import PropTypes from "prop-types";
import { memo } from "react";
const Room = memo(({ house }) => {
  const { name, images, rental } = house;
  return (
    <article className="house">
      <div className="img-container">
        <img
          className="houseImg"
          src={images[0] || defaultImg}
          alt="single house"
        />
        <div className="price-top">
          <h6>${rental}</h6>
          <p>asking price</p>
        </div>
        <Link to={`/rooms/${name}`} className="btn-primary house-link">
          features
        </Link>
      </div>
      <p className="house-info">{name}</p>
    </article>
  );
});

Room.propTypes = {
  house: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    rental: PropTypes.string.isRequired,
  }),
};
export default Room;
