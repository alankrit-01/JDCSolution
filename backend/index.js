const express = require('express');
const multer = require('multer');
const app = express();     
var util = require('util'); 
var encoder = new util.TextEncoder('utf-8');
const mongoose = require('mongoose'); 


var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const cors = require('cors');
var nodemailer = require('nodemailer');
jwtkey = "jwt"; 
const ethers = require('ethers'); 
const MongoClient = require('mongodb').MongoClient;
const verificationData = require('./models/verificationData'); 
const productTemplate = require('./models/productTemplate'); 
const batchTemplate = require('./models/batchTemplate'); 
const batch = require('./models/batch'); 
const product = require('./models/product'); 
const globalID = require('./models/globalID'); 
const fraudScan = require('./models/fraudScan'); 
const distributorRetailer = require('./models/distributorRetailer'); 
const customerData = require('./models/customerData'); 
const Rateus = require('./models/rateus');
const User = require('./models/users');
const Consumer = require('./models/consumers');
const Factory = require('./models/factories');
const ScanIssueReport = require('./models/scanIssueReport');
const { collection } = require('./models/users');

app.use(express.json()); 
app.use(cors());
require('dotenv').config()  

MONGO_URL="mongodb+srv://vipin:vipinrichmint@cluster0.y8ufn.mongodb.net/nodedatabase?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("Connected"));

// optionSuccessStatus:200
// const contractAbi = require('./artifacts/contracts/Supplychain.sol/Supplychain.json')

let contractAddress ="0xE665a612751795B8FD61F65b44AE5b0426715deA";  
let contract; 
  

