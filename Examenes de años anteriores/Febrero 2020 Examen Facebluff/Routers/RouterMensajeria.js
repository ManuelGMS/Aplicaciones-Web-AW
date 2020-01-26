"use strict";

const express = require("express");

const controladorMensajeria = require("../Controladores/ControladorMensajeria");

const routerMensajeria = express.Router();

routerMensajeria.get("/mostrarRecepcion", controladorMensajeria.mostrarRecepcion);

routerMensajeria.get("/BorrarMensaje/:IdMensaje", controladorMensajeria.borrarRefrescar);

routerMensajeria.get("/MostrarEnvioMensajes", controladorMensajeria.mostrarEnvioMensajes);

routerMensajeria.post("/EnviarMensaje", controladorMensajeria.enviarRefrescar);

module.exports = routerMensajeria;