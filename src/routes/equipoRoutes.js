const express = require('express');
const router = express.Router();

const equipoController = require('../controllers/equipoController');

router.get('/', equipoController.getAllEquipo); 
router.get('/id/:id', equipoController.getEquipoById);
router.delete('/id/:id', equipoController.removeEquipoById); 
router.post('/', equipoController.createEquipo); 
router.patch('/id/:id',equipoController.updateEquipo);

module.exports = router;