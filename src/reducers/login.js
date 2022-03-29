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

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONTIAINER_CLASS:
      if (action.payload === "sign-up-mode") {
        return { ...state, containerClass: `container sign-up-mode` };
      }
      return { ...state, containerClass: action.payload };
    case SET_LOGIN_WITH_MM:
      return {
        ...state,
        shouldLogInWithMM: action.payload,
      };
    case SET_USER_WALLET:
      return {
        ...state,
        walletAddress: action.payload,
      };
    case SET_LOADER:
      return {
        ...state,
        needLoader: action.payload,
      };
    case SET_SIGNUP_ERROR:
      return {
        ...state,
        signUpError: action.payload,
      };
    case SET_SIGNUP_FORM:
      return {
        ...state,
        signUpDetails: { ...action.payload },
      };
    case SET_IS_SIGNED_IN:
      return {
        ...state,
        isSignedIn: action.payload
      }
    case SET_SIGNIN_FORM:
      return {
        ...state, 
        signInDetails: { ...action.payload },
      }
    default:
      throw new Error(
        `no mathching "${action.type}" action type in the reducer`
      );
  }
};
export default reducer;
