"use strict";

const mysql = require("mysql");
const config = require("../config");
const pool = mysql.createPool(config.mysqlConfig);

// Esto para la carga y eliminacion de mensajes.
const modeloMensajeria = require("../Modelos/ModeloMensajeria");
let oModeloMensajeria = new modeloMensajeria(pool);

// Esto para reutilizar la funcion de obtener amigos.
const modeloAmigos = require("../Modelos/ModeloAmigos");
let oModeloAmigos = new modeloAmigos(pool);

function mostrarRecepcion(request, response, next) {

    let Id = response.locals.usuario.Id;

    oModeloMensajeria.obtenerMensajesPara(Id, function(err, mensajes) {
        if(err) {
            next(err);
        } else {
            response.status(200);
            response.type(".html");
            response.render("BuzonDeEntrada", { mensajes: mensajes });
        }
    });

}

function borrarRefrescar(request, response, next) {

    let Id = request.params.IdMensaje;

    oModeloMensajeria.borrarMensaje(Id, function(err) {
        if(err) {
            next(err);
        } else {
            response.redirect("/mensajeria/mostrarRecepcion");
        }
    });

}

function mostrarEnvioMensajes(request, response, next) {

    oModeloAmigos.buscarAmigos(response.locals.usuario.Id, function (err, usuariosAmigos) {
        if(err) {
            next(err);
        } else {
            response.status(200);
            response.type(".html");
            response.render("EnvioDeMensajes", { amigos: usuariosAmigos });
        }
    });

}

function enviarRefrescar(request, response, next) {
    
    let to = request.body.para;
    let from = request.body.de;
    let content = request.body.contenido;
    let fromName = response.locals.usuario.nombre;

    console.log(`${to} --- ${from} --- ${fromName} --- ${content}`)

    oModeloMensajeria.enviarMensaje(from,fromName,to,content, function (err) {
        if(err) {
            next(err);
        } else {
            response.redirect("/mensajeria/MostrarEnvioMensajes");
        }
    });
}

module.exports = {
    enviarRefrescar: enviarRefrescar,
    mostrarEnvioMensajes: mostrarEnvioMensajes,
    borrarRefrescar: borrarRefrescar,
    mostrarRecepcion: mostrarRecepcion
};
