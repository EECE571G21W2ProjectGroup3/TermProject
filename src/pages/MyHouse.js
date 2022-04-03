import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import NavBar from "../components/Navbar";
import Loader from "../components/Loader";
import { contractWrapper } from "../contractWrapper";
import { withRoomConsumer } from "../context";

const MyHouse = ({ context }) => {
  const { rooms } = context;
  const contract = contractWrapper();
  const [showLoader, setShowLoader] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [house, setHouse] = useState({ images: [] });

  useEffect(() => {
    const getHouseInfo = async () => {
      const userID = (await contract.getUser()).result.userID;
      for (const room of rooms) {
        if (room.userID === userID) {
          setHouse({ ...room });
          break;
        }
      }
    };
    getHouseInfo();
  }, [rooms, contract]);

  const loader = () => {
    return (
      <>
        <section className="single-house-info loader">
          <Loader />
        </section>
      </>
    );
  };

  const editForm = () => {
    let handleSubmit = async (formContent) => {
      let { description, rent, period, address, available } = formContent;
      available =
        available.toLowerCase() === "true" || available.toLowerCase() === "t"
          ? true
          : false;
      setShowLoader(true);
      const result = await contract.editHouseInfo(
        address,
        rent,
        description,
        period,
        available
      );
      setShowLoader(false);
      setShowEdit(false);
      if (!result.error) {
        alert("Successfully edited your house info!");
        window.location.reload();
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
    );
  };

  const houseInfo = () => {
    return (
      <>
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
    );
  };

  return (
    <>
      <NavBar />
      {showLoader ? loader() : showEdit ? editForm() : houseInfo()}
    </>
  );
};

export default withRoomConsumer(MyHouse);
