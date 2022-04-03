const contractDetails = require("./smartContract.json");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

export const contractWrapper = () => {
  const nullAddress = "0x0000000000000000000000000000000000000000";

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

  const editBackground = async (age, income, isMale, description) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .editBackground(age, income, isMale, description)
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

  const getUserAddressById = async (id) => {
    let result = { result: 0, error: "" };
    try {
      const address = await deployedContract.methods.idUsersMap(id).call({
        from: sessionStorage.getItem("walletAddress"),
      });
      result.result = address;
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
        if (userInfo.userType !== "landlord" || !houseInfo.isHouseAvailable)
          continue;
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

  const getTenantBG = async (
    address = sessionStorage.getItem("walletAddress")
  ) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .backgrounds(address)
        .call({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getPotentialTenants = async () => {
    let result = { result: [], error: "" };
    try {
      const addresses = (result.result = await deployedContract.methods
        .getPotentialTenants()
        .call({ from: sessionStorage.getItem("walletAddress") }));
      result.result = addresses.filter((each) => each !== nullAddress);
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getPotentialLandlords = async () => {
    let result = { result: [], error: "" };
    try {
      const addresses = await deployedContract.methods
        .getPotentialLandlord()
        .call({ from: sessionStorage.getItem("walletAddress") });
      result.result = addresses.filter((each) => each !== nullAddress);
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getAllTenantsBG = async () => {
    const tenantsAddresses = (await getPotentialTenants()).result;
    let result = { result: [], error: "" };
    try {
      for (const tenantAddress of tenantsAddresses) {
        const tenantBackground = await deployedContract.methods
          .getBackground(tenantAddress)
          .call({ from: sessionStorage.getItem("walletAddress") });
        const tenantBG = {
          tenantAddress: tenantAddress,
          name: tenantBackground[0],
          phoneNumber: tenantBackground[1],
          email: tenantBackground[2],
          age: tenantBackground[3],
          income: tenantBackground[4],
          isMale: tenantBackground[5],
          description: tenantBackground[6],
        };
        result.result.push(tenantBG);
      }
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getLandlordsBG = async () => {
    const landlordsAddresses = (await getPotentialLandlords()).result;
    let result = { result: [], error: "" };
    try {
      for (const landlordAddress of landlordsAddresses) {
        const landlordBackground = await deployedContract.methods
          .users(landlordAddress)
          .call({ from: sessionStorage.getItem("walletAddress") });
        const landlordBG = {
          landlordAddress: landlordAddress,
          name: landlordBackground[1],
          phoneNumber: landlordBackground[4],
          email: landlordBackground[5],
        };
        result.result.push(landlordBG);
      }
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const getMatchedPair = async () => {
    const address = sessionStorage.getItem("walletAddress");
    let result = { result: {}, error: "" };
    try {
      const matchedUser = await deployedContract.methods
        .matchedPairs(address)
        .call({ from: address });
      if (matchedUser !== nullAddress) {
        const userInfo = (await getUser(matchedUser)).result;
        result.result = { ...userInfo, matchedAddress: matchedUser };
      }
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const sendAgreemnt = async (tenantAddress) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .sendAgreement(tenantAddress)
        .send({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const sendBackground = async (landlordId) => {
    let result = { result: "", error: "" };
    let landlordAddress = (await getUserAddressById(landlordId)).result;
    try {
      result.result = await deployedContract.methods
        .sendBackground(landlordAddress)
        .send({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const signAgreement = async (withWhom) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .signAgreement(withWhom)
        .send({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const cancelMatch = async (withWhom) => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .cancelMatch(withWhom)
        .send({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  const resetMatch = async () => {
    let result = { result: "", error: "" };
    try {
      result.result = await deployedContract.methods
        .resetMatch()
        .send({ from: sessionStorage.getItem("walletAddress") });
    } catch (err) {
      alert(err.message);
      result.error = err.message;
    }
    return result;
  };

  return {
    saveUserInfoToStorage,
    register,
    logIn,
    editHouseInfo,
    editBackground,
    getUser,
    getUserAddressById,
    getUserCount,
    getAddresses,
    getAllHousesAndLandlords,
    getHouseInfo,
    getTenantBG,
    getPotentialTenants,
    getPotentialLandlords,
    getAllTenantsBG,
    getLandlordsBG,
    getMatchedPair,
    sendAgreemnt,
    sendBackground,
    signAgreement,
    cancelMatch,
    resetMatch,
  };
};
