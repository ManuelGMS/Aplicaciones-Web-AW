"use strict";

// Modulos de Node.js
const fs = require("fs");
const path = require("path");
const mysql = require("mysql");
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Modulos propios
const utils = require("./utils");
const config = require("./config");
const DAOTasks = require("./DAOTasks");

// Crear un servidor Express.js
const express = require("express");
const app = express();

// Crea un pool de conexiones a la base de datos.
const pool = mysql.createPool(config.mysqlConfig);

// Crea una instancia de DAOTasks
const daoT = new DAOTasks(pool);

// Obtener la ruta a los ficheros estaticos.
const ficherosEstaticos = path.join(__dirname, "public");

// Usuario para pruebas (debe existir en la BBDD).
let usuario = {
    email: "usuario@ucm.es",
    password: "1234",
    img: "user.png"
}

// Configurar el motor de renderizacion de plantillas y la ubicacion de estas.
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// **** MIDDLEWARES BASICOS *******************************************************************

// Morgan muestra por pantalla las peticiones recibidas.
app.use(morgan("dev"));

// Static comprueba si se esta solicitando un recurso estatico, si es asi, lo devuelve.
app.use(express.static(ficherosEstaticos));

// **** MANEJADORES DE RUTAS (GET) ************************************************************

// Manejador del nodo principal, redirije a la pagina de tareas.
app.get("/", function(request,response) {
    response.status(200);
    response.redirect("/tasks");
});
    
// Manejador de la pagina de tareas.
app.get("/tasks", function(request,response,next) {
   
    daoT.getAllTasks(usuario.email, function (err, tareas) {

        if (err) {
    
            next(err);
        
        } else {
            
            if(tareas.length == 0) {
    
                console.log("No hay tareas para el usuario introducido.")
                response.status(200);
                response.render("tasks" , { taskList: tareas , usuario: usuario } );
                
            } else {
    
                console.log("Las tareas del usuario introducido son:");
    
                tareas.forEach(function(tarea) {
                    console.log(tarea.id + " ; " + tarea.text + " ; " + tarea.done + " ; " + tarea.tags);
                });
    
                response.status(200);
                response.render("tasks" , { taskList: tareas , usuario: usuario } );
    
            }
    
        }
    
    });

});

// Marcar una tarea como finalizada.
app.get("/finish/:taskId", function(request,response,next) {

    daoT.markTaskDone(request.params.taskId, function(err) {

        if (err) {

            next(err);
        
        } else {
        
            console.log("Tarea marcada como hecha.")
            response.status(200);
            response.redirect("/tasks");

        }

    });

});

// Eliminar tareas completadas.
app.get("/deleteCompleted", function(request,response,next) {

    daoT.deleteCompleted(usuario.email,function(err) {
    
        if (err) {
        
            next(err);
        
        } else {

            console.log("Tareas completadas borradas.");
            response.status(200);
            response.redirect("/tasks");

        }

    });

});

// **** MIDDLEWARE BODY-PARSER ****************************************************************

// Body-parser obtiene e interpreta el cuerpo de la peticion HTTP.
app.use(bodyParser.urlencoded({ extended: false }));

// **** MANEJADORES DE RUTAS (POST) ***********************************************************

// Añadir una tarea nueva.
app.post("/addTask", function(request,response,next){

    let task = utils.createTask(request.body.tarea);

    daoT.insertTask(usuario.email, task, function(err) {

        if (err) {
            next(err);
        } else {
            console.log("Tarea nueva añadida.")
            response.status(200);
            response.redirect("/tasks");
        }

    });

});

// **** MIDDLEWARES PARA EL MANEJO DE ERRORES *************************************************

// Manejador del ERROR 404 (Recurso no encontrado).
app.use(function(request, response) {
    response.status(404);
    response.render("error404", { recurso: request.url });
});

// Manejador del ERROR 500 (Error interno).
app.use(function(error,request, response, next) {
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
