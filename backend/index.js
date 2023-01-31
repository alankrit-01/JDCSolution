const express = require('express');
const ethers = require('ethers');
require('dotenv').config()
const app = express(); 
const contractAbi = require('./artifacts/contracts/Supplychain.sol/Supplychain.json')

let contractAddress ="0xb6D8a3C1962a791338f1C18AfC0B8a78c22671c5"; 
let contract;
app.use(express.json()); 

const connectToMatic = async () => {
  try {    
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const signer = new ethers.Wallet(process.env.PRIVATEKEY, provider);  
    const contractInstance = new ethers.Contract(contractAddress, contractAbi.abi, signer);
    contract =contractInstance;  

    // console.log(await contractInstance.getAllProductTemplateIDs())
    // const tx =await contractInstance.addProductTemplate(1234132,"Tommy Hilfiger Watch","Men Black Analogue Watch Black");
    // const tx =await contractInstance.batchProduced(                                      
    //   1738102,// batchID                                                 
    //   [477172,382172,173722], // Array of product Ids               
    //   3,// Batch Size                                               
    //   "Batch of 3 Jeans",// Batch Description                                        
    //   1234132,// Product temlplate ID                                    
    //   1234,// factoryID     
    //   1235,// distributorID
    //   "My Factory location",// factory Location                             
    //   "1223123"// dateOfProduction                                         
    // )   
    // await tx.wait(); 
    // console.log("Transaction completed!");

  } catch (err) {
    console.log(err);
    throw new Error(err?.message || "Something Went Wrong");
  }
}

connectToMatic();


////////////////// API FOR DISTIBUTOR ////////////////////


