const mongoose = require('mongoose');
let factorySchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hash:String,
    name:String,
    location:String,
})
module.exports=mongoose.model('factories',factorySchema)    