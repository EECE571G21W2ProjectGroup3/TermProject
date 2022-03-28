import {
  SET_CONTIAINER_CLASS,
  SET_LOGIN_WITH_MM,
  SET_USER_WALLET,
} from "../actions/login";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CONTIAINER_CLASS:
      if (action.payload === "sign-up-mode") {
        return { ...state, containerClass: `container sign-up-mode` };
      } else {
        return { ...state, containerClass: action.payload };
      }
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
    default:
      throw new Error(
        `no mathching "${action.type}" action type in the reducer`
      );
  }
};
export default reducer;
