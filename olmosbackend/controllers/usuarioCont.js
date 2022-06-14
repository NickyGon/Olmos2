const Usuarios=require("../models/Usuario")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.crearUsuario= async (req,res)=>{
    try {
        let usuario;
        usuario= new Usuarios(req.body);
        await usuario.save();
        res.send(usuario)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
    
}

exports.obtenerUsuario= async (req,res)=>{
    try {
       const usuarios= await Usuarios.find();
       res.json(usuarios);
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
    
}

exports.editarUsuario=async(req,res)=>{

    const usuarioEd={
        nombre:req.body.nombre,
        apellido:req.body.apellido,
        ci:req.body.ci,
        email: req.body.email,
        password: req.body.password,
        access: req.body.access
    }
    try{
        const usuario= await Usuarios.updateOne({email:req.params.email},usuarioEd,{
            new:true
        }).then(result=>{
            res.status(200).json({message:"Actualización realizada", usuario:result})
        });
    } catch(e){
        console.log(error)
        res.status(500).send("Error")
    }
}


exports.eliminarUsuario=async (req,res)=>{
 try {
    Usuarios.deleteOne({ email: req.params.email }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Usuario fuera!" });
      });
 } catch (error) {
    console.log(error)
    res.status(500).send("Error")
 }   
}


exports.logUsuario= async (req,res)=>{
    try {
       let usuarioFetched;
       Usuarios.findOne({email:req.body.email})
       .then(usuario=>{
           if(!usuario){
               return res.status(401).json({
                   message: "Fallo de Autenticación 1"
               });
           }
           usuarioFetched=usuario;
           return bcrypt.compare(req.body.password, usuario.password)
       })
       .then(result=>{
           if (!result){
               return res.status(401).json({
                    message: "Fallo de Autenticación 2"
               })
           }
           const token= jwt.sign(
               {email: usuarioFetched.email, userId: usuarioFetched._id},
               "secret_this_should_be_longer",
               {expiresIn: "1h"}
           );
           res.status(200).json({
               usuarioSuccess:usuarioFetched,
               token: token,
               expiresIn: 3600
           });
       })
       .catch(err=>{
           return res.status(401).json({
            message: "Fallo de Autenticación 3"
           })
       });
       
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
}

