const express = require("express");
const cookieParser = require('cookie-parser');

const shopRouter = express.Router();

shopRouter.use(cookieParser());

shopRouter.get("/buy", function(request, response, next) {
    response.status(200);
    response.type(".html");
    response.render("buy");
});

shopRouter.get("/showProductList", function(request, response, next) {
    let cookie = request.cookies["usr"];
    response.status(200);
    response.type(".html");
    response.render("productList", { userName: cookie.userName, products: cookie.products });
});

shopRouter.post("/addProduct", function(request, response, next) {
    let cookie = request.cookies["usr"];
    let productName = request.body.productName;

    cookie.products.push(productName);
    response.cookie("usr", { userName: cookie.userName, products: cookie.products });

    response.status(200);
    response.type(".html");
    response.end(`El producto ${productName} fue añadido a la lista.`);
});

module.exports = shopRouter;