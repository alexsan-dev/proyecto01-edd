"use strict";
var NodoSimp = (function () {
    function NodoSimp(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
    return NodoSimp;
}());
var listacircularsimpenl = (function () {
    function listacircularsimpenl() {
        this.primero = null;
        this.ultimo = null;
        this.size = 0;
    }
    listacircularsimpenl.prototype.vacia = function () {
        if (this.primero == null) {
            return true;
        }
    };
    listacircularsimpenl.prototype.addInicio = function (valor) {
        var nuevo = new NodoSimp(valor);
        if (this.vacia() == true) {
            this.primero = this.ultimo = nuevo;
            this.ultimo.siguiente = this.primero;
            this.size++;
        }
        else {
            var aux = new NodoSimp(valor);
            aux.siguiente = this.primero;
            this.primero = aux;
            this.ultimo.siguiente = this.primero;
        }
    };
    return listacircularsimpenl;
}());