app.get('/api/viewReceivedBatchesForDistributor', async (req, res) => {
  try {
    let result=[];          
    const distibutorID= req.query.distibutorID;
    const IDs =await contract.getAllBatchIDs();
    // console.log(IDs);
    for(let i=0; i<IDs.length; i++){ 
      const batchData =await contract.BatchMapping(IDs[i]);
      // console.log(batchData);
      if(batchData.DistributorID==distibutorID && batchData.State==0){
        // const productIDs= (await contract.getProductIdsForaBatch(IDs[i]));
        result.push(
          // "batchID":IDs[i].toNumber(),
          // "productIDs":productIDs ,
          {
            BatchID :batchData[0].toNumber(),
            BatchSize :batchData[1].toNumber(),
            AmountSold :batchData[2].toNumber(),
            BatchDescription :batchData[3],
            ProductTemplateID: batchData[4].toNumber(),
            FactoryID:batchData[5].toNumber(),
            DistributorID:batchData[6].toNumber(),
            RetailerID:batchData[7].toNumber(),
            FactoryLocation:batchData[8],
            DateOfProduction:batchData[9],
            State:batchData[10].toNumber(),
            FactoryScanned:batchData[11], 
            DistributorScanned:batchData[12],   
            RetailerScanned:batchData[13] 
          })
      } 
    }
    if(result){
      res.status(200).json({status:"success", message:result});
    }else {
      res.status(200).json({status:"success", message:"Returned data is empty"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
});

app.post('/api/distributorScansBatch',async(req,res)=>{
  try {
    const batchID =req.body.batchID;
    const distributorID =req.body.distributorID; 
    const tx =await contract.distributorScansBatch(batchID,distributorID);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Distributor scans the batch"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})

app.post('/api/distributorSellToRetailer',async(req,res)=>{
  try {
    const batchID =req.body.batchID;
    const retailerID =req.body.retailerID;
    const tx =await contract.distributorSellToRetailer(batchID,retailerID);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Batch sold to retailer"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})  

app.get('/api/viewBatchesSendToRetailers', async (req, res) => {
  try {
    let result=[];
    const distributorID= req.query.distributorID;
    const IDs =await contract.getAllBatchIDs();

    for(let i=0; i<IDs.length; i++){
      const batchData =await contract.BatchMapping(IDs[i]);
      // console.log(batchData);
      if(batchData.DistributorID==distributorID && batchData.State==1){
        // const productIDs= (await contract.getProductIdsForaBatch(IDs[i]));
        result.push(
          // "batchID":IDs[i].toNumber(),
          // "productIDs":productIDs ,
          {
            BatchID :batchData[0].toNumber(),
            BatchSize :batchData[1].toNumber(),
            AmountSold :batchData[2].toNumber(),
            BatchDescription :batchData[3],
            ProductTemplateID: batchData[4].toNumber(),
            FactoryID:batchData[5].toNumber(),
            DistributorID:batchData[6].toNumber(),
            RetailerID:batchData[7].toNumber(),
            FactoryLocation:batchData[8],
            DateOfProduction:batchData[9],
            State:batchData[10].toNumber(),
            FactoryScanned:batchData[11], 
            DistributorScanned:batchData[12],   
            RetailerScanned:batchData[13] 
          })
      } 
    }
    if(result){
      res.status(200).json({status:"success", message:result});
    }else {
      res.status(200).json({status:"success", message:"Returned data is empty"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
});



////////////////// API FOR RETAILER ////////////////////


app.get('/api/viewReceivedBatchesForRetailer', async (req, res) => {
  try {
    let result=[];
    const retailerID= req.query.retailerID;
    const IDs =await contract.getAllBatchIDs();
    for(let i=0; i<IDs.length; i++){
      const batchData =await contract.BatchMapping(IDs[i]);
      if(batchData.RetailerID==retailerID && batchData.State==1){
        // let productInfo=[]; 
        // const productIDs= await contract.getProductIdsForaBatch(IDs[i]);
        // for(let j=0; j<productIDs.length; j++){
        //   productInfo.push(await contract.ProductMapping(productIDs[j]));
        // }
        // console.log(productInfo[0]);
        result.push(
          // "batchID":IDs[i].toNumber(),
          // "productIDs":productIDs ,
          {
            BatchID :batchData[0].toNumber(),
            BatchSize :batchData[1].toNumber(),
            AmountSold :batchData[2].toNumber(),
            BatchDescription :batchData[3],
            ProductTemplateID: batchData[4].toNumber(),
            FactoryID:batchData[5].toNumber(),
            DistributorID:batchData[6].toNumber(),
            RetailerID:batchData[7].toNumber(),
            FactoryLocation:batchData[8],
            DateOfProduction:batchData[9],
            State:batchData[10].toNumber(),
            FactoryScanned:batchData[11], 
            DistributorScanned:batchData[12],   
            RetailerScanned:batchData[13] 
          }
          // "productInfo":productInfo
        )
      } 
    }
    if(result){
      res.status(200).json({status:"success", message:result});
    }else {
      res.status(200).json({status:"success", message:"Returned data is empty"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});


app.post('/api/retailerScansBatch',async(req,res)=>{
  try {
    const batchID =req.body.batchID; 
    const retailerID =req.body.retailerID; 

    const tx =await contract.retailerScansBatch(batchID,retailerID);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Retailer scans the batch"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})

app.get('/api/viewBatchDetails', async (req, res) => {
  try {
    let result=[];
    const batchID= req.query.batchID;
    const batchData =await contract.BatchMapping(batchID);
    // console.log(batchData);
    result.push( 
      {
        BatchID :batchData[0].toNumber(),
        BatchSize :batchData[1].toNumber(),
        AmountSold :batchData[2].toNumber(),
        BatchDescription :batchData[3],
        ProductTemplateID: batchData[4].toNumber(),
        FactoryID:batchData[5].toNumber(),
        DistributorID:batchData[6].toNumber(),
        RetailerID:batchData[7].toNumber(),
        FactoryLocation:batchData[8],
        DateOfProduction:batchData[9],
        State:batchData[10].toNumber(),
        FactoryScanned:batchData[11], 
        DistributorScanned:batchData[12],   
        RetailerScanned:batchData[13] 
      }
    )
    const IDs =await contract.getProductIdsForaBatch(batchID);
    for(let i=0; i<IDs.length; i++){
      const productData =await contract.ProductMapping(IDs[i]);
      console.log(productData);
    }
    // result.push() 
    if(result){
      res.status(200).json({status:"success", message:result});
    }else {
      res.status(200).json({status:"success", message:"Returned data is empty"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});   


app.post('/api/sellToCustomer',async(req,res)=>{
  try {
    const batchID =req.body.batchID;
    const productID =req.body.productID;
    const customerID =req.body.customerID;
    const tx =await contract.retailerSellToCustomer(batchID,productID,customerID);
    tx.wait();

    res.status(200).json({status:"success", message:"Product sold to customer"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})

////////////////// API FOR CUSTOMERS ////////////////////

app.get('/api/viewProductBoughts', async (req, res) => {
  try {
    let result=[];
    let customerID= req.query.customerID;
    let data =await contract.getAllProductsBought(customerID);

    for(let i=0; i<data.length; i++){       
      const batchData =await contract.BatchMapping(data[i][0]);
      const productData =await contract.ProductMapping(data[i][1]);
      // console.log(productData[0]);
      // console.log(batchData); 
      result.push({
        "productData":{
          ProductID:productData[0].toNumber(),
          BatchID:productData[1].toNumber(),
          ProductTemplateID:productData[2].toNumber(),
          DOM:productData[3],
          CustomerID:productData[4].toNumber(),
          DateWhenSold:productData[5].toNumber()
        },
        "batchData":{
          BatchID :batchData[0].toNumber(),
          BatchSize :batchData[1].toNumber(),
          AmountSold :batchData[2].toNumber(),
          BatchDescription :batchData[3],
          ProductTemplateID: batchData[4].toNumber(),
          FactoryID:batchData[5].toNumber(),
          DistributorID:batchData[6].toNumber(),
          RetailerID:batchData[7].toNumber(),
          FactoryLocation:batchData[8],
          DateOfProduction:batchData[9],
          State:batchData[10].toNumber(),
          FactoryScanned:batchData[11], 
          DistributorScanned:batchData[12],   
          RetailerScanned:batchData[13] 
        }});  
    }

    if(result){
      res.status(200).json({status:"success", message:result});
    }else {
      res.status(200).json({status:"success", message:"Returned data is empty"});
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});  

app.get('/api/authenticateProduct',async(req,res)=>{
  try {
    let productID= req.query.productID;
    let data = await contract.ProductMapping(productID);
    let batchID;
    batchID =data[1].toNumber();
    let data2 =await contract.BatchMapping(batchID);

    // Level 1 

    if(batchID==0){
      res.status(200).json({status:"success", message:"Authentication Level 1 Falied: Product ID not found"}); 
    }
    // Level 2
    
    else if(data2.FactoryScanned ==false){
      res.status(200).json({status:"success", message:"Authentication Level 2 Falied: Factory didn't scanned this product"});
    }
    // Level 3
    
    else if(data2.DistributorScanned ==false){
      res.status(200).json({status:"success", message:"Authentication Level 3 Falied: Distributor didn't scanned this product"});
    }
    // Level 4
    
    else if(data2.RetailerScanned ==false){
      res.status(200).json({status:"success", message:"Authentication Level 4 Falied: Retailer didn't scanned this product"});
    }

    else{
      res.status(200).json({status:"success", message:"All Authentication Level Passed"});
    }

    // if(result){
    //   res.status(200).json({status:"success", message:});
    // }else {
    //   res.status(200).json({status:"success", message:"Returned data is empty"});
    // }
    
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})


app.get('/', function (req, res) {
    // console.log(web3)
    res.send('Hello World');
})
 
var server = app.listen(8082, function () {
    console.log("Example app listening at http://127:0:0:1:8082")
})


