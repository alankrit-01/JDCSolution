const mongoose = require('mongoose');
let scan = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    isDistributor:Boolean,
    distributorID:String,
    isRetailer:Boolean,
    RetailerID:String,
    isValid:Boolean,
    batchID:Number,
    productId:Number,
    timestamp:String,
    currentLatitude:String, 
    currentLongitude:String, 
    currentLocation:String,
    Name:String,
    Email:String,
    orignalLocation:String, 
    distanceSeprated:Number 
})

module.exports=mongoose.model('scan',scan)    