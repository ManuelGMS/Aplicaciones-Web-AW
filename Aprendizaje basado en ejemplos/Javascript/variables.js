"use strict";

/* 
Comparadores:
== y != Solo comparan valores
=== y !=== Comparan el valor y el tipo
Para comparar con NaN usar la funcion isNaN
*/

/*
Tipos primititvos: Number, String, Boolean, NaN, undefined y null.
Tipos object: Objetos y funciones.
*/

let null1 = null; // Referencia a un objeto sin establecer.
let int1 = 8;
let float1 = 12.2;
let bool1 = true;
let string1 = "Ejemplo";
let undefined1; // No se puede saber de que tipo es la variable.
let function1 = function() { console.log("Saludos !!!"); };
let date1 = new Date();
let array1 = [10,15,20];

// typeof(variable) --> Devuelve el tipo como un string, no distingue los tipos de objeto.
console.log("Tipo null1: " + typeof(null1));
console.log("Tipo int1: " + typeof(int1) + " , tipo float1: " + typeof(float1));
console.log("Tipo bool1: " + typeof(bool1) + " , tipo string1: " + typeof(string1));
console.log("Tipo undefined1: " + typeof(undefined1) + " , tipo function1: " + typeof(function1));
console.log("Tipo date1: " + typeof(date1) + " , tipo array1: " + typeof(array1));

// Para distinguir los tipos de objetos hay que usar la funcion instanceof.
console.log("Boolean?: " + (bool1 instanceof Boolean)  + " , numero?: " + (int1 instanceof Number));
console.log("Objeto?: " + (null1 instanceof Object)  + " , funcion?: " + (function1 instanceof Function));
console.log("Fecha?: " + (date1 instanceof Date) + " , array?: " + (array1 instanceof Array));
