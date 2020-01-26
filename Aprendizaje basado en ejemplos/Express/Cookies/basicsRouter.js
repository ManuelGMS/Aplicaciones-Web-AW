const express = require("express");

const basicsRouter = express.Router();

let usersRanking = [
    { name: "manu" , points: 10 } ,
    { name: "natalia" , points: 12 } ,
    { name: "fatima" , points: 9 } ,
    { name: "chiquitin" , points: 15 }
];

basicsRouter.get("/incrementsTo/:userName", function(request,response,next) {
    response.status(200);
    response.type(".html");
    let name = request.params.userName;
    usersRanking.forEach( (v,i,a) => {
        if(v.name == name) {
            v.points += 1;
            response.write(v.name + " <-> " + v.points);
        }
    });
    response.end();
});

basicsRouter.get("/showRanking", function(request,response,next) {
    response.status(200);
    response.type(".html");
    usersRanking.forEach( (v,i,a) => {
        response.write(v.name + " <-> " + v.points + "<br>");
    });
    response.end();
});

basicsRouter.get("/login", function(request,response,next) {
    response.status(200);
    response.type(".html");
    response.render("login");
});

basicsRouter.post("/createUser", function(request,response,next) {
    let name = request.body.username;
    response.status(200);
    response.cookie("usr", { userName: name , products: [] });
    response.end(`El usuario ${name} ha sido registrado`);
});

module.exports = basicsRouter;