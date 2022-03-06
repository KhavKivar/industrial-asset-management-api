
const MovimientoModel = require('../models/movimiento');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


class movimientoController{
    getAll = async (req, res, next) => {
        let movimientoList = await MovimientoModel.find();
        console.log(movimientoList);
        if (!movimientoList.length) {
            res.send([]);
        }else{
            res.send(movimientoList);
        }
       
    };

    create = async (req, res, next) => {
        console.log(req.body);
        const result  = await MovimientoModel.create(req.body);
        if (result.error == true) {
            res.status(505).send(result);
        }else{
            const movimiento = await MovimientoModel.find({idInspeccion:req.body.idInspeccion});
            res.status(200).send(movimiento[0]);
        }
    };

    update =  async (req, res, next) => {
        const result = await MovimientoModel.update(req.body, req.params.id);
        if (result.error ==true) {
            res.status(505).send(result);
        }else{
            const movimiento = await MovimientoModel.find({idMovimiento:req.params.id});
            res.status(200).send(movimiento[0]);
        }
    };

    remove =  async (req, res, next) => {
 
        const result = await MovimientoModel.delete(req.params.id);
        if (result.error == true) {
            res.status(505).send('El movimiento no existe');
        }else{
            res.status(200).send('Movimiento eliminado');
        }
       
    };
}

module.exports = new movimientoController;