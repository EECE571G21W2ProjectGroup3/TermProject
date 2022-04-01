import React, { useState, useEffect } from "react";
import contractImg from "../images/contract.png";
import NavBar from "../components/Navbar";
import { contractWrapper } from "../contractWrapper";

function SignAgreement() {
  const contract = contractWrapper();
  // const [showLoader, setShowLoader] = useState(false);
  let [landlords, setLandlords] = useState([]);

  useEffect(() => {
    const getLandlords = async () => {
      const result = await contract.getLandlordsBG();
      console.log(result);
      if (!result.error) {
        setLandlords([...landlords, ...result.result]);
      }
    };
    getLandlords();
  }, []);

  if (!landlords) {
    return (
      <>
        <NavBar />
        <section className="list">
          <div className="error">
            <h3>No lanlord is satisfies with your application...</h3>
            <h3>
              Consider modify your personal background for a better impression
            </h3>
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
          {landlords.map((background, index) => {
            const { landlordAddress, name, phoneNumber, email } = background;
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
                  <p>{`Landlord's phone: ${phoneNumber}`}</p>
                  <p>{`Landlord's email: ${email}`}</p>

                  <div className="agreement">
                    <img src={contractImg} alt="Contract" />
                  </div>
                  <div className="sign-agreement-btn">
                    <button
                      className="btn-primary"
                      data-landlordaddress={landlordAddress}
                    >
                      Sign Agreement
                    </button>
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
