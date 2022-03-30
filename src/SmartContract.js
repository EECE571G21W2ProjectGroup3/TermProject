const contractDetails = require("./smartContract.json");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

export const contractWrapper = () => {
  const web3 = createAlchemyWeb3(
    `https://eth-ropsten.alchemyapi.io/v2/${contractDetails.ALCHEMY_API_KEY}`
  );

  const deployedContract = new web3.eth.Contract(
    contractDetails.abi,
    contractDetails.contractAddress
  );

  const saveUserInfoToStorage = async (
    address = sessionStorage.getItem("walletAddress")
  ) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .users(address)
        .call({ from: address });
      sessionStorage["name"] = result.result.name;
      sessionStorage["userID"] = result.result.userID;
      sessionStorage["userType"] = result.result.userType;
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const register = async ({ name, password, phone, email, userType }) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .register(name, password, userType, phone, email)
        .send({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const logIn = async ({ name, password }) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .logIn(name, password)
        .call({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const editHouseInfo = async (
    address,
    rent,
    description,
    period,
    isAvailable
  ) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .editHouseInfo(address, rent, description, period, isAvailable)
        .send({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getHouseInfo = async () => {
    let result = { result: "", error: "" };
    const address = sessionStorage.getItem("walletAddress");
    try {
      result.result = await deployedContract.methods
        .houses(address)
        .call({ from: address });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const printHello = () => {
    alert(deployedContract.methods);
    console.log(deployedContract.methods);
    // alert(sessionStorage.getItem("walletAddress"));
  };

  return {
    saveUserInfoToStorage,
    register,
    logIn,
    editHouseInfo,
    getHouseInfo,
    printHello,
  };
};
