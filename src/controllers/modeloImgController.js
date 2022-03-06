
const ModelImgModel = require('../models/modeloimg');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

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
            res.status(200).send("Img creado con exito");
        }

    };

    updateImg = async (req, res, next) => {
        const result = await ModelImgModel.update(req.body, req.params.id);
        if (result.error == true) {
            res.status(505).send(result);
        } else {
            const { affectedRows, changedRows, info } = result;
            const message = !affectedRows ? 'User not found' :
                affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';
            res.status(200).send({ message, info });
        }
    };



    removeImgById = async (req, res, next) => {

        const result = await ModelImgModel.delete(req.params.id);
        if (result.error ==true) {
            res.status(505).send(result);
            
        } else {
            res.status(200).send('IMG eliminado');
        }

    };




}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ModeloImgController;
