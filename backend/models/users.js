const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    hashAddress:String,
    name:String,
    email:String,
    phone:String,
    password:String,
    role:String,
    adminId:String,
    address:String,
    city:String,
    country:String,
    latitude:String,
    longitude:String,
    image:String,
})
module.exports=mongoose.model('users',userSchema)   