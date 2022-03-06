

const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');

class ModelImgModel {
    tableName = 'modeloImagen';

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

    create = async ({ modelo, url }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( modelo, url) VALUES (?,?)`;
        try {

            const result = await query(sql, [modelo, url]);
            let affectedRows = result ? result.affectedRows : 0;
            return { rows: affectedRows, error: 0 };
        } catch (e) {
            if (e.code == "ER_DUP_ENTRY") {
                return { message: { sqlMessage: "La imagen ya existe" }, error: true };
            } else {
                return { message: e, error: true };
            }
        }

    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE  ${this.tableName} SET ${columnSet} WHERE modelo = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        }
        catch (e) {
            if (e.code == "ER_DUP_ENTRY") {
                return { message: { sqlMessage: "La imagen ya existe" }, error: true };
            } else {
                return { message: e, error: true };
            }
        }
    }

    delete = async (rut) => {
        try {
            const sql = `DELETE FROM ${this.tableName}
        WHERE modelo = ?`;
            const result = await query(sql, [rut]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (e) {
            console.log(e)
            return { error: true, message: { sqlMessage: "La imagen ya existe" } };

        }
    }

}



module.exports = new ModelImgModel;
