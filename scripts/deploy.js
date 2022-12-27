// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() { 


  const Supplychain = await hre.ethers.getContractFactory("Supplychain");
  const supplychain = await Supplychain.deploy();
  // const supplychain = await hre.ethers.getContractAt("Supplychain","0xD64337aDC5074f7a126d017fe1Cce854aB6F3e3C");
  console.log(supplychain.address)

  // await supplychain.deployed();

  // console.log(
  //   `Supplychain contract deployed to ${supplychain.address}`
  // );
  // 0xD64337aDC5074f7a126d017fe1Cce854aB6F3e3C 

  // Add a new product 

   await supplychain.addProductTemplate("0193Bvch11","Product Name","Product Description");
   await supplychain.addProductTemplate("08sh2u11uw","Product Name","Product Description");


  // List of all product templates  

  // let array =await supplychain.getAllProductTemplateIDs()
  // for(let i=0;i<array.length; i++){
  //   let data =await supplychain.ProductTemplateMAP(array[i]);  
  //   console.log(data);
  // }  

  // Add a new Batch
   await supplychain.addBatchTemplate("1827371912","0193Bvch11","Batch Description",15,"0x71bE63f3384f5fb98995898A86B02Fb2426c5788");
   await supplychain.addBatchTemplate("2817373811","0193Bvch11","Batch Description",20,"0xcd3B766CCDd6AE721141F452C550Ca635964ce71");
                    

  // List of all product templates

  // let array2 =await supplychain.getAllBatchTemplateIDs()
  // for(let i=0;i<array2.length; i++){
  //   let data =await supplychain.BatchTemplateMAP(array2[i]);  
  //   console.log(data);
  // }
  // while()

                                                                           
  // Add a batch                                                          
  await supplychain.batchProduced(                                      
    1738101,// batchID                                                 
    [16352,173817,17361,1738191], // Array of product Ids               
    10,// Batch Size                                                   
    "A B C",// Batch Description                                        
    7842182,// Product temlplate ID                                    
    "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",// factory address     
    "0x71bE63f3384f5fb98995898A86B02Fb2426c5788",// distributor address
    "My location",// factory Location                                   
    "1828171"// dateOfProduction                                         
  )   


  // To get all Batch IDs

  let x =await supplychain.getAllBatchIDs()   
  console.log(x);  
  
  
  // To view the list
  
  for(let i=0; i<x.length; i++){
    // For ith Batch
    console.log(await supplychain.BatchMapping(x[i]));  
    // Product Ids for ith batch
    console.log(await supplychain.getProductIdsForaBatch(x[i]));
  }      
  

  // ----------- For QR code

  // Get batch information by passing batch ID
  // Let batch ID -> 1738101
  let batchID =1738101
  console.log(await supplychain.BatchMapping(batchID));  
  // Product Ids for ith batch
  console.log(await supplychain.getProductIdsForaBatch(batchID))

 
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
