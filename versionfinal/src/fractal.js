import { Complejo } from "./Complejo"
import Poligono from "./Poligono";

function iteracion(poligono){
    const puntoAnterior=poligono.centroAnterior;
    const punto = poligono.centro;
    const diferencia = punto.suma(puntoAnterior.inversoAditivo());
    const difnorm = diferencia.escalar(1/diferencia.abs());
    let poligonos = [];
    for(let i=0; i<poligono.lados; i++){
        const preTraslador = new Complejo(Math.cos(2*i*Math.PI/poligono.lados), Math.sin(2*i*Math.PI/poligono.lados));
        const proporcion = poligono.proporcion**(poligono.iteracion);
        const traslador = preTraslador.escalar(proporcion*poligono.unidad+poligono.unidad*proporcion*poligono.proporcion)
        console.log(traslador, difnorm)
        if (true){
            const centro = punto.suma(traslador);
            const nuevoPoligono = new Poligono(centro,punto, poligono.lados,poligono.proporcion , poligono.iteracion+1);
            poligonos.push(nuevoPoligono);
        }
    }
    return poligonos;
}


export function poligonosFractal(poligonos, iteraciones) {
    if (iteraciones === 0) {
        return poligonos;
    } else {
        let nuevosPoligonos = [];
        for (let poligono of poligonos) {
            nuevosPoligonos = [...nuevosPoligonos, ...iteracion(poligono)];
        }
        return poligonosFractal([...poligonos, ...nuevosPoligonos], iteraciones - 1);
    }
}

export function dibujarPoligonos(p,poligonos){
    for(let poligono of poligonos){
        poligono.dibujar(p)
    }
}