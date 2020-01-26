/*
Haciendo un uso estricto del lenguaje no se peude:
    + Usar variables sin declararlas.
    + Borrar variables (no objeto) mediante la palabra reservada delete.
    + Duplicar los nombres en los parametros de las funciones.
*/
"use strict";

/*
Caracteristicas de  las variables var:
    + Hoisting (la declaracion es movida automaticamente al principio de su ambito).
    + Pertenecen al objeto global (window).
    + Permiten hacer redeclaraciones.
*/
var text = "Hello World";

/*
Las variables const y let NO:
    + Poseen Hoisiting.
    + Pertenecen al objeto global (window).
    + Permiten hacer redeclaraciones.
*/
const PI = 3.14;
let num = 10;

// Recorres arrays:
let arr = [0,1,2,3,4,5,6,7,8,9];
for(let i of arr)

    console.log("valor: " + i);

// Funciones:
function poly(a,b,c) {

    return [
        (-b + Math.sqrt( Math.pow(b,2) - 4 * a * c)) / (2 * a)
        ,
        (-b - Math.sqrt( Math.pow(b,2) - 4 * a * c)) / (2 * a)
    ];

}

let sol = poly(-1,7,-10);

console.log(sol[0] + " <-> " + sol[1]);

// Manejo de errores.
try {
    throw new Error("Division por cero.")
} catch (error) {
    console.log(error.message); // Mensaje de error.
    console.log(error.name); // Nombre de la clase del error.
    // console.log(error.stack); // Pila de ejecucion.
} finally {
    console.log("Siempre se ejecuta.")
}

// Cadenas plantilla:
let palabra =  "mundo";
console.log(`Hola ${palabra} !!!`);

// Arrays:
let arr1 = [0, 8.8, true];
let arr2 = [];
let arr3 = new Array(3);
arr3[0] = "A";
arr3[1] = 8.5;
arr3[2] = true;

for(let i of arr1)

    console.log("arr1: " + i);

for(let i of arr2)

    console.log("arr2: " + i);

for(let i of arr3)

    console.log("arr3: " + i);

// Aumentar el tamaño de un array.
arr3.length += 2;
arr3[3] = "B";
arr3[4] = 18;

for(let i of arr3)

    console.log("arr3: " + i);

// Disminuir el tamaño de  un array.
arr3.length -= 2; // "o" arr3.length = 3;

for(let i of arr3)

    console.log("arr3: " + i);