"use strict";

/*
Metacaracteres:
"+" Una o mas ocurrencias del predecesor.
"*" Cero o mas ocurrencias del predecesor.
"?" Cero o una ocurrencia del predecesor.
"." Cualquier caracter.
"{n}" N ocurencias del predecesor.
"{min,max}" Minimo y maximo numero  de ocurrencias del predecesor.
"\" Hace que un metacaracter pierda su significado especial.
"\s" Espacio.
"\t" Tabulador.
"\n" Salto de linea.
"[a-z]" o "[a-zA-z]" o "[123456789]" Uno de los elementos del conjunto
"\w" equivale a [a-zA-Z0-9_]
"\d" equivale a [0-9]
"\S" Cualquier caracter que no sea el espacio.
"^text": Que empiece por el texto.
"text$": Que acabe por el texto.
"()" Grupo: Permite separar las partes del patron en partes al trabajar con exec
*/

/*
Modificadores de expresiones reguares:
"\i" No distingue entre mayusculas y minusculas.
"\g" Permite encontrar varias ocurrencias en la misma cadena.
"\n" Permite buscar a lo largo de varias lineas.
*/

const correo = /(\w+)@(\w+)(\.\w+)/g; // Para expresiones regulares constantes.
let mail = RegExp("/(\w+)@(\w+)(\.\w+)/g"); // Para expresiones regulares cambiantes

// Metodos de RegExp:

/*
test: Devuelve true si la cadena contiene una subcadena con la expresion.
exec: Busca la subcadena en la expresion y la devuelve, null si no se encuentra.
*/
let frase = "Dijo que su correo era o bien alumno@ucm.es o bien alumno@ucm.com";
let grupo = correo.exec(frase);
console.log(correo.test(frase) + " <-> " + grupo);
console.log(grupo[0] + " ; " + grupo[1] + " ; " + grupo[2] + " ; " + grupo[3]);

// Expresiones regulares en cadenas:

/*
match: Devuelve todas las subcadenas que coincidan con la expresion (\g), si no una.
search: Devuelve el indice de la primera sibcadena, -1 si no se encuentra.
replace: Reemplaza las coincidencias por la cadena especificada.
*/
console.log(
    frase.match(correo) + " <-> " +
    frase.search(correo) + " <-> " +
    frase.replace(correo,"CORREO")
);
