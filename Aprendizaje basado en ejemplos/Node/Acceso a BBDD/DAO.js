"use strict";

// this.pool.end(); --> Cierra todas las conexiones del pool con la base de datos.

class DAO {
    constructor(pool) {
        this.pool = pool;
    }
    readAllUsers(callBack) {
        // Asincrono
        this.pool.getConnection(function(err,connection) {
            if(err) {
                callBack(err,null);
            } else {
                // Asincrono
                connection.query("SELECT * FROM usuarios", function(err,result) {
                    connection.release();
                    if(err) {
                        callBack(err,null);
                    } else {
                        callBack(null,result);
                    }
                });
                
            }
        });
    }
    readUser(Id,callBack) {
        // Asincrono
        this.pool.getConnection(function(err,connection) {
            if(err) {
                callBack(err,null);
            } else {
                // Asincrono
                connection.query("SELECT * FROM usuarios WHERE Id = ?", [Id], function(err,result) {
                    connection.release();
                    if(err) {
                        callBack(err,null);
                    } else {
                        callBack(null,result[0]);
                    }
                });
            }
        });
    }
}

module.exports = DAO;