"use strict";

class DAOUsers {

    constructor(pool) {
        this.pool = pool;
    }

    isUserCorrect(email, password, callback) {

        // Asincrono
        this.pool.getConnection(function (err, connection) {

            if (err) {

                callback(new Error("Error de conexión a la base de datos."), null);

            } else {

                connection.query("SELECT * FROM user WHERE email = ? AND password = ?",
                    [email, password],

                    function (err, filas) {

                        connection.release(); // Liberamos la conexion

                        if (err) {

                            callback(new Error("Error de acceso a la base de datos."), null);

                        } else {

                            callback(null,filas.length == 1);

                        }

                    }

                );

            }

        });

    }

    getUserImageName(email, callback) {

        // Asincrono
        this.pool.getConnection(function (err, connection) {

            if (err) {

                callback(new Error("Error de conexión a la base de datos."), null);

            } else {

                connection.query("SELECT img FROM user WHERE email = ?", [email],

                    function (err, filas) {

                        connection.release(); // Liberamos la conexion

                        if (err) {

                            callback(new Error("Error de acceso a la base de datos."), null);

                        } else {

                            if (filas.length == 0) {

                                callback(new Error("No existe el usuario."), null);

                            } else {

                                callback(null, filas[0].img);                                

                            }

                        }

                    }

                );

            }

        });

    }

}

module.exports = DAOUsers;