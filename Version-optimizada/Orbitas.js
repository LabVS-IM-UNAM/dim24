const distancia = (u, v) => Math.sqrt((u.x - v.x) * (u.x - v.x) + (u.y - v.y) * (u.y - v.y));
const EPSILON = 0.01;

//  Se calcula la siguiente orbita dado un centro, una iteracion, un radio, una proporcion y la cantidad de vertices del poligono
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

        // Puntos dentro del radio del abuelo son descartados
        if (iteracionActual > 1 && distancia(siguientePunto.vertice, siguientePunto.puntoInicial.puntoInicial.vertice) < radio * (proporcion ** (iteracionActual - 1))) {
            // Debug_Orbitas(siguientePunto); //  Intenta este funcion con solo la condición iteracionActual > 1
            orbita.pop();
        }
    }
    return orbita;
}

//  Nos muestra una linea entre el punto de la itereacion + 2 y el punto de la iteracion; asi podemos ver si ese punto es el que queremos dividir
function Debug_Orbitas(siguientePunto) {
    push();
    strokeWeight(3);
    stroke("red");
    point(siguientePunto.vertice.x, siguientePunto.vertice.y);
    line(siguientePunto.vertice.x, siguientePunto.vertice.y, siguientePunto.puntoInicial.puntoInicial.vertice.x, siguientePunto.puntoInicial.puntoInicial.vertice.y);
    pop();
}

//  Se construye la orbita del fractal
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

