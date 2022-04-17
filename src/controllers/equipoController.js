
const EquipoModel = require('../models/equipo');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const { sendMessage } = require('../utils/socket-io');


/******************************************************************************
 *                              Equipo Controller
 ******************************************************************************/
class EquipoController {

    getAllEquipo = async (req, res, next) => {
        let equipoList = await EquipoModel.find();
        if (!equipoList.length) {
            res.send([]);
        }
        else{
            res.status(200).send(equipoList);
        }
        
    };
  
    getEquipoById = async (req, res, next) => {
        const equipo = await EquipoModel.findOne({ id: req.params.id });
        if (!equipo) {
            res.send([]);
        }else{
            res.status(200).send(equipo);
        }
       
    };

    createEquipo = async (req, res, next) => {

        console.log(req.body);
        const result  = await EquipoModel.create(req.body);
        if (result.error == true) {
            res.status(505).send(result);
        }else{
     
            const equipo = await EquipoModel.findOne({ idEquipo: req.body.idEquipo });
            sendMessage("new equipo", equipo);
            res.status(200).send(equipo);  
        }
      
    };

    updateEquipo =  async (req, res, next) => {
        
        const result = await EquipoModel.update(req.body, req.params.id);
        console.log(result.error);
        if (result.error == true) {
            res.status(505).send(result);   
        }else{  
            const equipo = await EquipoModel.findOne({ idEquipo: req.params.id});
            sendMessage("edit equipo", equipo);
            
            res.status(200).send(equipo);
        }
    };



    removeEquipoById =  async (req, res, next) => {
 
        const result = await EquipoModel.delete(req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        }else{
            sendMessage("remove equipo", req.params.id);
            res.status(200).send('Equipo eliminado');
        }
       
    };

    
}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new EquipoController;
