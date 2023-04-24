const mongoose = require('mongoose');

let customerData = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    // BatchRef:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "batch"                         
    // },         
    // ProductRef:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "product"
    // },
    ProductName:String,
    ProductID:Number,
    CustomerID:String,
    CustomerName:String,
    TimeStamp:String,
    RetailerName:String,
    PackagingTimestamp:String,
    ManufacturedBy:String,
    BatchID:Number  
})
module.exports=mongoose.model('customerData',customerData)    


