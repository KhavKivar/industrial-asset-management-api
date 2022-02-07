
const EquipoModel = require('../models/equipo');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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
            res.send(equipoList);
        }
        
    };
  
    getEquipoById = async (req, res, next) => {
        const equipo = await EquipoModel.findOne({ id: req.params.id });
        if (!equipo) {
            res.send([]);
        }else{
            res.send(equipo);
        }
       
    };

    createEquipo = async (req, res, next) => {

        console.log(req.body);
        const result  = await EquipoModel.create(req.body);
        if (result.error ==0) {
            res.status(201).send("Equipo creado con exito");
        }else{
            if(result.error == 1){
                res.status(505).send("El codigo ya existe");
            }else{
                res.status(505).send("Error desconocido");
            }
        }
      
    };

    updateEquipo =  async (req, res, next) => {
        
       
        const result = await EquipoModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });

       
    };



    removeEquipoById =  async (req, res, next) => {
 
        const result = await EquipoModel.delete(req.params.id);
        if (!result) {
            res.send('Equipo not found');
           
        }else{
            res.send('Equipo eliminado');
        }
       
    };



    
}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new EquipoController;
