

const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');

class ClienteModel {
    tableName = 'cliente';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            const result = await query(sql);
            return result;
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

    create = async ({rut,nombre,telefono}) => {
        const sql = `INSERT INTO ${this.tableName}
        ( rut, nombre,telefono) VALUES (?,?,?)`;
        try {

            const result = await query(sql, [rut,nombre,telefono]);
            let affectedRows = result ? result.affectedRows : 0;
            return { rows: affectedRows, error: 0 };
        } catch (e) {
            console.log(e);
            if (e.code == "ER_DUP_ENTRY") {

                return { rows: 0, error: 1 };
            } else {
                return { rows: 0, error: 2 };
            }
        }

    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE  ${this.tableName} SET ${columnSet} WHERE rut = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (rut) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE rut = ?`;
        const result = await query(sql, [rut]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

}



module.exports = new ClienteModel;
