//  Funcion de prueba que dibuja las orbitas del fractal
function Debug_DibujarOrbitas(iteraciones, radio, proporcion, numeroVertices) {
    let orbitas = CrearOrbitas(iteraciones, radio, proporcion, numeroVertices);
    push();
    strokeWeight(5);
    stroke("green");
    for (let i = 0; i < orbitas.length; i++) {
        for (let j = 0; j < orbitas[i].length; j++) {
            point(orbitas[i][j].vertice.x, orbitas[i][j].vertice.y);
        }
    }
    pop();
}

//  Si se detecta que hay una imagen, entonces se dibuja en cada orbita un poligono ya sea enmascarando la imagen o con un color solido. 
function DibujarFractal(iteraciones, radio, proporcion, numeroVertices) {
    let orbitas = CrearOrbitas(iteraciones, radio, proporcion, numeroVertices);
    let poligono;
    let esPar;
    push();
    for (let i = 0; i < orbitas.length; i++) {
        for (let j = 0; j < orbitas[i].length; j++) {
            poligono = new Poligono({ x: orbitas[i][j].vertice.x, y: orbitas[i][j].vertice.y }, radio * (proporcion ** (i + 1)), numeroVertices);

            esPar = i % 2 == 0 ? false : true;

            if (IMAGEN) poligono.DibujarImagen(esPar);
            else poligono.DibujarPoligono(esPar);
        }
    }
    pop();
    console.log("\n\n FRACTAL DIBUJADO");
}