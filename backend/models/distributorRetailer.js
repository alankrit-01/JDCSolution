const mongoose = require('mongoose');
let distributorRetailer = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    DistributorID:String,
    RetailerID:String,
    BatchID:Number,
    Quantity:Number,
    TimeStamp:String,
    BatchName:String,
    BatchDescription:String,
})
module.exports=mongoose.model('distributorRetailer',distributorRetailer)    


