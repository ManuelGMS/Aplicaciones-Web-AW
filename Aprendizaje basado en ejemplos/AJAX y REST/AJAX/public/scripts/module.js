$(function () {

    $("#botonCalcularFactorial").on("click", function () {

        let valor = $("#numeroFactorial").val();

        // Realizamos la peticion al servidor.
        $.ajax({
            method: "GET", // Metodo con el que se realiza la peticion (GET, POST, PUT, DELETE).
            // url: "/factorial/" + valor, // Si queremos parametrizar la peticion.
            url: "/factorial", // URL sobre la que hacemos la peticion.
            data: { // Datos a adjuntar en la peticion: Parametros URL (GET) o Cuerpo peticion (POST, PUT).
                number: valor // Cuando pasamos un objeto JS a data, este se transforma en una query string.
            },
            success: function (data, textStatus, jqXHR) { // Callback en caso de exito.
                console.log(textStatus);
                // data es un objeto JSON transformado a JavaScript.
                // statusText: Cadena que describe el estado de la peticion (normalmente "success").
                // jqXHR: Objeto con mas informacion sobre la respuesta (envoltorio del objeto XMLHTTPRequest).
                $("#resultadoFactorial").text("El resultado es " + data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) { // Callback en caso de error.
                // jqXHR: Envoltorio del objeto XMLHTTPRequest.
                // statusText: Estado de la petición ("timeout", "parseerror", "abort", etc).
                // errorThrown: Texto adjunto a la respuesta HTTP devuelta ("Not Found","Internal Server Error", etc).
                alert("Se ha producido un error: " + errorThrown);
            }
        });

    });

    $("#botonCalcularAcumulado").on("click", function () {

        let valor = $("#numeroAcumulado").val();

        // Realizamos la peticion al servidor.
        $.ajax({
            method: "POST", // Metodo con el que se realiza la peticion (GET, POST, PUT, DELETE).
            url: "/acumulado", // URL sobre la que hacemos la peticion.
            contentType: "application/json", // El contenido de la peticion es JSON (Por defecto urlencoded).
            data: JSON.stringify({ number: valor }), // El cuerpo de la peticion viaja expresado como JSON.
            success: function (data, textStatus, jqXHR) { // Callback en caso de exito.
                console.log(textStatus);
                // data es un objeto JSON transformado a JavaScript.
                // statusText: Cadena que describe el estado de la peticion (normalmente "success").
                // jqXHR: Objeto con mas informacion sobre la respuesta (envoltorio del objeto XMLHTTPRequest).
                $("#resultadoAcumulado").text("El resultado es " + data.result);
            },
            error: function (jqXHR, textStatus, errorThrown) { // Callback en caso de error.
                alert("Se ha producido un error: " + errorThrown);
            }
        });


    });

});