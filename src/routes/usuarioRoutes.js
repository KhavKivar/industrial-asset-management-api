const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuarioController');

router.get('/', UsuarioController.get); 
router.delete('/id/:id', UsuarioController.remove); 
router.post('/', UsuarioController.create); 
router.patch('/id/:id',UsuarioController.update);
router.post('/login',UsuarioController.login);


module.exports = router;