const mongoose = require('mongoose');
let fraudScan = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    isDistributor:Boolean,
    distributorID:String,
    isRetailer:Boolean,
    RetailerID:String,
    batchID:Number,
    productId:Number,
    timestamp:String,
    latitude:String, 
    longitude:String,
    location:String 
})

module.exports=mongoose.model('fraudScan',fraudScan)    