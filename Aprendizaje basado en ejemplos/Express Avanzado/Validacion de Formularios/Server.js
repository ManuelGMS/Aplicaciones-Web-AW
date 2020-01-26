"use strict";

const path = require("path");
const morgan = require("morgan");
const multer = require("multer");
const express = require("express");

const viewFiles = path.join(__dirname,"views");
const imageFiles = path.join(__dirname,"uploads");
const staticFiles = path.join(__dirname,"public");

const expressApplication = express();

expressApplication.set("view engine","ejs");
expressApplication.set("views", viewFiles);

const middlewareFactory = multer({
    dest:path.join(staticFiles,"img"),
    fileFilter: function(request, file, callBack) {
        console.log("TYPE: " + file.mimetype.split("/")[1]);
        if(file.mimetype.split("/")[1] === "jpeg")
            callBack(null,true);
        else
            callBack(null,false);
    }
}); // imageFiles

expressApplication.use(morgan("dev"));

expressApplication.use(express.static(staticFiles));

expressApplication.get("/", function(request,response,next) {
    response.status(200);
    response.type(".html");
    response.render("formPage");
});

expressApplication.post(
    "/obtainData", 
    middlewareFactory.single("userImage"), 
    function(request,response,next) {
        
        console.log(request.body.userName + " <-> " + request.body.userPassword)
        
        if(request.file != undefined)
            console.log(request.file.fieldname + " <-> " + request.file.filename);
        else
            console.log("NO SE HA CARGADO NINGUNA IMAGEN O LA IMAGEN NO ESTA SOPORTADA.");

        response.status(200);
        response.type(".html");
        
        if(request.file != undefined)
            response.write(`<img src='/img/${request.file.filename}'>`);
        else
            response.write("NO SE HA CARGADO NINGUNA IMAGEN O LA IMAGEN NO ESTA SOPORTADA.");

        response.end();
    }
);

expressApplication.listen(3000, function(err) {
    if(err) {
        console.log("No se puede inicializar el servidor en el puerto 3000");
    } else {
        console.log("Servidor inicializao en el puerto 3000");
    }
});