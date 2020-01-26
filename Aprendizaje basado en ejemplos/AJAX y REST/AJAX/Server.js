"use strict";

const path = require("path");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressApplication = require("express");

const app = expressApplication();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));

app.use(morgan("dev"));

app.use(expressApplication.static(path.join(__dirname,"public")));

// Este middleware lee el contenido JSON de la peticion y añade los objetos de la peticion a la propiedad body.
app.use(bodyParser.json()); 

app.get("/showFormulario", function(request, response, next) {
    response.status(200);
    response.type(".html");
    response.render("formulario");
});

app.get("/factorial", function (request, response, next) {
    let numero = Number(request.query.number);
    if (!isNaN(numero) && numero >= 0) {
        let solution = 1;
        for (let i = 2; i <= numero; i++)
            solution *= i;
        response.json({ result: solution }); // Transformamos el objeto a JSON notation y lo devolvemos.
    } else {
        response.status(400); // Bad-Request --> Solicitud incorrecta.
        response.end();
    }
});

app.post("/acumulado", function (request, response, next) {
    let numero = Number(request.body.number);
    if (!isNaN(numero) && numero >= 0) {
        let solution = (1 + numero) * (numero / 2);
        response.json({ result: solution }); // Transformamos el objeto a JSON notation y lo devolvemos.
    } else {
        response.status(400); // Bad-Request --> Solicitud incorrecta.
        response.end();
    }
});

app.listen(3000, function (err) {
    if (err) {
        console.log("Error al intentar inicializar el servidor en el puerto 3000.")
    } else {
        console.log("Inicializado el servidor en el puerto 3000.");
    }
});