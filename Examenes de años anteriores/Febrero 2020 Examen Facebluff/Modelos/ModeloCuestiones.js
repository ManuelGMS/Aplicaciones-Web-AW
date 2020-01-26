"use strict";

class ModeloCuestiones {

    constructor(pool) {
        this.pool = pool;
    }

    obtenerPregunta(Id_Pregunta, callBack){

        this.pool.getConnection(function (err, connection) {
            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            }
            else{
                connection.query(
                    "SELECT * FROM preguntas WHERE Id = ?",
                    [Id_Pregunta],
                    function (err, result) {

                        connection.release(); // Liberamos la conexion
                        
                        if (err) {
                            callBack(new Error("Error al insertar la pregunta en la bases de datos."), null);
                        } else {
                            callBack(null,result[0]);
                        }

                    });

            }

        });
    }

    insertarRespuestaParaUnoMismo(Id_usuario, Id_pregunta, Id_respuesta, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "INSERT INTO usuariorespondeparasi VALUES (?,?,?)",
                    [Id_usuario, Id_pregunta, Id_respuesta],
                    function (err, result) {

                        connection.release(); // Liberamos la conexion

                        if (err) {
                            callBack(new Error("Error al insertar la respuesta de mi mismo en la base de datos."), null);
                        } else {
                            callBack(null);
                        }

                    });
                

            }
        
        });

    }

    obtenerRespuestasDeUnaPregunta(Id_pregunta, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {
            
                connection.query(
                    "SELECT * FROM respuestas WHERE Id_pregunta = ?",
                    [Id_pregunta],
                    function (err, result) {

                        connection.release(); // Liberamos la conexion

                        if (err) {
                            callBack(new Error("Error al extraer respuestas de una pregunta."), null);
                        } else {
                            callBack(null,result);
                        }

                    });

            }

        });
        
    }

    insertarPregunta(pregunta, callBack) {
        
        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {
                connection.query(
                    "INSERT INTO preguntas (texto) VALUES (?)",
                    [pregunta],
                    function (err, result) {

                        connection.release(); // Liberamos la conexion
                        if (err) {
                            callBack(new Error("Error al insertar la pregunta en la bases de datos."));
                        } else {
                            callBack(null, result.insertId);
                        }

                    });

            }

        });

    }

    insertarRespuestas(respuestas, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "INSERT INTO respuestas (Id_pregunta,texto) VALUES ?",
                    [respuestas],
                    function (err, result) {

                        connection.release(); // Liberamos la conexion

                        if (err) {
                            callBack(new Error("Error al insertar la pregunta en la bases de datos."), null);
                        } else {
                            callBack(null, result.insertId);
                        }

                    });
            }
        });

    }

    extraerPreguntas(callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."));
            } else {

                connection.query(
                    "SELECT * FROM preguntas ORDER BY RAND() LIMIT 5",
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callBack(new Error("Error al extraer las preguntas de la base de datos."));
                        } else {
                            callBack(null, result);
                        }

                    });

            }

        });

    }

    preguntaRespondida(Id_usuario, Id_pregunta, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."));
            } else {

                connection.query(
                    "SELECT * FROM usuariorespondeparasi U WHERE U.Id_usuario = ? AND U.Id_pregunta = ?",
                    [Id_usuario, Id_pregunta],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callBack(new Error("Error al verificar si hay respuesta a una mismo de una pregunta."));
                        } else {

                            if (result.length == 0) {
                                callBack(err, false);
                            } else {
                                callBack(err, true);
                            }

                        }

                    });

            }

        });

    }

    extraerRespuestasParaPregunta(Id_amigo, Id_pregunta, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."));
            } else {
           
                connection.query(
                    " SELECT r.Id_pregunta , r.Id_respuesta , r.texto FROM respuestas r, usuariorespondeparasi urps WHERE (r.Id_pregunta = ?) AND (urps.Id_pregunta = ?) AND (urps.Id_usuario = ?) AND (r.Id_respuesta = urps.Id_respuesta) " +
                    " UNION " +
                    " (SELECT r.Id_pregunta , r.Id_respuesta , r.texto FROM respuestas r, usuariorespondeparasi urps WHERE (r.Id_pregunta = ?) AND (urps.Id_pregunta = ?) AND (urps.Id_usuario = ?) AND (r.Id_respuesta <> urps.Id_respuesta) ORDER BY RAND() LIMIT 3) "
                    ,
                    [Id_pregunta, Id_pregunta, Id_amigo, Id_pregunta, Id_pregunta, Id_amigo]
                    ,
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if(err) {
                            callBack(new Error("Error al extraer respuestas aleatorias.", null));
                        } else {

                            let indice = Math.floor(Math.random() * result.length); 

                            let aux = result[indice];

                            result[indice] = result[0];

                            result[0] = aux;

                            callBack(null, result);
                        
                        }

                    }

                );

            }

        });

    }

    comprobarRespuesta(usuarioId, amigoId, preguntaId, respuestaId, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {
            
                connection.query(
                    "SELECT Id_respuesta FROM usuariorespondeparasi WHERE (Id_usuario = ?) AND (Id_respuesta = ?) AND (Id_pregunta = ?) "
                    ,
                    [amigoId, respuestaId, preguntaId]
                    ,
                    function (err, result) {

                        if(err) {
                            callBack(new Error("Error al comprobar si la respuesta es correcta."), null);
                        } else {

                            let correct = result.length > 0;

                            connection.query(
                                "INSERT INTO usuariorespondeporamigo VALUES(?,?,?,?,?)"
                                ,
                                [usuarioId, amigoId, preguntaId, respuestaId, correct]
                                ,
                                function(err,result) {

                                    if(err) {
                                        callBack(new Error("Error al insertar usuariorespondeporamigo."), null);
                                    } else {

                                        if(correct) {

                                            connection.query(
                                                "UPDATE usuarios SET puntos = puntos + ? WHERE Id = ? "
                                                ,
                                                [50,usuarioId]
                                                ,
                                                function(err,result) {
                
                                                    connection.release();

                                                    if(err) {
                                                        callBack(new Error("Error al actualizar los puntos"), null);
                                                    } else {
                                                        callBack(null,correct);
                                                    }
    
                                                });
    
                                        } else {
                                            connection.release();
                                            callBack(null,correct);
                                        }

                                    }

                                });

                        }

                    });

            }
            
        });

    } 

    obtenerAmigosQueHanRespondidoPregunta(Id_usuario, Id_pregunta, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."));
            } else {
            
                connection.query(
                    " SELECT " +
                    " Id , email , nombre , correcta " +
                    " FROM usuarios u, amistades a, usuariorespondeparasi urps, usuariorespondeporamigo urpa " +
                    " WHERE " + 
                    " (a.Id_amigo = u.Id) AND (a.Id_usuario = ?) AND " +
                    " (urpa.Id_amigo = u.Id) AND (urpa.Id_usuario = ?) AND (urpa.Id_pregunta = ?) AND " +
                    " (u.Id = urps.Id_usuario) AND (urps.Id_pregunta = ?) "
                    + " UNION " +
                    " SELECT Id , email , nombre , -1 as 'correcta' " +
                    " FROM " +
                    " usuarios u, amistades a, usuariorespondeparasi urps " + 
                    " WHERE " + 
                    " (a.Id_amigo = u.Id) AND (a.Id_usuario = ?) AND " +
                    " (u.Id = urps.Id_usuario) AND (urps.Id_pregunta = ?) AND " +
                    " NOT EXISTS ( " +
                    "   SELECT * " +
                    "   FROM usuariorespondeporamigo urpa " +
                    "   WHERE " + 
                    "   (urpa.Id_amigo = u.Id) AND (urpa.Id_usuario = ?) AND (urpa.Id_pregunta = ?) " +
                    " ) "
                    ,
                    [Id_usuario, Id_usuario, Id_pregunta, Id_pregunta, Id_usuario, Id_pregunta, Id_usuario, Id_pregunta]
                    ,
                    function (err, result) {

                        connection.release();

                        if (err) {
                            callBack(new Error("Error al extraer usuarios por los que (hemos/no hemos) responido."), null);
                        } else {
                            callBack(null, result);
                        }

                    });

            }

        });

    }

}

module.exports = ModeloCuestiones;
