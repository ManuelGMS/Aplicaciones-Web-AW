"use strict";

const path = require("path");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const shopRouter = require("./shopRouter");
const basicsRouter = require("./basicsRouter");

const expressApplication = express();

const viewFiles = path.join(__dirname,"views");
const staticFiles = path.join(__dirname,"public");

// npm install --save ejs
expressApplication.set("view engine", "ejs");
expressApplication.set("views", viewFiles);

expressApplication.use(morgan("dev"));

expressApplication.use(cookieParser());

expressApplication.use(express.static(staticFiles));

expressApplication.use(bodyParser.urlencoded({ extended: false }));

expressApplication.use("/basics", basicsRouter);

expressApplication.get("/home", function(request,response,next) {
    response.status(200);
    response.type(".html");
    response.end("Bienvenido !!!");
});

expressApplication.use(function(request,response,next) {
    
    // Accedemos a la cabecera Cookie de la peticion http (el valor se almacena en texto plano)
    // let cookie = request.get("Cookie");
    // console.log("COOKIE: " + cookie);

    // El middleware cookie-parser carga los datos de la cabecera Cookie y añade al objeto request
    // un objecto cookies con todas las cookies existentes. El valor puede ser de cualquier tipo.
    let cookies = request.cookies;
    // console.log(cookies);
    // console.log(cookies["usr"]);

    if(!cookies["usr"]) {
        response.status(200);
        response.type(".html");
        response.end("El usuario no esta registrado, autorizacion denegada.");
    } else {
        next();
    }
});

expressApplication.use("/shop", shopRouter);

expressApplication.listen(3000, function(err) {
    if(err) {
        console.log("No se ha podido iniciar la aplicacion en el puerto 3000");
    } else {
        console.log("Aplicacion inicializada en el puerto 3000");
    }
});