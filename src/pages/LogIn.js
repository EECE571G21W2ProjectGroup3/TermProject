import React, { useEffect, useRef, useState } from "react";
let contractDetails = require("../smartContract.json");

const Web3 = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider(
    `https://ropsten.infura.io/v3/${contractDetails.INFURA_API_KEY}`
  )
);

export const contract = new web3.eth.Contract(
  contractDetails.abi,
  contractDetails.contractAddress
);

const LogIn = () => {
  // console.log(contract);
  // const name = contract.methods.name().call());
  const [containerClass, setContainerClass] = useState("container");
  const [logInWithMM, setLogInWithMM] = useState(true);
  const [userWallet, setUserWallet] = useState("");
  const loginButton = useRef(null);

  window.userWalletAddress = null;

  const metaMaskBtn = () => {
    return (
      <>
        <div className="social-media">
          <div className="flex-col space-y-2 justify-center items-center">
            <button
              ref={loginButton}
              className="social-icon"
              onClick={logInWithMM ? loginWithMetaMask : signOutOfMetaMask}
            >
              <span className="iconify" data-icon="logos:metamask-icon"></span>
              <script src="https://code.iconify.design/2/2.2.0/iconify.min.js"></script>
            </button>
          </div>
        </div>
        <p id="userWallet" className="text-lg text-gray-600 my-2">
          {userWallet &&
            `Your meta mask address is ${userWallet.substring(0, 5)}...`}
        </p>
      </>
    );
  };

  const toggleButton = () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed");
    }
  };

  const loginWithMetaMask = async () => {
    const accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch((e) => {
        console.error(e.message);
        return;
      });
    if (accounts) {
      window.userWalletAddress = accounts[0];
      setUserWallet(window.userWalletAddress);
      setLogInWithMM(false);
    }
  };

  const signOutOfMetaMask = () => {
    window.userWalletAddress = null;
    setUserWallet("");
    setLogInWithMM(true);
  };

  const handleSignUp = () => {
    setContainerClass("container sign-up-mode");
  };

  const handleSignIn = () => {
    setContainerClass("container");
  };

  useEffect(() => {
    toggleButton();
  }, []);

  return (
    <>
      <div className={containerClass}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              {metaMaskBtn()}
              <button className="btn solid">Login</button>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Username" />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" placeholder="Email" />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Password" />
              </div>
              {metaMaskBtn()}
              <input
                type="submit"
                className="btn"
                value="Sign up"
                onClick={() => {}}
              />
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here ?</h3>
              <p>
                Join our wonderful community and enjoy our services by signing
                up below!
              </p>
              <button
                className="btn transparent"
                id="sign-up-btn"
                onClick={handleSignUp}
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already A Member ?</h3>
              <p>
                You can simply log in with your other platforms account, we
                recommand using Metamask account.
              </p>
              <button
                className="btn transparent"
                id="sign-in-btn"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
