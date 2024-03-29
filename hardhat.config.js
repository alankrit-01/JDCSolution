require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require("@nomiclabs/hardhat-waffle");

require('dotenv').config() 
 
module.exports = {
  solidity: {
    version: "0.8.17",  
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    goerli: {
      url: "https://goerli.infura.io/v3/08d0a9d1045146dc888e62677f83e772", //Infura url with projectId
      accounts: [ 
        process.env.PRIVATEKEY,   
      ], // add the account that will deploy the contract (private key)
      // ["ALANKRIT 2"]
    },    
    matic: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATEKEY]  // Alankrit private key
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/

    // apiKey: "C7M9B1RX5QMQSQZ8W4UMZD6K5QS6DZAW9P",   // ethereum
    apiKey: "634K4G2K7ASVPHQKBWSW31C7J21NBBR53T",      // polygon
  },
  mocha: {
    timeout: 100000000,
  },
  paths:{
    artifacts: './backend/artifacts',
  }
};

// npx hardhat verify --contract contracts/OldCrypto.test.sol:OldCrypt3DPunksTest --network rinkeby 0xcAff8ec4b071Cd99fa8Ac83079A765218fc094aA 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 0x03717989289c46a101A18b0A3e0Ca8DffB92a5a5
// npx hardhat verify --contract contracts/Crypto3d.test.sol:Crypto3dTest --network rinkeby 0xa0957418DA97756532Ae2aA553B68B316bbCDf9F 0xcAff8ec4b071Cd99fa8Ac83079A765218fc094aA