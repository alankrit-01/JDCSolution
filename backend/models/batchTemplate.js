const mongoose = require('mongoose');
let batchTemplate = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    BatchTemplateID: Number,
    ProductTemplateID: Number,
    Description: String,
    BatchSize: String,
    FactoryID: String,
})
module.exports=mongoose.model('batchTemplate',batchTemplate)    