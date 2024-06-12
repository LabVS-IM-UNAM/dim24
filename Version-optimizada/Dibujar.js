function T_DibujarOrbitas(iteraciones, radio, proporcion, numeroVertices) {
    let orbitas = CrearOrbitas(iteraciones, radio, proporcion, numeroVertices);

    push();

    stroke(255);
    strokeWeight(5);

    for (let i = 0; i < orbitas.length; i++) {
        for (let j = 0; j < orbitas[i].length; j++) {
            point(orbitas[i][j].vertice.x, orbitas[i][j].vertice.y);
        }
    }
    pop();
}

function DibujarFractal(iteraciones, radio, proporcion, numeroVertices) {
    let orbitas = CrearOrbitas(iteraciones, radio, proporcion, numeroVertices);
    let poligono;
    let esPar
    push();

    for (let i = 0; i < orbitas.length; i++) {
        for (let j = 0; j < orbitas[i].length; j++) {
            poligono = new Poligono({ x: orbitas[i][j].vertice.x, y: orbitas[i][j].vertice.y }, radio * (proporcion ** (i + 1)), numeroVertices);

            esPar = i % 2 == 0 ? false : true;

            if (IMAGEN) poligono.DibujarImagen(esPar);
            else poligono.DibujarPoligono(esPar);
            // console.log("Poligono dibujado");
        }
    }
    // console.log("\n\n FRACTAL DIBUJADO");
    pop();
}