const mongoose=require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");


const PictureSchema= mongoose.Schema({
    nombre:{type:String, required:true},
    path:{type:String, required:true}
   
})

module.exports = mongoose.model("Picture", PictureSchema);