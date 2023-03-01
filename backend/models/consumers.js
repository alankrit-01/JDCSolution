const mongoose = require('mongoose');
let consumerSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,   
    phone:String,   
    created:Date,
})
module.exports=mongoose.model('consumers',consumerSchema)