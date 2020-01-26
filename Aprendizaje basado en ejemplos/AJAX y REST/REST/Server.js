"use strict";

const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressApplication = require("express");

const app = expressApplication();

const users = [
    { "nombre": "Manu", "puntos": 8 },
    { "nombre": "Chiquitin", "puntos": 10 },
    { "nombre": "Natalia", "puntos": 7 },
    { "nombre": "Pau", "puntos": 5 },
    { "nombre": "Fati", "puntos": 8 },
    { "nombre": "Diego", "puntos": 8 }
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(morgan("dev"));

app.use(expressApplication.static(path.join(__dirname, "public")));

app.use(bodyParser.json()); // Si el contenido viaja como JSON notation.
app.use(bodyParser.urlencoded({extended: false})); // Si el contenido viaja como URL notation.

app.get("/", function(request,response,next) {
    response.status(200);
    response.type(".html");
    response.render("formulario");
});

app.get("/obtenerUsuarios", function (request, response, next) {
    response.json(users); // (200) Transforma el objeto JavaScript a JSON y lo envia haciendo uso de end()
});

app.get("/obtenerUsuario", function (request, response, next) {
    let sol = undefined;
    for (let i = 0; i < users.length; ++i) {
        if (users[i].nombre == request.query.nombre) {
            sol = users[i];
            i = users.length;
        }
    }
    if (sol) {
        response.json(sol); // (200) Transforma el objeto JavaScript a JSON y lo envia haciendo uso de end()
    } else {
        response.status(404); // NOT-FOUND
        response.end();
    }
});

app.post("/insertarUsuario", function (request, response, next) {
    let nuevoUsuario = request.body; // Recordemos que el cuerpo contiene todo el documento JSON.
    users.push(nuevoUsuario);
    response.status(201); // OK
    response.end();
});

app.put("/modificarUsuario", function (request, response, next) {
    let ok = false;
    let user = request.body;
    for (let i = 0; i < users.length; ++i) {
        if (users[i].nombre == user.name) {
            ok = true;
            users[i].puntos = user.points;
            i = users.length;
        }
    }
    if(ok) {
        response.status(201); // OK
    } else {
        response.status(404); // NOT-FOUND
    }
    response.end();
});

app.delete("/borrarUsuario", function (request, response, next) {
    let ok = false;
    for (let i = 0; i < users.length; ++i) {
        if (users[i].nombre == request.body.name) {
            ok = true;
            users.splice(i,1);
            i = users.length;
        }
    }
    if(ok) {
        response.status(200); // OK
    } else {
        response.status(404); // NOT-FOUND
    }
    response.end();
});

app.use(function(request,response,next) {
    response.status(404);
    response.end("No se ha encontrado: " + request.url);
});

app.listen(3000, function (err) {
    if (err) {
        console.log("Error al iniciar el servidor en el puerto 3000");
    } else {
        console.log("Servidor iniciado en el puerto 3000");
    }
});