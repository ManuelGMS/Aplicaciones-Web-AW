$(function () {

    $("#botonModificar").on("click", function () {

        let nombre = $("#modifyName").val();
        let puntos = $("#modifyPoints").val();

        // Realizamos la peticion al servidor.
        $.ajax({
            method: "PUT", // Metodo con el que se realiza la peticion (GET, POST, PUT, DELETE).
            url: "/modificarUsuario", // URL sobre la que hacemos la peticion.
            contentType: "application/json", // El contenido de la peticion es JSON (Por defecto urlencoded).
            data: JSON.stringify({ name: nombre, points: puntos }), // El cuerpo de la peticion viaja expresado como JSON.
            success: function (data, textStatus, jqXHR) { // Callback en caso de exito.
                console.log(textStatus);
                // data es un objeto JSON transformado a JavaScript.
                // statusText: Cadena que describe el estado de la peticion (normalmente "success").
                // jqXHR: Objeto con mas informacion sobre la respuesta (envoltorio del objeto XMLHTTPRequest).
                // $("#resultadoAcumulado").text("El resultado es " + data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) { // Callback en caso de error.
                alert("Se ha producido un error: " + errorThrown);
            }
        });

    });

    $("#botonBorrar").on("click", function () {

        let nombre = $("#deleteName").val();

        // Realizamos la peticion al servidor.
        $.ajax({
            method: "DELETE", // Metodo con el que se realiza la peticion (GET, POST, PUT, DELETE).
            url: "/borrarUsuario", // URL sobre la que hacemos la peticion.
            contentType: "application/json", // El contenido de la peticion es JSON (Por defecto urlencoded).
            data: JSON.stringify({ name: nombre }), // El cuerpo de la peticion viaja expresado como JSON.
            success: function (data, textStatus, jqXHR) { // Callback en caso de exito.
                console.log(textStatus);
                // data es un objeto JSON transformado a JavaScript.
                // statusText: Cadena que describe el estado de la peticion (normalmente "success").
                // jqXHR: Objeto con mas informacion sobre la respuesta (envoltorio del objeto XMLHTTPRequest).
                // $("#resultadoAcumulado").text("El resultado es " + data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) { // Callback en caso de error.
                alert("Se ha producido un error: " + errorThrown);
            }
        });

    });

});