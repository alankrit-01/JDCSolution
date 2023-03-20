const mongoose = require('mongoose');
let globalID = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    batchIDs:[Number],
    productIDs:[Number]
})
    
module.exports=mongoose.model('globalID',globalID)    