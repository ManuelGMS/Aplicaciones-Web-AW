"use strict";

// Modulos CORE.
const path = require("path");
const mysql = require("mysql");
// Modulos propios.
const config = require("../config");
const modeloUsuario = require("../Modelos/ModeloUsuarios");

// Pool de conexiones a la BBDD.
const pool = mysql.createPool(config.mysqlConfig);

// DAO
let oModeloUsuario = new modeloUsuario(pool);

function mostrarPerfilDeUsuario(request, response) {
    response.status(200);
    response.render("PaginaDePerfilDeUsuario");
}

function cargarImagenDePerfil(request, response, next) {

    oModeloUsuario.cargarImagenDePerfil(request.params.id, function (err, nombreImagen) {

        if (err) {
            next(err);
        } else {
            response.sendFile(path.join(__dirname, "..", "public", "img", (nombreImagen) ? nombreImagen : "user.png"));
        }

    });

}

function guardarModificacionesPerfil(request, response, next) {

    let fileName = (request.file)? request.file.originalname : "";
    const imagenRegexp = /.png$|.jpg$|.jpeg$|.bmp$/;

    if(fileName == "" || imagenRegexp.test(fileName)) {

        let usuarioAntiguo = {
            imagen: (request.file)? request.file.filename : null,
            nombre: request.body.nombre,
            clave: request.body.clave,
            fecha: request.body.fecha,
            sexo: request.body.sexo,
        };
    
        oModeloUsuario.modificarPerfilDeUsuario(request.session.usuario.email, usuarioAntiguo, function(err) {
    
            if (err) {
                next(err);
            } else {
        
                oModeloUsuario.extraerUsuario(request.session.usuario.email, function(err, usuarioNuevo) {
    
                    if(err) {
                        next(err);
                    } else {
                        request.session.usuario = usuarioNuevo;
                        response.status(200);
                        response.redirect("ModificarPerfilDeUsuario");
                    }
    
                });
                
            }
    
        });
    
    } else {
        response.setFlash("* Imagen no válida.");
        response.status(200);
        response.redirect("ModificarPerfilDeUsuario");
    }

}

function mostrarModificacionDelPerfilDeUsuario(request, response, next) {
    response.status(200);
    response.render("ModificacionPerfilUsuario");
}

function cerrarSesion(request, response) {
    response.setFlash(null);
    response.status(200);
    response.render("PaginaDeIdentificacionDeUsuario");
    request.session.destroy();
}

module.exports = {
    cerrarSesion: cerrarSesion,
    cargarImagenDePerfil: cargarImagenDePerfil,
    mostrarPerfilDeUsuario: mostrarPerfilDeUsuario,
    guardarModificacionesPerfil: guardarModificacionesPerfil,
    mostrarModificacionDelPerfilDeUsuario: mostrarModificacionDelPerfilDeUsuario
};

