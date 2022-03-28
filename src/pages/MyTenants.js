import React from "react";
import NavBar from "../components/Navbar";

const MyTenants = () => {
  let tenantsBG = [
    {
      name: "Terry",
      phoneNumber: "12345678",
      email: "terry@ubc.ca",
      age: "24",
      income: "12000",
      isMale: true,
      description: "Hi I am Terry",
    },
    {
      name: "William",
      phoneNumber: "55555555",
      email: "william@ubc.ca",
      age: "24",
      income: "29000",
      isMale: true,
      description: "is William speaking",
    },
    {
      name: "Hart",
      phoneNumber: "12345678",
      email: "Hart@ubc.ca",
      age: "24",
      income: "2444000",
      isMale: true,
      description:
        "Hi I am HartHi I am HartHi I am HartHi I am HartHi I am HartHi I am Hart",
    },
    {
      name: "Danni",
      phoneNumber: "12345678",
      email: "danni@ubc.ca",
      age: "24",
      income: "123232000",
      isMale: false,
      description:
        "Hi I am DanniHi I am DanniHi I am DanniHi I am DanniHi I am DanniHi I am Danni",
    },
    {
      name: "Charles",
      phoneNumber: "12345678",
      email: "Charles@ubc.ca",
      age: "24",
      income: "123232000",
      isMale: false,
      description:
        "Hi I am Charles I am Charles I am Charles I am Charles I am Charles I am Charles",
    },
  ];

  // tenantsBG = undefined;
  const handleSubmit = () => {};

  if (!tenantsBG) {
    return (
      <>
        <NavBar />
        <section className="list">
          <div className="error">
            <h3>No one has expressed interest in your house yet...</h3>
            <form action=""></form>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <section className="list">
        <div className="accordion-wrapper">
          {tenantsBG.map((background, index) => {
            const {
              name,
              phoneNumber,
              email,
              age,
              income,
              isMale,
              description,
            } = background;
            return (
              <div key={index} className="accordion">
                <input
                  type="radio"
                  name="radio-a"
                  id={`check${index}`}
                  defaultChecked={index === 0 ? true : false}
                />
                <label className="accordion-label" htmlFor={`check${index}`}>
                  {`${name}`}
                </label>
                <div className="accordion-content">
                  <p>{`Sex: ${isMale ? "Male" : "Female"}`}</p>
                  <p>{`Phone: ${phoneNumber}`}</p>
                  <p>{`Email: ${email}`}</p>
                  <p>{`Age: ${age}`}</p>
                  <p>{`Income: ${income}`}</p>
                  <p>{`Self-Introduction: ${description}`}</p>
                  <button
                    className="btn-primary btn-send-agreement"
                    onClick={handleSubmit}
                  >
                    Send Agreement
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
export default MyTenants;
