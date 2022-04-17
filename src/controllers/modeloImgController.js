
const ModelImgModel = require('../models/modeloimg');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const { sendMessage } = require('../utils/socket-io');
/******************************************************************************
 *                              Img Controller
 ******************************************************************************/
class ModeloImgController {

    getAllImg = async (req, res, next) => {
        let ImgList = await ModelImgModel.find();
        if (!ImgList.length) {
            res.send([]);
        }
        else {
            res.send(ImgList);
        }

    };

    createImg = async (req, res, next) => {

        console.log(req.body);
        const result = await ModelImgModel.create(req.body);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            const modelo = await ModelImgModel.findOne({ modelo: req.body.modelo });
            sendMessage("new modelo", modelo);
            res.status(200).send(modelo);
        }

    };

    updateImg = async (req, res, next) => {
        const result = await ModelImgModel.update(req.body, req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            const modelo = await ModelImgModel.findOne({ modelo: req.params.id });
            sendMessage("edit modelo", modelo);
            res.status(200).send(modelo);
        }
    };



    removeImgById = async (req, res, next) => {

        const result = await ModelImgModel.delete(req.params.id);
        if (result.error ==true) {
            res.status(505).send(result);
            
        } else {
            sendMessage("remove modelo", req.params.id);
            res.status(200).send('IMG eliminado');
        }

    };




}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ModeloImgController;
