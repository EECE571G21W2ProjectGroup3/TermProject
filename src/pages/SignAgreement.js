import React from "react";

import classes from './SingleAgreement.module.css';

function SignAgreement() {
  return (
    <>
      <section className={classes.singleHouse}>
        <div>
          <h3>You have a new agreement.</h3>
        </div>
        <div>
            <button className={classes.btnPrimary}>Sign Agreement</button>
            <button className={classes.btnPrimary}>Cancel Match</button>
          </div>
      </section>
    </>
  );
}

export default SignAgreement;
