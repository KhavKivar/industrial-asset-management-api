
const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');

const InspeccionModel = require('./inspeccion');

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

 

    create = async ({  transporte, empresaEnvio, observaciones, fechaRetiro, 
        idInspeccion,idActa,urlActa,horometroMov,cambio,tipo }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( transporte, empresaEnvio, observaciones, fechaRetiro,
            idInspeccion,idActa,urlActa,horometroMov,cambio,tipo)
         VALUES (?,?,?,?,?,?,?,?,?,?)`;

        try {
            const result = await query(sql, [ transporte, empresaEnvio, observaciones, fechaRetiro,
                idInspeccion,idActa,urlActa,horometroMov,cambio,tipo]);
            //update horometro equipo
            const inspeccionObject = await InspeccionModel.findOne({idInspeccion:idInspeccion});
            
            const sqlUpdate = `UPDATE equipo SET horometro = (?) where idEquipo= (?)`;
            const resultUpdate = await query(sqlUpdate,[horometroMov,inspeccionObject.idEquipo]);

            let affectedRows = result ? result.affectedRows : 0;
            return {rows:affectedRows,error:0};
        } catch (e) {
            console.log(e);
            if(e.code == "ER_DUP_ENTRY"){
                
                return {rows:0,error:1};
            }else{
                return {rows:0,error:2};
            }
        }
        
    }

 

}



module.exports = new MovimientoModel;
