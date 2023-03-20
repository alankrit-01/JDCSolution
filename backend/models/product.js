const mongoose = require('mongoose');
let product = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ProductID:Number,
    CompanyProductID:Number, 
    BatchID:Number,
    ProductTemplateID:Number, 
    DOM:String,
    CustomerID:String,
    RetailerID:String,
    RetailerScanned:Boolean,    
    RetailerScannedTimeStamp:  String,
    DateWhenSoldToRetailer:String,
    DateWhenSoldToCustomer:String,
    RetailerLatitude:String,
    RetailerLongitude:String,
    CustomerName:String
})
module.exports=mongoose.model('product',product)    