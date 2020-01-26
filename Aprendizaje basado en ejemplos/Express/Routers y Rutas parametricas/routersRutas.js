"use strict";

const path = require("path");
const morgan = require("morgan");
const express = require("express");

// Aplicacion express (un servidor que escucha en un puerto).
const app = express();

// Indicamos el directorio de las vistas y que el motor de renderizado de las plantillas es EJS.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware morgan para mostrar informacion de la peticion.
app.use(morgan("dev"));

// Routers de la aplicacion express.
const routerUsuarios = require("./Routers/Usuarios");
app.use("/users", routerUsuarios); // El router trabajara sobre todas las rutas del tipo /users/...

// Levanta el servior y este se pone a esuchar las peticiones en el puerto 3000.
app.listen(3000, function (err) {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});
