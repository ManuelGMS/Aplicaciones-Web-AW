"use strict";

// Modulos de Node.js
const path = require("path");
const multer = require("multer");
const express = require("express");

// Modulos propios.
const controladorUsuarios = require("../Controladores/ControladorUsuarios");

// Declaramos el Router "RouterUsuarios"
const routerUsuarios = express.Router();

// MulterFactory para poder trabajar con file/s (archivos de imagen)
const multerFactory = multer({ dest: path.join("public","img") });

// Definimos los manejadores de rutas del Router "RouterBasicas"

routerUsuarios.get("/ModificarPerfilDeUsuario", controladorUsuarios.mostrarModificacionDelPerfilDeUsuario);
routerUsuarios.post("/GuardarModificacionesPerfil", multerFactory.single("imagen"), controladorUsuarios.guardarModificacionesPerfil);

routerUsuarios.get("/CargarImagenDePerfil/:id", controladorUsuarios.cargarImagenDePerfil);

routerUsuarios.get("/PaginaDePerfilDeUsuario", controladorUsuarios.mostrarPerfilDeUsuario);

routerUsuarios.get("/CerrarSesion", controladorUsuarios.cerrarSesion);

module.exports = routerUsuarios;
