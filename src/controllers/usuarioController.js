
const usuarioModel = require('../models/usuario');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Usuario Controller
 ******************************************************************************/
class UsuarioController {

    get = async (req, res, next) => {
        let clienteList = await usuarioModel.find();
        if (!clienteList.length) {
            res.send([]);
        }
        else {
            res.send(clienteList);
        }

    };

    login = async (req, res, next) => {

        const haveToken = req.body.token != null;
        if (haveToken) {
            const result = await usuarioModel.loginByToken({nombre:req.body.nombre,token:req.body.token});
            if (result.error == true) {
                res.status(505).send({ message: "Invalid token"});
            }
            else {
                console.log(result);
                res.send({ message: "Login Success",
                role:result.role });
            
            }
    

        } else {
            const result = await usuarioModel.login(req.body);
            if (result.error == true) {
                res.status(505).send(result);
            }
            else {
                if (result.login) {
                    res.send({ message: "Login Success", token: result.token ,role:result.role});
                } else {
                    res.send({ message: "Contraseña invalida" });

                }

            }
        }


    };

    create = async (req, res, next) => {

        const result = await usuarioModel.create(req.body);

        if (result.error == true) {
            console.log(result);
            res.status(505).send(result);
        } else {
            console.log(result);

            const cliente = await usuarioModel.findOne({ id: result.id });
            res.status(200).send(cliente);
        }

    };

    update = async (req, res, next) => {

        const result = await usuarioModel.update(req.body, req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            console.log(req.params.id);
            const cliente = await usuarioModel.findOne({ id: req.params.id });
            res.status(200).send(cliente);
        }

    };



    remove = async (req, res, next) => {
        const result = await usuarioModel.delete(req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            res.status(200).send('Usuario eliminado');
        }
    };




}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UsuarioController;
