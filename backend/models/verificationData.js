const mongoose = require('mongoose');
let verificationSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    factoryID:String,
    distributorID:String,
    batchDescription:String,
    batchID:Number,
    productId:Number,
    level:Number,
})
module.exports=mongoose.model('verificationData',verificationSchema)    