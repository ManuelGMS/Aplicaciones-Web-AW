"use strict";

// El hoisting se aplica tambien a las funciones.

function saludar() {
    console.log("HOLA !!!");
}

saludar();

// Asignacion de funciones a  variables:
let saluda = saludar;

let factorial = function fact(n) {
    return (n == 1)? 1 : n * fact(n-1);
};

let sumaNaturales = function(n) { // Funcion anonima
    return  (1+n) * (n/2);
}

saluda();
console.log("Suma naturales: " + sumaNaturales(100));
console.log("Factorial: " + factorial(4));

// Las funciones pueden ser recividas como parametro de una funcion, tambien pueden ser devueltas por una funcion.

// Notacion lambda (funciones anonimas -> funciones flecha)

let suma = (a,b) => a + b;

let doble = param => param * 2;

let poly2 = (a,b,c) => {
    let sol1 = (-b + Math.sqrt(Math.pow(b,2) - 4 * a * c)) / 2 * a;
    let sol2 = (-b - Math.sqrt(Math.pow(b,2) - 4 * a * c)) / 2 * a;
    return [sol1,sol2]; 
};

console.log("Suma: " + suma(12,6));
console.log("Doble: " + doble(50));
console.log("EC2: " + poly2(-1,7,-10));

/* 
Si a una funcion se le proporcionan mas argumentos de los que tiene, se ignoran los sobrantes.
Si por el contrario se convoca una funcion con menos argumentos de los que tiene: 
    + Los parametros faltantes toman los valores asignados por defecto.
    + Los faltantes tomaran el valor undefined si no hay valores por defecto asignados.
*/

function restar(a,b) {
    console.log(a + " <-> " + b);
}

function multiplicar(a = 1, b = 2) {
    console.log(a + " <-> " + b);
}

restar(100,20);
restar(100);
restar();

multiplicar(10,2);
multiplicar(2);
multiplicar();

// "arguments" --> El array de argumentos que recibe la funcion.

function ejemplo(a,b,c,d) {
    for(let i = 0 ; i < arguments.length ; ++i)
        console.log("argumento: " + arguments[i]);
}

ejemplo(110,2,9.7,true,"texto",10)