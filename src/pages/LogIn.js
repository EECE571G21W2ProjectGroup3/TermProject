import React, { useEffect, useRef, useReducer } from "react";
import {
  SET_CONTIAINER_CLASS,
  SET_LOGIN_WITH_MM,
  SET_USER_WALLET,
} from "../actions/login";
import reducer from "../reducers/login";

const LogIn = () => {
  const initialState = {
    containerClass: "container",
    shouldLogInWithMM: true,
    walletAddress: "",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  const loginButton = useRef(null);

  window.walletAddress = null;

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
      window.walletAddress = accounts[0];
      dispatch({ type: SET_USER_WALLET, payload: window.walletAddress });
      dispatch({ type: SET_LOGIN_WITH_MM, payload: false });
    }
  };

  const signOutOfMetaMask = () => {
    window.walletAddress = null;
    dispatch({ type: SET_USER_WALLET, payload: "" });
    dispatch({ type: SET_LOGIN_WITH_MM, payload: true });
  };

  const handleSignUp = () => {
    dispatch({ type: SET_CONTIAINER_CLASS, payload: "sign-up-mode" });
  };

  const handleSignIn = () => {
    dispatch({ type: SET_LOGIN_WITH_MM, payload: true });
    dispatch({ type: SET_CONTIAINER_CLASS, payload: "container" });
  };

  const metaMaskBtn = () => {
    return (
      <>
        <div className="social-media">
          <div className="flex-col space-y-2 justify-center items-center">
            <button
              ref={loginButton}
              className="social-icon"
              onClick={
                state.shouldLogInWithMM ? loginWithMetaMask : signOutOfMetaMask
              }
            >
              <span className="iconify" data-icon="logos:metamask-icon"></span>
              <script src="https://code.iconify.design/2/2.2.0/iconify.min.js"></script>
            </button>
          </div>
        </div>
        {state.walletAddress && (
          <p id="userWallet" className="text-lg text-gray-600 my-2">
            Your wallet address: ${state.walletAddress.substring(0, 5)}...
          </p>
        )}
      </>
    );
  };

  const inputField = (className, type, placeholder) => {
    return (
      <div className="input-field">
        <i className={className}></i>
        <input type={type} placeholder={placeholder} />
      </div>
    );
  };

  useEffect(() => {
    toggleButton();
  }, []);

  return (
    <>
      <div className={state.containerClass}>
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title">Sign in</h2>
              {inputField("fas fa-user", "text", "Username")}
              {inputField("fas fa-lock", "password", "Password")}
              {metaMaskBtn()}
              <button className="btn solid">Login</button>
            </form>
            <form action="#" className="sign-up-form">
              <h2 className="title">Sign up</h2>
              {inputField("fas fa-user", "text", "Username")}
              {inputField("fas fa-envelope", "email", "Email")}
              {inputField("fas fa-lock", "password", "Password")}
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
