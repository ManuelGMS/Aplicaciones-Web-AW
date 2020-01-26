"use strict";

const mysql = require("mysql");
const config = require("../config");
const pool = mysql.createPool(config.mysqlConfig);

//
const modeloAmigos = require("../Modelos/ModeloAmigos");

//
let oModeloAmigos = new modeloAmigos(pool);

function mostrarAmigosSolicitudes(request, response, next) {

    oModeloAmigos.cargarPeticionesDeAmistad(response.locals.usuario.Id, function (err, solicitudesDeAmistad) {

        if (err) {
            next(err);
        } else {

            oModeloAmigos.buscarAmigos(response.locals.usuario.Id, function (err, usuariosAmigos) {

                if (err) {
                    next(err);
                } else {
                    response.status(200);
                    response.render("PaginaDeAmigosSolicitudesDeAmistad", { amigos: usuariosAmigos , solicitudes: solicitudesDeAmistad });
                }

            });

        }

    });

}

function enviarPeticionDeAmistad(request, response, next) {

    oModeloAmigos.insertarPeticionDeAmistad(request.session.usuario.Id, request.body.Id, function (err) {
        if (err) {
            next(err);
        }else{
            response.status(200);
            response.redirect("/amigos/PaginaDeAmigosSolicitudesDeAmistad"); 
        }

    });
}

function rechazarPeticionDeAmistad(request, response, next) {

    oModeloAmigos.eliminarPeticionAmistad(request.body.Id, response.locals.usuario.Id, function(err) {

        if(err) {
            next(err);
        } else {
            response.status(200);
            response.redirect("/amigos/PaginaDeAmigosSolicitudesDeAmistad");
        }

    });

}

function aceptarPeticionDeAmistad(request, response, next) {
    
    oModeloAmigos.aceptarPeticionAmistad(response.locals.usuario.Id, request.body.Id, function(err) {

        if(err) {
            next(err);
        } else {

            oModeloAmigos.eliminarPeticionAmistad(request.body.Id, response.locals.usuario.Id, function(err) {

                if(err) {
                    next(err);
                } else {
                    response.status(200);
                    response.redirect("/amigos/PaginaDeAmigosSolicitudesDeAmistad");
                }
        
            });
    
        }

    });

}

function mostrarResultadosDeBusqueda(request, response, next) {

    oModeloAmigos.buscarCoincidencias(response.locals.usuario.Id, request.query.coincidencia, function (err, usuarios) {

        if (err) {
            next(err);
        } else {

            response.status(200);
            response.render("BusquedaDeUsuarios", {
                users: usuarios,
                coincidence: request.query.coincidencia
            });

        }

    });

}

module.exports = {
    mostrarAmigosSolicitudes: mostrarAmigosSolicitudes,
    mostrarResultadosDeBusqueda: mostrarResultadosDeBusqueda,
    enviarPeticionDeAmistad: enviarPeticionDeAmistad,
    aceptarPeticionDeAmistad: aceptarPeticionDeAmistad,
    rechazarPeticionDeAmistad: rechazarPeticionDeAmistad
};
