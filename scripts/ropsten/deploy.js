const { ethers } = require("hardhat");
const { getContractFactory } = ethers;

async function main() {
  console.log(
    "=========================================================================================="
  );
  console.log(`Start deploying the smart contract`);
  console.log(
    "=========================================================================================="
  );

  const MyTokenFactory = await getContractFactory("HouseRental");
  const myToken = await MyTokenFactory.deploy();
  console.log(myToken);
  console.log(
    `Token contract has been deployed at https://ropsten.etherscan.io/address/${myToken.address}`
  );
  console.log(
    "=========================================================================================="
  );

  console.log("Deployment ALL DONE !!!!!!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
