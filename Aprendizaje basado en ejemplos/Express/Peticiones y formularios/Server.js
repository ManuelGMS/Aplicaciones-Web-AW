"use strict";

const path = require("path");
const bodyParser = require("body-parser");
const expressApplication = require("express");

const viewFiles = path.join(__dirname,"/");
const staticFiles = path.join(__dirname,"/");

const app = expressApplication();

// npm install --save ejs
app.set("view engine", "ejs");
app.set("views", viewFiles);

const usersRouter = require("./usersRouter");

app.use(expressApplication.static(staticFiles));

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/users", usersRouter);

app.get("/home", function(request, response, next) {
    response.status(200);
    response.type("html");
    response.end("Bienvenido !!!");
});

app.listen(3000, function(err) {
    if(err) {
        console.log("No se ha podido inicializar el servidor debiado a: " + err.message);
    } else {
        console.log("Servidor inicializado en el puerto 3000.");
    }
});
