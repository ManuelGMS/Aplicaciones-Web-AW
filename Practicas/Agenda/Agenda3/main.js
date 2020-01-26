"use strict";

const mysql = require("mysql");

const config = require("./config");
const DAOTask = require("./DAOTasks");
const DAOUser = require("./DAOUsers");

const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let oDAOTask = new DAOTask(pool);
let oDAOUser = new DAOUser(pool);

let uncompleteTask0 = {
    text: "Practica 8 GIW (mongoengine)",
    done: 0,
    tags: ["GIW", "python", "mongo", "mongoDB", "NoSQL", "tarea"]
};

let uncompleteTask1 = {
    text: "Practica de JPA para MS",
    done: 0,
    tags: ["MS", "JPA", "tarea"]
};

let completeTask0 = {
    text: "Realizar tarea AW",
    done: 1,
    tags: ["AW", "tarea", "trabajo"]
};

let completeTask1 = {
    text: "Practica cubos OLAP de SGE",
    done: 1,
    tags: ["SGE", "OLAP", "trabajo"]
};

// **** PRUEBAS ********************************************************************************

/*

// OK's
oDAOUser.isUserCorrect("mangue01@ucm.es", "1234", cb_isUserCorrect);
oDAOUser.isUserCorrect("fatimag@ucm.es", "1234", cb_isUserCorrect);
// KO's
oDAOUser.isUserCorrect("analacor@ucm.es", "1234", cb_isUserCorrect);
oDAOUser.isUserCorrect("gdelga@ucm.es", "1234", cb_isUserCorrect);

// OK's
oDAOUser.getUserImageName("mangue01@ucm.es", cb_getUserImageName);
oDAOUser.getUserImageName("fatimag@ucm.es", cb_getUserImageName);
oDAOUser.getUserImageName("natrod@ucm.es", cb_getUserImageName);
// KO's
oDAOUser.getUserImageName("analacor@ucm.es", cb_getUserImageName);
oDAOUser.getUserImageName("gdelga@ucm.es", cb_getUserImageName);

// OK's
oDAOTask.insertTask("fatimag@ucm.es", completeTask0, cb_insertTask);
oDAOTask.insertTask("fatimag@ucm.es", uncompleteTask1, cb_insertTask);
oDAOTask.insertTask("mangue01@ucm.es", completeTask1, cb_insertTask);
oDAOTask.insertTask("mangue01@ucm.es", uncompleteTask0, cb_insertTask);

// OK's
oDAOTask.getAllTasks("mangue01@ucm.es", cb_getAllTask);
oDAOTask.getAllTasks("fatimag@ucm.es", cb_getAllTask);
// KO's
oDAOTask.getAllTasks("analacor@ucm.es", cb_getAllTask);
oDAOTask.getAllTasks("gdelga@ucm.es", cb_getAllTask);
oDAOTask.getAllTasks("natrod@ucm.es", cb_getAllTask);

// OK's
oDAOTask.markTaskDone(54, cb_markTaskDone);
oDAOTask.markTaskDone(56, cb_markTaskDone);

// OK's
oDAOTask.deleteCompleted("fatimag@ucm.es", cb_deleteCompleted);
oDAOTask.deleteCompleted("mangue01@ucm.es", cb_deleteCompleted);

*/

// **** CALLBACKS ********************************************************************************

function cb_isUserCorrect(err, result) {

    if (err) {
        console.log(err.message);
    } else if (result) {
        console.log("Usuario y contraseña correctos.");
    } else {
        console.log("Usuario y/o contraseña incorrectos.");
    }

}

function cb_getUserImageName(err, img) {

    if (err) {
        console.log(err.message);
    } else {
        console.log(img);
    }

}

function cb_insertTask(err) {

    if (err) {
        console.log(err.message);
    } else {
        console.log("Añadiendo un tag a la nueva tarea.")
    }

}

function cb_getAllTask(err, tareas) {

    if (err) {
    
        console.log(err.message);
    
    } else {
        
        if(tareas.length == 0) {

            console.log("No hay tareas para el usuario introducido.")

        } else {

            console.log("Las tareas del usuario introducido son:");

            tareas.forEach(function(tarea) {

                console.log(tarea.id + " ; " + tarea.text + " ; " + tarea.done + " ; " + tarea.tags);

            });

        }

    }

}

function cb_markTaskDone(err) {

    if (err) {

        console.log(err.message);
    
    } else {
      
        console.log("Tarea marcada como hecha.")

    }

}

function cb_deleteCompleted(err) {

    if (err) {
        
        console.log(err.message);
    
    } else {
    
        console.log("Tareas completadas borradas.");
    
    }

}
