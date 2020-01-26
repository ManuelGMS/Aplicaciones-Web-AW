"use strict";

const url = require("url");
const http = require("http");

const server = http.createServer(function (request, response) {
    
    // console.log(request.headers); // Cabeceras de la solicitud recibida.
    
    const oUrl = url.parse(request.url, true); // Objeto URL
    // const oQuery = oUrl.query; // Objeto QUERY (oQuery.<param>)

    if(request.method == "GET") {
        switch(oUrl.pathname) { // Nombre del recurso solicitado.
            case "/hola.html":
                response.statusCode = 200; // Codigo de respuesta (200: OK, 404: Not Found, 500: Internal Server Error).
                response.setHeader("Content-Type", "text/html"); // Añade una cabecera a la respuesta.
                response.write("<b>HELLO WORLD</b>"); // Escibe en el cuerpo de la respuesta.
                response.end(); // Indica el final de la respuesa (obligatorio).
            break;
            default:
                response.statusCode = 404;
                response.setHeader("Content-Type", "text/html");
                response.end("<b>ERROR 404: RECURSO " + oUrl.pathname + " NO ENCONTRADO</b>");
            break;
        }
    }
});

// Arranca el servidor.
server.listen(3000, function (err) {
    if (err) {
        console.log(`Error al abrir el puerto 3000: ${err}`);
    } else {
        console.log("Servidor escuchando en el puerto 3000.");
    }
});
