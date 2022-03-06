const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');



class InspeccionModel {
    tableName = 'inspeccion';


    find = async (params = {}) => {
        try {
            let sql = `SELECT * FROM ${this.tableName}`;
            if (!Object.keys(params).length) {
                return await query(sql);
            }

            const { columnSet, values } = multipleColumnSet(params)
            sql += ` WHERE ${columnSet}`;

            return await query(sql, [...values]);
        } catch (e) {
            return [];
        }
    }


    findOne = async (params) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            console.log(columnSet);
            const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;
            const result = await query(sql, [...values]);
            return result[0];
        } catch (e) {
            return []
        }
    }

    create = async ({
        tipo, alarmaRetroceso, asientoOperador, baliza, idEquipo, bocina, extintor, espejos, cantidadEspejos,
        focosFaenerosDelanteros, cantidadFocosFaenerosDelanteros, focosFaenerosTraseros, cantidadFocosFaenerosTraseros,
        llaveContacto, cantidadLlaveContacto, intermitentesDelanteros, cantidadIntermitentesDelanteros, intermitentesTraseros,
        cantidadIntermitentesTraseros, palancaFrenoMano, peraVolante, arnesCilindroGas, tableroIntrumentos, cilindroDesplazador,
        cilindroDireccion, cilindroLevanteCentral, cilindroInclinacion, cilindroLevanteLateral, flexibleHidraulico, fugaConectores,
        alternador, bateria, chapaContacto, sistemaElectrico, horometro, motorPartida, palancaComando, switchLuces, switchMarcha, cadena,
        carro, horquilla, jaula, llantas, mastil, pintura, rueda, cantidadRueda, desplazadorLateral, direccion, frenoMano, frenoPie,
        inclinacion, levante, motor, nivelAceiteHidraulico, nivelAceiteMotor, nivelAceiteTransmision, nivelLiquinoFreno,
        joystick, serieCargador, cargadorVoltaje, enchufe,
        tapaCombustible, tapaRadiador, transmision, observacion,
        alturaLevante, carga, cilindroDeGas, bateriaObservaciones, serieCargardorText, cargadorVoltajeInfo, enchufeInfo,
        horometroActual,

        firmaURL, rut, nombre

    }) => {
        if (tipo == 'acta_equipo') {
           
            const sql = `INSERT INTO ${this.tableName}
            (tipo, alarmaRetroceso, asientoOperador, baliza, idEquipo, bocina, extintor,espejos,cantidadEspejos,
                focosFaenerosDelanteros,cantidadFocosFaenerosDelanteros,focosFaenerosTraseros,cantidadFocosFaenerosTraseros,
                llaveContacto,cantidadLlaveContacto,intermitentesDelanteros,cantidadIntermitentesDelanteros,intermitentesTraseros,
                cantidadIntermitentesTraseros,palancaFrenoMano,peraVolante,arnesCilindroGas,tableroIntrumentos,cilindroDesplazador,
                cilindroDireccion,cilindroLevanteCentral,cilindroInclinacion,cilindroLevanteLateral,flexibleHidraulico,fugaConectores,
                alternador,bateria,chapaContacto,sistemaElectrico,horometro,motorPartida,palancaComando,switchLuces,switchMarcha,cadena,
                carro,horquilla,jaula,llantas,mastil,pintura,rueda,cantidadRueda,desplazadorLateral,direccion,frenoMano,frenoPie,
                inclinacion, levante, motor, nivelAceiteHidraulico, nivelAceiteMotor, nivelAceiteTransmision, nivelLiquinoFreno,
                tapaCombustible, tapaRadiador,transmision,observacion,alturaLevante,carga,cilindroDeGas,horometroActual, firmaURL, rut, nombre
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,  ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                          ?,?,?,?,?,?,?,?,?,?,   ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                          ?,?,?,?,?,?,?,?,?
                    
                    )`;

            try {

                const result = await query(sql, [tipo, alarmaRetroceso, asientoOperador, baliza, idEquipo, bocina, extintor, espejos, cantidadEspejos,
                    focosFaenerosDelanteros, cantidadFocosFaenerosDelanteros, focosFaenerosTraseros, cantidadFocosFaenerosTraseros,
                    llaveContacto, cantidadLlaveContacto, intermitentesDelanteros, cantidadIntermitentesDelanteros, intermitentesTraseros,
                    cantidadIntermitentesTraseros, palancaFrenoMano, peraVolante, arnesCilindroGas, tableroIntrumentos, cilindroDesplazador,
                    cilindroDireccion, cilindroLevanteCentral, cilindroInclinacion, cilindroLevanteLateral, flexibleHidraulico, fugaConectores,
                    alternador, bateria, chapaContacto, sistemaElectrico, horometro, motorPartida, palancaComando, switchLuces, switchMarcha, cadena,
                    carro, horquilla, jaula, llantas, mastil, pintura, rueda, cantidadRueda, desplazadorLateral, direccion, frenoMano, frenoPie,
                    inclinacion, levante, motor, nivelAceiteHidraulico, nivelAceiteMotor, nivelAceiteTransmision, nivelLiquinoFreno,
                    tapaCombustible, tapaRadiador, transmision, observacion, alturaLevante, carga, cilindroDeGas, horometroActual, firmaURL, rut, nombre]);
                //update horometro equipo

                const sqlUpdate = `UPDATE equipo SET horometro=(?) where idEquipo= (?) and horometro < (?)`;
                const resultUpdate = await query(sqlUpdate, [horometroActual, idEquipo, horometroActual]);


                let affectedRows = result ? result.affectedRows : 0;
                return { rows: affectedRows, error: 0, id: result.insertId };
            } catch (e) {
                console.log(e);
                if (e.code == "ER_DUP_ENTRY") {
                    return { error: true,message:{sqlMessage:"La acta ya existe"} };
                } else {
                    return { error:true,message:e };
                }
            }
        } else {
            const sql = `INSERT INTO ${this.tableName}
            (tipo, alarmaRetroceso, asientoOperador, baliza, idEquipo, bocina, extintor,espejos,cantidadEspejos,  focosFaenerosDelanteros,
              
                cantidadFocosFaenerosDelanteros,focosFaenerosTraseros,cantidadFocosFaenerosTraseros,
                llaveContacto,cantidadLlaveContacto,intermitentesDelanteros,cantidadIntermitentesDelanteros,intermitentesTraseros,
                cantidadIntermitentesTraseros,palancaFrenoMano,peraVolante,tableroIntrumentos,cilindroDesplazador,
                cilindroDireccion,cilindroLevanteCentral,cilindroInclinacion,cilindroLevanteLateral,flexibleHidraulico,fugaConectores,
              bateria,chapaContacto,sistemaElectrico,horometro,palancaComando,switchLuces,switchMarcha,joystick,cadena,
                carro,horquilla,jaula,llantas,mastil,pintura,rueda,cantidadRueda,desplazadorLateral,direccion,frenoMano,frenoPie,
                inclinacion, levante,serieCargador, nivelAceiteHidraulico, nivelLiquinoFreno,cargadorVoltaje,enchufe,
                    observacion,alturaLevante,carga,bateriaObservaciones,serieCargardorText,cargadorVoltajeInfo,enchufeInfo,horometroActual, firmaURL, rut, nombre


                ) VALUES (?,?,?,?,?,?,?,?,?,?,  ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                          ?,?,?,?,?,?,?,?,?,?,   ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                         ?,?,?,?,?,?,?,?
                    
                    )`;

            try {
                var x = [tipo, alarmaRetroceso, asientoOperador, baliza, idEquipo, bocina, extintor, espejos, cantidadEspejos,
                    focosFaenerosDelanteros, cantidadFocosFaenerosDelanteros, focosFaenerosTraseros, cantidadFocosFaenerosTraseros,
                    llaveContacto, cantidadLlaveContacto, intermitentesDelanteros, cantidadIntermitentesDelanteros, intermitentesTraseros,
                    cantidadIntermitentesTraseros, palancaFrenoMano, peraVolante, tableroIntrumentos, cilindroDesplazador,
                    cilindroDireccion, cilindroLevanteCentral, cilindroInclinacion, cilindroLevanteLateral, flexibleHidraulico, fugaConectores,
                    bateria, chapaContacto, sistemaElectrico, horometro, palancaComando, switchLuces, switchMarcha, joystick, cadena,
                    carro, horquilla, jaula, llantas, mastil, pintura, rueda, cantidadRueda, desplazadorLateral, direccion, frenoMano, frenoPie,
                    inclinacion, levante, serieCargador, nivelAceiteHidraulico, nivelLiquinoFreno, cargadorVoltaje, enchufe,
                    observacion, alturaLevante, carga, bateriaObservaciones, serieCargardorText, cargadorVoltajeInfo, enchufeInfo, horometroActual, firmaURL, rut, nombre];

                for (var i in x) {
                    console.log(i, x[i]);
                }
                const result = await query(sql, [tipo, alarmaRetroceso, asientoOperador, baliza, idEquipo, bocina, extintor, espejos, cantidadEspejos,
                    focosFaenerosDelanteros, cantidadFocosFaenerosDelanteros, focosFaenerosTraseros, cantidadFocosFaenerosTraseros,
                    llaveContacto, cantidadLlaveContacto, intermitentesDelanteros, cantidadIntermitentesDelanteros, intermitentesTraseros,
                    cantidadIntermitentesTraseros, palancaFrenoMano, peraVolante, tableroIntrumentos, cilindroDesplazador,
                    cilindroDireccion, cilindroLevanteCentral, cilindroInclinacion, cilindroLevanteLateral, flexibleHidraulico, fugaConectores,
                    bateria, chapaContacto, sistemaElectrico, horometro, palancaComando, switchLuces, switchMarcha, joystick, cadena,
                    carro, horquilla, jaula, llantas, mastil, pintura, rueda, cantidadRueda, desplazadorLateral, direccion, frenoMano, frenoPie,
                    inclinacion, levante, serieCargador, nivelAceiteHidraulico, nivelLiquinoFreno, cargadorVoltaje, enchufe,
                    observacion, alturaLevante, carga, bateriaObservaciones, serieCargardorText, cargadorVoltajeInfo, enchufeInfo, horometroActual, firmaURL, rut, nombre]);
                const sqlUpdate = `UPDATE equipo SET horometro=(?) where idEquipo= (?) and horometro < (?)`;
                const resultUpdate = await query(sqlUpdate, [horometroActual, idEquipo, horometroActual]);

                let affectedRows = result ? result.affectedRows : 0;
                return { rows: affectedRows, error: 0, id: result.insertId };
            } catch (e) {
                console.log(e);
                if (e.code == "ER_DUP_ENTRY") {
                    return { error: true,message:{sqlMessage:"La acta ya existe"} };
                } else {
                    return { error:true,message:e };
                }
            }
        }





    }

    update = async (params, id) => {
        try {
            const { columnSet, values } = multipleColumnSet(params)
            //Update horometro
            const horometro = params.horometroActual;
            const idEquipo = params.idEquipo;
            console.log(horometro);
            console.log(idEquipo);
            if (horometro != null && idEquipo != null) {
                const sqlUpdate = `UPDATE equipo SET horometro=(?) where idEquipo= (?) and horometro < (?)`;
                const resultUpdate = await query(sqlUpdate, [horometro, idEquipo, horometro]);
            }

            const sql = `UPDATE inspeccion SET ${columnSet} WHERE idInspeccion = ?`;
            const result = await query(sql, [...values, id]);
            return id;
        } catch (e) {
            
            console.log(e);
            if (e.code == "ER_DUP_ENTRY") {
                return { error: true,message:{sqlMessage:"La acta ya existe"} };
            } else {
                return { error:true,message:e };
            }
            
          
        }
    }

    delete = async (id) => {
        try {
            const sql = `DELETE FROM ${this.tableName}
        WHERE idInspeccion = ?`;
            const result = await query(sql, [id]);
            const affectedRows = result ? result.affectedRows : 0;
            return affectedRows;
        } catch (e) {
            console.log(e)
            return { error: true, message: {sqlMessage:"La acta no existe"} };
        }
    }
}

module.exports = new InspeccionModel;