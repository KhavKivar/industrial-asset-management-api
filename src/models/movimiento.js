
const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');



const ClienteModel = require('./cliente');
class MovimientoModel {
    tableName = 'movimiento';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    

    create = async ({  transporte, empresaEnvio,  
        idInspeccion,rut,idGuiaDespacho,urlGuiaDespacho,cambio,tipo,observaciones,fechaRetiro }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( transporte,
            idInspeccion,rut,idGuiaDespacho,urlGuiaDespacho,cambio,tipo,observaciones,fechaRetiro)
         VALUES (?,?,?,?,?,?,?,?,?)`;
        try {
            //Check if rut exist
            const cliente = await ClienteModel.findOne({rut:rut});    
            if(cliente == undefined){
                ClienteModel.create({rut:rut,nombre:""});
            }
            const result = await query(sql, [  transporte, 
                idInspeccion,rut,idGuiaDespacho,urlGuiaDespacho,cambio,tipo,observaciones,fechaRetiro]);
            let affectedRows = result ? result.affectedRows : 0;
            return {rows:affectedRows,error:0,id: result.insertId };
        } catch (e) {
            console.log(e);
            if(e.code == "ER_DUP_ENTRY"){
                
                return {rows:0,error:1};
            }else{
                return {rows:0,error:2};
            }
        }
        
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)
        console.log(params);
        const cliente = await ClienteModel.findOne({rut:params.rut});    
        if(cliente == undefined){
            ClienteModel.create({rut:params.rut,nombre:""});
        }

        const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE idMovimiento = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE idMovimiento = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }


 

}



module.exports = new MovimientoModel;
