
const MovimientoModel = require('../models/movimiento');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


class movimientoController{
    
    getAll = async (req, res, next) => {
        let inspeccionList = await MovimientoModel.find();
        console.log(inspeccionList);

        if (!inspeccionList.length) {
            throw new HttpException(404, 'inspeccion not found');
        }
        res.send(inspeccionList);
    };


    create = async (req, res, next) => {

        console.log(req.body);
        const result  = await MovimientoModel.create(req.body);
        if (result.error ==0) {
            res.status(201).send("Movmiento creado con exito");
        }else{
            if(result.error == 1){
                res.status(505).send("El codigo ya existe");
            }else{
                res.status(505).send("Error desconocido");
            }
        }
      
    };
}

module.exports = new movimientoController;