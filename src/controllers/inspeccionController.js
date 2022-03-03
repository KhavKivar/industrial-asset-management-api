
const InspeccionModel = require('../models/inspeccion');

const HttpException = require('../utils/HttpExceptionUtils');
const { validationResult, Result } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


class inspeccionController{
    
    getAll = async (req, res, next) => {
        let inspeccionList = await InspeccionModel.find();
        

        if (!inspeccionList.length) {
            res.status(200).send([]);
        }else{
            res.send(inspeccionList);
        }
       
    };

    getOne =  async (req, res, next) => {
        const inspeccion = await InspeccionModel.findOne({ idInspeccion : req.params.id  });
        if (!inspeccion) {
            res.send('equipo no encontrado');
        }
        else{
            res.send(inspeccion);
        }
       
    };



    create = async (req, res, next) => {

        
        const result  = await InspeccionModel.create(req.body);
        if (result.error ==0) {
            console.log(result);
            const inspeccion = await InspeccionModel.findOne({ idInspeccion : result.id  });
            res.status(201).send(inspeccion);
        }else{
            if(result.error == 1){
                res.status(505).send("El codigo ya existe");
            }else{
                res.status(505).send("Error desconocido");
            }
        }
      
    };
    
    edit =  async (req, res, next) => {
        
       
        const result = await InspeccionModel.update(req.body, req.params.id);

        if (result == null) {
            res.status(505).send({error:"update error"});
            
        }
        else{
            const inspeccion = await InspeccionModel.findOne({ idInspeccion : result });
            res.status(201).send(inspeccion);
            
        }

     

       
    };
}

module.exports = new inspeccionController;