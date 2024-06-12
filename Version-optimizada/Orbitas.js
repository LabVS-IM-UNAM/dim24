const distancia = (u, v) => Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));
const EPSILON = 0.01;

function CalcularSiguienteOrbita
    (
        puntoInicial = new Punto({ x: width / 2, y: height / 2 }, 0, 0),
        iteracionActual = 1,
        radio = 50,
        proporcion = 0.5,
        numeroVertices = 3
    ) {
    const DISTANCIA_CENTROS = radio * ((proporcion ** iteracionActual) * (proporcion + 1)); // Distancia del centro de la iteracion i con el centro de la iteracion i+1
    const ANGULO = TWO_PI / numeroVertices;

    let orbita = [];

    for (let j = 0; j < numeroVertices; j++) {
        let siguientePunto;
        let angulo = iteracionActual % 2 == 0 ? ANGULO * j : (ANGULO * j) + PI;

        siguientePunto = new Punto(puntoInicial.vertice, angulo, DISTANCIA_CENTROS)
        siguientePunto.puntoInicial = puntoInicial; //   Que guarde informacion de si centro padre

        orbita.push(siguientePunto);

        //Puntos pegados a su abuelo son eliminados
        if (iteracionActual > 1 && distancia(siguientePunto.puntoInicial.puntoInicial.vertice, siguientePunto.vertice) < distancia(siguientePunto.puntoInicial.puntoInicial.vertice, siguientePunto.puntoInicial.vertice)) {
            orbita.pop();
            // console.log("Se elimino un punto innecesario");
        }
    }
    return orbita;
}

function CrearOrbitas(iteraciones, radio = 50, proporcion = 0.5, numeroVertices = 3) {
    let orbitas = [];


    for (let i = 0; i < iteraciones; i++) {
        if (i == 0) {
            let puntoInicial = new Punto({ x: width / 2, y: height / 2 }, 0, 0);
            orbitas.push([puntoInicial]);
            // console.log("Se agrego centro inicial");
        } else {
            let orbita = [];
            for (let j = 0; j < orbitas[i - 1].length; j++) {
                let nuevosPuntos = CalcularSiguienteOrbita(orbitas[i - 1][j], i, radio, proporcion, numeroVertices)

                orbita = orbita.concat(nuevosPuntos);
            }
            orbitas.push(orbita);
            // console.log("Se agrego orbita " + (i + 1) + " con: " + orbita.length + " elementos");
        }

    }
    // console.log("\n\nSE CREARON: " + orbitas.length + " ORBITAS");
    return orbitas;
}

