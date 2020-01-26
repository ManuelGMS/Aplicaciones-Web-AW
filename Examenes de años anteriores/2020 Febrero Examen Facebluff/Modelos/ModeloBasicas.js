"use strict";

class ModeloBasicas {

    constructor(pool) {
        this.pool = pool;
    }

    validarUsuario(email, clave, callback) {

        this.pool.getConnection(function (err, connection) {

            if (err) {

                callback(new Error("Error de conexión a la base de datos."), null);

            } else {

                connection.query("SELECT * FROM usuarios WHERE email = ? AND clave= ?",
                    [email, clave],

                    function (err, result) {

                        connection.query("SELECT COUNT(*) AS 'numAmigos' FROM amistades WHERE Id_usuario = ?",
                            [result[0].Id],
                            function (err, resultNumAmigos) {

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
                                        usuario.numAmigos = resultNumAmigos[0].numAmigos;
                                        usuario.fechaNacimiento = result[0].fechaNacimiento;

                                        let fechaDeEdad = new Date(Date.now() - usuario.fechaNacimiento.getTime());
                                        usuario.edad = Math.abs(fechaDeEdad.getUTCFullYear() - 1970);

                                    }

                                    callback(null, usuario);

                                }

                            });

                    }

                );

            }

        });

    }

    insertarUsuario(usuario, callBack) {

        this.pool.getConnection(function (err, connection) {

            if (err) {
                callBack(new Error("Error de conexión a la base de datos."));
            } else {

                connection.query(
                    "INSERT INTO usuarios (email, clave, nombre, puntos, imagen, fechaNacimiento, sexo) VALUES (?,?,?,?,?,?,?)",
                    [usuario.email, usuario.clave, usuario.nombre, usuario.puntos, usuario.imagen, usuario.fechaNacimiento, usuario.sexo],
                    function (err, result) {

                        connection.release(); // Liberamos la conexion

                        if (err) {
                            console.log(err);
                            callBack(new Error("Error al introduccir el usuario en la base de datos."), null);
                        } else {
                            callBack(null);
                        }

                    });

            }

        });

    }

}

module.exports = ModeloBasicas;
