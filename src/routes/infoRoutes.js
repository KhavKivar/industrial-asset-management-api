const express = require('express');
const router = express.Router();

const InfoController = require('../controllers/infoController');

router.get('/', InfoController.get); 



module.exports = router;