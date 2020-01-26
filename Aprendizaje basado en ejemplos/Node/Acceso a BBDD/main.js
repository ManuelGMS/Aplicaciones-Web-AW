"use strict";

const Dao = require("./DAO");
const mysql = require("mysql");
const config = require("./config");
const pool = mysql.createPool(config.mysqlConfig);

let dao = new Dao(pool);

dao.readAllUsers(function(err,rows) {
    if(err) {
        console.log(err);
    } else {
        if(rows.length == 0) {
            console.log("Aun no hay usuario en la bbdd.");
        } else {
            console.log("\nUSUARIOS REGISTRADOS\n-------------------------------------");
            rows.forEach(row => console.log(row.nombre + " ; " + row.email));
        }
    }
});

dao.readUser(14, function(err, row) {
    if(err) {
        console.log(err);
    } else {
        if(row.length == 0) {
            console.log("Aun no hay usuario en la bbdd.");
        } else {
            console.log("\nDATOS DEL USUARIO\n-------------------------------------");
            console.log(row.nombre + " ; " + row.email);
        }
    }
});

console.log("Fin de la hebra principal.");