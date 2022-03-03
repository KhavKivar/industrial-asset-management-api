const express = require('express');
const router = express.Router();

const inspeccionController = require('../controllers/inspeccionController');



router.get('/', inspeccionController.getAll); 
router.post('/', inspeccionController.create); 
router.patch('/id/:id',inspeccionController.edit);

module.exports = router;