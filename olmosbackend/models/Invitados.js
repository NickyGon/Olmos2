const mongoose=require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");


const InvitadoSchema= mongoose.Schema({
    nombre:{ type: String, required: true },
    apellido:{ type: String, required: true },
    ci:{ type: String, required: true },
    email: {type: String, required: true },
    password: { type: String, required: true },
    access: { type: String, required: true }
})

InvitadoSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Invitado", UsuarioSchema);