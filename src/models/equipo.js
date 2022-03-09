

const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');

class EquipoModel {
    tableName = 'equipo';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            const result = await query(sql);
            for (var x in result) {
                if (typeof result[x].altura == 'number')
                    result[x].altura = parseFloat(result[x].altura.toFixed(2), 10);

            }

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

    create = async ({ idEquipo, tipo, marca, modelo, serie, capacidad, mastil = "", altura = 0, ano, horometro, 
    estado='DISPONIBLE',ubicacion='Bodega central',precio_neto }) => {
        const sql = `INSERT INTO ${this.tableName}
        (idEquipo, tipo, marca, modelo, serie, capacidad, mastil,altura,ano,horometro,estado,ubicacion,
            precio_neto) VALUES (?,?,?,?,?,   ?,?,?,?,?, ?,?,?)`;

        try {

            const result = await query(sql, [idEquipo, tipo, marca, modelo, serie, capacidad, mastil,altura,ano
                ,horometro,estado,ubicacion,precio_neto]);
            let affectedRows = result ? result.affectedRows : 0;
            return { rows: affectedRows, error: 0 };
        } catch (e) {
            if (e.code == "ER_DUP_ENTRY") {
                return { message: { sqlMessage: "El codigo interno ya existe" }, error: true };
            } else {
                return { message: e, error: true };
            }
        }

    }

    update = async (params, id) => {
        try {


            const { columnSet, values } = multipleColumnSet(params)

            const sql = `UPDATE equipo SET ${columnSet} WHERE idEquipo = ?`;

            const result = await query(sql, [...values, id]);

            return result;
        } catch (e) {
            return { error: true, message: e }
        }
    }

    delete = async (id) => {
        try {
            const sql = `DELETE FROM ${this.tableName}
        WHERE idEquipo = ?`;
            const result = await query(sql, [id]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (e) {
            console.log(e)
            return { error: true, message: {sqlMessage:"el equipo no existe"} };
        }
    }

}



module.exports = new EquipoModel;
