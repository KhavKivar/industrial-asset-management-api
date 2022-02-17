
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
        if (result.error ==0) {
            const movimiento = await MovimientoModel.find({idInspeccion:req.body.idInspeccion});

            res.status(201).send(movimiento[0]);
        }else{
            if(result.error == 1){
                res.status(505).send("La id ya existe");
            }else{
                res.status(505).send("Error desconocido");
            }
        }
      
    };

    update =  async (req, res, next) => {
        
       
        const result = await MovimientoModel.update(req.body, req.params.id);

        if (!result) {
            res.send("ERROR");
        }else{
            const { affectedRows, changedRows, info } = result;
            const movimiento = await MovimientoModel.find({idMovimiento:req.params.id});

            res.send(movimiento[0]);
        }

       

       
    };

    remove =  async (req, res, next) => {
 
        const result = await MovimientoModel.delete(req.params.id);
        if (!result) {
            res.send('Mov not found');
           
        }else{
            res.send('Mov eliminado');
        }
       
    };
}

module.exports = new movimientoController;