/*
CalcularCentros:
  A partir de un centro calcula la posicion de los centros para la siguiente iteracion con un radio, una proporcion y un numero de vertices fijos.
*/
function CalcularSiguienteOrbita(punto, iteracionActual = 1, radio = 50, proporcion = 0.5, numeroVertices = 3) {
  const DISTANCIA_CENTROS = radio * ((proporcion ** iteracionActual) * (proporcion + 1)); // Distancia del centro de la iteracion i con el centro de la iteracion i+1
  const ANGULO = TWO_PI / numeroVertices;

  let centros = []; //  Lista de centros

  for (let j = 0; j < numeroVertices; j++) {
    let siguienteCentro = new Punto(punto, j * ANGULO, DISTANCIA_CENTROS);
    centros.push(siguienteCentro);
  }
  return centros;
}


function CrearOrbitaFractal(iteraciones, radio = 50, proporcion = 0.5, numeroVertices = 3) {
  let orbitas = [];
  centroInicial = new Punto({ x: width / 2, y: height / 2 }, 0, 0);
  orbitas.push([centroInicial]);  // Centro inicial

  for (let i = 0; i < iteraciones - 1; i++) {
    let orbita = [];
    for (let j = 0; j < orbitas[i].length; j++) {
      let nuevosCentros = CalcularSiguienteOrbita(orbitas[i][j], i, radio, proporcion, numeroVertices);

      orbita = orbita.concat(nuevosCentros)
    }
    orbitas.push(orbita);
  }
  return orbitas;
}


function TestDibujarOrbita(iteraciones, radio, proporcion, numeroVertices) {
  let orbitas = CrearOrbitaFractal(iteraciones, radio, proporcion, numeroVertices);

  push()
  stroke(0);
  strokeWeight(5);

  for (let i = 0; i < orbitas.length; i++) {
    for (let j = 0; j < orbitas[i].length; j++) {
      console.log(orbitas[i][j].centroX, orbitas[i][j].centroY);
      point(orbitas[i][j].centroX, orbitas[i][j].centroY);
    }
  }
  pop();
}

function DibujarFractal(iteraciones, radio, proporcion, numeroVertices) {
  let orbitas = CrearOrbitaFractal(iteraciones, radio, proporcion, numeroVertices);
  let poligono;

  push();

  for (let i = 0; i < orbitas.length; i++) {
    for (let j = 0; j < orbitas[i].length; j++) {
      poligono = CrearPoligono(numeroVertices, radio * (proporcion ** (i)), { x: orbitas[i][j].centroX, y: orbitas[i][j].centroY })

      if (IMAGEN) {
        if (i < 3) {
          DibujarImagen(poligono, radio * (proporcion ** (i)), { x: orbitas[i][j].centroX, y: orbitas[i][j].centroY });
        } else {
          DibujarPoligono(poligono, radio * (proporcion ** (i)), { x: orbitas[i][j].centroX, y: orbitas[i][j].centroY });
        }
      } else {
        DibujarPoligono(poligono, radio * (proporcion ** (i)), { x: orbitas[i][j].centroX, y: orbitas[i][j].centroY });
      }
    }
  }
  pop();
  console.log("Fractal dibujado");
}