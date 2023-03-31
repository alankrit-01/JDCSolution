const mongoose = require('mongoose');
let ScanIssueReportSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    senderId:String,
    receiverId:String,
    issueItemId:String,
    itemType:String,
    productName:String,
    location:String,
    scanDate:String,
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