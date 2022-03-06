
const InspeccionModel = require('../models/inspeccion');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


class inspeccionController {

    getAll = async (req, res, next) => {
        let inspeccionList = await InspeccionModel.find();
        if (!inspeccionList.length) {
            res.send([]);
        } else {
            res.send(inspeccionList);
        }

    };

    getOne = async (req, res, next) => {
        const inspeccion = await InspeccionModel.findOne({ idInspeccion: req.params.id });
        if (!inspeccion) {
            res.send([]);
        }
        else {
            res.send(inspeccion);
        }

    };



    create = async (req, res, next) => {

        const result = await InspeccionModel.create(req.body);
        if (result.error == true) {
            res.status(505).send(result.message);
        } else {
            console.log(result);
            const inspeccion = await InspeccionModel.findOne({ idInspeccion: result.id });
            res.status(200).send(inspeccion);
        }

    };

    edit = async (req, res, next) => {


        const result = await InspeccionModel.update(req.body, req.params.id);

        if (result.error == true) {
            res.status(505).send(result);
        }
        else {
            const inspeccion = await InspeccionModel.findOne({ idInspeccion: result });
            res.status(200).send(inspeccion);
        }

    };
    remove =  async (req, res, next) => {
        const result = await InspeccionModel.delete(req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        }else{
            res.status(200).send('Acta eliminada');
        }
       
    };
}

module.exports = new inspeccionController;