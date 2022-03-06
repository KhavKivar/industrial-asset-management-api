
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
        else {
            res.send(clienteList);
        }

    };

    createCliente = async (req, res, next) => {

        const result = await ClienteModel.create(req.body);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            res.status(200).send("Cliente creado con exito");
        }

    };

    updateCliente = async (req, res, next) => {

        const result = await ClienteModel.update(req.body, req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            const { affectedRows, changedRows, info } = result;
            const message = !affectedRows ? 'User not found' :
                affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';
            res.status(200).send({ message, info });
        }

    };



    removeClienteById = async (req, res, next) => {

        const result = await ClienteModel.delete(req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            res.status(200).send('Cliente eliminado');
        }

    };




}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ClienteController;
