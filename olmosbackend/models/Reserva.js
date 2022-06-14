const mongoose=require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");


const ReservaSchema= mongoose.Schema({
    
    checkIn:{ type: Date, required: true },
    checkOut:{type:Date, required:true},
    paquete:{ type: String, required: true },
    invitados:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Invitado' }],
    petitorio:{type:mongoose.Schema.Types.ObjectId, ref:'Usuarios'},
    //voucher:{type:mongoose.Schema.Types.ObjectId, ref:'Picture'},
    habitacion: {type:mongoose.Schema.Types.ObjectId, ref:'Habitacion'}
})



module.exports = mongoose.model("Reserva", ReservaSchema);