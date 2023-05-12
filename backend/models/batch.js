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
    FactoryAdminID:String,
    // FactoryName:String, 
    DistributorID:String,
    DistributorName:String,
    FactoryLocation:String,
    DateOfProduction:String,
    DistributorScanned: Boolean,
    DistributorScannedTimeStamp: String,
    AmountLeftForSellingTORetailer:Number,
    CompanyBatchID:Number,
    ProductIDs:[Number]
})
module.exports=mongoose.model('batch',batch)    


