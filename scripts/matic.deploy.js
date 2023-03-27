const hre = require("hardhat");   
require('dotenv').config();
const fs = require('fs');

async function main() { 
  const Supplychain = await hre.ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy();
  console.log(`Supplychain contract deployed to ${supplychain.address}`);  
  // process.env.CONTRACT_ADDRESS = supplychain.address;
  // fs.writeFileSync('.env', `CONTRACT_ADDRESS=${supplychain.address}`);
                                                          
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
