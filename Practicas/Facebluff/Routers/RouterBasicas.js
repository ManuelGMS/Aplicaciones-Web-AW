"use strict";

// Modulos de Node.js
const path = require("path");
const multer = require("multer");
const express = require("express");

// Modulos propios
const controladorBasicas = require("../Controladores/ControladorBasicas");

// Declaramos el Router "RouterBasicas"
const routerBasicas = express.Router();

// MulterFactory para poder trabajar con file/s (archivos de imagen)
const multerFactory = multer({ dest: path.join("public","img") });

// Definimos los manejadores de rutas del Router "RouterBasicas"

routerBasicas.get("/PaginaDeIdentificacionDeUsuario", controladorBasicas.mostrarPaginaDeIdentificacionDeUsuario);
routerBasicas.post("/ValidarUsuario", controladorBasicas.validarUsuario);

routerBasicas.get("/CreacionDeNuevoUsuario", controladorBasicas.mostrarCreacionDeNuevoUsuario);
routerBasicas.post("/InsertarUsuario", multerFactory.single("imagen"), controladorBasicas.insertarUsuario);

module.exports = routerBasicas;
