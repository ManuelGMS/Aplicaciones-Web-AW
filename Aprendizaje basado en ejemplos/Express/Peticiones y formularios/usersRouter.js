"use strict";

let msg = "message";

const express = require("express");

const userRouter = express.Router();

const users = ["Manu","Natalia","Fati","Pau","Chiquitin"];

userRouter.get("/showForms", function(request,response,next) {
    response.status(200);
    response.type("html");
    response.render("Web"); 
});

userRouter.get("/exists", function(request,response,next) {
    let nombre = request.query.userName;
    response.status(200);
    response.type("html");
    response.write("<p>" + nombre + "</p>");
    response.write("<p>" + users + "</p>");
    response.write("<p>" + ((users.indexOf(nombre) != -1)? true : false) + "</p>");
    response.end("Fin"); 
});

userRouter.get("/exists/:userName", function(request,response,next) {
    let nombre = request.params.userName;
    response.status(200);
    response.type("html");
    response.write("<p>" + nombre + "</p>");
    response.write("<p>" + users + "</p>");
    response.write("<p>" + ((users.indexOf(nombre) != -1)? true : false) + "</p>");
    response.end("Fin"); 
});

userRouter.post("/insert", function(request,response,next) {
    let nombre = request.body.userName;
    users.push(nombre);
    response.write("<p>" + nombre + "</p>");
    response.write("<p>" + users + "</p>");
    response.end("Fin"); 
});

userRouter.post("/insert/:userName", function(request,response,next) {
    let nombre = request.params.userName;
    users.push(nombre);
    response.write("<p>" + nombre + "</p>");
    response.write("<p>" + users + "</p>");
    response.end("Fin"); 
});

module.exports = userRouter;
