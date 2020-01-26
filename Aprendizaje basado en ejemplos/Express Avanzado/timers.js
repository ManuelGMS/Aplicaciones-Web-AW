"use strict";

console.log("inicio");

// Se ejecuta de forma asincrona una vez cada X milisegundos.
setTimeout(() => {
    console.log("hola mundo");
}, 5000);

let counter = 0;

// Se ejecuta de forma asincrona de forma continua cada X milisegundos.
let periodic = setInterval(() => {
    console.log("Counter: " + counter++);
    if(counter == 10)
        clearInterval(periodic); // Para la ejecucion de este temporizador.
}, 1000);

console.log("fin");