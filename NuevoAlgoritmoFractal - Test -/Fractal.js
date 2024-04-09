let PROPORCION = 0.5

function setup() {
  createCanvas(windowWidth, windowHeight);

  push();
  translate(width * 0.5, height * 0.5);
  DibujarFractal(0, 0, createVector(0, 0), 100, 3, 5);
  pop();
}

function DibujarFractal(centroX, centroY, vertice, radio, numVertices, iteraciones) {
  let radioReducido = radio * PROPORCION
  if (iteraciones > 0) {
    DibujarPoligono(centroX, centroY, radio, numVertices, iteraciones - 1);

    let listaVertices = InformacionPoligono(centroX, centroY, vertice, radio, numVertices, iteraciones);

    let nuevoCentroX, nuevoCentroY;
    for (let v = 0; v < listaVertices[0].length; v++) {
      let nuevoVertice = createVector(listaVertices[0][v].x, listaVertices[0][v].y);
      let X = listaVertices[0][v].x;
      let Y = listaVertices[0][v].y;
      let angle = listaVertices[1][v]

      if (numVertices % 2 == 1) {
        if (iteraciones % 2 == 1) {
          nuevoCentroX = -X + cos(angle + PI) * radioReducido
          nuevoCentroY = Y + sin(angle) * radioReducido;
        } else {
          nuevoCentroX = X + cos(angle) * radioReducido
          nuevoCentroY = Y + sin(angle) * radioReducido;
        }

      }
      else {
        nuevoCentroX = X + cos(angle) * radioReducido;
        nuevoCentroY = Y + sin(angle) * radioReducido;
      }

      DibujarFractal(nuevoCentroX, nuevoCentroY, nuevoVertice, radioReducido, numVertices, iteraciones - 1)
    }
  }
}

function InformacionPoligono(centroX, centroY, vertice, radio, numVertices, iteraciones) {
  const ANGULO = TWO_PI / numVertices;
  const EPSILON = 0.01;

  let vertices = [];
  let angulos = [];
  let informacion = [];

  let sx, sy;
  for (let a = 0; a < TWO_PI; a += ANGULO) {
    if (numVertices % 2 == 1) {
      if (iteraciones % 2 == 1) {
        sx = -centroX + cos(a) * radio;
        sy = centroY + sin(a) * radio;
      } else {
        sx = centroX + cos(a) * radio;
        sy = centroY + sin(a) * radio;
      }
    }
    else {
      sx = centroX + cos(a) * radio;
      sy = centroY + sin(a) * radio;
    }

    let vector = createVector(sx, sy);

    vertices.push(vector);
    angulos.push(a);

    //	Verificar que el vertice del poligono no concuerde con uno dado, util para la siguiente iteración
    if (numVertices % 2 == 1) {
      if (abs(vector.x + vertice.x) < EPSILON && abs(vector.y - vertice.y) < EPSILON) {
        vertices.pop();
        angulos.pop();
      }
    } else {
      if (abs(vector.x - vertice.x) < EPSILON && abs(vector.y - vertice.y) < EPSILON) {
        vertices.pop();
        angulos.pop();
      }
    }
  }

  informacion.push(vertices);
  informacion.push(angulos);

  return informacion;
}

function DibujarPoligono(centroX, centroY, radio, numVertices, iteraciones) {
  //	 Calculo del ángulo para rotar cada vertice de poligonos
  const ANGULO = TWO_PI / numVertices;

  beginShape();
  ////  CUALQUIER COLOR, IMAGEN O VIDEO CREO SE PONE EN ESTE AREA   ////
  ////                                                              ////
  
  let sx, sy;
  for (let a = 0; a < TWO_PI; a += ANGULO) {
    if (numVertices % 2 == 1) {
      if (iteraciones % 2 == 0) {
        sx = centroX + cos(a + PI) * radio;
        sy = centroY + sin(a) * radio;
      } else {
        sx = centroX + cos(a) * radio;
        sy = centroY + sin(a) * radio;
      }
    }
    else {
      sx = centroX + cos(a) * radio;
      sy = centroY + sin(a) * radio;
    }
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

