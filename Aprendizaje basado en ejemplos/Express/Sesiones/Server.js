"use strict";

const path = require("path");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");

// Express session por defecto persiste la sesion en memoria.
const expressSession = require("express-session");

// Permite que la sesion express seguarde en una base de datos mysql.
const mysqlSession = require("express-mysql-session");

const config = require("./config");
const shopRouter = require("./Routers/shopRouter");
const basicsRouter = require("./Routers/basicsRouter");

const expressApplication = express();
const mysqlSessionStore = mysqlSession(expressSession);
const sessionStore = new mysqlSessionStore(config.mysqlConfig);

const viewFiles = path.join(__dirname,"views");
const staticFiles = path.join(__dirname,"public");

// npm install --save ejs
expressApplication.set("view engine", "ejs");
expressApplication.set("views", viewFiles);

expressApplication.use(morgan("dev"));

expressApplication.use(express.static(staticFiles));

expressApplication.use(bodyParser.urlencoded({ extended: false }));

expressApplication.use(
    expressSession({ 
        resave: false,
        secret: "foobar34",
        store: sessionStore, 
        saveUninitialized: false 
    })
);

expressApplication.get("/", function(request, response, next) {
    response.redirect("/basics/showLogin");
});

expressApplication.use("/basics", basicsRouter);

expressApplication.use(function(request,response,next) {
    if(request.session.userData == undefined) {
        response.status(200);
        response.type(".html");
        response.redirect("/basics/showLogin");
    } else {
        response.locals.userData = request.session.userData;
        next();
    }
});

expressApplication.use("/shop", shopRouter);

expressApplication.listen(config.port, function (err) {
    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});