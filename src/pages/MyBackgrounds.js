import React, { useState, useEffect } from "react";
import Form from "../components/Form";
import NavBar from "../components/Navbar";
import Loader from "../components/Loader";
import { contractWrapper } from "../contractWrapper";

const MyBackgrounds = () => {
  const contract = contractWrapper();
  const [showLoader, setShowLoader] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [backgrounds, setBackgrounds] = useState({});

  useEffect(() => {
    const getTenantBG = async () => {
      const result = await contract.getTenantBG();
      if (!result.error) {
        setBackgrounds({ ...result.result });
      }
    };
    getTenantBG();
  }, [contract]);

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
    const handleSubmit = async (formContent) => {
      let { age, income, male, description } = formContent;
      male =
        male.toLowerCase() === "true" || male.toLowerCase() === "t"
          ? true
          : false;
      setShowLoader(true);
      const result = await contract.editBackground(
        age,
        income,
        male,
        description
      );
      setShowLoader(false);
      setShowEdit(false);
      if (!result.error) {
        alert("Successfully edited your background!");
        window.location.reload();
      }
    };

    const formProps = {
      title: "Please add/edit your Personal Background",
      details: "Include anything about yourself here.",
      textInputArray: [
        ["age", ""],
        ["income", "$"],
        ["male", "true/false"],
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

  const myBackground = () => {
    return (
      <>
        <section className="single-house">
          <div className="single-house-info">
            <article className="desc">
              <h3>self-introduction</h3>
              <p>{backgrounds.description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>age : {backgrounds.age}</h6>
              <h6>income : {backgrounds.income}</h6>
              <h6>sex : {backgrounds.isMale ? "Male" : "Female"}</h6>
              <button
                className="btn-primary"
                onClick={() => {
                  setShowEdit(true);
                }}
              >
                Edit Your Background
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
      {showLoader ? loader() : showEdit ? editForm() : myBackground()}
    </>
  );
};

export default MyBackgrounds;
