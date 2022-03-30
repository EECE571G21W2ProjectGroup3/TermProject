import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import { getRoomsImg } from "../imgGenerator";
import NavBar from "../components/Navbar";
import { contractWrapper } from "../smartContract";

const MyHouse = () => {
  const roomImages = getRoomsImg(3);
  const contract = contractWrapper();
  const [showLoader, setShowLoader] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [house, setHouse] = useState({ images: [] });
  // house = undefined;

  useEffect(() => {
    const getHouseInfo = async () => {
      let result = await contract.getHouseInfo();
      console.log(result.result);
      if (!isEmpty(result.result)) {
        setHouse({ ...house, ...result.result, images: roomImages });
      }
    };
    getHouseInfo();
  }, []);

  const isEmpty = (house) => {
    const keys = ["description", "rental", "period", "houseAddress"];
    for (const key in keys) if (house[key]) return false;
    return true;
  };

  let handleSubmit = async (formContent) => {
    let { description, rent, period, address, available } = formContent;
    available = available.toLowerCase() === "true" ? true : false;
    setShowLoader(true);
    const result = await contract.editHouseInfo(
      address,
      rent,
      description,
      period,
      available
    );
    setShowLoader(false);
    if (!result.error) {
      alert("Successfully edited your house info!");
      let result = await contract.getHouseInfo();
      setHouse({ ...house, ...result.result });
      setShowEdit(false);
    }
  };

  let formProps = {
    title: "Please add/edit your house information",
    details: "Include anything about your house here.",
    textInputArray: [
      ["rent", "$"],
      ["period", "MM / YYYY"],
      ["address", ""],
      ["available", "true or false"],
    ],
    submitFunction: handleSubmit,
  };

  return (
    <>
      {showEdit ? (
        <>
          <NavBar />
          {showLoader ? (
            <section className="single-house-info loader">
              <button className="ee">
                <i className="fa fa-refresh fa-spin"></i>Loading
              </button>
            </section>
          ) : (
            <>
              <Form {...formProps} />
              <div className="single-house-info">
                <button
                  className="desc submit"
                  onClick={() => {
                    setShowEdit(false);
                  }}
                >
                  Go Back
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <NavBar />
          <section className="single-house">
            <div className="single-house-images">
              {house.images.map((item, index) => (
                <img key={index} src={item} alt="" />
              ))}
            </div>
            <div className="single-house-info">
              <article className="desc">
                <h3>details</h3>
                <p>{house.description}</p>
              </article>
              <article className="info">
                <h3>info</h3>
                <h6>rent : {house.rental}</h6>
                <h6>period : {house.period}</h6>
                <h6>address : {house.houseAddress}</h6>
                <h6>availability : {house.isHouseAvailable ? "Yes" : "No"}</h6>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowEdit(true);
                  }}
                >
                  Edit Your Info
                </button>
              </article>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default MyHouse;
