import React from "react";
import contract from '../images/contract.png';

function SignAgreement() {
  return (
    <>
      <section className="agreement">
        <div>
          <h3>You have a new agreement.</h3>
        </div>
        <div className="agreement">
        <img src={contract} alt="Contract" />;
      </div>
        <div>
          <button className="btn-primary">Sign Agreement</button>
          <button className="btn-primary">Cancel Match</button>
        </div>
      </section>
    </>
  );
}

export default SignAgreement;
