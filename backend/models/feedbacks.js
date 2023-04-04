const mongoose = require('mongoose');
let feedbackSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    senderUserID:String,
    receiverUserID:String,
    name:String,
    role:String,
    rating:String,   
    services:String,
    comment:String, 
    status:String,
    date:String,
})
module.exports=mongoose.model('feedbacks',feedbackSchema)