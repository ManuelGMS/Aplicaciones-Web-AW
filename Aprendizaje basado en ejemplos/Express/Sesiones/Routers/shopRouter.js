const express = require("express");

const shopRouter = express.Router();

const shopController = require("../Controladores/shopController");

shopRouter.get("/buyProducts", shopController.showBuyProducts);

shopRouter.get("/logout", shopController.logout);

shopRouter.post("/buyProduct", shopController.buyProduct);

module.exports = shopRouter;