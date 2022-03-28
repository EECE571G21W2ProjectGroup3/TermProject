require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
require("@typechain/hardhat");
require("hardhat-deploy");
require("dotenv").config({ path: require("find-config")("../../.env") });
let contractDetails = require("./src/smartContract.json");

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

const config = {
  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${contractDetails.INFURA_API_KEY}`,
      accounts: {
        mnemonic: "damn",
      },
    },
  },
};

module.exports = config;
