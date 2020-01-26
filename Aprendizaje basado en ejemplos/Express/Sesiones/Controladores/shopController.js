"use strict";

function showBuyProducts(request, response, next) {
    response.status(200);
    response.type(".html");
    response.render("buyProducts");
}

function buyProduct(request, response, next) {
    
    if(request.session.userData.products == undefined)

        request.session.userData.products = [];

    request.session.userData.products.push(request.body.productName);

    response.status(200);
    response.type(".html");
    response.render("buyProducts");

}

function logout(request, response, next) {
    request.session.destroy();
    response.redirect("/basics/showLogin")
}

module.exports = {
    logout: logout,
    buyProduct: buyProduct,
    showBuyProducts: showBuyProducts
};