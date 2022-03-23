
const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');


const EquipoModel = require('./equipo');
const InspeccionModel = require('./inspeccion');
const ClienteModel = require('./cliente');
class MovimientoModel {
    tableName = 'movimiento';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName} order by fechaMov DESC`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }
        let sql2 = `SELECT * FROM ${this.tableName}`;
        const { columnSet, values } = multipleColumnSet(params)
        sql2 += ` WHERE ${columnSet}`;

        return await query(sql2, [...values]);
    }



    create = async ({ transporte, empresaEnvio,
        idInspeccion, rut, idGuiaDespacho, urlGuiaDespacho, cambio, tipo, observaciones, fechaRetiro }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( transporte,
            idInspeccion,rut,idGuiaDespacho,urlGuiaDespacho,cambio,tipo,observaciones,fechaRetiro)
         VALUES (?,?,?,?,?,?,?,?,?)`;
        try {
            //Check if rut exist
            const cliente = await ClienteModel.findOne({ rut: rut });
            if (cliente == undefined) {
                ClienteModel.create({ rut: rut, nombre: "" });
            }


            let estado = 'ARRENDADO';
            let ubicacion = 'Taller';
            //&& observaciones == 'Venta'
            switch (observaciones) {
                case 'Venta':
                    estado = 'VENDIDO';
                    ubicacion = '-';
                    break;
                case 'Nuevo Arriendo':
                    estado = 'ARRENDADO';
                    ubicacion = 'Actualizar';
                    break;
                case 'Termino Arriendo':
                    estado = 'DISPONIBLE';
                    ubicacion = 'Taller';
                    break;
                case 'Despacho Por Cambio':
                    ubicacion = 'Actualizar';
                    estado = 'ARRENDADO';
                    break;
                case 'Despacho Por Reparacion':
                    ubicacion = 'Actualizar';
                    estado = 'ARRENDADO';
                    break;
                case 'Retiro Por Cambio':
                    estado = 'DISPONIBLE';
                    ubicacion = 'Taller';
                    break;
                case 'Retiro Por Reparacion':
                    estado = 'DISPONIBLE';
                    ubicacion = 'Taller';
                    break;
                default:
                    estado = 'NO UPDATE';
                    break;

            }
            if (estado != 'NO UPDATE') {
                const acta = await InspeccionModel.findOne({ idInspeccion: idInspeccion });
                const equipo = await EquipoModel.update({ estado: estado,ubicacion:ubicacion }, acta.idEquipo);
            }



            const result = await query(sql, [transporte,
                idInspeccion, rut, idGuiaDespacho, urlGuiaDespacho, cambio, tipo, observaciones, fechaRetiro]);
            return { error: false, id: result.insertId };
        } catch (e) {
            console.log(e);
            if (e.code == "ER_DUP_ENTRY") {
                return { error: true, message: { sqlMessage: "El movimiento ya existe" } };
            } else {
                return { error: true, message: e };
            }
        }

    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)

            const cliente = await ClienteModel.findOne({ rut: params.rut });
            if (cliente == undefined) {
                ClienteModel.create({ rut: params.rut, nombre: "" });
            }



            if (params.observaciones != undefined && params.observaciones != null) {
                let estado = 'ARRENDADO';
                let ubicacion = 'Taller';
                //&& observaciones == 'Venta'
                switch (params.observaciones) {
                    case 'Venta':
                        estado = 'VENDIDO';
                        ubicacion = '-';
                        break;
                    case 'Nuevo Arriendo':
                        estado = 'ARRENDADO';
                        ubicacion = 'Actualizar';
                        break;
                    case 'Termino Arriendo':
                        estado = 'DISPONIBLE';
                        ubicacion = 'Taller';
                        break;
                    case 'Despacho Por Cambio':
                        estado = 'ARRENDADO';
                        ubicacion = 'Actualizar'
                        break;
                    case 'Despacho Por Reparacion':
                        estado = 'ARRENDADO';
                        ubicacion = 'Actualizar'
                        break;
                    case 'Retiro Por Cambio':
                        estado = 'DISPONIBLE';
                        ubicacion = 'Taller';
                        break;
                    case 'Retiro Por Reparacion':
                        estado = 'DISPONIBLE';
                        ubicacion = 'Taller';
                        break;
                    default:
                        estado = 'NO UPDATE';
                        break;
                }
                if (estado != 'NO UPDATE') {
                    if(params.idInspeccion != undefined && params.idInspeccion != null){

                        const acta = await InspeccionModel.findOne({ idInspeccion: params.idInspeccion });
                        const equipo = await EquipoModel.update({ estado: estado,ubicacion:ubicacion }, acta.idEquipo);
                    }
                   
                }

            }

            const sql = `UPDATE ${this.tableName} SET ${columnSet} WHERE idMovimiento = ?`;

            const result = await query(sql, [...values, id]);

            return result;


        } catch (e) {
            console.log(e);
            if (e.code == "ER_DUP_ENTRY") {
                return { error: true, message: { sqlMessage: "El movimiento ya existe" } };
            } else {
                return { error: true, message: e };
            }
        }
    }

    delete = async (id) => {
        try {
            const sql = `DELETE FROM ${this.tableName}
        WHERE idMovimiento = ?`;
            const result = await query(sql, [id]);
            const affectedRows = result ? result.affectedRows : 0;
            return affectedRows;
        } catch (e) {
            console.log(e)
            return { error: true, message: { sqlMessage: "El movimiento no existe" } };

        }
    }




}



module.exports = new MovimientoModel;
