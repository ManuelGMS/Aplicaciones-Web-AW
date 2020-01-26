const express = require("express");

const basicsController = require("../Controladores/basicsController");

const basicsRouter = express.Router();

basicsRouter.get("/showLogin", basicsController.showLogin);

basicsRouter.get("/showCreateUser", basicsController.showCreateUser);

basicsRouter.post("/validateUser", basicsController.validateUser);

basicsRouter.post("/createUser", basicsController.createUser);

module.exports = basicsRouter;