const connectToMatic = async () => {
  optionSuccessStatus:200
  const contractAbi = require('./artifacts/contracts/Supplychain.sol/Supplychain.json')
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

const connectToMongoDB = async () => {
  try {    
    let client = await MongoClient.connect(MONGO_URL);
    let db = client.db();
    let session = client.startSession();
    let transactionOptions = {
      readPreference: 'primary',
      readConcern: { level: 'snapshot' },
      writeConcern: { w: 'majority' }
    };
    return {client,session,transactionOptions}
  } catch (err) {
    console.log(err);
    throw new Error(err?.message || "Something Went Wrong");
  }
}


////////////////// API FOR FACTORY ///////////////////////


app.post('/api/factoryAddProductTemplate',async(req,res)=>{
  const productTemplateID =req.body.productTemplateID;
  const productName =req.body.productName;
  const productDescription =req.body.productDescription; 
  const factoryID =req.body.factoryID; 

  let {client,session,transactionOptions} =await connectToMongoDB();

  try {
    await session.withTransaction(async () => {
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
      Data.save({session}).then(result=>console.log(result));
    }, transactionOptions);

    // console.log('Transaction committed');
    res.status(200).json({status:"success", message:"Product template added"});

  } catch (err) {
    console.log('Transaction aborted due to error:', err);
  } finally {
    await session.endSession();
    await client.close();
  }   
})    

app.get('/api/viewListOfProductTemplates', async (req, res) => {
  try { 
    const FactoryID= req.query.factoryID;
    productTemplate.find({FactoryID}).then((documents) => { 
      res.status(200).json({status:"success", message:documents});
    }).catch((error) => {
      console.log(error);
      res.status(200).json({status:"success", message:"Returned data is empty"});
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
});

async function addbatchMIDDLEWARE(req, res, next) {
  const batchID =req.body.batchID;
  const companyBatchID =req.body.companyBatchID;
  const productIDs =req.body.productIDs;
  const batchSize =req.body.batchSize;
  const batchDescription =req.body.batchDescription; 
  const productTemplateID =req.body.productTemplateID;
  const factoryID =req.body.factoryID; 
  const distributorID =req.body.distributorID; 
  const factoryLocation =req.body.factoryLocation; 
  const dateOfProduction =req.body.dateOfProduction; 
  try {
    const tx =await contract.batchProduced(batchID,companyBatchID,productIDs,batchSize,batchDescription,productTemplateID,factoryID,distributorID,factoryLocation,dateOfProduction);
    tx.wait();
    console.log("Transaction completed!");

    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({status:"failure", message:error.message});
  }
}

app.post('/api/factoryAddBatch',addbatchMIDDLEWARE,async(req,res)=>{
  const batchID =req.body.batchID;
  const companyBatchID =req.body.companyBatchID;
  const productIDs =req.body.productIDs;
  const companyProductIDs =req.body.companyProductIDs;
  const batchSize =req.body.batchSize;
  const batchName =req.body.batchName; 
  const batchDescription =req.body.batchDescription; 
  const productTemplateID =req.body.productTemplateID;
  const factoryID =req.body.factoryID; 
  const distributorID =req.body.distributorID; 
  const factoryLocation =req.body.factoryLocation; 
  const dateOfProduction =req.body.dateOfProduction; 
    
  try { 
    const Data= new batch({
      _id: new mongoose.Types.ObjectId(),
      BatchID:batchID,     
      BatchSize:batchSize,  
      AmountSoldTOCustomer:0,  
      BatchName:batchName,     
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
      CompanyBatchID:companyBatchID,
      ProductIDs:productIDs
    }) 

    const products=[];
    for(let i=0; i<batchSize; i++){
      const p =new product({
        _id: new mongoose.Types.ObjectId(),
        ProductID:productIDs[i],
        CompanyProductID:companyProductIDs[i], 
        BatchID:batchID,
        ProductTemplateID:productTemplateID, 
        DOM:dateOfProduction,
        CustomerID:"",
        RetailerID:"",
        RetailerScanned:false,    
        RetailerScannedTimeStamp:"",
        DateWhenSoldToRetailer:"",
        DateWhenSoldToCustomer:"",
        RetailerLatitude:"",
        RetailerLongitude:"",
        CustomerName:""
      })
      products.push(p);
    } 
    
    product.insertMany(products).then(function(){ 
      console.log("Products Saved")   
    }).catch(function(error){ 
      console.log(error)      
    }); 
    
    Data.save().then(result=>console.log("Batch Saved"));
    res.status(200).json({status:"success", message:"Batch added successfully"}); 
  } 
  catch (error) {
    res.status(500).json({ error: error.message });
  }

})   
 
app.get('/api/viewListOfBatchesProducedByFactory', async (req, res) => {
  try { 
    const FactoryID= req.query.factoryID;
    batch.find({FactoryID}).then((documents) => { 
      res.status(200).json({status:"success", message:documents});
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
    const BatchID= req.query.batchID; 
    batch.findOne({BatchID})
    .populate('ProductIDs')
    .exec(function(err, document) {
      if (err) {
        console.log(err);
      return;
    }
    product.find({ ProductID: { $in: document.ProductIDs } }, function(err, products) {
        if (err) {
          console.log(err);
          return;
        }
        res.status(200).json({status:"success","Batch":document,"Products":products});
      });
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
});

app.get('/api/viewProductIDsInBatch', async (req, res) => {
  try {
    let BatchID= req.query.batchID;
    batch.findOne({BatchID}).then((documents) => { 
      res.status(200).json({status:"success", message:documents.ProductIDs});
    }).catch((error) => {
      console.log(error);
      res.status(200).json({status:"success", message:"Returned data is empty"});
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});  



////////////////// API FOR DISTIBUTOR ////////////////////

app.get('/api/viewReceivedBatchesForDistributor', async (req, res) => {
  try { 
      const DistributorID= req.query.distibutorID;
      batch.find({DistributorID}).then((documents) => { 
        res.status(200).json({status:"success", message:documents});
      }).catch((error) => {
        console.log(error);
        res.status(200).json({status:"success", message:"Returned data is empty"});
      })
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: error.message });
    }
});

async function distributorScanMIDDLEWARE(req, res, next) {
  const BatchID =req.body.batchID;
  const distributorID =req.body.distributorID; 
  const timeStamp =req.body.timeStamp; 
  const isValid =req.body.isValid;
  try {
    if (isValid==true){
      const tx =await contract.distributorScansBatch(BatchID,distributorID,timeStamp);
      tx.wait();
      console.log("Transaction completed!");
    }
    next();
  } catch (error) {
    console.log(error.message);
    res.status(400).json({status:"failure", message:error.message});
  }
}

app.post('/api/distributorScansBatch', distributorScanMIDDLEWARE, async(req,res)=>{
  const BatchID =req.body.batchID;
  const distributorID =req.body.distributorID; 
  const timeStamp =req.body.timeStamp; 
  const isValid =req.body.isValid; 
  const latitude =req.body.latitude; 
  const longitude =req.body.longitude; 
  const location =req.body.location; 
  const sepration_distance =req.body.sepration_distance; 

  if (isValid==true){
    batch.findOneAndUpdate(
      { BatchID }, {
        DistributorScanned: true,
        DistributorScannedTimeStamp:timeStamp
      },{ new: true }, function(err,docs){
        if(err){
          console.log(err.message)
        }
      })
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
}) 

app.post('/api/distributorSellToRetailer',async(req,res)=>{
  const BatchID =req.body.batchID;
  const quantity =req.body.quantity;
  const retailerID =req.body.retailerID;
  const timeStamp =req.body.timeStamp; 

  let {client,session,transactionOptions} =await connectToMongoDB();

  try {
    await session.withTransaction(async () => {
      let document =await batch.findOne({BatchID});
      if(document.DistributorScanned==true){
        const tx =await contract.distributorSellToRetailer(BatchID,quantity);
        tx.wait();
        console.log("Transaction completed!");

        let amountLeft =document.AmountLeftForSellingTORetailer;
        let batchSize =document.BatchSize;
        let d =document.DistributorID;
        let sold = batchSize-amountLeft;
        await batch.updateOne({BatchID},{$set:{AmountLeftForSellingTORetailer:amountLeft-quantity}});

        let productIdsToUpdate = document.ProductIDs.slice(sold, sold+quantity);
        // console.log(productIdsToUpdate);
        await product.updateMany({ ProductID: { $in: productIdsToUpdate } }, { $set: { RetailerID: retailerID, DateWhenSoldToRetailer:timeStamp } });

        const data= new distributorRetailer({
          _id: new mongoose.Types.ObjectId(),
          DistributorID:d,
          RetailerID:retailerID,
          BatchID:BatchID,
          Quantity:quantity,
          TimeStamp:timeStamp,
          BatchName:document.BatchName,
          BatchDescription:document.BatchDescription
        })
        await data.save();
        
      }else{
        res.status(200).json({status:"failure", message:"Distributor haven't scanned the batch yet"});
      }
    }, transactionOptions);

    res.status(200).json({status:"success", message:"Products sold to the retailer"});

  } catch (err) {
    console.log('Transaction aborted due to error:', err);
  } finally {
    await session.endSession();
    await client.close();
  }   

})

app.get('/api/viewRecentSellsToRetailers', async (req, res) => {
  try {
    const DistributorID= req.query.distributorID;
    distributorRetailer.find({DistributorID}).then(documents=>{
      res.status(200).json({status:"success", message:documents});
    }).catch((err)=>{
      res.status(200).json({status:"success", message:err.message});
    })

  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  } 
});


////////////////// API FOR RETAILER ////////////////////

app.get('/api/viewRecentBuysFromDistributors', async (req, res) => {
  try {
    const RetailerID= req.query.retailerID;
    distributorRetailer.find({RetailerID}).then(documents=>{
      res.status(200).json({status:"success", message:documents});
    }).catch((err)=>{
      res.status(200).json({status:"success", message:err.message});
    })
    } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: error.message });
    }
});

app.post('/api/retailerScansProduct',async(req,res)=>{
  try {
    const ProductID =req.body.productID; 
    const retailerID =req.body.retailerID; 
    const timeStamp =req.body.timeStamp; 
    const isValid =req.body.isValid; 
    const latitude =req.body.latitude; 
    const longitude =req.body.longitude; 
    const location =req.body.location; 
    const sepration_distance =req.body.sepration_distance; 
    
    
    if(isValid==true){
      // const tx =await contract.retailerScansProduct(ProductID,retailerID,timeStamp,latitude,longitude);
      // tx.wait();
      // console.log("Transaction completed!"); 
      
      let document =await product.findOne({ProductID});
      if(document.RetailerScanned!=false){
        res.status(400).send({ error: "This batch is already scanned by the retailer" }); 
      }
      if(retailerID!=document.RetailerID){
        res.status(400).send({ error: "This product is not owned by this retailer" }); 
      }
      await document.updateOne( 
        { 
        RetailerScanned: true,
        RetailerScannedTimeStamp:timeStamp,
        RetailerLatitude:latitude,
        RetailerLongitude:longitude
      })

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
            productId:ProductID,
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

app.post('/api/sellToCustomer',async(req,res)=>{
  try {
    const batchID =req.body.batchID;
    const ProductID =req.body.productID;
    const customerID =req.body.customerID;
    const timeStamp =req.body.timeStamp; 
    const customerName =req.body.customerName; 

    const productData =await product.findOne({ProductID});
    if(productData.RetailerScanned==true){
      const tx =await contract.retailerSellToCustomer(batchID,ProductID,customerID,customerName);
      tx.wait();
      console.log("Transaction completed!");

      await productData.updateOne({
        CustomerID:customerID,
        CustomerName:customerName,
        DateWhenSoldToCustomer:timeStamp,
      }) 

      const data= new customerData({
        _id: new mongoose.Types.ObjectId(),
        BatchID:batchID,
        ProductRef:productData._id,
        CustomerID:customerID,
        CustomerName:customerName,
        TimeStamp:timeStamp
      })
      await data.save();
      
    }else{
      res.status(200).json({status:"failure", message:"Retailer haven't scanned this product yet"});
    }
    res.status(200).json({status:"success", message:"Product sold to customer"});
    
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
})

////////////////// API FOR CUSTOMERS ////////////////////

app.get('/api/viewProductBoughts', async (req, res) => {
  try {
    let CustomerID= req.query.customerID;
    const documents = await customerData.find({ CustomerID :CustomerID })
    .populate("ProductRef")
    // .populate({
    //   path: 'ProductID',
    //   model: 'product',
    //   select: 'DOM', 
    // });
    console.log(documents);
    if(documents){
      res.status(200).json({status:"success", message:documents});
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

app.post('/api/factoryAddBatchTemplate',async(req,res)=>{
  const batchTemplateID =req.body.batchTemplateID;
  const productTemplateID =req.body.productTemplateID;
  const batchDescription =req.body.batchDescription; 
  const batchSize =req.body.batchSize;
  const factoryID =req.body.factoryID; 

  let {client,session,transactionOptions} =await connectToMongoDB();
  try {
    await session.withTransaction(async () => {
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

      Data.save({session}).then(result=>console.log(result));

    }, transactionOptions);

    // console.log('Transaction committed');
    res.status(200).json({status:"success", message:"Product template added"});

  } catch (err) {
    console.log('Transaction aborted due to error:', err);
  } finally {
    await session.endSession();
    await client.close();
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

/***************Consumer Section********/
app.post('/api/registerconsumer', async function (req, res) {

    try {
        let phone = req.body.phone;
          console.log(phone);
        if(phone==''){
            res.status(200).json({status:"success", message:"Phone Number should not be blank"});
        }else{
            
            const checkConsumerExists = await Consumer.findOne({ phone:phone });
            if (!checkConsumerExists) {
                const data = new Consumer({
                    _id: new mongoose.Types.ObjectId(),
                    phone: phone,
                    created:Date.now()
                
                })
                data.save().then((result) => {           
                    res.status(200).json({status:"success", message:"Your registration successfull",cid:result._id});
                })
                .catch((err) => console.warn(err)
                )
            }else{        
                res.status(200).json({status:"success",cid:checkConsumerExists._id});
            }
        }
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message });
    }    
})


app.post('/api/rateus', async function (req, res) {
    try {
        let cid = req.body.cid;
        let rating= req.body.rating; 
        let comment= req.body.comment; 
        let services= req.body.services;
        let role= 'Consumer';  
        console.log(cid);
        if(cid==''){
            
            res.status(200).json({status:"fail", message:"Invalid Consumer"});
        }else if(rating==''){
            
            res.status(200).json({status:"fail", message:"Rating should not be blank"});
        }else if(comment==''){
            
            res.status(200).json({status:"fail", message:"Comment should not be blank"});
        }else if(services==''){
            
            res.status(200).json({status:"fail", message:"Services should not be blank"});
        }else{
            const checkConsumerRatingExists = await Rateus.findOne({ cid: req.body.cid });
            if (!checkConsumerRatingExists) {
                const data = new Rateus({
                    _id: new mongoose.Types.ObjectId(),
                    cid: cid,
                    rating: rating,
                    created:Date.now(),
                    comment: comment,
                    services: services,
                    role:role
                
                })
                data.save().then((result) => {         
                   
                    res.status(200).json({status:"success", message:"Thanks for rate us"});
                })
                .catch((err) => console.warn(err)
                )
            }else{
                res.status(200).json({status:"success", message:"Already given rating us"});
                
            }
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: error.message });
    }
})


/////////////////////////////////////////
///////////// Vipin Work////////////////
///////////////////////////////////////


const upload = multer({
  storage: multer.diskStorage({
      destination: function (req, file, cb) {
          cb(null, "uploads")
      },
      filename: function (req, file, cb) {
          cb(null, file.fieldname + "-" + Date.now() + ".jpg")
      }
  })
}).single("image");

app.post('/api/register', jsonParser, function (req, res) {
  const salt = bcrypt.genSaltSync(5);
  const defaultPassword = '123456';
  console.log(req.body.role);
  const password = bcrypt.hashSync(defaultPassword, salt);
  const data = new User({
      _id: new mongoose.Types.ObjectId(),
      hashAddress: req.body.whHashAddress,
      name: req.body.name,
      email: req.body.email,
      address: req.body.address,
      password: password,
      role: req.body.role,
  })
  data.save().then((result) => {
      jwt.sign({ result }, jwtkey, { expiresIn: '300s' }, (err, token) => {
          res.status(201).json({ token })
      })
      res.status(201).json(result);
  })
      .catch((err) => console.warn(err)
      )
})

function sendEmail(email,password) {
  var email = email;
  var password = password;
  var mail = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'akhilsaini87@gmail.com', // Your email id
          pass: 'pzbxmtoaklezhlzv' // Your password
      }
  });

  var mailOptions = {
      from: 'vipinyadav.vy1994@gmail.com',
      to: email,
      subject: 'Welcome To Richmint SCM',
      html: '<p>Hello </p> Congratulations on your new venture! It sounds like an exciting opportunity, and I am looking forward to watching your progress as the business develops.</p><p> You can login with these details </p><p>Email : '+ email +' </p><p>Password : '+ password +'</p>'
  };

  mail.sendMail(mailOptions, function (error, info) {
      if (error) {
          res.status(200).json("Something Went Wrong.");
          //return 1
      } else {
          res.status(200).json("User Added Successfully.");
          // return 0
      }
  });
}

app.post('/api/addUser', jsonParser, function (req, res) {
  const salt = bcrypt.genSaltSync(5);
  const defaultPassword = '123456';
  const password = bcrypt.hashSync(defaultPassword, salt);
  const data = new User({
      _id: new mongoose.Types.ObjectId(),
      hashAddress: req.body.hashAddress,
      name: req.body.name,
      email: req.body.email,
      password: password,
      role: req.body.role,
      adminId: req.body.adminId,
      address: req.body.address,
      city: req.body.city,
      country: req.body.country,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
  })
  data.save().then((result) => {
      jwt.sign({ result }, jwtkey, { expiresIn: '300s' }, (err, token) => {
          res.status(201).json({ token })
      })
      sendEmail(req.body.email, defaultPassword)
      res.status(201).json(result);
  })
      .catch((err) => console.warn(err)
      )
})

app.post('/api/addMultiUser', jsonParser, function (req, res) {
  const salt = bcrypt.genSaltSync(5);
  const defaultPassword = '123456';
  console.log(req.body);
  const password = bcrypt.hashSync(defaultPassword, salt);
  req.body.forEach(element => {

      const data = new User({
          _id: new mongoose.Types.ObjectId(),
          hashAddress: element[0],
          name: element[1],
          email: element[2],
          password: password,
          role: element[8],
          address: element[3],
          city: element[4],
          country: element[5],
          latitude: element[6],
          longitude: element[7],
      })
      data.save().then((result) => {
          jwt.sign({ result }, jwtkey, { expiresIn: '300s' }, (err, token) => {
              // res.status(201).json({ token })
          })
          // res.status(201).json(result);
      })
          .catch((err) => console.warn(err)
          )

  });


})

app.post('/api/uploads', upload, function (req, res) {
  res.status(200).json("File Upload");
})

app.post('/api/factoryLogin', jsonParser, async function (req, res) {
  const userData = await User.findOne({ email: req.body.email, role: 'Factory' });
  if (userData) {
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(req.body.password, userData.password);
      if (validPassword) {
          jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
              res.status(200).json({ token, userId: userData._id, userHash: userData.hashAddress, userEmail: userData.email, userRole: userData.role, userName: userData.name, address: userData.address, city: userData.city, country: userData.country, latitude: userData.latitude, longitude: userData.longitude })
          })
      } else {
          res.status(400).json({ error: "Invalid Password" });
      }
  } else {
      res.status(401).json({ error: "User does not exist" });
  }
})

app.post('/api/login', jsonParser, async function (req, res) {
  
  let userEmail = ''
  userEmail = req.body.email;
  
  const userPassword = req.body.password;
  if (userEmail != '' && userPassword != '' && userEmail != undefined && userPassword != undefined) {
      const userData = await User.findOne({ email: req.body.email, role: req.body.role });
      if (userData) {
          // check user password with hashed password stored in the database
          const validPassword = await bcrypt.compare(req.body.password, userData.password);
          if (validPassword) {
              jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                  //res.status(200).json({ token })
                 // res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

                  res.status(200).json({ token, userId: userData._id})

              })
          } else {
              res.status(400).json({ error: "Invalid Password" });
          }
      } else {
          res.status(401).json({ error: "User does not exist" });
      }
  } else {
      if (userEmail == '' || userEmail == undefined) {
          res.status(401).json({ error: "Email is Required" });
      } else {
          res.status(401).json({ error: "Password is Required" });

      }
  }

})

app.post('/api/userProfile', jsonParser, async function (req, res) {
  let userId = ''
  userId = req.body.userId;
 
  if (userId != '') {
      const userData = await User.findOne({ userId: userId });
      if (userData) {
          // check user password with hashed password stored in the database
          
              jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                  //res.status(200).json({ token })
                  res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

              })
         
      } else {
          res.status(401).json({ error: "User does not exist" });
      }
  } else {
      if (userEmail == '' || userEmail == undefined) {
          res.status(401).json({ error: "Email is Required" });
      } else {
          res.status(401).json({ error: "Password is Required" });

      }
  }

})

app.post('/api/superAdminLogin', jsonParser, async function (req, res) {
  let adminEmail = ''
  adminEmail = req.body.email;
  const adminPassword = req.body.password;
  if (adminEmail != '' && adminPassword != '' && adminEmail != undefined && adminPassword != undefined) {
      const userData = await User.findOne({ email: req.body.email, role: req.body.role, role: 'Superadmin' });
      if (userData) {
          // check user password with hashed password stored in the database
          const validPassword = await bcrypt.compare(req.body.password, userData.password);
          if (validPassword) {
              jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                  //res.status(200).json({ token })
                  res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

              })
          } else {
              res.status(400).json({ error: "Invalid Password" });
          }
      } else {
          res.status(401).json({ error: "User does not exist" });
      }
  } else {
      if (adminEmail == '' || adminEmail == undefined) {
          res.status(401).json({ error: "Email is Required" });
      } else {
          res.status(401).json({ error: "Password is Required" });

      }
  }

})

app.post('/api/adminLogin', jsonParser, async function (req, res) {
  let adminEmail = ''
  adminEmail = req.body.email;
  const adminPassword = req.body.password;
  if (adminEmail != '' && adminPassword != '' && adminEmail != undefined && adminPassword != undefined) {
      const userData = await User.findOne({ email: req.body.email, role: req.body.role, role: 'Admin' });
      if (userData) {
          // check user password with hashed password stored in the database
          const validPassword = await bcrypt.compare(req.body.password, userData.password);
          if (validPassword) {
              jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
                  //res.status(200).json({ token })
                  res.status(200).json({ token, userId: userData._id, userEmail: userData.email, userRole: userData.role, userName: userData.name, userAddress: userData.address, userCity: userData.city, userCountry: userData.country, userLatitude: userData.latitude, userLongitude: userData.longitude })

              })
          } else {
              res.status(400).json({ error: "Invalid Password" });
          }
      } else {
          res.status(401).json({ error: "User does not exist" });
      }
  } else {
      if (adminEmail == '' || adminEmail == undefined) {
          res.status(401).json({ error: "Email is Required" });
      } else {
          res.status(401).json({ error: "Password is Required" });

      }
  }

})

app.get('/api/users', function (req, res) {
  User.find().then((data) => {
      res.status(200).json(data)
  })
})
app.get('/api/warehouse', function (req, res) {
  User.find({ role: "Warehouse" }).then((data) => {
      res.status(200).json(data)
  })
})
app.get('/api/company', function (req, res) {
  User.find({ role: "Admin" }).then((data) => {
      res.status(200).json(data)
  })
})
app.post('/api/factoryByCompany', jsonParser, async function (req, res) {
  let adminId = '';
  adminId = req.body.adminId
  User.find({ role: "Factory", adminId: adminId }).then((data) => {
      res.status(200).json(data)
  })
})

app.post('/api/userById', jsonParser, async function (req, res) {
  let _id = '';
  _id = req.body._id
  User.find({_id: _id }).then((data)=> {
      const temp = data[0];
     res.status(200).json(temp)
  })
 
})

app.post('/api/retailerByCompany', jsonParser, async function (req, res) {
  let adminId = '';
  adminId = req.body.adminId
  User.find({ role: "Retailer", adminId: adminId }).then((data) => {
      res.status(200).json(data)
  })
})
app.post('/api/distributerByCompany', jsonParser, async function (req, res) {
  let adminId = '';
  adminId = req.body.adminId
  User.find({ role: "Distributer", adminId: adminId }).then((data) => {
      res.status(200).json(data)
  })
})
app.post('/api/retailerList',jsonParser, async function (req, res) {
  
  // User.find({ role: "Retailer"}).then((data) => {
  //     res.status(200).json(data)
  // })
 
  const userData = await  User.find({"role":"Retailer"},{ "_id": 0,"hashAddress": 1, "name": 1 })
  // const userData = await  User.find({ role: "Retailer" });
    
  
  if (userData) {
      jwt.sign({ userData }, jwtkey, { expiresIn: '300s' }, (err, token) => {
          
          res.status(200).json({userData })

      })
      
   } else {
       res.status(401).json({ error: "User does not exist" });
   }
   

});

app.get('/api/retailer', function (req, res) {
  User.find({ role: "Retailer" }).then((data) => {
      res.status(200).json(data)
  })
});

app.get('/api/distributer', function (req, res) {
  User.find().where({ role: "Distributer" }).then((data) => {
      res.status(200).json(data)
  })
})
app.get('/api/productApprover', function (req, res) {
  User.find({ role: "Product Approver" }).then((data) => {
      res.status(200).json(data)
  })
})

app.get('/api/factory', function (req, res) {
  User.find({ role: "Factory" }).then((data) => {
      res.status(200).json(data)
  })
})

app.get('/api/customer', function (req, res) {
  User.find().where({ role: "Customer" }).then((data) => {
      res.status(200).json(data)
  })
})

app.get('/api/rawmaterialsupplier', function (req, res) {
  User.find({ role: "Supplier" }).then((data) => {
      res.status(200).json(data)
  })
})

app.post('/api/retailerbylocation', jsonParser, function (req, res) {
  User.find({ address: req.body.location, role: req.body.role }).then((data) => {
      res.status(200).json(data[0])
  })
})

app.post('/api/location', jsonParser, async function (req, res) {
  const locationData = await User.findOne({ hashAddress: req.body.hashAddress });
  if (locationData) {
      var location = locationData.address;
      var username = locationData.name;
      res.status(200).json({ location, username })
  }
})

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ')
      req.token = bearer[1];
      jwt.verify(req.token, jwtkey, (err, authData) => {
          if (err) {
              res.json({ result: err })
          } else {
              next();
          }
      })
  } else {
      res.json({ "result": "Token not Provided" })
  }
}
/***************Consumer Section********/
app.post('/api/registerconsumer', jsonParser, async function (req, res) {
  console.log(req.body.phone)
  const checkConsumerExists = await Consumer.findOne({ phone: req.body.phone });
  if (!checkConsumerExists) {
      const data = new Consumer({
          _id: new mongoose.Types.ObjectId(),
          phone: req.body.phone,
          created:Date.now()
      
      })
      data.save().then((result) => {           
          res.status(201).json(result);
      })
      .catch((err) => console.warn(err)
      )
  }else{        
      res.status(201).json(checkConsumerExists);
  }
})

app.post('/api/rateus', jsonParser, async function (req, res) {
  try {
      let cid = req.body.cid;
      let rating= req.body.rating; 
      let comment= req.body.comment; 
      let services= req.body.services;
      let role= req.body.role;  
      console.log(cid);
      if(cid==''){
          
          res.status(200).json({status:"fail", message:"Invalid Consumer"});
      }else if(rating==''){
          
          res.status(200).json({status:"fail", message:"Rating should not be blank"});
      }else if(comment==''){
          
          res.status(200).json({status:"fail", message:"Comment should not be blank"});
      }else if(services==''){
          
          res.status(200).json({status:"fail", message:"Services should not be blank"});
      }else{
          const checkConsumerRatingExists = await Rateus.findOne({ cid: req.body.cid });
          if (!checkConsumerRatingExists) {
              const data = new Rateus({
                  _id: new mongoose.Types.ObjectId(),
                  cid: cid,
                  rating: rating,
                  created:Date.now(),
                  comment: comment,
                  services: services,
                  role:role
              
              })
              data.save().then((result) => {         
                 
                  res.status(200).json({status:"success", message:"Thanks for rate us"});
              })
              .catch((err) => console.warn(err)
              )
          }else{
              res.status(200).json({status:"success", message:"Already given rating us"});
              
          }
      }
      
  } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: error.message });
  }
})

