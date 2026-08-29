

const { param } = require('express/lib/request');
const query = require('../db/db_connection');
const { multipleColumnSet } = require('../utils/commonUtils');
const CryptoUtils = require('../utils/crypto_utils');
const Token = require('../utils/token_utils');
class usuarioModel {
    tableName = 'usuario';

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

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [values]);


        return result[0];
    }

   

      userHasToken = async ({ nombre }) => {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE nombre = (?)`;
            const result = await query(sql, [nombre]);
            const usuario = result[0];
            if (usuario.token != null) {

                return {token:usuario.token,role:usuario.role,isHas:true};
            } else {
                return {isHas:false};
            }
        } catch (e) {
            return {isHas:false};
        }
    };


    loginByToken = async ({token, nombre }) => {
        try {
            const isValid = await this.userHasToken({nombre:nombre}) ;
            if (isValid.isHas) {
                if(isValid.token == token){
                   
                    return { error: false, login: true, role:isValid.role };
                }
            }
        } catch (e) {
            console.log(e);
          
        }
        return { error: true, login: false }
    }

    updateTokenByUser= async ({token, nombre}) => {
        try {
            const sql = `UPDATE ${this.tableName} SET token=(?) WHERE nombre = (?)`;
            const result = await query(sql, [token, nombre]);
        } catch (e) {
            console.log(e);
         
        }
    };

    login = async ({ nombre, password }) => {
        const sql = `SELECT * FROM ${this.tableName} WHERE nombre = (?)`;
        try {
         
            const result = await query(sql, [nombre]);
            const usuario = result[0];
            const passwordMatches = await CryptoUtils.compare(password, usuario.password)
            if (passwordMatches) {
                /* Si no existe el token lo agrego a la bd*/
                const  tokenState = await this.userHasToken({nombre:nombre});
                let access_token = "";
                if (tokenState.isHas) {
                    access_token = tokenState.token;
                } else {
                    //SaveDb;
                    access_token = Token.generateAccessToken(usuario);
                 
                    await this.updateTokenByUser({token:access_token,nombre:nombre});
                }
                return { error: false, login: true, token: access_token,role:usuario.role };
            }
            return { error: false, login: false }
        } catch (e) {
            console.log(e);
            return { message: "El usuario no existe en la db", error: true };
        }

    }

    create = async ({ nombre, password,role }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( nombre, password) VALUES (?,?)`;
        try {
            const password_encrypt = await CryptoUtils.hash(password);
            const result = await query(sql, [nombre, password_encrypt,role]);
            let affectedRows = result ? result.affectedRows : 0;
            return { rows: affectedRows, error: 0, id: result.insertId  };
            
        } catch (e) {
            console.log(e);
            if (e.code == "ER_DUP_ENTRY") {
                return { message: { sqlMessage: "El usuario ya existe" }, error: true };
            } else {
                return { message: e, error: true };
            }
        }

    }

    update = async (params, id) => {
        try {
            if(params.hasOwnProperty('password')){
                const password_encrypt = await CryptoUtils.hash(params.password);
                params.password = password_encrypt;

            }
            const { columnSet, values } = multipleColumnSet(params)
            const sql = `UPDATE  ${this.tableName} SET ${columnSet} WHERE id = ?`;
            
            console.log(params);

            const result = await query(sql, [...values, id]);
            return result;
        } catch (e) {
            if (e.code == "ER_DUP_ENTRY") {
                return { message: { sqlMessage: "El usuario ya existe" }, error: true };
            } else {
                return { message: e, error: true };
            }

        }
    }

    delete = async (id) => {
        try {
            const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
            const result = await query(sql, [id]);
            const affectedRows = result ? result.affectedRows : 0;

            return affectedRows;
        } catch (e) {
            console.log(e);


            return { error: true, message: e };
        }
    }

}



module.exports = new usuarioModel;
