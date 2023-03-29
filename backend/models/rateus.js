const mongoose = require('mongoose');
let rateusSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    cid:String,
    rating:String,     
    created:Date,
    comment:String,
    services:String
})
module.exports=mongoose.model('rateus',rateusSchema)