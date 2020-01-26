"use strict";

// Modulo express.
const express = require("express");

// Declaracion del router y sus manejadores.
const usersRouter = express.Router();

usersRouter.get("/showUsers", function (request, response) {
    response.status(200);
    response.type("html");
    response.end("<p>user1, user2, user3 ...</p>");
});

usersRouter.get("/sayHello/:name", function (request, response) {
    response.status(200);
    response.type("html");
    let name = request.params.name;
    let isNumber = !isNaN(Number.parseInt(name));
    response.end(`Hello ${ (isNumber)? "World" : name } !!!`);
});

module.exports = usersRouter;