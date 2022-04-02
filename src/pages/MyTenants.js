import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import { contractWrapper } from "../contractWrapper";

const MyTenants = () => {
  const [matchedUser, setMatchedUser] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const contract = contractWrapper();
  let [tenantsBG, setTenantsBG] = useState([]);

  useEffect(() => {
    const getBG = async () => {
      let result = await contract.getAllTenantsBG();
      if (!result.error) {
        setTenantsBG([...tenantsBG, ...result.result]);
      }
    };

    const getMatchedPair = async () => {
      const result = await contract.getMatchedPair();
      if (!result.error) {
        setMatchedUser({ ...result.result });
      }
    };
    getBG();
    getMatchedPair();
  }, []);

  const handleSubmit = async (event) => {
    setShowLoader(true);
    const result = await contract.sendAgreemnt(
      event.target.dataset.tenantaddress
    );
    setShowLoader(false);
    if (!result.error) {
      alert("Successfully sent your contract to this tenant");
    }
  };

  const showNoInterestMsg = () => {
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
          </div>
        </section>
      </>
    );
  };

  const tenants = () => {
    return (
      <>
        <section className="list">
          <div className="accordion-wrapper">
            {tenantsBG.map((background, index) => {
              const {
                tenantAddress,
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
                    {showLoader ? (
                      <button className="btn-primary btn-send-agreement ee">
                        <i className="fa fa-refresh fa-spin"></i>Loading
                      </button>
                    ) : (
                      <button
                        className="btn-primary btn-send-agreement"
                        onClick={handleSubmit}
                        data-tenantaddress={tenantAddress}
                      >
                        Send Agreement
                      </button>
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
        : tenantsBG.length === 0
        ? showNoInterestMsg()
        : tenants()}
    </>
  );
};
export default MyTenants;
