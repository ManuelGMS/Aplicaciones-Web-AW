"use strict";

const path = require("path");
const morgan = require("morgan");
const express = require("express");

// Aplicacion express (un servidor que escucha en un puerto).
const app = express();

// Ubicación de los recursos estáticos.
const staticFiles = path.join(__dirname, "public");

/*
Manejadores de ruta:
    + use --> Se ejecuta independientemente del tipo de peticion.
    + get --> Para manejar peticiones GET.
    + post --> Para manejar peticiones POST.
*/

// El middleware morgan proporciona informacion sobre la peticion recibida.
app.use(morgan("dev")); 

// El middleware static puede servir los recursos estaticos de un directorio forma automatica.
app.use(express.static(staticFiles));

app.get("/home", function(request, response) {
    response.status(200);
    response.type("html");
    // sendFile requiere trabajar con una ruta absoluta.
    response.sendFile(path.join(__dirname , "views" , "welcome.html"));
});

app.get("/Estilo.css", function(request, response) {
    response.status(200);
    response.type("css");
    // sendFile requiere trabajar con una ruta absoluta.
    response.sendFile(path.join(__dirname , "public" , "css" , "Estilo.css"));
});

app.get("/code.jpg", function(request, response) {
    response.status(200);
    response.type("jpg");
    // sendFile requiere trabajar con una ruta absoluta.
    response.sendFile(path.join(__dirname , "public" , "img" , "code.jpg"));
});

// Levanta el servior y este se pone a esuchar las peticiones en el puerto 3000.
app.listen(3000, function (err) {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});
