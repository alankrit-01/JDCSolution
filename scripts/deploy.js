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
  // console.log(supplychain.address)

  // await supplychain.deployed();

  console.log(
    `Supplychain contract deployed to ${supplychain.address}`
  );
  // console.log(await supplychain.x());

  // Add a new product template

  await supplychain.addProductTemplate(1234132,"Tommy Hilfiger Watch","Men Black Analogue Watch TH1791802W","1234");
  await supplychain.addProductTemplate(1234133,"Jeans","Men Navy Blue Ryan Straight Fit Light Fade Stretchable Jeans","1234");


  // List of all product templates  

  // let array =await supplychain.getAllProductTemplateIDs()
  // for(let i=0;i<array.length; i++){
  //   let data =await supplychain.ProductTemplateMAP(array[i]);  
  //   console.log(data);
  // }  

  // Add a new Batch template

  await supplychain.addBatchTemplate(1827371912,1234132,"Batch Description 1",15,"1234");
  await supplychain.addBatchTemplate(1827371913,1234132,"Batch Description 1",15,"1234");
  // await supplychain.addBatchTemplate(2817373811,1837183,"Batch Description 2",20,"1234");
                    

  // List of all product templates

  // let array2 =await supplychain.getAllBatchTemplateIDs()
  // for(let i=0;i<array2.length; i++){
  //   let data =await supplychain.BatchTemplateMAP(array2[i]);  
  //   console.log(data);
  // }
                                                                           
  // Add a batch 

  await supplychain.batchProduced(                                      
    1738101,// batchID                                                 
    [16352,173817,17361,173819], // Array of product Ids               
    4,// Batch Size                                                   
    "Batch of 4 Watches",// Batch Description                                        
    1234132,// Product temlplate ID                                    
    "1234",// factoryID     
    "4321",// distributorID
    "Factory location",// factory Location                                   
    "1828171"// dateOfProduction                                         
  )   

  // await supplychain.batchProduced(                                      
  //   1738102,// batchID                                                 
  //   [16353,173814,17362,173812], // Array of product Ids               
  //   4,// Batch Size                                                   
  //   "Batch of 4 Watches",// Batch Description                                        
  //   1234132,// Product temlplate ID                                    
  //   "1234",// factoryID     
  //   "4321",// distributorID
  //   "Factory location",// factory Location                                   
  //   "1828171"// dateOfProduction                                         
  // )   

  // await supplychain.batchProduced(                                      
  //   1738102,// batchID                                                 
  //   [112231,313133,13313,31333,313313,313311], // Array of product Ids               
  //   4,// Batch Size                                                   
  //   "Batch of 6 Jeans",// Batch Description                                        
  //   1837183,// Product temlplate ID                                    
  //   1721,// factory address     
  //   1234,// distributor address
  //   "Factory location",// factory Location                                   
  //   "1223123"// dateOfProduction                                         
  // ) 

  // await supplychain.batchProduced(                                      
  //   1738122,// batchID                                                 
  //   [112231,313133,13313,31333,313313,313311], // Array of product Ids               
  //   4,// Batch Size                                                   
  //   "Batch of 6 Jeans",// Batch Description                                        
  //   1837183,// Product temlplate ID                                    
  //   1721,// factory address     
  //   1234,// distributor address
  //   "Factory location",// factory Location                                   
  //   "1223123"// dateOfProduction                                         
  // ) 

  // await supplychain.batchProduced(                                      
  //   7338122,// batchID                                                 
  //   [112231,313133,13313,31333,313313,313311], // Array of product Ids               
  //   4,// Batch Size                                                   
  //   "Batch of 6 Jeans",// Batch Description                                        
  //   1837183,// Product temlplate ID                                    
  //   1721,// factory address     
  //   1234,// distributor address
  //   "Factory location",// factory Location                                   
  //   "1223123"// dateOfProduction                                         
  // )   


  // To get all Batch IDs

  // let x =await supplychain.getAllBatchIDs()   
  // console.log(x);  
  
  // // To view the list
  
  // for(let i=0; i<x.length; i++){
  //   // For ith Batch
  //   const data =await supplychain.BatchMapping(x[i]);
  //   console.log(data);  
  //   // Product Ids for ith batch
  //   console.log(await supplychain.getProductIdsForaBatch(x[i]));
  // }      
  

  // ----------- For QR code

  // Get batch information by passing batch ID

  // Let batch ID -> 1738101
  // let batchID =1738101
  // console.log(await supplychain.BatchMapping(batchID));  
  // Product Ids for ith batch
  // console.log(await supplychain.getProductIdsForaBatch(batchID))


  // Get all product Ids of a batch 

  // console.log(await supplychain.getProductIdsForaBatch(1738101))

  // Get product information by passing product ID

  // let data =await supplychain.ProductMapping(16352)
  // console.log(data)
  // console.log(await supplychain.ProductTemplateMAP(data.ProductTemplateID));


  //---------------------------- For distributor---------

  // VIEW LIST OF BATCHES THAT FACTORIES HAS SUPPLIED 
  
  // let x =await supplychain.getAllBatchIDs()   
  // console.log(x);  

  // for(let i=0; i<x.length; i++){
  //   // For ith Batch
  //   const data =await supplychain.BatchMapping(x[i])
  //   if(data.DistributorID==4321 && data.State==0){
  //     console.log(data);  
  //     // Product Ids for ith batch
  //     console.log(await supplychain.getProductIdsForaBatch(x[i]));
  //   } 
  // }

  // ----------------------------------Distributor scans the QR code ----------------------

  await supplychain.distributorScansBatch(1738101,"4321");
  // console.log(await supplychain.BatchMapping(1738101));  
  
  // ---------------------------------SELL A BATCH TO A RETAILER-----------------------------
  
  await supplychain.distributorSellToRetailer(1738101,2,"131");
  await supplychain.distributorSellToRetailer(1738101,1,"132");
  // await supplychain.distributorSellToRetailer(1738101,1,"131"); 

  // console.log(await supplychain.getDistributorIDToRetailerStruct("4321"));  
  console.log(await supplychain.getRetailerIDToRetailerStruct("132"));  

  // console.log(await supplychain.ProductMapping(173817));  
  // console.log(await supplychain.ProductMapping(17361));  
  // console.log(await supplychain.ProductMapping(173819));  
  
  
  // VIEW LIST OF BATCHES THAT THIS DISTRIBUTOR HAS SUPPLIED TO THE RETAILERS
  
  // let x =await supplychain.getAllBatchIDs()   
  // console.log(x);  
  
  // for(let i=0; i<x.length; i++){
    //   // For ith Batch
    //   const data =await supplychain.BatchMapping(x[i])
    //   if(data.DistributorID==1234 && data.State==1){
      //       console.log(data);  
      //     // Product Ids for ith batch
  //     let array =await supplychain.getProductIdsForaBatch(x[i]);
  //     console.log(array);
  //   } 
  // }
  
  
  
  // ------------- For Retailer -----------
  
  // Retailer scans the QR code 
  
  // await supplychain.retailerScansProduct(16352,"131");
  // console.log(await supplychain.ProductMapping(16352));  
  

  // -------------------- VIEW ALL THE BATCHES  --------------- 
  
  // let x = await supplychain.getAllBatchIDs()   
  // console.log(x);  
  
  // for(let i=0; i<x.length; i++){ 
  //   const data =await supplychain.BatchMapping(x[i]) 
  //   if(data.RetailerID==4321 && data.State==1){
  //     console.log(data);  
      
  //     let array =await supplychain.getProductIdsForaBatch(x[i]);
  //     console.log(array);
  //     for(let j=0; j<array.length; j++){
  //       console.log(await supplychain.ProductMapping(array[j]));
  //       console.log(array[i]);
  //     }
  //   }  
  // }



  
  // --------------- Retailer sell to customer ----------

  // await supplychain.retailerSellToCustomer(1738101,17361,"5362");


  //------------------------ For Customer  -------------------

  // -------------------- VIEW BATCH BOUGHTS --------------------
  
  // console.log(await supplychain.getAllProductsBought("5362"));

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
