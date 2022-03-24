import React from "react";
import room2 from "../images/details-2.jpeg";
import room3 from "../images/details-3.jpeg";
import room4 from "../images/details-4.jpeg";
import img1 from "../images/house-1.jpg";

const MyHouse = () => {
  let house = {
    description: "You should rent this house",
    period: "May 2022",
    rent: "CAD 1200",
    address: "UBC CA",
    images: [img1, room2, room3, room4],
  };
  house = undefined;

  if (!house) {
    return (
      <section className="single-house">
        <div className="error">
          <h3> Please add/edit your house info...</h3>
          <form action=""></form>
        </div>
        <div className="single-house-info">
          <article className="desc">
            <h3>details</h3>
            <textarea
              className="house-description"
              rows="15"
              cols="50"
              placeholder="Anything about your house"
            ></textarea>
          </article>
          <article className="info">
            <h3>info</h3>
            <div className="col2">
              <label>Rent</label>
              <input className="number" type="text" />
              <label>Period</label>
              <input className="expire" type="text" placeholder="MM / YYYY" />
              <label>Address</label>
              <input className="inputname" type="text" placeholder="" />
              <button className="submit">Submit</button>
            </div>
          </article>
        </div>
      </section>
    );
  }

  const { description, period, rent, address, images } = house;
  const [...defaultImages] = images;

  return (
    <>
      (
      <section className="single-house">
        <div className="single-house-images">
          {defaultImages.map((item, index) => (
            <img key={index} src={item} alt="" />
          ))}
        </div>
        <div className="single-house-info">
          <article className="desc">
            <h3>details</h3>
            <p>{description}</p>
          </article>
          <article className="info">
            <h3>info</h3>
            <h6>rent : {rent}</h6>
            <h6>period : {period}</h6>
            <h6>address : {address}</h6>
          </article>
        </div>
      </section>
      )
    </>
  );
};
export default MyHouse;
