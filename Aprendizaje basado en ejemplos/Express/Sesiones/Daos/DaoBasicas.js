class DaoBasicas {

    constructor(pool) {
        this.pool = pool;
    }

    insertUser(userName, userPassword, callBack) {

        // Asincrono
        this.pool.getConnection(function(err, connection) {
            if(err) {
                callBack(err,null);
            } else {
                // Asincrono
                connection.query(
                    "INSERT INTO users VALUES(?,?,?)",
                    [userName,userPassword,10],
                    function(err,result) {
                        connection.release(); // Liberamos la conexion
                        if(err) {
                            callBack(err,null);
                        } else {
                            callBack(null,true);
                        }
                    }
                );
            }
        });

    }

    validateUser(userName, userPassword, callBack) {
        // Asincrono
        this.pool.getConnection(function(err,connection) {
            if(err) {
                callBack(err,null);
            } else {
                // Asincrono
                connection.query(
                    "SELECT * FROM users WHERE name = ? AND password = ?",
                    [userName,userPassword],
                    function(err,result) {
                        connection.release(); // LIberamos la conexion
                        if(err) {
                            callBack(err,null);
                        } else {
                            callBack(null,result[0]);
                        }
                    }
                );
            }
        });
    }

    checkIfUserExists(userName, callBack) {
        
        // Asincrono
        this.pool.getConnection(function (err, connection) {
            if(err) {
                callBack(err, null);   
            } else {
                // Asincrono
                connection.query(
                    "SELECT * FROM users WHERE name = ?", 
                    [userName], 
                    function(err, result) {
                        connection.release(); // Liberamos la conexion.
                        if(err) {
                            callBack(err,null);
                        } else {
                            callBack(err,result.length==1);
                        }
                    }
                );
            }
        });

    }

};

module.exports = DaoBasicas;