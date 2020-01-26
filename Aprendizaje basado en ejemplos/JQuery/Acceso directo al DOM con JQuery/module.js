"use strict";

$(function() { // Espera a la carga completa del DOM y cuanda acaba lanza el callBack.

    /*
        Metodos mas comunes (pueden combinarse en un solo selector):
        + css --> Modificar o consultar propiedades css.
        + prop --> Modificar o consultar propiedades de las etiquetas.
        + val --> Obtiene o modifica la propiedad value del elemento.
        + text --> Obtener o establecer los textos de elementos que puedan contener texto.
        + html --> Obtener o establecer el codigo html de un elemento.
        + data --> Añade u obtiene una propiedad personalizada de un elemento. (HTML: data-<name>="<value>")
        + class {
            * .addClass(nombreClase) --> Añade una clase CSS al elemento.
            * .removeClass(nombreClase) --> Quita una clase CSS al elemento.
            * .hasClass(nombreClase) --> Evalua si un elemento hace uso de una clase CSS.
        }
        + remove() --> Elimina del DOM el/los objeto/oss seleccionado/os.
        + clone() --> Hace una copia del objeto/os seleccionado/os.
        + wrap(elem) --> Envuelve el/los objeto/os seleccionado/os en el objeto pasado como parametro.
        + width([anchura]) --> Obtiene o estaclece el ancho del objeto en pixeles.
        + height([altura]) --> Obtiene o establece el alto del objeto en pixeles.
        + position --> Posicionamiento de un elemento respecto al padre.
        + offset([{top: value, left: value}]) --> Establece u obtiene la posicion de un elemento respecto al documento.
        + on(event,callBack) --> Asigna una reaccion ante un evento, cuando ocurre el callBack es ejecutado.
    */

    let uno = document.getElementById("Uno");

    uno.style.color = "green";

    let child = document.getElementById("Uno").children;

    child[0].style.color = "red";

    let divInDiv = $("div > div");

    divInDiv.css("background-color", "black");

    let children = $("#Uno").children("#Dos");

    children.css("background-color", "orange");

    let parents = children.parents("div");

    parents.css("background-color", "purple");

    let divs = $("div").length // Numero de elementos en la pagina.

    console.log("Numero de divs: " + divs);

    let div3 = $("div").eq(2);

    console.log("Color de fondo: " + div3.css("background-color"));

    div3.css("font-size", 30);

    div3.prop("title", "Esto deberia verse al pasar el raton por encima.");

    console.log("El title es: " + div3.prop("title"));

    div3.on("click", function() {
        alert("Se va a proceder a la eliminacion del elemento.");
        this.remove();
    });

    let body = $("body");

    body.css("background-color","yellow");

    body.on("click", function() {

        /*
        is Devuelve true si el/los elementos/os seleccionado/os cumplen con el selector o funcion
        que le es pasado como argumento.
        */
        if(div3.is(":visible"))
            div3.hide();
        else
            div3.show();

        if(div3.parent().is("div"))
            console.log("El padre es un div");

        if(div3.is(".primario,.secundario"))
            console.log("Posee la clase primario o secundario.");

    });

    let div2 = $("div").eq(1);
    div2.text("Div2");
    console.log("Texto del div2: " + div2.text());

    console.log("Cuerpo del body:\n" + body.html());
    body.data("example",100);
    console.log(body.data());

    let oUno = $("#Uno");
    console.log("Valor de la propiedad personalizada 'secret': " + oUno.data("secret"));

    let nuevoElemento1 = $("<div>Nuevo 1</div>");
    nuevoElemento1.css("color","white").css("background-color", "orange");
    body.prepend(nuevoElemento1); // Añade el nodo al DOM por el principio (Se añade como elemento hijo).

    let nuevoElemento2 = $("<div id='prueba'>Nuevo 2</div>");
    nuevoElemento2.css("color","white").css("background-color", "blue");
    body.append(nuevoElemento2); // Añade el nodo al DOM por el final (Se añade como elemento hijo).

    let oTres = $("#Tres"); // Añadir elementos antes o despues de un elemento dado (Se añaden como hermanos).
    oTres.before("<p>Parrafo añadido dinamicamente antes de Tres.</p>");
    oTres.after("<p>Parrafo añadido dinamicamente despues de Tres.</p>");

    oTres.offset({top: 100, left: 300});
    console.log("Posicionamiento respecto al padre: " + JSON.stringify(oTres.position())); 
    console.log("Posicionamiento respecto al documento: " + JSON.stringify(oTres.offset())); 

    let prueba = $("#prueba");
    prueba.on("click", (event) => { 
        alert("Has pulsado el elemento.");
        event.stopPropagation(); // Evita la propagacion del evento hacia los elementos padre.
    });

    let nameBox = $("#nameBox");
    nameBox.on("keydown", function(event) {
        let target = $(event.target); // Atrapamos el objeto que genero el vento.
        target.css("font-size", Number.parseInt(target.css("font-size")) + 4);
        console.log("ASCII Code: " + event.which);
    });

    let numberBox = $("#numberBox");
    numberBox.on("keydown", function(event) {
        console.log("ASCII: " + event.which); // Codigo ASCII.
        if(event.which >= 96 && event.which <= 105) {
            console.log("Evento cancelado.");
            event.preventDefault(); // Evitamos el evento por defecto que es escribir el texto.
        }
        let target = $(event.target);
        console.log("Valor actual: " + target.prop("value"));
        console.log("Valor actual: " + target.val());
    });

});


