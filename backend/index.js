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
const productTemplate = require('./models/productTemplate'); 
const batchTemplate = require('./models/batchTemplate'); 
const batch = require('./models/batch'); 
const fraudScan = require('./models/fraudScan'); 
const User = require('./models/users');

require('dotenv').config() 
const app = express();      


mongoose.connect('mongodb+srv://vipin:ldOGGLOXWNcP6OjK@cluster0.y8ufn.mongodb.net/nodedatabase?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.warn("Connected");
    }) 

optionSuccessStatus:200
const contractAbi = require('./artifacts/contracts/Supplychain.sol/Supplychain.json')

let contractAddress ="0x0b440C24Fa3844Cb0067a4702Ce6b961023e1A6b"; 
let contract;
app.use(express.json()); 
app.use(cors());

const connectToMatic = async () => {
  try {    
    const provider = new ethers.providers.JsonRpcProvider("https://rpc-mumbai.maticvigil.com");
    const signer = new ethers.Wallet(process.env.PRIVATEKEY, provider);  
    const contractInstance = new ethers.Contract(contractAddress, contractAbi.abi, signer);
    contract =contractInstance;  
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

    const Data= new productTemplate({
      _id: new mongoose.Types.ObjectId(),
      ProductTemplateID:productTemplateID,
      Name:productName,
      Description:productDescription,
      FactoryID:factoryID,
    })

    Data.save().then((result) => {
      console.log(result);
      // res.status(200).json({status:"success",}); 
      // res.status(400).send({ error: error.message });
    }).catch((err) => console.warn(err)) 

    res.status(200).json({status:"success", message:"Product template added"});
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
})    


