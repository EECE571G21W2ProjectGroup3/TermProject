import React, { useState, useEffect } from "react";
import contractImg from "../images/contract.png";
import NavBar from "../components/Navbar";
import { contractWrapper } from "../contractWrapper";

function SignAgreement() {
  const contract = contractWrapper();
  const [showLoader, setShowLoader] = useState(false);
  let [landlords, setLandlords] = useState([]);

  const handleCancelMatch = async (event) => {
    setShowLoader(true);
    const result = await contract.cancelMatch(
      event.target.dataset.landlordaddress
    );
    console.log(result);
    setShowLoader(true);
    if (!result.error) {
      alert("Cancel match successfully!");
      window.location.reload();
    }
  };

  useEffect(() => {
    const getLandlords = async () => {
      const result = await contract.getLandlordsBG();
      if (!result.error) {
        setLandlords([...landlords, ...result.result]);
      }
    };
    getLandlords();
  }, []);

  if (landlords.length == 0) {
    return (
      <>
        <NavBar />
        <section className="list">
          <div className="error">
            <h3>No lanlord has sent you any agreement...</h3>
            <h3>Consider modifying your background for a better impression</h3>
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
                  {showLoader ? (
                    <div className="sign-agreement-btn">
                      <button className="btn-primary ee">
                        <i className="fa fa-refresh fa-spin"></i>Loading
                      </button>
                    </div>
                  ) : (
                    <div className="sign-agreement-btn">
                      <button
                        className="btn-primary"
                        data-landlordaddress={landlordAddress}
                      >
                        Sign Agreement
                      </button>
                      <button
                        className="btn-primary"
                        data-landlordaddress={landlordAddress}
                        onClick={handleCancelMatch}
                      >
                        Cancel Match
                      </button>
                    </div>
                  )}
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
