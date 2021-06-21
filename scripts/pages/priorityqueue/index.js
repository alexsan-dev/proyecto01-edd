"use strict";
var NodoSimpleQ = (function () {
    function NodoSimpleQ(valor, priority) {
        this.priority = priority;
        this.valor = valor;
        this.siguiente = null;
        this.anterior = null;
    }
    return NodoSimpleQ;
}());
var Queue = (function () {
    function Queue() {
        this.raiz = null;
        this.tamaño = 0;
        this.nodoActual = null;
    }
    Queue.prototype.vacia = function () {
        if (this.raiz == null) {
            return true;
        }
    };
    Queue.prototype.encolar = function (valor, priority) {
        var aux = new NodoSimpleQ(valor, priority);
        if (this.raiz.priority > priority) {
            aux.siguiente = this.raiz;
            this.raiz = aux;
        }
        else {
            while (this.raiz.siguiente != null && this.raiz.siguiente.priority < priority) {
                this.raiz = this.raiz.siguiente;
            }
            aux.siguiente = this.raiz.siguiente;
            this.raiz.siguiente = aux;
        }
        return this.raiz;
    };
    return Queue;
}());
