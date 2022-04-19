
const ClienteModel = require('../models/cliente');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { sendMessage } = require('../utils/socket-io');

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
            const cliente = await ClienteModel.findOne({ rut: req.body.rut });
            sendMessage("new cliente", cliente);
            res.status(200).send(cliente);
        }

    };

    updateCliente = async (req, res, next) => {

        const result = await ClienteModel.update(req.body, req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            let cliente = await ClienteModel.findOne({ rut: req.body.rut });
        
            sendMessage("edit cliente",{ oldRut: req.params.id, newRut: req.body.rut, cliente: cliente });
             
            res.status(200).send(cliente);
        }

    };



    removeClienteById = async (req, res, next) => {

        const result = await ClienteModel.delete(req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            sendMessage("remove cliente", req.params.id);
            res.status(200).send('Cliente eliminado');
        }

    };




}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ClienteController;
