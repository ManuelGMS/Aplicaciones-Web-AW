"use strict";

const mysql = require("mysql");
const config = require("../config");
const pool = mysql.createPool(config.mysqlConfig);
const modeloBasicas = require("../Modelos/ModeloBasicas");

let oModeloBasicas = new modeloBasicas(pool);

function mostrarPaginaDeIdentificacionDeUsuario(request, response, next) {
    response.setFlash(null);
    response.status(200);
    response.render("PaginaDeIdentificacionDeUsuario");
}

function mostrarCreacionDeNuevoUsuario(request, response, next) {
    response.status(200);
    response.render("CreacionDeNuevoUsuario");
}

function insertarUsuario(request, response, next) {

    let fileName = (request.file)? request.file.originalname : "";
    const imagenRegexp = /.png$|.jpg$|.jpeg$|.bmp$/;

    if(fileName == "" || imagenRegexp.test(fileName)) {

        let usuario = {
            puntos: 0,
            sexo: request.body.sexo,
            email: request.body.email,
            clave: request.body.clave,
            nombre: request.body.nombre,
            fechaNacimiento: request.body.fechaNacimiento,
            imagen: (request.file)? request.file.filename : null
        };
    
        oModeloBasicas.insertarUsuario(usuario, function (err) {
    
            if (err) {
                next(err);
            } else {
                response.status(200);
                response.redirect("PaginaDeIdentificacionDeUsuario");
            }
    
        });
    
    } else {
        response.setFlash("* Imagen no válida.");
        response.status(200);
        response.redirect("CreacionDeNuevoUsuario");
    }

}

function validarUsuario(request, response, next) {

    oModeloBasicas.validarUsuario(request.body.email,
        request.body.password, function (error, usuario) {
            if (error) {
                next(error);
            } else if (usuario != null) {
                // Graba la sesion en la base  de datos (como un registro).
                request.session.usuario = usuario;
                response.status(200);
                response.redirect("PaginaDePerfilDeUsuario");
            } else {
                response.setFlash("Email y/o contraseña no válidos");
                response.status(200);
                response.render("PaginaDeIdentificacionDeUsuario");
            }
        });

}

module.exports = {
    mostrarPaginaDeIdentificacionDeUsuario: mostrarPaginaDeIdentificacionDeUsuario,
    mostrarCreacionDeNuevoUsuario: mostrarCreacionDeNuevoUsuario,
    insertarUsuario: insertarUsuario,
    validarUsuario: validarUsuario,
};
