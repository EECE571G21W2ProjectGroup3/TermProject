import React from "react";

function SignAgreement() {
  return (
    <>
      <section className="agreement">
        <div>
          <h3>You have a new agreement.</h3>
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
