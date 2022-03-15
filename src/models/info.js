

const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');
const dotenv = require('dotenv');
const mysql = require('mysql2');
dotenv.config();

class InfoModel {


    get = async (params = {}) => {
        const listOfUpdate = [];
          
        let sql = `select UPDATE_TIME from information_schema.tables
         where table_schema = 'mydb';`;
        
        const lastUpdate =  await query(sql);
        


        listOfUpdate.push(lastUpdate[1]);
        listOfUpdate.push(lastUpdate[2]);
        listOfUpdate.push(lastUpdate[3]);
        listOfUpdate.push(lastUpdate[4]);

        listOfUpdate.push(lastUpdate[0]);


        return listOfUpdate ;
    }


}



module.exports = new InfoModel;
