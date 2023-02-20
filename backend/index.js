const express = require('express');
const cors = require('cors');
const ethers = require('ethers');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const mongoose = require('mongoose');
const multer = require('multer');
var util = require('util');
var encoder = new util.TextEncoder('utf-8');
const verificationData = require('./models/verificationData');

require('dotenv').config()
const app = express(); 

const contractAbi = require('./artifacts/contracts/Supplychain.sol/Supplychain.json')

let contractAddress ="0x9a9dD6be8b0bC5eC17FA5c548411862eEEfdB150"; 
let contract;
app.use(express.json()); 
app.use(cors());

const connectToMatic = async () => {
  try {    
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const signer = new ethers.Wallet(process.env.PRIVATEKEY, provider);  
    const contractInstance = new ethers.Contract(contractAddress, contractAbi.abi, signer);
    contract =contractInstance;  

    // console.log(await contractInstance.getAllProductTemplateIDs())
    // const tx =await contractInstance.addProductTemplate(1234132,"Tommy Hilfiger Watch","Men Black Analogue Watch Black");
    // const tx =await contractInstance.batchProduced(                                      
    //   1738105,// batchID                                                 
    //   [477175,382175,173725], // Array of product Ids               
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


////////////////// API FOR FACTORY ///////////////////////

app.post('/api/factoryAddProductTemplate',async(req,res)=>{
  try {
    const productTemplateID =req.body.productTemplateID;
    const productName =req.body.productName;
    const productDescription =req.body.productDescription; 
    const factoryID =req.body.factoryID; 
    const tx =await contract.addProductTemplate(productTemplateID,productName,productDescription,factoryID);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Product template added"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
})    

app.get('/api/viewListOfProductTemplates', async (req, res) => {
  console.log('sdsd')
  try {
    let result=[];          
    const factoryID= req.query.factoryID;
    let array =await contract.getAllProductTemplateIDs()
    // console.log(array)
    for(let i=0;i<array.length; i++){
      let data =await contract.ProductTemplateMAP(array[i]);  
      if(data.FactoryID==factoryID){
        // console.log(data);   
        result.push({
          ProductTemplateID :data[0].toNumber(),
          Name :data[1],
          Description :data[2],
          FactoryID :data[3], 
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

app.post('/api/factoryAddBatchTemplate',async(req,res)=>{
  try {
    const batchTemplateID =req.body.batchTemplateID;
    const productTemplateID =req.body.productTemplateID;
    const batchDescription =req.body.batchDescription; 
    const batchSize =req.body.batchSize;
    const factoryID =req.body.factoryID; 
    const tx =await contract.addBatchTemplate(batchTemplateID,productTemplateID,batchDescription,batchSize,factoryID);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Batch template added"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
})   

app.get('/api/viewListOfBatchTemplates', async (req, res) => {
  try {
    let result=[];          
    const factoryID= req.query.factoryID;
    let array =await contract.getAllBatchTemplateIDs()
    // console.log(array)
    for(let i=0;i<array.length; i++){
      let data =await contract.BatchTemplateMAP(array[i]);  
      if(data.FactoryID==factoryID){
        // console.log(data);   
        result.push({
          BatchTemplateID:data[0].toNumber(),
          ProductTemplateID :data[1].toNumber(),
          Description :data[2],
          BatchSize :data[3].toNumber(),
          FactoryID :data[4], 
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

app.post('/api/factoryAddBatch',async(req,res)=>{
  try {
    const batchID =req.body.batchID;
    const productIDs =req.body.productIDs;
    const batchSize =req.body.batchSize;
    const batchDescription =req.body.batchDescription; 
    const productTemplateID =req.body.productTemplateID;
    const factoryID =req.body.factoryID; 
    const distributorID =req.body.distributorID; 
    const factoryLocation =req.body.factoryLocation; 
    const dataOfProduction =req.body.dataOfProduction; 

    const tx =await contract.batchProduced(batchID,productIDs,batchSize,batchDescription,productTemplateID,factoryID,distributorID,factoryLocation,dataOfProduction);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Factory adds a batch"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
})   

app.get('/api/viewListOfBatchesProducedByFactory', async (req, res) => {
  try {
    let result=[];          
    const factoryID= req.query.factoryID;
    let array =await contract.getAllBatchIDs()

    for(let i=0;i<array.length; i++){
      const batchData =await contract.BatchMapping(array[i]);
      if(batchData.FactoryID==factoryID){
        let productTemplateData =await contract.ProductTemplateMAP(batchData[4]);

        result.push({
          BatchID :batchData[0].toNumber(),
          BatchSize :batchData[1].toNumber(),
          AmountSoldTOCustomer :batchData[2].toNumber(),
          BatchDescription :batchData[3],
          Name: productTemplateData[1],
          Description: productTemplateData[2],
          FactoryID:batchData[5],
          DistributorID:batchData[6],
          FactoryLocation:batchData[7],
          DateOfProduction:batchData[8],
          State:batchData[9].toNumber(),
          DistributorScanned:batchData[10], 
          DistributorScannedTimeStamp :batchData[11],       
          AmountLeftForSellingTORetailer:batchData[12].toNumber() 
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

app.get('/api/viewBatchRecordByBatchId', async (req, res) => {
  try {
    let result=[];          
    const batchID= req.query.batchID;
    // console.log(array) 
    const batchData =await contract.BatchMapping(batchID);
    let productInfo=[]; 
    const productIDs =await contract.getProductIdsForaBatch(batchID);
    let productTemplateData =await contract.ProductTemplateMAP(batchData[4])

    for(let j=0; j<productIDs.length; j++){
      let productData =await contract.ProductMapping(productIDs[j])
    
      productInfo.push({
        ProductID: productData[0].toNumber(),
        BatchID:productData[1].toNumber(), 
        ProductTemplateID:productData[2].toNumber(),
        DOM:productData[3],
        CustomerID:productData[4], 
        RetailerID:productData[5],     
        RetailerScanned:productData[6],    
        RetailerScannedTimeStamp:productData[7],    
        DateWhenSoldToRetailer:productData[8],
        DateWhenSoldToCustomer:productData[9]
      });
    }
      // console.log(productIDs);
    result.push({
      BatchID :batchData[0].toNumber(),
      BatchSize :batchData[1].toNumber(),
      AmountSoldTOCustomer :batchData[2].toNumber(),
      BatchDescription :batchData[3],
      Name: productTemplateData[1],
      Description: productTemplateData[2],
      FactoryID:batchData[5],
      DistributorID:batchData[6],
      FactoryLocation:batchData[7],
      DateOfProduction:batchData[8],
      State:batchData[9].toNumber(),
      DistributorScanned:batchData[10], 
      DistributorScannedTimeStamp :batchData[11],       
      AmountLeftForSellingTORetailer:batchData[12].toNumber() 
    },{productInfo}) 


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
      if(batchData.DistributorID==distibutorID){
        // const productIDs= (await contract.getProductIdsForaBatch(IDs[i]));
        let productTemplateData =await contract.ProductTemplateMAP(batchData[4])

        result.push(
          // "batchID":IDs[i].toNumber(),
          // "productIDs":productIDs , 
          {
            BatchID :batchData[0].toNumber(),
            BatchSize :batchData[1].toNumber(),
            AmountSoldTOCustomer :batchData[2].toNumber(),
            BatchDescription :batchData[3],
            Name: productTemplateData[1],
            Description: productTemplateData[2],
            FactoryID:batchData[5],
            DistributorID:batchData[6],
            FactoryLocation:batchData[7],
            DateOfProduction:batchData[8],
            State:batchData[9].toNumber(),
            DistributorScanned:batchData[10], 
            DistributorScannedTimeStamp :batchData[11],       
            AmountLeftForSellingTORetailer:batchData[12].toNumber() 
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
    const timeStamp =req.body.timeStamp; 
    const tx =await contract.distributorScansBatch(batchID,distributorID,timeStamp);
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
    const quantity =req.body.quantity;
    const retailerID =req.body.retailerID;
    const timeStamp =req.body.timeStamp; 

    const tx =await contract.distributorSellToRetailer(batchID,quantity,retailerID,timeStamp);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Products sold to the retailer"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})  

app.get('/api/viewRecentSellsToRetailers', async (req, res) => {
  try {
    let result=[];
    const distributorID= req.query.distributorID;
    const data =await contract.getDistributorIDToRetailerStruct(distributorID); 
  
    // console.log(data);
    for(let i=0; i<data.length;i++){
      const Batchdata =await contract.BatchMapping(data[i][2]); 
      result.push({
        DistributorID:data[i][0],     
        RetailerID:data[i][1],
        BatchID:data[i][2].toNumber(),
        Quantity:data[i][3].toNumber(),
        TimeStamp:data[i][4],
        ProductDescription:Batchdata[3]
      }) 
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


app.get('/api/viewRecentBuysFromDistributors', async (req, res) => {
  try {
    let result=[];
    const retailerID= req.query.retailerID;
    const data =await contract.getRetailerIDToRetailerStruct(retailerID); 
    // console.log(data);
    for(let i=0; i<data.length;i++){
      const Batchdata =await contract.BatchMapping(data[i][2]); 
      // console.log(Batchdata);
      result.push({
        DistributorID:data[i][0],     
        RetailerID:data[i][1],
        BatchID:data[i][2].toNumber(),
        Quantity:data[i][3].toNumber(),
        TimeStamp:data[i][4],
        ProductDescription:Batchdata[3]
      }) 
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


app.post('/api/retailerScansProduct',async(req,res)=>{
  try {
    const productID =req.body.productID; 
    const retailerID =req.body.retailerID; 
    const timeStamp =req.body.timeStamp; 

    const tx =await contract.retailerScansProduct(productID,retailerID,timeStamp);
    tx.wait();
    console.log("Transaction completed!");

    res.status(200).json({status:"success", message:"Retailer scans the product"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})

app.get('/api/viewBatchDetails', async (req, res) => {
  try {
    let result=[];
    const batchID= req.query.batchID;
    // const batchData =await contract.BatchMapping(batchID);
    // console.log(batchData);
    // result.push( 
    //   {
    //     BatchID :batchData[0].toNumber(),
    //     BatchSize :batchData[1].toNumber(),
    //     AmountSoldTOCustomer :batchData[2].toNumber(),
    //     BatchDescription :batchData[3],
    //     ProductTemplateID: batchData[4].toNumber(),
    //     FactoryID:batchData[5],
    //     DistributorID:batchData[6],
    //     FactoryLocation:batchData[7],
    //     DateOfProduction:batchData[8],
    //     State:batchData[9].toNumber(),
    //     FactoryScanned:batchData[10], 
    //     DistributorScanned:batchData[11], 
    //     AmountSoldTORetailer:batchData[12].toNumber() 
        
    //   }
    // )
    let productInfo=[]; 
    const productIDs =await contract.getProductIdsForaBatch(batchID);
    for(let j=0; j<productIDs.length; j++){
      let productData =await contract.ProductMapping(productIDs[j])
      productInfo.push({
        ProductID: productData[0].toNumber(),
        BatchID:productData[1].toNumber(), 
        ProductTemplateID:productData[2].toNumber(),
        DOM:productData[3],
        OwnerID:productData[4], 
        RetailerID:productData[5],     
        RetailerScanned:productData[6],    
        RetailerScannedTimeStamp:productData[7],    
        DateWhenSoldToRetailer:productData[8],
        DateWhenSoldToCustomer:productData[9]
      });
    }

    if(productInfo){
      res.status(200).json({status:"success", message:productInfo});
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
    const timeStamp =req.body.timeStamp; 

    const tx =await contract.retailerSellToCustomer(batchID,productID,customerID,timeStamp);
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
      let productTemplateData =await contract.ProductTemplateMAP(batchData[4])

      // console.log(productData[0]);
      // console.log(batchData); 
      result.push({
        "productData":{
          ProductID: productData[0].toNumber(),
          BatchID:productData[1].toNumber(), 
          ProductTemplateID:productData[2].toNumber(),
          DOM:productData[3],
          OwnerID:productData[4], 
          RetailerID:productData[5],     
          RetailerScanned:productData[6],    
          RetailerScannedTimeStamp:productData[7],    
          DateWhenSoldToRetailer:productData[8],
          DateWhenSoldToCustomer:productData[9]
        },
        "batchData":{
          BatchID :batchData[0].toNumber(),
          BatchSize :batchData[1].toNumber(),
          AmountSoldTOCustomer :batchData[2].toNumber(),
          BatchDescription :batchData[3],
          Name: productTemplateData[1],
          Description: productTemplateData[2],
          FactoryID:batchData[5],
          DistributorID:batchData[6],
          FactoryLocation:batchData[7],
          DateOfProduction:batchData[8],
          State:batchData[9].toNumber(),
          DistributorScanned:batchData[10], 
          DistributorScannedTimeStamp :batchData[11],       
          AmountLeftForSellingTORetailer:batchData[12].toNumber() 
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
    let batchID =data[1].toNumber(); 
    let data2 =await contract.BatchMapping(batchID);
    let level;
    let status;
    // Level 1 

    if(batchID==0){
      level =1;
      status ="Authentication Level 1 Falied: Product ID not found";
    }else if(data2.DistributorScanned ==false){
      level =2;
      status ="Authentication Level 2 Falied: Distributor didn't scanned this product";
    }else if(data.RetailerScanned ==false){
      level =3;
      status ="Authentication Level 3 Falied: Retailer didn't scanned this product"
    }else{
      level =4;
      status ="All Authentication Level Passed"
    } 

    const Data= new verificationData({
      _id: new mongoose.Types.ObjectId(),
      factoryID:data2.FactoryID,
      distributorID:data2.DistributorID,
      batchDescription:data2.BatchDescription,
      batchID:batchID,
      productId:productID,
      level:1
    })
    Data.save().then((result) => {
      console.log(result);
      res.status(200).json({status:"success", message:status,level:level}); 

    }).catch((err) => console.warn(err)) 

  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})


/////////////////////////////// ADMIN APIS //////////////////////////////////////////


app.get('/api/viewLevelCounts', async (req, res) => {
  try {
    // verificationData.find({ $and : [{factoryID:factoryID},{level:level}]}).then((data) => {
    verificationData.find().then((data) => {
      console.log(data);
      res.status(200).json(data)
    })

  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

app.get('/api/viewProductIDsInBatch', async (req, res) => {
  try {
    let batchID= req.query.batchID;
    let data = await contract.getProductIdsForaBatch(batchID);
    let result =data.map(ID=>ID.toNumber())
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


app.get('/', function (req, res) {
    // console.log(web3)
    res.send('Hello World');
})
 
var server = app.listen(8082, function () {
    console.log("Example app listening at http://127:0:0:1:8082")
})

