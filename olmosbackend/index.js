const express=require('express')
const conectarDB=require('./config/db');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var multer = require('multer');
const cors=require("cors");




const app= express();


conectarDB();
app.use(cors())

app.use(express.json())

app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/reserva', require('./routes/reserva'));
app.use(multer({dest:'./uploads/'}).single('image'));

app.listen(3000, () => {
    console.log('Server is runnin on port 3000')
})