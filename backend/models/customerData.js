const mongoose = require('mongoose');
let customerData = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    BatchID:Number,
    ProductID:Number,
    CustomerID:String,
    CustomerName:String,
    TimeStamp:String
})
module.exports=mongoose.model('customerData',customerData)    


