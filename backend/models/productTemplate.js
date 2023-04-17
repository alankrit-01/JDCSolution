const mongoose = require('mongoose');
let productTemplate = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    ProductTemplateID: Number,
    Name:String, 
    Description:String,
    FactoryID:String 
})
module.exports=mongoose.model('productTemplate',productTemplate)    