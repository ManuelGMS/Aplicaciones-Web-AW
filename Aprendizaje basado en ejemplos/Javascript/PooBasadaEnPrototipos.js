"use strict";

// Creacion literal de objetos:
let obj1 = {
    arg1: 0,
    arg2: 0,
    // Las funciones flecha no pueden acceder ni a "this" ni a "argumments".
    suma: function() { return this.arg1 + this.arg2; },
    resta: function() { return this.arg1 - this.arg2; },
};

obj1.arg1 = 12;
obj1.arg2 = 30;
console.log(obj1.arg1 + " <-> " + obj1.arg2);
console.log(obj1.suma() + " <-> " + obj1.resta());

// Funciones contructoras:
function construirObjeto(arg1, arg2) {
    return {
        arg1: arg1,
        arg2: arg2,
        // Problema: Cada objeto incluye 2 objetos funcion.
        suma: function() { return this.arg1 + this.arg2; },
        resta: function() { return this.arg1 - this.arg2; },
        // Esta funcion es reutilizada por todos los objetos.
        multiplicar: multiplicar
    };
}

function multiplicar() {
    return this.arg1 * this.arg2;
}

let obj2 = construirObjeto(10,15);
console.log(obj2.arg1 + " <-> " + obj2.arg2);
console.log(obj2.suma() + " <-> " + obj2.resta() + " <-> " + obj2.multiplicar());

// POO basada en prototipos:
let obj = {
    arg1: 0,
    arg2: 0,
    suma: function() { return this.arg1 + this.arg2; },
    resta: function() { return this.arg1 - this.arg2; },
};

/*

+ Ahoramismo Obj3 no tiene ningun atributo propio, estan todos en su prototipo.

+ Para qie Obj3 tenga sus propios atributos hay que asignarle el valor a este para
que no lo busque a lo largo de la cadena de prototipos.

+ Si ponemos un atributo en el prototipo padre todos los que lo tengan
como prototipo en la cadena podran usarlo.

+ Si queremos que un atributo solo lo tenga un objeto, se lo asignamos a el y no
a su prototipo.

*/
let obj3 = Object.create(obj);
console.log("Mismo objeto: " + (obj == obj3));
console.log("Mi prototipo es: " + Object.getPrototypeOf(obj3));

for(let i of Object.keys(obj3))
    console.log("1 Atributo obj3: " + i);

obj3.arg1 = 7.5;

for(let i of Object.keys(obj3))
    console.log("2 Atributo obj3: " + i);

/*

+ Object.prototype es la raiz de la cadena de prototipos de todos los objetos.

+ El prototipo de Object.prototype es null

*/
Object.prototype.nombre = "Father"; 

for(let i of Object.keys(Object.prototype))
    console.log("Object.prototype Atributo: " + i);

console.log("Nombre: " + new Date().nombre);

/*

Simulacion de POO basada en clases:

+ Requiere tener declarado un objeto prototipo.

+ Requiere una/s funcion/es contructora/s que permitan la inicializacion del objeto.

*/
function constructor(arg1,arg2) {
    let objeto = Object.create(obj);
    objeto.arg1 = arg1,
    objeto.arg2 = arg2
    return objeto;
}

let objeto = constructor(7.88,10);
console.log(objeto.arg1 + " <-> " + objeto.arg2);
console.log(objeto.suma() + " <-> " + objeto.resta());

/*

Nueva sintaxis para la simulacion de POO basada en clases:

+ Esta forma crea un objeto llamado <ObjectName>.prototype que almacena la funcion
constructor (solo puede haber una funcion constructor) y el resto de funciones.

+ <ObjectName>.prototype tiene como prototipo a Object.prototype.

+ Se emplea el operador new para la construccion de objetos.

*/

class object {
    constructor(a,b) {
        this.a = a;
        this.b = b;
    }
    suma() { return this.a + this.b; }
    resta() { return this.a - this.b; }
} 

let nuevo = new object(2.1,8.9);
console.log(nuevo.a + " <-> " + nuevo.b);
console.log(nuevo.suma() + " <-> " + nuevo.resta());

// Metodos invocados como atributos y metodos estaticos.

class messageObject {
    constructor(initial) {
        this.message = initial;
        this._className = "messageObject"; // Los atributos que comienzan por "_" se consideran privados.
    }
    static defaultMessage() { return "Hello World"; }
    get obtenerNombre() { return this._className; }
    get obtener() { return this.message; }
    set establecer(mensaje) { this.message = mensaje; }
}

console.log("MSG: " + messageObject.defaultMessage());
let msg = new messageObject("Error");
console.log("MSG: " + msg.obtener);
msg.establecer = "OK";
console.log("MSG: " + msg.obtener);

/*
La funcion flecha no recive la variable "this" ni la variable "arguments",
por tanto este metodo se considera estatico.
*/
messageObject.nuevoMetodoEstatico = () => "Static";

// Herencia --> Herencia simple.
class advancedMessageObject extends messageObject {
    constructor(msg) {
        super(msg);
    }
    ocultarPalabra(palabra) {
        this.message = this.message.replace(palabra,"\b");
    }
}

let avanzado = new advancedMessageObject("La contraseña 1234 abre la caja fuerte.");
avanzado.ocultarPalabra("1234");
console.log(avanzado.obtener);

// Comprobar si un objeto es una instancia de otro. Implica recorrer la cadena de prototipos.
console.log("Es una instancia de messageObject: " + (avanzado instanceof messageObject));

// Formas de comprobar el prototipo de un objeto:
console.log(advancedMessageObject.prototype.isPrototypeOf(avanzado));
console.log(advancedMessageObject.prototype == Object.getPrototypeOf(avanzado));
