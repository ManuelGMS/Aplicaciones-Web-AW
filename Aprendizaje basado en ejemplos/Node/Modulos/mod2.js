"use strict";

class calculadora {
    constructor(a,b) {
        this._a = a;
        this._b = b;
    }
    suma() { return this._a + this._b; }
    resta() { return this._a - this._b; }
    set setA(newA) { this._a = newA; }
    set setB(newB) { this._b = newB; }
    get getA() { return this._a; }
    get getB() { return this._b; }
}

module.exports = calculadora;