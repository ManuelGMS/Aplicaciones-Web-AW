"use strict";

const mysql = require("mysql");

const config = require("../config");
let pool = mysql.createPool(config.mysqlConfig);

const DaoBasicas = require("../Daos/DaoBasicas");
let oDaoBasicas = new DaoBasicas(pool);

function showLogin(request, response, next) {
    response.status(200);
    response.type(".html");
    response.render("login");
}

function showCreateUser(request, response, next) {
    response.status(200);
    response.type(".html");
    response.render("createUser");
}

function validateUser(request, response, next) {
    let name = request.body.userName;
    let password = request.body.userPassword;
    oDaoBasicas.validateUser(name, password, function (err, userData) {
        if (err) {
            next(err);
        } else {
            if (userData != null) {
                // Se persisten los datos en la tabla de sesiones.
                request.session.userData = userData;
                response.redirect("/shop/buyProducts");
            } else {
                response.redirect("/basics/showLogin");
            }
        }
    });
}

function createUser(request, response, next) {
    let name = request.body.userName;
    let password = request.body.userPassword;

    oDaoBasicas.checkIfUserExists(name, function (err, exists) {
        if (err) {
            next(err);
        } else {
            if (exists) {
                next("El usuario ya existe en la BBDD");
            } else {
                oDaoBasicas.insertUser(name, password, function (err, ok) {
                    if (err) {
                        next(err);
                    } else {
                        response.status(200);
                        response.type(".html");
                        response.redirect("/users/showLogin");
                    }
                });
            }
        }
    });

}

module.exports = {
    showLogin: showLogin,
    createUser: createUser,
    validateUser: validateUser,
    showCreateUser: showCreateUser
};