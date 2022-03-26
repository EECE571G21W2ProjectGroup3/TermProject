import React from "react";
import NavBar from "../components/Navbar";
import Form from "../components/Form";

function MyBackgrounds() {
  {
    // let house = {
    //   description: "You should rent this house",
    //   period: "May 2022",
    //   rent: "CAD 1200",
    //   address: "UBC CA",
    //   images: [img1, room2, room3, room4],
    // };
    // house = undefined;

    let background = {
      age: "25",
      income: "100000",
      isMale: "female",
      description: "Hello world",
    };

    background = undefined;

    if (!background) {
      let submitFunction = (formContent) => {
        console.log("See content");
        console.log(formContent);
        alert(JSON.stringify(formContent));
      };
      let formProps = {
        title: "Please add/edit your background info...",
        details: "Include anything about yourself here.",
        textInputArray: [
          ["Age", ""],
          ["Income", "$CAD"],
          ["Sex", "Female or Male"],
        ],
        submitFunction: submitFunction,
      };
      return (
        <>
          <NavBar />
          <Form {...formProps} />;
        </>
      );
    }

    const { age, income, isMale, description } = background;
    //const [...defaultImages] = images;

    return (
      <>
        (
        <NavBar />
        <section className="single-house">
          <div className="single-house-info">
            <article className="desc">
              <h3>describe yourself</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>personal Info</h3>
              <h6>age: {age}</h6>
              <h6>income : {income}</h6>
              <h6>isMale : {isMale}</h6>
            </article>
          </div>
        </section>
        )
      </>
    );
  }
}

export default MyBackgrounds;
