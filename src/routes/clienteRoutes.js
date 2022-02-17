const express = require('express');
const router = express.Router();

const ClienteController = require('../controllers/clienteController');

router.get('/', ClienteController.getAllCliente); 

router.delete('/id/:id', ClienteController.removeClienteById); 
router.post('/', ClienteController.createCliente); 
router.patch('/id/:id',ClienteController.updateCliente);


module.exports = router;