app.get('/api/viewListOfProductTemplates', async (req, res) => {
  try { 
    let result=[];
    const factoryID= req.query.factoryID;
    productTemplate.find().then((array) => {
      for(let i=0;i<array.length; i++){
        data =array[i];
        if(data.FactoryID==factoryID){
          result.push({
            ProductTemplateID :data.ProductTemplateID,
            Name :data.Name,
            Description :data.Description,
            FactoryID :data.FactoryID, 
          })
        } 
      }  
      res.status(200).json({status:"success", message:result});
    }).catch((error) => {
      console.log(error);
      res.status(200).json({status:"success", message:"Returned data is empty"});
    })
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

    const Data= new batchTemplate({
      _id: new mongoose.Types.ObjectId(),
      BatchTemplateID:batchTemplateID,
      ProductTemplateID:productTemplateID,
      Description:batchDescription,
      BatchSize:batchSize,
      FactoryID:factoryID
    })

    Data.save().then((result) => {
      console.log(result);
      // res.status(200).json({status:"success",}); 
      // res.status(400).send({ error: error.message });
    }).catch((err) => console.warn(err)) 

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
    batchTemplate.find().then((array) => {
      for(let i=0;i<array.length; i++){
        data =array[i];
        if(data.FactoryID==factoryID){
          result.push({
            BatchTemplateID :data.BatchTemplateID,
            ProductTemplateID :data.ProductTemplateID,
            Description :data.Description,
            BatchSize :data.BatchSize, 
            FactoryID: data.FactoryID
          })
        } 
      }  
      res.status(200).json({status:"success", message:result});
    }).catch((error) => {
      console.log(error);
      res.status(200).json({status:"success", message:"Returned data is empty"});
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

app.post('/api/factoryAddBatch',async(req,res)=>{
  try {
    const batchID =req.body.batchID;
    const companyBatchID =req.body.companyBatchID;
    const productIDs =req.body.productIDs;
    const companyProductIDs =req.body.companyProductIDs;
    const batchSize =req.body.batchSize;
    const batchDescription =req.body.batchDescription; 
    const productTemplateID =req.body.productTemplateID;
    const factoryID =req.body.factoryID; 
    const distributorID =req.body.distributorID; 
    const factoryLocation =req.body.factoryLocation; 
    const dateOfProduction =req.body.dateOfProduction; 

    const tx =await contract.batchProduced(batchID,companyBatchID,productIDs,companyProductIDs,batchSize,batchDescription,productTemplateID,factoryID,distributorID,factoryLocation,dateOfProduction);
    tx.wait();
    console.log("Transaction completed!");

    const Data= new batch({
      _id: new mongoose.Types.ObjectId(),
      BatchID:batchID,     
      BatchSize:batchSize,  
      AmountSoldTOCustomer:0,  
      BatchDescription:batchDescription,     
      ProductTemplateID:productTemplateID,    
      FactoryID:factoryID,
      DistributorID:distributorID,
      FactoryLocation:factoryLocation,
      DateOfProduction:dateOfProduction,
      State: 0,
      DistributorScanned: false,
      DistributorScannedTimeStamp: "",
      AmountLeftForSellingTORetailer:batchSize,
      CompanyBatchID:companyBatchID
    })

    Data.save().then((result) => {
      console.log(result);
      // res.status(200).json({status:"success",}); 
      // res.status(400).send({ error: error.message });
    }).catch((err) => console.warn(err)) 

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
    batch.find().then((array) => {
      for(let i=0;i<array.length; i++){
        batchData =array[i];
        if(batchData.FactoryID==factoryID){
          result.push({
            BatchID :batchData.BatchID,
            BatchSize :batchData.BatchSize,
            AmountSoldTOCustomer :batchData.AmountSoldTOCustomer,
            BatchDescription :batchData.BatchDescription,
            Name: batchData.Name,
            Description: batchData.Description,
            FactoryID:batchData.FactoryID,
            DistributorID:batchData.DistributorID,
            FactoryLocation:batchData.FactoryLocation,
            DateOfProduction:batchData.DateOfProduction,
            State:batchData.State,
            DistributorScanned:batchData.DistributorScanned, 
            DistributorScannedTimeStamp :batchData.DistributorScannedTimeStamp,      
            AmountLeftForSellingTORetailer:batchData.AmountLeftForSellingTORetailer, 
            CompanyBatchID:batchData.CompanyBatchID
          })
        } 
      }  
      res.status(200).json({status:"success", message:result});
    }).catch((error) => {
      console.log(error);
      res.status(200).json({status:"success", message:"Returned data is empty"});
    })
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
        CompanyProductID: productData[1].toNumber(),
        BatchID:productData[2].toNumber(), 
        ProductTemplateID:productData[3].toNumber(),
        DOM:productData[4],
        CustomerID:productData[5], 
        RetailerID:productData[6],     
        RetailerScanned:productData[7],    
        RetailerScannedTimeStamp:productData[8],
        DateWhenSoldToRetailer:productData[9],
        DateWhenSoldToCustomer:productData[10],
        RetailerLatitude:productData[11],
        RetailerLongitude:productData[12],
        CustomerName:productData[13],
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
        AmountLeftForSellingTORetailer:batchData[12].toNumber(),  
        CompanyBatchID:batchData[13].toNumber()  
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
        let productTemplateData =await contract.ProductTemplateMAP(batchData[4])

        result.push(
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
    const isValid =req.body.isValid; 
    const latitude =req.body.latitude; 
    const longitude =req.body.longitude; 
    const location =req.body.location; 
    const sepration_distance =req.body.sepration_distance; 

    if (isValid==true){
      const tx =await contract.distributorScansBatch(batchID,distributorID,timeStamp);
      tx.wait();
      console.log("Transaction completed!");
  
      res.status(200).json({status:"success", message:"Distributor scans the batch"});
    } else if(isValid==false){  

      User.findById(distributorID, (err, user) => {
        if (err) {
          console.error(err);
          } else {
          const Data= new fraudScan({
            _id: new mongoose.Types.ObjectId(),
            isDistributor:true,
            distributorID:distributorID,
            isRetailer:false,
            RetailerID:"",
            batchID:batchID,
            productId:0,
            timestamp:timeStamp,
            currentLatitude:latitude,
            currentLongitude:longitude,
            currentLocation:location,
            Name:user.name,
            Email:user.email,
            orignalLocation:(user.address + " " + user.city +  " " + user.country),
            distanceSeprated:sepration_distance,
          })
          Data.save().then((result) => {
            // console.log(result);
            res.status(200).json({status:"success", message:"Incorrect scan location fraud detected"}) 
    
          }).catch((err) => console.warn(err)) 
        } 
      });

    }
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

    const batchData =await contract.BatchMapping(batchID);
    if(batchData.DistributorScanned==true){
      const tx =await contract.distributorSellToRetailer(batchID,quantity,retailerID,timeStamp);
      tx.wait();
      console.log("Transaction completed!");
  
      res.status(200).json({status:"success", message:"Products sold to the retailer"});
    }else{
      res.status(200).json({status:"failure", message:"Distributor haven't scanned the batch yet"});
    }

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
    const isValid =req.body.isValid; 
    const latitude =req.body.latitude; 
    const longitude =req.body.longitude; 
    const location =req.body.location; 
    const sepration_distance =req.body.sepration_distance; 


    if(isValid==true){
      const tx =await contract.retailerScansProduct(productID,retailerID,timeStamp,latitude,longitude);
      tx.wait();
      console.log("Transaction completed!"); 
      res.status(200).json({status:"success", message:"Retailer scans the product"});

    }else if(isValid==false){

      User.findById(retailerID, (err, user) => {
        if (err) {
          console.error(err);
          } else {
          const Data= new fraudScan({
            _id: new mongoose.Types.ObjectId(),
            isDistributor:false,
            distributorID:"",
            isRetailer:true,
            RetailerID:retailerID,
            batchID:0,
            productId:productID,
            timestamp:timeStamp,
            currentLatitude:latitude,
            currentLongitude:longitude,
            currentLocation:location,
            Name:user.name,
            Email:user.email,
            orignalLocation:(user.address + " " + user.city +  " " + user.country),
            distanceSeprated:sepration_distance,
          })
          Data.save().then((result) => {
            // console.log(result);
            res.status(200).json({status:"success", message:"Incorrect scan location fraud detected"}) 
    
          }).catch((err) => console.warn(err)) 
        } 
      });

    }
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})

app.get('/api/viewBatchDetails', async (req, res) => {
  try {
    let result=[];
    const batchID= req.query.batchID;
    let productInfo=[]; 
    const productIDs =await contract.getProductIdsForaBatch(batchID);
    for(let j=0; j<productIDs.length; j++){
      let productData =await contract.ProductMapping(productIDs[j])
      productInfo.push({
        ProductID: productData[0].toNumber(),
        CompanyProductID: productData[1].toNumber(),
        BatchID:productData[2].toNumber(), 
        ProductTemplateID:productData[3].toNumber(),
        DOM:productData[4],
        CustomerID:productData[5], 
        RetailerID:productData[6],     
        RetailerScanned:productData[7],    
        RetailerScannedTimeStamp:productData[8],
        DateWhenSoldToRetailer:productData[9],
        DateWhenSoldToCustomer:productData[10],
        RetailerLatitude:productData[11],
        RetailerLongitude:productData[12],
        CustomerName:productData[13]
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
    const customerName =req.body.customerName; 


    const productData =await contract.ProductMapping(productID);
    if(productData.RetailerScanned==true){
      const tx =await contract.retailerSellToCustomer(batchID,productID,customerID,customerName,timeStamp);
      tx.wait();
      console.log("Transaction completed!");
      res.status(200).json({status:"success", message:"Product sold to customer"});

    }else{
      res.status(200).json({status:"failure", message:"Retailer haven't scanned this product yet"});
    }

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
          CompanyProductID: productData[1].toNumber(),
          BatchID:productData[2].toNumber(), 
          ProductTemplateID:productData[3].toNumber(),
          DOM:productData[4],
          CustomerID:productData[5], 
          RetailerID:productData[6],     
          RetailerScanned:productData[7],    
          RetailerScannedTimeStamp:productData[8],
          DateWhenSoldToRetailer:productData[9],
          DateWhenSoldToCustomer:productData[10],
          RetailerLatitude:productData[11],
          RetailerLongitude:productData[12],
          CustomerName:productData[13]
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
          AmountLeftForSellingTORetailer:batchData[12].toNumber(),  
          CompanyBatchID:batchData[13].toNumber()
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
    let latitude= req.query.latitude; 
    let longitude= req.query.longitude; 
    let data = await contract.ProductMapping(productID);
    let batchID =data[2].toNumber(); 
    let data2 =await contract.BatchMapping(batchID);  

    let level;  
    let status;  

    lat1=data.RetailerLatitude
    lon1=data.RetailerLongitude

    var R = 6371; 
    var dLat = (latitude-lat1) * Math.PI / 180;
    var dLon = (longitude-lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180 ) * Math.cos(latitude * Math.PI / 180 ) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    console.log(d)

    if(batchID==0){
      level =1;
      status ="Authentication Level 1 Falied: Product ID not found";
    }else if(data2.DistributorScanned ==false){
      level =2;
      status ="Authentication Level 2 Falied: Distributor didn't scanned this product";
    }else if(data.RetailerScanned ==false){
      level =3;
      status ="Authentication Level 3 Falied: Retailer didn't scanned this product"
    }else if(d>0.100){
      level =4;
      status ="Authentication Level 4 Falied: Consumer location dosen't match retailer location"
    }else if(data.CustomerID!=""){
      level =5;
      status ="Authentication Level 5 Falied: This product is alredy sold"
    }else{ 
      level =6;
      status ="All Authentication Level Passed"
    } 

    const Data= new verificationData({
      _id: new mongoose.Types.ObjectId(),
      factoryID:data2.FactoryID,
      distributorID:data2.DistributorID,
      batchDescription:data2.BatchDescription,
      batchID:batchID,
      productId:productID,
      level:level
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

app.get('/api/getFraudScans', function (req, res) {
  try {
    fraudScan.find().then((data) => {
      // console.log(data);
      res.status(200).json(data)
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
}) 


app.get('/api/viewLevelCounts', async (req, res) => {
  try {
    // verificationData.find({ $and : [{factoryID:factoryID},{level:level}]}).then((data) => {
    verificationData.find().then((data) => {
      // console.log(data);
      res.status(200).json(data)
    })
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


