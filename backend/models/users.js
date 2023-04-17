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
    state:String,
    pincode:String,
    country:String,
    latitude:String,
    longitude:String,
    locationurl:String,
    userStatus:String,
    image:String,
    created:String,
})
module.exports=mongoose.model('users',userSchema)