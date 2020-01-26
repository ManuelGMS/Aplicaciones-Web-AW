"use strict";

/*
Comando para ejecutar mediante node: node <program>.js

Depuracion con node: node [ debug / inspect ] <program>.js
    + cont --> Salta al siguiente punto de ruptura.
    + step --> Ejecuta la linea actual.
    + next --> Ejecuta la linea actual sin saltar a la funcion.
    + repl --> Permite evaluar variables y expresiones en un punto del programa.
    + watch("expression") --> Visualizar la expresion / variable en cada paso de la ejecucion.
    + help --> Muestra la lista de comandos del depurador.
*/

function initArray(size,value) {
    let arr = [];
    for(let i = 0 ; i < size ; ++i)
        arr[i] = value;
    return arr;
}

let matriz = [];
matriz.length = 4;
debugger; // Equivale a poner un punto de ruptura.
for(let i = 0 ; i < matriz.length ; ++i)
    matriz[i] = initArray(matriz.length,8);

console.log(matriz);