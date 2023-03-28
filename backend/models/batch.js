const mongoose = require('mongoose');
let batch = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    BatchID:Number,     
    BatchSize:Number,  
    AmountSoldTOCustomer:Number,  
    BatchName:String,     
    BatchDescription:String,     
    ProductTemplateID:Number,   
    FactoryID:String,
    DistributorID:String,
    FactoryLocation:String,
    DateOfProduction:String,
    State: Number,
    DistributorScanned: Boolean,
    DistributorScannedTimeStamp: String,
    AmountLeftForSellingTORetailer:Number,
    CompanyBatchID:Number,
    ProductIDs:[Number]
})
module.exports=mongoose.model('batch',batch)    


