class NodoDob{

    public dato:any

    public siguiente:any

    public anterior:any

    constructor(dato:any){

        this.dato = dato

        this.siguiente = null

        this.anterior = null

    }
}


class listacirculardob{

    public primero:any

    public ultimo:any

    public size:number

    constructor(){


        this.primero = null

        this.ultimo = null

        this.size = 0

    }

    vacia(){

        if(this.primero == null){
            
            return true
        }
    }


    addInicio(valor:any){

        let nuevo = new NodoDob(valor)


        if(this.vacia() == true){

            this.primero = this.ultimo = nuevo

            this.size++

        }else{

            let aux = new NodoDob(valor)

            aux.siguiente = this.primero

            this.primero.anterior = aux

            this.primero = aux

            this.size++

        }

    }

}