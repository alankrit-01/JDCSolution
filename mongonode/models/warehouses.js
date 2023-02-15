const mongoose = require('mongoose');
let warehouseSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hash:String,
    name:String,
    location:String,
})
module.exports=mongoose.model('warehouse',warehouseSchema)