"use strict";
var NodoDob = (function () {
    function NodoDob(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
    }
    return NodoDob;
}());
var listacirculardob = (function () {
    function listacirculardob() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }
    listacirculardob.prototype.vacia = function () {
        if (this.primero == null) {
            return true;
        }
    };
    listacirculardob.prototype.addInicio = function (valor) {
        var nuevo = new NodoDob(valor);
        if (this.vacia() == true) {
            this.primero = this.ultimo = nuevo;
            this.size++;
        }
        else {
            var aux = new NodoDob(valor);
            aux.siguiente = this.primero;
            this.primero.anterior = aux;
            this.primero = aux;
            this.size++;
        }
    };
    return listacirculardob;
}());
