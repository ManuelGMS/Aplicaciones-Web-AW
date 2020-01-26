"use strict";

class ModeloUsuario {

    constructor(pool) {
        this.pool = pool;
    }

    extraerUsuario(email, callback) {

        this.pool.getConnection(function (err, connection) {

            if (err) {

                callback(new Error("Error de conexión a la base de datos."), null);

            } else {

                connection.query("SELECT * FROM usuarios WHERE email = ?",
                    [email],

                    function (err, result) {

                        connection.release(); // Liberamos la conexion

                        if (err) {

                            callback(new Error("Error de acceso a la base de datos."), null);

                        } else {

                            let usuario = null;

                            if (result.length == 1) {

                                usuario = {};
                                usuario.Id = result[0].Id;
                                usuario.sexo = result[0].sexo;
                                usuario.edad = result[0].edad;
                                usuario.clave = result[0].clave;
                                usuario.email = result[0].email;
                                usuario.nombre = result[0].nombre;
                                usuario.puntos = result[0].puntos;
                                usuario.imagen = result[0].imagen;
                                usuario.fechaNacimiento = result[0].fechaNacimiento;

                                let fechaDeEdad = new Date(Date.now() - usuario.fechaNacimiento.getTime());
                                usuario.edad = Math.abs(fechaDeEdad.getUTCFullYear() - 1970);

                            }

                            callback(null, usuario);

                        }

                    }

                );

            }

        });

    }

    modificarPerfilDeUsuario(email, usuario, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "UPDATE usuarios SET clave = ? , nombre = ? , sexo = ? , fechaNacimiento = ? WHERE email = ?",
                    [usuario.clave,usuario.nombre,usuario.sexo,usuario.fecha,email],
                    function (err, result) {

                        if (err) {
                            callBack(new Error("Error al modificar el perfil de usuario en la base de datos."), null);
                        } else {

                            if(usuario.imagen != null) {

                                connection.query(
                                    "UPDATE usuarios SET imagen = ? WHERE email = ?",
                                    [usuario.imagen,email],
                                    function (err, result) {
                
                                        connection.release(); // Liberamos la coenxion
                
                                        if (err) {
                                            callBack(new Error("Error al modificar la imagen del perfil de usuario en la base de datos."), null);
                                        } else {
                                            callBack(null);
                                        }

                                    });

                            } else {
                                connection.release(); // Liberamos la coenxion
                                callBack(null);
                            }

                        }

                    });

            }

        });

    }

    cargarImagenDePerfil(Id, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."), null);
            } else {

                connection.query(
                    "SELECT imagen FROM usuarios WHERE Id = ?",
                    [Id],
                    function (err, result) {

                        connection.release(); // Liberamos la coenxion

                        if (err) {
                            callBack(new Error("Error al extraer la imagen del perfil de usuario."), null);
                        } else {
                            callBack(null,result[0].imagen);
                        }

                    });

            }
        
        });

    }

}

module.exports = ModeloUsuario;
