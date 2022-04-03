import React, { useState, useEffect } from "react";
import contractImg from "../images/contract.png";
import NavBar from "../components/Navbar";
import Loader from "../components/Loader";
import { contractWrapper } from "../contractWrapper";

function SignAgreement() {
  const contract = contractWrapper();
  const [matchedUser, setMatchedUser] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  let [landlords, setLandlords] = useState([]);

  const handleSignAgreement = async (event) => {
    const landlordAddress = event.target.dataset.landlordaddress;
    setShowLoader(true);
    const result = await contract.signAgreement(landlordAddress);
    setShowLoader(false);
    if (!result.error) {
      alert("You have successfully signed an agreement with this landlord!");
      await getMatchedPair();
    }
  };

  const handleCancelMatch = async (event) => {
    setShowLoader(true);
    const result = await contract.cancelMatch(
      event.target.dataset.landlordaddress
    );
    setShowLoader(false);
    if (!result.error) {
      alert("Cancel match successfully!");
      window.location.reload();
    }
  };

  const resetMatch = async () => {
    setShowLoader(true);
    const result = await contract.resetMatch();
    setShowLoader(false);
    if (!result.error) {
      alert("You can now start a new search again!");
      window.location.reload();
    }
  };

  const getMatchedPair = async () => {
    const result = await contract.getMatchedPair();
    if (!result.error) {
      setMatchedUser({ ...result.result });
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
    getMatchedPair();
  }, []);

  const showNoLandlordMsg = () => {
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
  };

  const showMatchedUser = () => {
    return (
      <>
        <section className="list">
          <div className="error">
            <h3>
              Congratulations! You have signed an agreement with{" "}
              {matchedUser.name}...
            </h3>
            <form action=""></form>
            {showLoader ? (
              <Loader />
            ) : (
              <button className="btn-primary" onClick={resetMatch}>
                Start a new search
              </button>
            )}
          </div>
        </section>
      </>
    );
  };

  const agreements = () => {
    return (
      <>
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
                  <label
                    className="accordion-label agreement-landlord-name"
                    htmlFor={`check${index}`}
                  >
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
                        <Loader />
                      </div>
                    ) : (
                      <div className="sign-agreement-btn">
                        <button
                          className="btn-primary"
                          data-landlordaddress={landlordAddress}
                          onClick={handleSignAgreement}
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
  };

  return (
    <>
      <NavBar />
      {Object.keys(matchedUser).length !== 0
        ? showMatchedUser()
        : landlords.length === 0
        ? showNoLandlordMsg()
        : agreements()}
    </>
  );
}

export default SignAgreement;
