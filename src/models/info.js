

const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');

class InfoModel {


    get = async (params = {}) => {
        const listOfUpdate = [];
        
        let sqlEq = `select UPDATE_TIME from information_schema.tables
         where table_schema = 'mydb' and table_name='equipo';`;
        
         let sqlIns = `select UPDATE_TIME from information_schema.tables where
         table_schema = 'mydb' and table_name='inspeccion';`;
        
         let sqlImg = `select UPDATE_TIME from information_schema.tables where
         table_schema = 'mydb' and table_name='modeloImagen';`;

        const lastUpdateEquipos =  await query(sqlEq);
        const lastUpdateInspeccion =  await query(sqlIns);
        const lastUpdateModeloImagen =  await query(sqlImg);


        listOfUpdate.push(lastUpdateEquipos[0]);
        listOfUpdate.push(lastUpdateInspeccion[0]);
        listOfUpdate.push(lastUpdateModeloImagen[0]);


        return listOfUpdate ;
    }


}



module.exports = new InfoModel;
