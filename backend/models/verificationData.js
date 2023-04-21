const mongoose = require('mongoose');
let verificationSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    factoryID:String,
    distributorID:String,
    customerID:String,
    productName:String,
    batchDescription:String,
    batchID:Number,
    productId:Number,
    level:Number,
    timeStamp:String
})  
module.exports=mongoose.model('verificationData',verificationSchema)    