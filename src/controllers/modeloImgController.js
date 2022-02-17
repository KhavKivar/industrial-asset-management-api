
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
        else{
            res.send(ImgList);
        }
        
    };

    createImg = async (req, res, next) => {

        console.log(req.body);
        const result  = await ModelImgModel.create(req.body);
        if (result.error ==0) {
            res.status(201).send("Img creado con exito");
        }else{
            if(result.error == 1){
                res.status(505).send("El modelo ya tiene una imagen asociada");
            }else{
                res.status(505).send("Error desconocido");
            }
        }
      
    };

    updateImg =  async (req, res, next) => {
        
       
        const result = await ModelImgModel.update(req.body, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });

       
    };



    removeImgById =  async (req, res, next) => {
 
        const result = await ModelImgModel.delete(req.params.id);
        if (!result) {
            res.send('img not found');
           
        }else{
            res.send('IMG eliminado');
        }
       
    };



    
}




/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ModeloImgController;
