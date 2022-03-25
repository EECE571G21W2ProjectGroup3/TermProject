import React from "react";
import Form from "../components/Form";
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
    let submitFunction = (formContent) => {
      console.log("See content");
      console.log(formContent);
      alert(JSON.stringify(formContent));
    };
    let formProps = {
      title: "Please add/edit your house information",
      details: "Include anything about your house here.",
      textInputArray: [
        ["Monthly Rent", "$"],
        ["Period", "MM / YYYY"],
        ["Address", ""],
      ],
      submitFunction: submitFunction,
    };
    return <Form {...formProps} />;
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
