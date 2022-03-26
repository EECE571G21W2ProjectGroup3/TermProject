import React from "react";
import contract from "../images/contract.png";

function SignAgreement() {
  let Landlord = [
    {
      name: "Terry",
      description: "Hi I am Terry",
    },
    {
      name: "William",
      description: "is William speaking",
    },
    {
      name: "Hart",
      description:
        "Hi I am HartHi I am HartHi I am HartHi I am HartHi I am HartHi I am Hart",
    },
    {
      name: "Danni",
      description:
        "Hi I am DanniHi I am DanniHi I am DanniHi I am DanniHi I am DanniHi I am Danni",
    },
    {
      name: "Charles",
      description:
        "Hi I am Charles I am Charles I am Charles I am Charles I am Charles I am Charles",
    },
  ];
  //Landlord = undefined;
  if (!Landlord) {
    return (
      <section className="single-house">
        <div className="error">
          <h3>No lanlord is satisfies with your application...</h3>
          <h3>
            Consider modify your personal background for a better impression
          </h3>
          <form action=""></form>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="single-house">
        <div className="accordion-wrapper">
          {Landlord.map((background, index) => {
            const { name, description } = background;
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
                  <div>
                    <h3>You have a new agreement.</h3>
                  </div>
                  <p>{`Landlord-message: ${description}`}</p>

                  <div className="agreement">
                    <img src={contract} alt="Contract" />
                  </div>
                  <div className="sign-agreement-btn">
                    <button className="btn-primary">Sign Agreement</button>
                    <button className="btn-primary">Cancel Match</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default SignAgreement;