app.post('/api/scanIssueReport', jsonParser, async function (req, res) {
  try {
      let uid = req.body.uid;
      let productName = req.body.productName; 
      let location= req.body.location; 
      let scanDate= req.body.scanDate;
      let scanIssue= req.body.scanIssue;
      let comment= req.body.comment;
      let qrcodeImage= req.body.qrcodeImage;
      let productFImage= req.body.productFImage;
      let productBImage= req.body.productBImage;
      let shopImage= req.body.shopImage;
      let name= req.body.name;
      let email= req.body.email;
      let created= req.body.created;
      let role= req.body.role;  
      console.log(uid);
      if(uid==''){            
          res.status(200).json({status:"fail", message:"Invalid User"});
      }else if(role==''){            
          role = 'Consumer';
      }else if(comment==''){            
          res.status(200).json({status:"fail", message:"Comment should not be blank"});
      }else if(scanIssue==''){            
          res.status(200).json({status:"fail", message:"Scan Issue should not be blank"});
      }else{
          const checkConsumerRatingExists = await ScanIssueReport.findOne({ uid: req.body.uid });
          if (!checkConsumerRatingExists) {
              const data = new ScanIssueReport({
                  _id: new mongoose.Types.ObjectId(),                   
                  uid:uid,
                  productName:productName,
                  location:location,
                  scanDate:Date.now(),
                  scanIssue:scanIssue, 
                  comment:comment,
                  qrcodeImage:qrcodeImage,
                  productFImage:productFImage,
                  productBImage:productBImage,
                  shopImage:shopImage,
                  name:name,
                  email:email,
                  role:role,         
                  created:Date.now(),
              
              })
              data.save().then((result) => {         
                 
                  res.status(200).json({status:"success", message:"Thanks for report us"});
              })
              .catch((err) => console.warn(err)
              )
          }else{
              res.status(200).json({status:"success", message:"Already reporting us"});
              
          }
      }
      
  } catch (error) {
      console.log(error.message);
      res.status(400).send({ error: error.message });
  }
})

var server = app.listen(8085, function () {
  console.log("Example app listening at http://127:0:0:1:8085")
})


// pm2 start index.js
// pm2 list        // list all processes
// pm2 restart 0   // restart process with id 0
// pm2 stop 0      // stop process with id 0
// pm2 logs        // view logs for all processes
