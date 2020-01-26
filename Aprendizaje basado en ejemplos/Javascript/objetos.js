"use strict";

let obj0 = {}; // Objeto vacio sin atributos.

let obj1 = {
    nombre: "Alumno",
    numero: 1,
    edad: 18
}

let obj2 = {
    "nombre": "Alumno",
    "numero": 2,
    "edad": 18
}

/*
Operadores de acceso, modificacion y creacion: obj["attributeName"] "o" obj.attributeName
Si el atributo no esta definido cuando se va a acceder se devuelve el valor undefined.

Para borrar un atributo se usa la funcion delete.

*/

for(let i of Object.keys(obj2))

    console.log("Propiedad: " + i);

console.log(obj2.numero)
delete obj2.numero;

for(let i of Object.keys(obj2))

    console.log("Propiedad: " + i);

console.log(obj2.numero)
obj2.numero = 18;
console.log(obj2.numero)

/*
El operador in permite saber si un objeto contiene un atributo.
Otra forma de averiguarlo es mediante obj.attributeName == undefined
*/

if("edad" in obj2)

    console.log("Contiene la propiedad edad.")

else

    console.log("No contiene la propiedad edad.")

if("notas" in obj2)

    console.log("Contiene la propiedad notas.")

else

    console.log("No contiene la propiedad edad.")

/* 
Los operadores == y === sobre objetos solo comprueban que las variables apunten
al mismo objeto.
*/

console.log("Mismo objeto: " + (obj1 == obj2));

/*
Funciones dentro de objetos:
Las funciones ademas de recibir parametros recibe la variable this, esta referencia al objeto que ha realizado la llamada.
*/

let obj3 = {
    "nombre": "Operaciones",
    "defaultA": 8,
    "defaultB": 4,
    "suma": (a,b) => a + b,
    "resta": (a,b) => a - b,
    "multiplicacion": (a,b) => a * b,
    "division": (a,b) => a / b,
    "defaultSum": function() { return this.suma(this.defaultA,this.defaultB); }
};

console.log(obj3.suma(7.5,2) + " <-> " + obj3.multiplicacion(2,7));
