class NodoMerkle{
    valor:any
    tieneValor:boolean
    izquierdo:any
    derecho:any
    altura:number

    constructor(valor:any, altura:number){
        this.valor = valor
        this.izquierdo = null
        this.derecho = null
        this.tieneValor = false
        this.altura = altura
    }

}

class ArbolMerkle{
    raiz:any
    maxValores:number
    valores:number
    agregado:boolean

    constructor(){
        this.raiz = null //La raiz
        this.maxValores = 0 //El maximo de valores disponible
        this.valores = 0 //valores ingresados
        this.agregado = false //El valor nuevo fue ingresado
    }

    factor(){
        return this.maxValores - this.valores
    }

    insertar(valor:any){
        this.agregado = false
        if(this.factor() <= 0){
            //Creando el Padre con izquierdo valor a la raiz
            let padre = new NodoMerkle('null', 2)
            padre.izquierdo = this.raiz

            if(this.raiz != null){
                //Raiz no es nula la altura aumenta uno en el padre
                padre.altura = this.raiz.altura + 1
            }else{
                //Raiz es nula por lo que se crea un nodo izquierdo y aumenta el maxValores
                padre.izquierdo = new NodoMerkle('null', 1)
                this.maxValores = 1
            }

            //Se crea el sub arbol derecho con valores nulos
            padre.derecho = this.crecer(padre.derecho, padre.altura - 1)
            this.maxValores = this.maxValores * 2
            this.raiz = padre
        }
        //Agregar el valor y actualizar el padre
        this.raiz = this.add(valor, this.raiz, this.raiz.altura)
        this.raiz = this.actualizarPadre(this.raiz)
    }

    private add(valor:any, raiz:NodoMerkle, altura:number){
        if(altura > 1){
            //Si no es nodo hoja va a buscarlos
            raiz.izquierdo = this.add(valor, raiz.izquierdo, altura-1)
            raiz.derecho = this.add(valor, raiz.derecho, altura-1)
        }else{
            //Si es hoja y no se le ha ingresado nada se agrega el valor
            if(!this.agregado && !raiz.tieneValor){
                this.agregado = true
                raiz.valor = valor
                raiz.tieneValor = true
                this.valores ++
            }
        }
        return raiz
    }

    private crecer(raiz:NodoMerkle, altura:number){
        if(altura > 0){
            raiz = new NodoMerkle('null', altura)
            raiz.izquierdo = this.crecer(raiz.izquierdo, altura-1)
            raiz.derecho = this.crecer(raiz.derecho, altura-1)
        }
        return raiz
    }

    private actualizarPadre(raiz:NodoMerkle){
        if(raiz != null){
            raiz.izquierdo = this.actualizarPadre(raiz.izquierdo)
            raiz.derecho = this.actualizarPadre(raiz.derecho)
            if(raiz.altura > 1){
                raiz.valor = raiz.izquierdo.valor + raiz.derecho.valor
                raiz.tieneValor = true
            }
        }
        return raiz
    }

    print(){
        console.log('PRE ORDEN --------------------')
        this.preOrden(this.raiz)
    }

    preOrden(raiz:any){ 
        if(raiz != null){
            console.log('Raiz: '+raiz.valor + '  - Altura:' + raiz.altura)
            this.preOrden(raiz.izquierdo)
            this.preOrden(raiz.derecho)
        }
    }

}

