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

  const getUser = async (
    userAddress = sessionStorage.getItem("walletAddress")
  ) => {
    let result = { result: {}, error: "" };
    try {
      const userInfo = await deployedContract.methods.users(userAddress).call({
        from: sessionStorage.getItem("walletAddress"),
      });
      result.result = userInfo;
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getUserCount = async () => {
    let result = { result: 0, error: "" };
    try {
      const userCnt = parseInt(
        await deployedContract.methods.usersNumber().call({
          from: sessionStorage.getItem("walletAddress"),
        })
      );
      result.result = userCnt;
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getAddresses = async (totalUserCount) => {
    let result = { result: [], error: "" };
    try {
      for (let i = 1; i <= totalUserCount; ++i) {
        result.result.push(
          await deployedContract.methods
            .idUsersMap(i)
            .call({ from: sessionStorage.getItem("walletAddress") })
        );
      }
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getAllHousesAndLandlords = async () => {
    let result = { result: [], error: "" };
    try {
      const userCnt = (await getUserCount()).result;
      const addresses = (await getAddresses(userCnt)).result;
      for (const address of addresses) {
        const userInfo = (await getUser(address)).result;
        const houseInfo = (await getHouseInfo(address)).result;
        if (userInfo.userType !== "landlord") continue;
        result.result.push({ ...userInfo, ...houseInfo });
      }
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getHouseInfo = async (
    address = sessionStorage.getItem("walletAddress")
  ) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .houses(address)
        .call({ from: sessionStorage.getItem("walletAddress") });
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
    getUser,
    getUserCount,
    getAddresses,
    getAllHousesAndLandlords,
    getHouseInfo,
    printHello,
  };
};
