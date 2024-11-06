class Poligono{
    constructor(centro,centroAnterior, lados, proporcion, iteracion = 0){
        this.centro = centro;
        this.centroAnterior=centroAnterior;
        this.lados = lados;
        this.proporcion = proporcion;
        this.unidad = 100;
        this.iteracion = iteracion;
    
    }


    dibujar(p){
        p.beginShape();
        for(let i = 0; i < this.lados; i++){
            const angulo = p.TWO_PI/this.lados*i;
            const verticeX = this.centro.real + this.unidad*this.proporcion**this.iteracion*Math.cos(angulo);
            const verticeY = this.centro.imag + this.unidad*this.proporcion**this.iteracion*Math.sin(angulo);
            p.vertex(verticeX, verticeY);
        };
        p.endShape(p.CLOSE);
    }

}

export default Poligono;