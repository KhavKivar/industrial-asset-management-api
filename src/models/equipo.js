

const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');

class EquipoModel {
    tableName = 'equipo';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)
        console.log(columnSet);
        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);


        return result[0];
    }

    create = async ({ idEquipo, tipo, marca, modelo, serie, capacidad, mastil = "", altura = 0, ano, horometro, precio_neto }) => {
        const sql = `INSERT INTO ${this.tableName}
        (idEquipo, tipo, marca, modelo, serie, capacidad, mastil,altura,ano,horometro,precio_neto) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

        try {

            const result = await query(sql, [idEquipo, tipo, marca, modelo, serie, capacidad, mastil, altura, ano, horometro, precio_neto]);
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

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE equipo SET ${columnSet} WHERE idEquipo = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}



module.exports = new EquipoModel;
