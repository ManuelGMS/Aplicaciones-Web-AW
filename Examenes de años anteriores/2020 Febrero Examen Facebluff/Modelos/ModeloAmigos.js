
"use strict";

class ModeloAmigos {

    constructor(pool) {
        this.pool = pool;
    }

    // Lista las peticiones de amistad 
    //@param id del usuario logueado
    //@return lista de Id's usuarios que han solicitado amistad al usuario actual(logueado) 

    cargarPeticionesDeAmistad(id_usuario, callback) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callback(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "SELECT U.Id , U.email , U.nombre FROM usuarios U , solicitudes S WHERE (S.Id_usuario = U.Id) AND (S.Id_amigo = ?)",
                    [id_usuario],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callback(new Error("Error al extraer la imagen del perfil de usuario."), null);
                        } else {

                            let solicitudesDeAmistad = [];

                            if(result.length > 0)

                                result.forEach(fila => solicitudesDeAmistad.push({
                                    Id: fila.Id,
                                    email: fila.email,
                                    nombre: fila.nombre
                                }));

                            callback(null, solicitudesDeAmistad);
                        
                        }

                    });

            }

        });

    }

    //Añadimos nueva amistad a tabla de amistades
    //@param Id_Origen -> usuario logueado, Id_Destino-> otro usuario
    //@return Error sino se ha podido añadir la nueva amistad

    aceptarPeticionAmistad(Id_usuario, Id_amigo, callback) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callback(new Error("Error de conexión a la base de datos."), null);
            } else {

                let registers = [];
                registers.push([Id_usuario, Id_amigo]);
                registers.push([Id_amigo, Id_usuario]);
                
                connection.query(
                    "INSERT INTO amistades (Id_Usuario, Id_Amigo) VALUES ?",
                    [registers],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callback(new Error("Error al añadir al amigo/a."), null);
                        } else {
                            callback(null, result);
                        }

                    });

            }

        });

    }

    // De solicitudes aceptamos/rechazamos la peticion de amistad -> hay que quitar esa peticion de amistad de solicitudes
    //@param Id_Origen -> usuario logueado, Id_Destino-> otro usuario
    //@return Error sino se ha podido quitar la solicitud

    eliminarPeticionAmistad(Id_usuario, Id_amigo, callback) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callback(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "DELETE FROM solicitudes WHERE Id_usuario = ? AND Id_amigo = ?",
                    [Id_usuario, Id_amigo],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callback(new Error("Error al eliminar la peticion"), null);
                        } else {
                            callback(null, result);
                        }

                    });

            }
        });
    }

    // Solicitamos una nueva amistad 
    //@param
    //@return

    insertarPeticionDeAmistad(Id_usuario, Id_amigo, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            }
            else {

                connection.query(
                    "INSERT INTO solicitudes (Id_usuario, Id_amigo) VALUES (?,?)",
                    [Id_usuario, Id_amigo],
                    function (err, resultado) {
                        
                        connection.release();
                        
                        if (err) {
                            callback(new Error("Error al añadir peticion de amistad"));
                        } else {
                            callback(null);
                        }
                    });
            }
        });


    }

    buscarAmigos(Id, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "SELECT U.Id , U.email , U.nombre FROM amistades A , usuarios U WHERE (A.Id_usuario = ?) AND (A.Id_amigo = U.Id)",
                    [Id],
                    function (err, result) {
                        
                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callBack(new Error("Error al extraer los usuarios de la base de datos."), null);
                        } else {

                            let amigos = [];

                            if(result.length > 0)

                                result.forEach(fila => amigos.push({
                                    Id: fila.Id,
                                    email: fila.email,
                                    nombre: fila.nombre
                                }));

                            callBack(null,amigos);

                        }

                    });

            }

        });

    }

    buscarCoincidencias(Id, coincidencia, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "SELECT Id , email , nombre FROM usuarios WHERE (Id <> ?) AND (Id NOT IN (SELECT Id_amigo FROM amistades WHERE Id_usuario = ?)) AND (Id NOT IN (SELECT Id_amigo FROM solicitudes WHERE Id_usuario = ?)) AND (nombre LIKE ?)",
                    [Id, Id, Id, "%" + coincidencia + "%"],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callBack(new Error("Error al buscar coincidencias con usuarios."), null);
                        } else {

                            let usuarios = [];

                            if (result.length > 0) {

                                result.forEach(fila =>
                                    usuarios.push({
                                        Id: fila.Id,
                                        email: fila.email,
                                        nombre: fila.nombre
                                    })
                                );

                            }

                            callBack(null, usuarios)

                        }

                    });

            }

        });

    }

}

module.exports = ModeloAmigos;