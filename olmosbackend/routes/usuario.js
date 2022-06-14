const express=require('express')
const router=express.Router();
const usuarioController=require('../controllers/usuarioCont')


router.post('/',usuarioController.crearUsuario);
router.post('/login',usuarioController.logUsuario);
router.get('/',usuarioController.obtenerUsuario);
router.put('/:email',usuarioController.editarUsuario);
router.delete('/:email',usuarioController.eliminarUsuario);

module.exports=router