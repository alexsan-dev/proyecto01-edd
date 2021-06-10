class NodoSimp{

    public dato:any

    public siguiente:any

    constructor(dato:any){

        this.dato = dato

        this.siguiente = null

    }

}

class listacircularsimpenl{


    public primero:any

    public ultimo:any

    public size:number

    constructor(){

        this.primero = null

        this.ultimo = null

        this.size = 0
    }

    vacia(){

        if (this.primero == null){

            return true
        }

    }

    addInicio(valor:any){

        let nuevo = new NodoSimp(valor)

        if(this.vacia() == true){

            this.primero = this.ultimo = nuevo

            this.ultimo.siguiente = this.primero

            this.size++

        }else{

            let aux = new NodoSimp(valor)

            aux.siguiente = this.primero

            this.primero = aux

            this.ultimo.siguiente = this.primero
        }

    }

}