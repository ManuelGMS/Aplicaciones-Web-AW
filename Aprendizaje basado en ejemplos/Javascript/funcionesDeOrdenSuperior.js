"use strict";

let arr1 = [ "ejemplo" , true , 10 , 0xFF ];

// Funciones de iteracion

// forEach: Aplica la funcion sobre todos los elementos del array.
arr1.forEach(function(v,i,a) { // Value, Index, Array
    console.log(v + " <--> " + a[i]);
});

// Funciones de transformacion

/*
map: Aplica la funcion a todos los elementos y devuelve un nuevo array con
los resultados.
*/
let sol = arr1.map((v,i,a) => typeof(v) == "number");
console.log(sol);

/*
filter: Aplica la funcion a todos los elementos y devuelve un array con aquellos que
cumplan cierta condicion.
*/
sol = arr1.filter((v,i,a) => typeof(v) == "number");
console.log(sol);

// Funciones de reduccion

// Every (para todo) --> Devuelve true si todos los elementos cumplen la condicion.
sol = arr1.every((v,i,a) => !(v instanceof Object)); // Todos son primitivos
console.log(sol);

// Some (existe) --> Devuelve true si existe algun elemento que cumpla la condicion.
sol = arr1.some((v,i,a) => v instanceof Object); // Alguno es un objeto
console.log(sol);


// reduce: Recorre el array de izq->der acumulando un valor durante el recorrido.
// reduceRight: Hace lo mismo pero de derecha a izquierda.
sol = arr1.reduce( (ac,v,i,a) => {

    if(typeof(v) == "number")

        ac += v;

    return ac;

} , 0 );
console.log(sol);

