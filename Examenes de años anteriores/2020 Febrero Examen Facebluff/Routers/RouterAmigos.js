"use strict";

const express = require("express");

const controladorAmigos = require("../Controladores/ControladorAmigos");

// Declaramos el Router "RouterUsuarios"
const routerAmigos = express.Router();

routerAmigos.get("/PaginaDeAmigosSolicitudesDeAmistad", controladorAmigos.mostrarAmigosSolicitudes);

routerAmigos.get("/BusquedaDeUsuarios", controladorAmigos.mostrarResultadosDeBusqueda);

routerAmigos.post("/EnviarPeticion", controladorAmigos.enviarPeticionDeAmistad);

routerAmigos.post("/RechazarSolicitud", controladorAmigos.rechazarPeticionDeAmistad);

routerAmigos.post("/AceptarSolicitud", controladorAmigos.aceptarPeticionDeAmistad);

module.exports = routerAmigos;