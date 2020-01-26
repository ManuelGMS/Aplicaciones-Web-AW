"use strict";

const express = require("express");

// Aplicacion express (un servidor que escucha en un puerto).
const app = express();

/*
Manejadores de ruta:
    + use --> Se ejecuta independientemente del tipo de peticion.
    + get --> Para manejar peticiones GET.
    + post --> Para manejar peticiones POST.
*/

let usuarios = ["Javier Montoro", "Dolores Vega", "Beatriz Nito"];

app.get("/", function (request, response) {
    response.status(200);
    response.type("text/html");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Lista de usuarios</title>");
    response.write('<meta charset="utf-8">');
    response.write("</head>");
    response.write("<body>");
    response.write("<h1>¡Bienvenido!</h1>");
    response.write("</body>");
    response.end("</html>");
});

app.get("/usuarios.html", function (request, response) {
    response.redirect("/users.html");
});

app.get("/users.html", function (request, response) {
    response.status(200);
    response.type("text/html");
    response.write("<html>");
    response.write("<head>");
    response.write("<title>Lista de usuarios</title>");
    response.write('<meta charset="utf-8">')
    response.write("</head>");
    response.write("<body><ul>");
    usuarios.forEach((usuario) => { response.write(`<li>${usuario}</li>`) });
    response.write("</ul></body>");
    response.end("</html>");
});

// Levanta el servior y este se pone a esuchar las peticiones en el puerto 3000.
app.listen(3000, function (err) {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});


