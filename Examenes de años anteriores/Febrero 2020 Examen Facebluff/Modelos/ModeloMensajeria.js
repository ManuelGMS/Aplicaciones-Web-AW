
"use strict";

class ModeloMensajeria {

    constructor(pool) {
        this.pool = pool;
    }

    borrarMensaje(Id, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {
            
                connection.query(
                    "DELETE FROM mensajeria WHERE IdMensaje = ?",
                    [Id],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if(err) {
                            callBack(err,null);
                        } else {
                            callBack(null,result);
                        }

                    });

            }

        });
        

    }

    obtenerMensajesPara(Id, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "SELECT IdMensaje, IdOrigen, NombreOrigen, IdDestino, Texto, DATE_FORMAT(fecha_hora,'%e-%c-%Y') AS 'fecha', TIME(fecha_hora) AS 'hora'  FROM mensajeria WHERE IdDestino = ?",
                    [Id],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if(err) {
                            callBack(err,null);
                        } else {
                            callBack(null,result);
                        }

                    });

            }

        });

    }

    enviarMensaje(from,fromName,to,content, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "INSERT INTO mensajeria(IdOrigen,NombreOrigen,IdDestino,Texto) VALUES(?,?,?,?)",
                    [from,fromName,to,content],
                    function (err) {

                        connection.release(); // Liberamos la coenxion

                        if(err) {
                            callBack(err);
                        } else {
                            callBack(null);
                        }

                    });

            }

        });

    }

}

module.exports = ModeloMensajeria;