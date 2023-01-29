// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//  
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");   

async function main() { 


  // const Supplychain = await hre.ethers.getContractFactory("Supplychain");
  // const supplychain = await Supplychain.deploy();

  // console.log(
  //   `Supplychain contract deployed to ${supplychain.address}`
  // );

  const supplychain = await hre.ethers.getContractAt("Supplychain","0xc838573e06d6088013bAB1bc46F6AC63e2509aeC");
  // console.log(supplychain.address);
  await supplychain.batchProduced(                                      
    1738123,// batchID                                                 
    [112232,313134,13314,31334], // Array of product Ids               
    4,// Batch Size                                                    
    "Batch of 6 Jeans",// Batch Description                             
    1234132,// Product temlplate ID                                                       
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",// factory address     
    "0xdD2FD4581271e230360230F9337D5c0430Bf44C0",// distributor address
    "Factory location",// factory Location                               
    "1223123"// dateOfProduction                                        
  )                                                                      
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
