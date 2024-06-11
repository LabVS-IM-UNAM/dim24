const distancia = (u, v) => Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));

function CalcularSiguienteOrbita(puntoInicial, centroInicial, iteracionActual = 1, radio = 50, proporcion = 0.5, numeroVertices = 3) {
    const DISTANCIA_CENTROS = radio * ((proporcion ** iteracionActual) * (proporcion + 1)); // Distancia del centro de la iteracion i con el centro de la iteracion i+1
    const ANGULO = TWO_PI / numeroVertices;

    let orbita = [];

    for (let j = 0; j < numeroVertices; j++) {
        let siguientePunto = new Punto(centroInicial, ANGULO * j, DISTANCIA_CENTROS);
        siguientePunto.puntoInicial = puntoInicial; //   Que guarde informacion de si centro padre

        orbita.push(siguientePunto);
        
        if(iteracionActual > 1) {
            console.log(siguientePunto.puntoInicial.puntoInicial);
        }
        //  Quitar punto cercano al siguientePunto.puntoInicial().puntoInicial();
        // if (iteracionActual > 1 || distancia(, siguientePunto.)) {
        // }
    }
    return orbita;
}

function CrearOrbitas(iteraciones, radio = 50, proporcion = 0.5, numeroVertices = 3) {
    let orbitas = [];
    let puntoInicial = new Punto({ x: width / 2, y: height / 2 }, 0, 0);

    orbitas.push([puntoInicial]);

    for (let i = 0; i < iteraciones; i++) {
        let orbita = [];
        for (let j = 0; j < orbitas[i].length; j++) {
            // console.log(orbitas[i][j]);
            let nuevosPuntos = CalcularSiguienteOrbita(orbitas[i][j], orbitas[i][j].vertice, i, radio, proporcion, numeroVertices)

            orbita = orbita.concat(nuevosPuntos);
        }
        orbitas.push(orbita);
    }
    return orbitas;
}

function T_DibujarOrbitas(iteraciones, radio, proporcion, numeroVertices) {
    let orbitas = CrearOrbitas(iteraciones, radio, proporcion, numeroVertices);

    push()

    stroke(0)
    strokeWeight(5);

    for (let i = 0; i < orbitas.length; i++) {
        for (let j = 0; j < orbitas[i].length; j++) {
            point(orbitas[i][j].centroInicial.x, orbitas[i][j].centroInicial.y);
        }
    }
    pop()
}