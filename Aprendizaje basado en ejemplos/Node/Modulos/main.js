"use strict";

// Tipo FICHERO: Hay qye especificar bien el path (./loQueSea "o" ../loQueSea)
const ecuations = require("./mod1");
let first = ecuations.ec2First(1,2,1);
let second = ecuations.ec2First(1,2,1);
console.log(first + " <-> " + second);

// Tipo FICHERO: Hay qye especificar bien el path (./loQueSea "o" ../loQueSea)
const calculadora = require("./mod2");
let calc = new calculadora();
calc.setA = 12;
calc.setB = 2.6;
console.log("Suma: " + calc.suma());

/*
Tipo CORE: No hay que especificar un path relativo. Forman parte de la distribucion de Node.
Modulos CORE mas comunes: os, fs, path, http, util, morgan, express, body-parser etc.
*/

const os = require("os");
console.log(
    os.hostname() + " " + 
    os.userInfo() + " " + 
    os.homedir() + " " +
    os.platform() + " " +
    os.endianness() + " " +
    os.arch() + " " +
    os.networkInterfaces() + " " +
    os.tmpdir() + " " +
    os.cpus()
);

const util = require("util");
console.log(
    util.isArray(7) + " " +
    util.isPrimitive(7) + " " +
    util.isObject(7)
);

const path = require("path");
// parse --> Dada una ruta devuelve un objeto (ruta,fichero,extension,nombre).
console.log(path.parse(__filename));
// join --> Une y normaliza la ruta usando el separador del sistema operativo.
console.log(path.join(__dirname , ".." , "algorithms"));

const fs = require("fs");
/*
Si algo depende del resultado de una funcion asincrona, este algo no debe
hacerse despues de la llamada asincrona, si no dentro de su callback.
*/
fs.appendFile("ejemplo.txt", "\nAñadido al fichero.", function(err) {
    if(err) {
        console.log(err);
    } else {
        fs.readFile("ejemplo.txt" /*, {encoding: "utf-8"}*/, function(err,data) {
            if(err) {
                console.log(err);
            } else {
                // console.log(data); // HEX (Hexadecimal)
                console.log(data.toString("utf-8")); // data es un objeto Buffer que trabaja con bytes.
            }
        });
    }
});

/*
Tipo PAQUETE: Son modulos pensados para ser utilizados en otros proyectos.
Se instalan dentro de la carpeta node_modules.
Si el modulo lo compone un unico fichero require lo buscara dentro de la carpeta node_modules.
Si el modulo se compone de mas de un fichero, hay que crear una carpeta que los contenga a todos,
dentro de esta ha de haber un modulo index.js que exporte las funciones de todos los demas.
*/

/*
const texts = require("texts");
let message = new texts.message("Hola Mundo");
let encrypt = new texts.encrypt("La contraseña del terminal es 1234");
console.log(message.showMessage() + " <-> " + encrypt.encryptWord("1234","\b"));
*/

/*

A veces los unos paquetes tienen dependencias de otros y requieren ser instalados mediante
el gestor de paquetes npm, el cual resuelve todas las dependencias automaticamente. Cuando
un paquete se instala de esta forma el propio npm se ocupa de crear la carpeta node_modules
si esta no esta creada. Una vez creada se instala en ella el paquete.

Para instalar un paquete con npm e indicar en el fichero package.json que este proyecto requiere
de  dicha libreria, instalaremos el paquete con: npm install <packageName> --save

Otras veces puede que un paquete incorpore ficheros ejecutables diseñados para poder ser usados
en cualquier proyecto del sistema. Para poder ser invocados desde cualquier proyecto estos paquetes
han de ser instalados de forma global mediante: npm install -g <packageName>

*/

const express = require("express"); // npm install --save express

