

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const InfoModel = require('../models/info');
dotenv.config();

/******************************************************************************
 *                              Equipo Controller
 ******************************************************************************/
class InfoController {
    get = async (req, res, next) => {
        let dataTime = await InfoModel.get();
        if (!dataTime.length) {
            res.send([]);
        }
        else{
            res.send(dataTime);
        }
    };
}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new InfoController;
