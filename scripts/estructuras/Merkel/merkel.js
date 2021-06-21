"use strict";
var NodoMerkle = (function () {
    function NodoMerkle(valor, altura) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
        this.tieneValor = false;
        this.altura = altura;
    }
    return NodoMerkle;
}());
var ArbolMerkle = (function () {
    function ArbolMerkle() {
        this.raiz = null;
        this.maxValores = 0;
        this.valores = 0;
        this.agregado = false;
    }
    ArbolMerkle.prototype.factor = function () {
        return this.maxValores - this.valores;
    };
    ArbolMerkle.prototype.hash = function (valor) {
        valor = valor.toString();
        var H = 64;
        var total = 0;
        for (var i = 0; i < valor.length; i++) {
            total += (H * total << 1) + valor.charCodeAt(i);
        }
        return total;
    };
    ArbolMerkle.prototype.insertar = function (valor) {
        this.agregado = false;
        valor = this.hash(valor);
        if (this.factor() <= 0) {
            var padre = new NodoMerkle('null', 2);
            padre.izquierdo = this.raiz;
            if (this.raiz != null) {
                padre.altura = this.raiz.altura + 1;
            }
            else {
                padre.izquierdo = new NodoMerkle('null', 1);
                this.maxValores = 1;
            }
            padre.derecho = this.crecer(padre.derecho, padre.altura - 1);
            this.maxValores = this.maxValores * 2;
            this.raiz = padre;
        }
        this.raiz = this.add(valor, this.raiz, this.raiz.altura);
        this.raiz = this.actualizarPadre(this.raiz);
    };
    ArbolMerkle.prototype.add = function (valor, raiz, altura) {
        if (altura > 1) {
            raiz.izquierdo = this.add(valor, raiz.izquierdo, altura - 1);
            raiz.derecho = this.add(valor, raiz.derecho, altura - 1);
        }
        else {
            if (!this.agregado && !raiz.tieneValor) {
                this.agregado = true;
                raiz.valor = valor;
                raiz.tieneValor = true;
                this.valores++;
            }
        }
        return raiz;
    };
    ArbolMerkle.prototype.crecer = function (raiz, altura) {
        if (altura > 0) {
            raiz = new NodoMerkle(this.hash(-1), altura);
            raiz.izquierdo = this.crecer(raiz.izquierdo, altura - 1);
            raiz.derecho = this.crecer(raiz.derecho, altura - 1);
        }
        return raiz;
    };
    ArbolMerkle.prototype.actualizarPadre = function (raiz) {
        if (raiz != null) {
            raiz.izquierdo = this.actualizarPadre(raiz.izquierdo);
            raiz.derecho = this.actualizarPadre(raiz.derecho);
            if (raiz.altura > 1) {
                raiz.valor = raiz.izquierdo.valor + raiz.derecho.valor;
                raiz.tieneValor = true;
            }
        }
        return raiz;
    };
    ArbolMerkle.prototype.print = function () {
        console.log('PRE ORDEN --------------------');
        this.preOrden(this.raiz);
    };
    ArbolMerkle.prototype.preOrden = function (raiz) {
        if (raiz != null) {
            console.log('Raiz: ' + raiz.valor + '  - Altura:' + raiz.altura);
            this.preOrden(raiz.izquierdo);
            this.preOrden(raiz.derecho);
        }
    };
    return ArbolMerkle;
}());
