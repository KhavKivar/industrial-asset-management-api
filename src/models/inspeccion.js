const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');



class InspeccionModel {
    tableName = 'inspeccion';


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

        firmaURL, rut, nombre

    }) => {
        if (tipo == 'acta_equipo') {
            console.log("entro");
            const sql = `INSERT INTO ${this.tableName}
            (tipo, alarmaRetroceso, asientoOperador, baliza, idEquipo, bocina, extintor,espejos,cantidadEspejos,
                focosFaenerosDelanteros,cantidadFocosFaenerosDelanteros,focosFaenerosTraseros,cantidadFocosFaenerosTraseros,
                llaveContacto,cantidadLlaveContacto,intermitentesDelanteros,cantidadIntermitentesDelanteros,intermitentesTraseros,
                cantidadIntermitentesTraseros,palancaFrenoMano,peraVolante,arnesCilindroGas,tableroIntrumentos,cilindroDesplazador,
                cilindroDireccion,cilindroLevanteCentral,cilindroInclinacion,cilindroLevanteLateral,flexibleHidraulico,fugaConectores,
                alternador,bateria,chapaContacto,sistemaElectrico,horometro,motorPartida,palancaComando,switchLuces,switchMarcha,cadena,
                carro,horquilla,jaula,llantas,mastil,pintura,rueda,cantidadRueda,desplazadorLateral,direccion,frenoMano,frenoPie,
                inclinacion, levante, motor, nivelAceiteHidraulico, nivelAceiteMotor, nivelAceiteTransmision, nivelLiquinoFreno,
                tapaCombustible, tapaRadiador,transmision,observacion,alturaLevante,carga,cilindroDeGas, firmaURL, rut, nombre
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,  ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                          ?,?,?,?,?,?,?,?,?,?,   ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                          ?,?,?,?,?,?,?,?
                    
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
                    tapaCombustible, tapaRadiador, transmision, observacion, alturaLevante, carga, cilindroDeGas, firmaURL, rut, nombre]);


                let affectedRows = result ? result.affectedRows : 0;
                return { rows: affectedRows, error: 0, id: result.insertId };
            } catch (e) {
                console.log(e);
                if (e.code == "ER_DUP_ENTRY") {
                    return { rows: 0, error: 1 };
                } else {
                    return { rows: 0, error: 2 };
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
                    observacion,alturaLevante,carga,bateriaObservaciones,serieCargardorText,cargadorVoltajeInfo,enchufeInfo, firmaURL, rut, nombre


                ) VALUES (?,?,?,?,?,?,?,?,?,?,  ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                          ?,?,?,?,?,?,?,?,?,?,   ?,?,?,?,?,?,?,?,?,?,     ?,?,?,?,?,?,?,?,?,?,
                         ?,?,?,?,?,?,?
                    
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
                    observacion, alturaLevante, carga, bateriaObservaciones, serieCargardorText, cargadorVoltajeInfo, enchufeInfo, firmaURL, rut, nombre];

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
                    observacion, alturaLevante, carga, bateriaObservaciones, serieCargardorText, cargadorVoltajeInfo, enchufeInfo, firmaURL, rut, nombre]);


                let affectedRows = result ? result.affectedRows : 0;
                return { rows: affectedRows, error: 0, id: result.insertId };
            } catch (e) {
                console.log(e);
                if (e.code == "ER_DUP_ENTRY") {
                    return { rows: 0, error: 1 };
                } else {
                    return { rows: 0, error: 2 };
                }
            }
        }





    }

}

module.exports = new InspeccionModel;