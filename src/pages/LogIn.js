import React, { useEffect, useReducer } from "react";
import { contractWrapper } from "../contractWrapper";
import {
  SET_CONTIAINER_CLASS,
  SET_LOGIN_WITH_MM,
  SET_USER_WALLET,
  SET_LOADER,
  SET_SIGNUP_ERROR,
  SET_SIGNUP_FORM,
  SET_IS_SIGNED_IN,
  SET_SIGNIN_FORM,
} from "../actions/login";
import reducer from "../reducers/login";

const initialState = {
  containerClass: "container",
  shouldLogInWithMM: true,
  walletAddress: "",
  needLoader: false,
  signUpError: "",
  signUpDetails: {},
  signInDetails: {},
  isSignedIn: false,
};

const LogIn = () => {
  const contract = contractWrapper();
  const [state, dispatch] = useReducer(reducer, initialState);

  let walletAddress = sessionStorage.getItem("walletAddress");

  const checkIfMetamaskExists = () => {
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
      walletAddress = accounts[0];
      sessionStorage.setItem("walletAddress", walletAddress);
      dispatch({ type: SET_USER_WALLET, payload: walletAddress });
      dispatch({ type: SET_LOGIN_WITH_MM, payload: false });
    }
  };

  const signOutOfMetaMask = () => {
    walletAddress = null;
    sessionStorage.setItem("walletAddress", walletAddress);
    dispatch({ type: SET_USER_WALLET, payload: "" });
    dispatch({ type: SET_LOGIN_WITH_MM, payload: true });
  };

  const handleSignUp = () => {
    dispatch({ type: SET_CONTIAINER_CLASS, payload: "sign-up-mode" });
  };

  const handleSignUpSubmit = async () => {
    dispatch({ type: SET_LOADER, payload: true });
    const result = await contract.register({ ...state.signUpDetails });
    dispatch({ type: SET_LOADER, payload: false });
    if (result.error) {
      dispatch({
        type: SET_SIGNUP_ERROR,
        payload: result.error.substring(0, 40),
      });
    } else {
      alert("Signed up successfully!");
      dispatch({ type: SET_CONTIAINER_CLASS, payload: "container" });
    }
  };

  const handleSignIn = () => {
    dispatch({ type: SET_LOGIN_WITH_MM, payload: true });
    dispatch({ type: SET_CONTIAINER_CLASS, payload: "container" });
  };

  const handleSignInSubmit = async () => {
    const result = await contract.logIn({ ...state.signInDetails });
    if (!result.error) {
      alert("Signed in successfully!");
      await contract.saveUserInfoToStorage();
      dispatch({ type: SET_IS_SIGNED_IN, payload: true });
    }
  };

  const metaMaskBtn = () => {
    return (
      <>
        <div className="social-media">
          <div className="flex-col space-y-2 justify-center items-center">
            <button
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
          <p className="text-lg text-gray-600 my-2">
            Your wallet address: ${state.walletAddress.substring(0, 5)}...
          </p>
        )}
      </>
    );
  };

  const inputField = (className, id, type, placeholder, getTextFunction) => {
    return (
      <div className="input-field">
        <i className={className}></i>
        <input
          data-id={id}
          type={type}
          placeholder={placeholder}
          onChange={getTextFunction}
        />
      </div>
    );
  };

  const loader = () => {
    return (
      <button className="ee">
        <i className="fa fa-refresh fa-spin"></i>Loading
      </button>
    );
  };

  const getSignUpText = (event) => {
    const inputValue = event.target.value;
    dispatch({
      type: SET_SIGNUP_FORM,
      payload: {
        ...state.signUpDetails,
        [event.target.dataset.id]: inputValue,
      },
    });
  };

  const getSignInText = (event) => {
    const inputValue = event.target.value;
    dispatch({
      type: SET_SIGNIN_FORM,
      payload: {
        ...state.signInDetails,
        [event.target.dataset.id]: inputValue,
      },
    });
  };

  useEffect(() => {
    checkIfMetamaskExists();
  }, []);

  return (
    <>
      {state.isSignedIn ? (
        window.location.replace(`/home`)
      ) : (
        <div className={state.containerClass}>
          <div className="forms-container">
            <div className="signin-signup">
              <form action="#" className="sign-in-form">
                <h2 className="title">Sign in</h2>
                {inputField(
                  "fas fa-user",
                  "name",
                  "text",
                  "Username",
                  getSignInText
                )}
                {inputField(
                  "fas fa-lock",
                  "password",
                  "password",
                  "Password",
                  getSignInText
                )}
                {metaMaskBtn()}
                <button className="btn solid" onClick={handleSignInSubmit}>
                  Login
                </button>
              </form>
              <form action="#" className="sign-up-form">
                <h2 className="title">Sign up</h2>
                {inputField(
                  "fas fa-user",
                  "name",
                  "text",
                  "Username",
                  getSignUpText
                )}
                {inputField(
                  "fas fa-lock",
                  "password",
                  "password",
                  "Password",
                  getSignUpText
                )}
                {inputField(
                  "fas fa-phone",
                  "phone",
                  "phone",
                  "Phone",
                  getSignUpText
                )}
                {inputField(
                  "fas fa-envelope",
                  "email",
                  "email",
                  "Email",
                  getSignUpText
                )}
                <select
                  className="user-type"
                  data-id="userType"
                  onChange={getSignUpText}
                >
                  <option value="">Please select your user type</option>
                  <option value="tenant">Tenant</option>
                  <option value="landlord">Landlord</option>
                </select>
                {metaMaskBtn()}
                {state.signUpError && (
                  <p className="text-lg text-gray-600 my-2">
                    Error: {state.signUpError} ...
                  </p>
                )}
                {state.needLoader ? (
                  loader()
                ) : (
                  <input
                    type="submit"
                    className="btn"
                    value="Sign up"
                    onClick={handleSignUpSubmit}
                  />
                )}
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
      )}
    </>
  );
};

export default LogIn;
