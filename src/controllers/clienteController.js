
const ClienteModel = require('../models/cliente');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Cliente Controller
 ******************************************************************************/
class ClienteController {

    getAllCliente = async (req, res, next) => {
        let clienteList = await ClienteModel.find();
        if (!clienteList.length) {
            res.send([]);
        }
        else{
            res.send(clienteList);
        }
        
    };

    createCliente = async (req, res, next) => {

        console.log(req.body);
        const result  = await ClienteModel.create(req.body);
        if (result.error ==0) {
            res.status(201).send("Cliente creado con exito");
        }else{
            if(result.error == 1){
                res.status(505).send("El cliente ya existe");
            }else{
                res.status(505).send("Error desconocido");
            }
        }
      
    };

    updateCliente =  async (req, res, next) => {
        
       
        const result = await ClienteModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });

       
    };



    removeClienteById =  async (req, res, next) => {
 
        const result = await ClienteModel.delete(req.params.id);
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
module.exports = new ClienteController;
