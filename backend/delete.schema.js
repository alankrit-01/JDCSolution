const mongoose = require('mongoose');
const verificationData = require('./models/verificationData'); 
const productTemplate = require('./models/productTemplate'); 
const batchTemplate = require('./models/batchTemplate'); 
const batch = require('./models/batch'); 
const product = require('./models/product'); 
const globalID = require('./models/globalID'); 
const fraudScan = require('./models/fraudScan'); 

require('dotenv').config() 
// mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("Connected"));
mongoose.connect("mongodb+srv://vipin:vipinrichmint@cluster0.y8ufn.mongodb.net/nodedatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("Connected"));
// vipinrichmint
// ldoggloxwncp6ojk

verificationData.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully deleted all documents in the collection verificationData');
  }
});

productTemplate.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully deleted all documents in the collection productTemplate');
  }
});

batchTemplate.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully deleted all documents in the collection batchTemplate');
  }
});

batch.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully deleted all documents in the collection batch');
  }
});

product.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully deleted all documents in the collection product');
  }
});

globalID.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully deleted all documents in the collection globalID');
  }
});

fraudScan.deleteMany({}, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Successfully deleted all documents in the collection fraudScan');
  }
});
