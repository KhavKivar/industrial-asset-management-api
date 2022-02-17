const express = require('express');
const router = express.Router();

const ModeloImgController = require('../controllers/modeloImgController');

router.get('/', ModeloImgController.getAllImg); 

router.delete('/id/:id', ModeloImgController.removeImgById); 
router.post('/', ModeloImgController.createImg); 
router.patch('/id/:id',ModeloImgController.updateImg);


module.exports = router;