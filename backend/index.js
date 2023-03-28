const express = require('express'); 
const cors = require('cors'); 
const ethers = require('ethers'); 
const mongoose = require('mongoose'); 
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
const User = require('./models/users');

var bodyParser = require('body-parser'); 
var util = require('util'); 
const { collection } = require('./models/users');
var jsonParser = bodyParser.json(); 
var encoder = new util.TextEncoder('utf-8'); 

require('dotenv').config()  
const app = express();     

MONGO_URL="mongodb+srv://vipin:vipinrichmint@cluster0.y8ufn.mongodb.net/nodedatabase?retryWrites=true&w=majority"
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("Connected"));

// optionSuccessStatus:200
// const contractAbi = require('./artifacts/contracts/Supplychain.sol/Supplychain.json')

let contractAddress ="0xef9dAF7BB111Fd9F3244626327521c73eD3a99BA";  
let contract; 
app.use(express.json()); 
app.use(cors());  

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

var server = app.listen(8082, function () {
  console.log("Example app listening at http://127:0:0:1:8082")
})


// pm2 start index.js
// pm2 list        // list all processes
// pm2 restart 0   // restart process with id 0
// pm2 stop 0      // stop process with id 0
// pm2 logs        // view logs for all processes
