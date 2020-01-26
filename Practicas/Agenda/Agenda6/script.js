"use strict";

$(function () {

    alert("ENTRA");
    
    let nuevoElemento = $("<li>Nuevo elemento</li>");
    $("#formularioNuevaTarea").prepend(nuevoElemento); // append
    

    $("#botonTag").on("click", function () {
        
        let t = $("#textoTag").prop("value");

        alert(t)
        
    });

});


/*
// Actualiza la etiqueta de la esquina superior derecha con las
// dimensiones del elemento pasado como parámetro
function actualizarEtiqueta(elem) {
    let ancho = Math.round(elem.width());
    let alto = Math.round(elem.height());
    $("div.tamaño").text(`${ancho} x ${alto}`);
}

$(function () {
    let parrafo = $("div.parrafo");
    actualizarEtiqueta(parrafo);
    // Cuando se pulsa el botón de aumentar anchura...
    $("#aumentarAnchura").on("click", function () {
        // Obtenemos la anchura actual y establecemos la nueva
        let anchoActual = parrafo.width();
        parrafo.width(anchoActual + 20);
        // Actualizamos la etiqueta con la nueva dimensión
        actualizarEtiqueta(parrafo);
    });
});
*/

/*
const IZQUIERDA = 37;
const DERECHA = 39;
const ARRIBA = 38;
const ABAJO = 40;
$(function () {
    
    // let parrafo = $("div.parrafo");
    
    let parrafo = $(".parrafo");

    $("body").on("keydown", function (event) {
        
        let incremento = { x: 0, y: 0 };
        
        console.log("code: " + event.which);

        switch (event.which) {
            case 37: incremento.x = -10; break;
            case 38: incremento.y = -10; break;
            case 39: incremento.x = 10; break;
            case 40: incremento.y = 10; break;
        }
        
        let current = parrafo.offset();
        
        parrafo.offset({
            left: current.left + incremento.x,
            top: current.top + incremento.y
        });

        // Evita el comportamiento por defecto (las teclas mueven la pagina)
        event.preventDefault(); 

    });

});
*/

$(function () {
    
    $("#posicion").hide();

    $("#superficie").on("mouseenter", function () {
        $("#posicion").show();
    });

    $("#superficie").on("mouseleave", function () {
        $("#posicion").hide();
    });
    
    $("#superficie").on("mousemove", function (event) {
        $("#posicion").text(
            `${event.pageX} x ${event.pageY}`
        );
    });

});
