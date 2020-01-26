"use strict";

// Modulos de Node.js
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const session = require("express-session");
const mysqlSession = require("express-mysql-session");

// Modulos propios
const utils = require("./utils");
const config = require("./config");
const DAOTasks = require("./DAOTasks");
const DAOUsers = require("./DAOUsers");

// Declaramos el almacen de la sesion.
const mysqlStore = mysqlSession(session);
const sessionStore = new mysqlStore(config.mysqlConfig);

// Crear un servidor Express.js
const express = require("express");
const app = express();

// Crea un pool de conexiones a la base de datos.
const pool = mysql.createPool(config.mysqlConfig);

// Crea una instancia de DAOTasks
const daoT = new DAOTasks(pool);
const daoU = new DAOUsers(pool);

const middlewareSession = session({
    saveUninitialized: false,
    secret: "foobar34",
    resave: false,
    store: sessionStore
});

// Configurar el motor de renderizacion de plantillas y la ubicacion de estas.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// **** MIDDLEWARES BASICOS *******************************************************************

// Morgan muestra por pantalla las peticiones recibidas.
app.use(morgan("dev"));

// Crea el objeto session dentro del objeto request. (No se graba el registro).
app.use(middlewareSession);

// Body-parser obtiene e interpreta el cuerpo de la peticion HTTP.
app.use(bodyParser.urlencoded({ extended: false }));

// Static comprueba si se esta solicitando un recurso estatico, si es asi, lo devuelve.
app.use(express.static(path.join(__dirname, "public")));

// **** RUTAS PARA USUARIOS NO IDENTIFICADOS ***************************************************

// Manejador del nodo principal, redirije a la pagina de tareas.
app.get("/", function (request, response) {
    response.status(200);
    response.redirect("/login");
});

app.get("/login", function (request, response) {
    response.status(200);
    response.render("login", { errorMsg: null });
});

app.post("/login", function (request, response, next) {

    daoU.isUserCorrect(request.body.correo,
        request.body.password, function (err, ok) {
            if (err) {
                next(err);
            } else if (ok) {
                // Graba la sesion en la base de datos (como un registro).
                request.session.currentUser = request.body.correo;
                response.status(200);
                response.redirect("/tasks");
            } else {
                response.status(200);
                response.render("login", { errorMsg: " ​Dirección de correo y/o contraseña no válidos." });
            }
        });

});

// **** MIDDLEWARE DE AUTENTIFICACION DE USUARIO ***********************************************

// Si el usuario que hace la peticion no esta identificacdo, no pasara al siguiente middlware.
app.use(function (request, response, next) {
    if (request.session.currentUser !== undefined) {
        response.locals.userEmail = request.session.currentUser;
        next();
    } else {
        response.status(200);
        response.render("/login", { errorMsg: "Identifíquese para continuar" });
    }
});

// **** RUTAS PARA USUARIOS IDENTIFICADOS ******************************************************

// Manejador para la carga de la imagen del perfil de usuario.
app.get("/imagenUsuario", function (request, response, next) {

    daoU.getUserImageName(response.locals.userEmail, function (err, imagenPerfil) {

        if (err) {
            next(err);
        } else {

            let pathImg = null;

            if(imagenPerfil) {
                pathImg = path.join(__dirname, "profile_imgs", imagenPerfil);
            } else {
                pathImg = path.join(__dirname, "public", "img", "NoPerfil.png");
            }

            response.sendFile(pathImg);            

        }

    });

});

// Manejador de la pagina de tareas.
app.get("/tasks", function (request, response, next) {

    // Toda la informacion de un usuario cuelga de sesion.
    daoT.getAllTasks(response.locals.userEmail, function (err, tareas) {

        if (err) {
            next(err);
        } else {
            response.status(200);
            response.render("tasks", { taskList: tareas });
        }

    });

});

// Manejador para marcar tareas como finalizadas.
app.get("/finish/:taskId", function (request, response, next) {

    daoT.markTaskDone(request.params.taskId, function (err) {

        if (err) {
            next(err);
        } else {
            response.status(200);
            response.redirect("/tasks");
        }

    });

});

// Manejador para la eliminacion de tareas.
app.get("/deleteCompleted", function (request, response, next) {

    daoT.deleteCompleted(response.locals.userEmail, function (err) {

        if (err) {
            next(err);
        } else {
            response.status(200);
            response.redirect("/tasks");
        }

    });

});

// Manejador para cerrar la sesion.
app.get("/logout", function (request, response) {
    request.session.destroy();
    response.status(200);
    response.redirect("/login");
});

// Manejador para añadir una nueva tarea.
app.post("/addTask", function (request, response, next) {

    let task = utils.createTask(request.body.tarea);

    daoT.insertTask(response.locals.userEmail, task, function (err) {

        if (err) {
            next(err);
        } else {
            response.status(200);
            response.redirect("/tasks");
        }

    });

});

// **** MIDDLEWARES PARA EL MANEJO DE ERRORES *************************************************

// Manejador del ERROR 404 (Recurso no encontrado).
app.use(function (request, response) {
    response.status(404);
    response.render("error404", { recurso: request.url });
});

// Manejador del ERROR 500 (Error interno).
app.use(function (error, request, response, next) {
    response.status(500);
    response.render("error500", { mensaje: error.message });
});

// **** INICIALIZACION DEL SERVIDOR ***********************************************************

// Arranque del servidor
app.listen(config.port, function (err) {

    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }

});
