"use strict";

const express = require("express");

const controladorCuestiones = require("../Controladores/ControladorCuestiones");

// Declaramos el Router "RouterUsuarios"
const routerCuestiones = express.Router();

routerCuestiones.get("/ListadoAleatorioDePreguntas", controladorCuestiones.mostrarListadoAleatorioDePreguntas);

routerCuestiones.get("/CreacionDeNuevaPregunta", controladorCuestiones.mostrarCreacionDeNuevaPregunta);

routerCuestiones.post("/InsertarCuestionPreguntaRespuesta", controladorCuestiones.insertarPreguntaRespuesta);

routerCuestiones.get("/MostrarPregunta/:id", controladorCuestiones.mostrarPregunta);

routerCuestiones.get("/ContestarPorMiMismo/:id", controladorCuestiones.mostrarContestarPreguntaPorUnoMismo);

routerCuestiones.get("/AdivinarPorAmigo/:data", controladorCuestiones.mostrarResponderUnaPreguntaEnNombreDeUnAmigo);

routerCuestiones.post("/ComprobarRespuesta", controladorCuestiones.comprobarRespuesta);

routerCuestiones.post("/AnadirRespuesta", controladorCuestiones.anadirRespuesta);

module.exports = routerCuestiones;



