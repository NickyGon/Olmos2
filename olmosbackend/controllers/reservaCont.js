const Reserva=require("../models/Reserva")




exports.crearReserva= async (req,res)=>{
    try {
        let reserva;
        reserva= new Reserva(req.body);
        await reserva.save();
        res.send(reserva)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
}

exports.obtenerReservas= async (req,res)=>{
    try {
       const reserva= await Reserva.find();
       res.json(reserva);
    } catch (error) {
        console.log(error)
        res.status(500).send("Error")
    }
    
}

exports.modificarReservas=async(req,res)=>{
    const reserva={
        checkIn:req.body.checkIn,
        checkOut:req.body.checkOut,
        paquete:req.body.paquete,
        invitados:req.body.invitados,
        petitorio:req.body.petitorio,
        voucher:req.body.voucher,
        habitacion: req.body.habitacion
    }
    try{
        const reserva=await Reserva.updateOne({_id:req.params.id},reserva).then(result=>{
            res.status(200).json({message:"Actualización realizada", reserva:result})
        })
    } catch(error){
        console.log(error)
        res.status(500).send("Error")
    }
    
}