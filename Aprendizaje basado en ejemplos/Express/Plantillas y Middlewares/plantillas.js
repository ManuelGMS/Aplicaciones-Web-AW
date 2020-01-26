"use strict";

const os = require("os");
const path = require("path");
const morgan = require("morgan");
const express = require("express");

// Aplicacion express (un servidor que escucha en un puerto).
const app = express();

// Indicamos el directorio de las vistas y que el motor de renderizado de las plantillas es EJS.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/*

Manejadores de ruta:
    + use --> Se ejecuta independientemente del tipo de peticion.
    + get --> Para manejar peticiones GET.
    + post --> Para manejar peticiones POST.

Los objetos app y response tienen cada uno un atributo
locals en el que podemos añadir variables, que serán
accesibles desde cualquier plantilla. Sin embargo para
mostrar informacion por la vista solo se recomienda el
uso de response.locals, ya que esta variable solo dura
durante el recorrido que hace la peticion por la cadena
de middlewares, mientras que app.locals es una variable
global de la aplicacion express y ese uso no seria correcto.

Los mensaje Flash utilizan esto anteriormente discreto para
proporcionar al programador una forma de enviar mensajes
a las vistas de la aplicacion.

*/

// Middleware morgan, proporfiona informacion de utilidad sobre las peticiones.
app.use(morgan("dev"));

// Middleware para el uso de mensajes Flash.
app.use(function (request, response, next) {
    /*
    Crea en response una funcion setFlash que permite grabar en la sesion de usuario un mensaje
    que deseamos mostrarle por pantalla.
    */
    response.setFlash = function(msg) {
        // request.session.flashMsg = msg;
    };
    /*
    Crea en response.locals una funcion getAndClearFlash que permite recuperar
    y borrar el mensaje anterior.
    */
    response.locals.getAndClearFlash = function() {
        // let msg = request.session.flashMsg;
        // delete request.session.flashMsg;
        // return msg;
    };
    next(); // Es obligatorio indicar de forma explicita si se pasa o no al siguiente middleware.
});

// Middleware que amplia la informacion del objeto de la peticion.
app.use(function(request, response, next) {
    request.forbidden = request.ip.startsWith("121.");
    // next(new Error("No se puede establecer una conexion con el servidor de BBDD.")); // Error 500
    next();
});
    
// Middleware que nos permite disponer de cierta informacion del SO en las vistas.
app.use(function (request, response, next) {
    /* Esto ya lo realiza el middleware morgan.
    console.log("IP: " + request.ip);
    console.log("PROTOCOL: " + request.protocol);
    console.log("METHOD: " + request.method);
    console.log("URL: " + request.url);
    */
    response.locals.currentUser = os.userInfo();
    response.locals.currentHost = os.hostname();
    next(); // Es obligatorio indicar de forma explicita si se pasa o no al siguiente middleware.
});

app.get("/home.html", function (request, response) {
    response.status(200);
    response.type("html");
    response.render("home", { users: ["Manu", "Natalia", "Fati", "Bruno", "Pau", "Chiquitin"] });
});

// Middleware para el control del error 404 (Recurso no encontrado).
app.use(function(request, response, next) {
    response.status(404);
    response.type("html");
    response.end("<b>Error 404: Recurso no encontrado.</b>")
});

// Middleware para el control del error 500 (Error interno).
app.use(function(error, request, response, next) {
    response.status(500);
    response.type("html");
    response.end("<b>Error 500: Error interno.</b><br>" + error.message + "<br>" + error.stack);
});

// Levanta el servior y este se pone a esuchar las peticiones en el puerto 3000.
app.listen(3000, function (err) {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});
