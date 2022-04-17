
const MovimientoModel = require('../models/movimiento');
const EquipoModel = require('../models/equipo');
const InspeccionModel = require('../models/inspeccion');
const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { sendMessage } = require('../utils/socket-io');



class movimientoController{
    getAll = async (req, res, next) => {
        let movimientoList = await MovimientoModel.find();
      
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
    
            const movimiento = await MovimientoModel.find({idMovimiento: result.id});
            const acta = await InspeccionModel.findOne({ idInspeccion: movimiento[0].idInspeccion });
            const equipo =  await EquipoModel.findOne({ idEquipo: acta.idEquipo});
            
            sendMessage("new movimiento", movimiento[0]);
            sendMessage("edit equipo", equipo);
            res.status(200).send(movimiento[0]);
        }
    };

    update =  async (req, res, next) => {
        const result = await MovimientoModel.update(req.body, req.params.id);
        console.log(req.body);
        if (result.error ==true) {
            res.status(505).send(result);
        }else{
            const movimiento = await MovimientoModel.find({idMovimiento:req.params.id});
            const acta = await InspeccionModel.findOne({ idInspeccion: movimiento[0].idInspeccion });
            const equipo =  await EquipoModel.findOne({ idEquipo: acta.idEquipo});
            
            sendMessage("edit movimiento", movimiento[0]);
            sendMessage("edit equipo", equipo);
            res.status(200).send(movimiento[0]);
        }
    };

    remove =  async (req, res, next) => {
 
        const result = await MovimientoModel.delete(req.params.id);
        if (result.error == true) {
            res.status(505).send('El movimiento no existe');
        }else{
            sendMessage("remove movimiento", req.params.id);
            res.status(200).send('Movimiento eliminado');
        }
       
    };
}

module.exports = new movimientoController;