"use strict";

// Modulos de node.
const path = require("path");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");

// Modulos propios.
// Configuracion de la conexion a la base de datos y puerto de escucha del serrvidor.
const config = require("./config");
// Declaracion de los Routers de la aplicacion.
const routerAmigos = require("./Routers/RouterAmigos");
const routerBasicas = require("./Routers/RouterBasicas");
const routerUsuarios = require("./Routers/RouterUsuarios");
const routerCuestiones = require("./Routers/RouterCuestiones");

// Framework Express.
const app = express();

// Configuramos la BBDD para que almacene la sesion de usuario.
const mysqlStore = mysqlSession(session);
const sessionStore = new mysqlStore(config.mysqlConfig);

// Objeto de sesion de usuario.
const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

// Motor de plantillas y localizacion de vistas.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// **** CADENA DE MIDDLEWARES ****************************************************************

// El modulo de morgan devuelve un middleware que muestra por pantalla las peticiones recividas.
app.use(morgan("dev"));

// Vemos si se esta solicitando un recurso estatico, si es asi, lo devolvemos.
app.use(express.static(path.join(__dirname, "public")));

// Middleware para el uso de los mensajes Flash.
app.use(function(request, response, next) {
    
    // Los mensajes Flash estan siempre disponibles al viajar por la cadena de middleware en el response.
    response.setFlash = function(msg) {
        // Establece el mensaje Flash dentro de la sesion del usuario.
        request.session.flashMsg = msg;
    };

    // El mensaje Flash siempre esta disponible en las vistas al guardarse la funcion en las locals.
    response.locals.getAndClearFlash = function() {
        // Obtiene el mensaje Flash de la sesion del usuario y lo borra de la sesion.
        let msg = request.session.flashMsg;
        delete request.session.flashMsg;
        return msg;
    };

    next();

});

// Crea el objeto session dentro del objeto request.
app.use(middlewareSession);

// Middleware body-parser para acceder a las variables del cuerpo de la peticion (request.body.<var>).
app.use(bodyParser.urlencoded({ extended: false }));

// Router que gestiona las rutas que no requieren que el usuario haya iniciado sesion.
app.use("/usuarios", routerBasicas);

// Middleware de control de sesion.
app.use(function (request, response, next) {

    if (request.session.usuario !== undefined) {
        // En response.locals podemos meter cualquier cosa, ya que al acabar la peticion se borra.
        // El response.locals solo existe en el servidor, nunca viaja al usuario. 
        response.locals.usuario = request.session.usuario;
        next();
    } else {
        response.status(200);
        response.render("PaginaDeIdentificacionDeUsuario", { errorMsg: "Identifíquese para continuar." });
    }

});

// Routers que gestionan rutas que requieren que el usuario este validado.
app.use("/usuarios", routerUsuarios);

// Routers que gestionan rutas relacionadas con la funcionalidad de los amigos.
app.use("/amigos", routerAmigos);

// Routers que gestionan rutas relacionadas con la funcionalidad de los amigos.
app.use("/cuestiones", routerCuestiones);

// Middleware para el control del error 404 (recurso no encontrado).
app.use(function(request, response, next) {
    response.status(404);
    response.render("error404", { recurso: request.url });
});

// Middleware para el control del error 500 (error interno).
app.use(function(error, request, response, next) {
    response.status(500);
    response.render("error500", { mensaje: error.message, pila: error.stack });
});

// **** INICIALIZACION DEL SERVIDOR WEB ******************************************************

app.listen(config.port, function (err) {

    if (err) {
        console.error(`No se pudo inicializar el servidor: ${err.message}`);
    } else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }

});