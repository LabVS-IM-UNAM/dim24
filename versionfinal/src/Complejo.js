export class Complejo{
    constructor(real,imag){
        this.real = real;
        this.imag = imag;
    };

    suma(complejo){
        return new Complejo(
            this.real+complejo.real,
            this.imag+complejo.imag
        );
    };

    abs(){
        return Math.sqrt(this.real**2+this.imag**2);
    }

    conjugado(){
        return new Complejo(this.real, -this.imag);
    }

    inversoAditivo(){
        return new Complejo(-this.real, -this.imag);
    }

    inversoMultiplicativo(){
        return this.producto(this.conjugado())/(this.abs()**2);
    }

    producto(complejo){
        return new Complejo(
            this.real*complejo.real-this.imag*complejo.imag,
            this.real*complejo.imag+this.imag*complejo.real
        );
    };

    punto(complejo){
        return new Complejo(this.real*complejo.real+this.imag*complejo.imag)
    }


    escalar(lambda){
        return new Complejo(this.real*lambda, this.imag*lambda);
    }

    angulo(){
        return Math.atan2(this.imag, this.real);
    }

    igual(complejo){
        const real = Math.abs(this.real-complejo.real).toFixed(2);
        const imag = Math.abs(this.imag-complejo.imag).toFixed(2);
        if(real == 0 && imag ==0){
            return true;
        }else{
            return false;
        }
    }
}