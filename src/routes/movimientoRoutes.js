const express = require('express');
const router = express.Router();

const movimientoController = require('../controllers/movimientoController');



router.get('/', movimientoController.getAll); 
router.post('/', movimientoController.create); 
router.patch('/id/:id',movimientoController.update);
router.delete('/id/:id', movimientoController.remove); 

module.exports = router;