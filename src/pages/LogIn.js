import React, { useEffect, useRef, useState } from "react";

const LogIn = () => {
  const [logInWithMM, setLogInWithMM] = useState(true);
  const loginButton = useRef(null);
  const [logInBtnInnerText, setLogInBtnInnerText] = useState("");
  const [userWallet, setUserWallet] = useState("");

  window.userWalletAddress = null;
  function toggleButton() {
    if (!window.ethereum) {
      setLogInBtnInnerText("MetaMask is not installed");
      loginButton.classList.remove("bg-purple-500", "text-white");
      loginButton.classList.add(
        "bg-gray-500",
        "text-gray-100",
        "cursor-not-allowed"
      );
      return false;
    }
  }

  async function loginWithMetaMask() {
    const accounts = await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .catch((e) => {
        console.error(e.message);
        return;
      });
    if (!accounts) {
      return;
    }

    window.userWalletAddress = accounts[0];
    setUserWallet(window.userWalletAddress);
    setLogInBtnInnerText("Sign out");

    setTimeout(() => {
      setLogInWithMM(false);
    }, 200);
  }

  function signOutOfMetaMask() {
    window.userWalletAddress = null;
    setUserWallet("");
    setLogInBtnInnerText("Sign in");

    setTimeout(() => {
      setLogInWithMM(true);
    }, 200);
  }

  useEffect(() => {
    toggleButton();
  }, []);

  return (
    <>
      <div className="container">
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
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with other platforms</p>
              <div className="social-media">
                <div className="flex-col space-y-2 justify-center items-center">
                  <button
                    id="loginButton"
                    ref={loginButton}
                    className="social-icon"
                    onClick={
                      logInWithMM ? loginWithMetaMask : signOutOfMetaMask
                    }
                  >
                    <span
                      className="iconify"
                      data-icon="logos:metamask-icon"
                    ></span>
                    <script src="https://code.iconify.design/2/2.2.0/iconify.min.js"></script>
                  </button>
                </div>
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
              <p id="userWallet" className="text-lg text-gray-600 my-2">
                {userWallet}
              </p>
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
              <input type="submit" className="btn" value="Sign up" />
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
              <button className="btn transparent" id="sign-up-btn">
                Sign up
              </button>
            </div>
            <img src="img/log.svg" className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <div className="content">
              <h3>Already A Member ?</h3>
              <p>
                You can simply log in with your other platforms account, we
                recommand using Metamask account.
              </p>
              <button className="btn transparent" id="sign-in-btn">
                Sign in
              </button>
            </div>
            <img src="img/register.svg" className="image" alt="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
