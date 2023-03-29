const mongoose = require('mongoose');
let ScanIssueReportSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    uid:String,
    productName:String,
    location:String,
    scanDate:Date,
    scanIssue:String, 
    comment:String,
    qrcodeImage:String,
    productFImage:String,
    productBImage:String,
    shopImage:String,
    name:String,
    email:String,
    role:String,         
    created:Date,
    
})
module.exports=mongoose.model('scanIssueReport',ScanIssueReportSchema)