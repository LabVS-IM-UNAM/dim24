//  valores predeterminados
let PROPORCION = 0.5;
let ZOOM = 100;
let ITERACIONES = 5;
let NUMERO_VERTICES = 4;
let COLOR_BACKGROUND;
let COLOR_FRACTAL;
let COLOR_CONTORNO_FRACTAL;
let IMAGEN;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //IMAGEN.resize(50,0);

  COLOR_BACKGROUND = color("#ffffff");
  COLOR_FRACTAL = color("#000000");
  COLOR_CONTORNO_FRACTAL = color("#000000");

  Dibujar();


  let sliderProporcion = document.getElementById("proporcion");
  let sliderZoom = document.getElementById("zoom");
  let sliderIteraciones = document.getElementById("iteraciones");
  let sliderNumeroVertices = document.getElementById("numeroVertices");
  let colorPickerBackground = document.getElementById("colorBackground");
  let colorPickerFractal = document.getElementById("colorFractal");
  let colorPickerContorno = document.getElementById("colorContornoFractal");

  sliderProporcion.addEventListener("input", function () {
    PROPORCION = parseFloat(sliderProporcion.value);
    Dibujar();
  });
  sliderZoom.addEventListener("input", function () {
    ZOOM = parseFloat(sliderZoom.value);
    Dibujar();
  })
  sliderIteraciones.addEventListener("input", function () {
    ITERACIONES = parseInt(sliderIteraciones.value);
    Dibujar();
  })
  sliderNumeroVertices.addEventListener("input", function () {
    NUMERO_VERTICES = parseInt(sliderNumeroVertices.value);
    Dibujar();
  })
  colorPickerBackground.addEventListener("input", function () {
    COLOR_BACKGROUND = this.value;
    Dibujar();
  })
  colorPickerFractal.addEventListener("input", function () {
    COLOR_FRACTAL = this.value;
    Dibujar();
  })
  colorPickerContorno.addEventListener("input", function () {
    COLOR_CONTORNO_FRACTAL = this.value;
    Dibujar();
  })


}

/*  Dibujar:
    Dibuja el fractal centrandolo en el canvas
*/
function Dibujar() {
  clear();
  background(COLOR_BACKGROUND);
  push();
  translate(width * 0.5, height * 0.5);
  rotate(PI / NUMERO_VERTICES)
  DibujarFractal(0, 0, createVector(0, 0), ZOOM, NUMERO_VERTICES, ITERACIONES);
  pop();
}
/*  DibujarFractal:
    Dibuja un fractal de poligonos con parametros:
    -->   centro: (centroX, centroY), la posicion donde se empieza a dibujar el fractal
    -->   radio: Distancia de cada vertice con el centro.
    -->   vertice: El vertice donde no se dibujara un poligono ni sus siguientes iteraciones.
    -->   numVertices: Es la cantidad de vertices que tiene el poligono.
    -->   iteraciones: Son las veces que se realiza recursivamente el fractal.
*/
function DibujarFractal(centroX, centroY, vertice, radio, numVertices, iteraciones) {
  let radioReducido = radio * PROPORCION
  //  Para iteraciones positivas distintas de cero.
  if (iteraciones > 0) {
    DibujarPoligono(centroX, centroY, radio, numVertices, iteraciones - 1);
    let listaVertices = InformacionPoligono(centroX, centroY, vertice, radio, numVertices, iteraciones);
    //  Para la siguiente iteracion
    let nuevoCentroX, nuevoCentroY, nuevoVertice;
    /*  
      Para cada vertice del poligono anterior:
      -->   Asignamos ese vertice para no dibujar un poligono.
      -->   Buscamos un centro nuevo para dibujar nuestro poligono.
      -->   Llamamos esta función para realizar el proceso para cada vertice las iteraciones necesarias.
    */
    for (let v = 0; v < listaVertices[0].length; v++) {
      let X = listaVertices[0][v].x;
      let Y = listaVertices[0][v].y;
      let angle = listaVertices[1][v];

      nuevoVertice = createVector(X, Y);

      if (numVertices % 2 == 1) {
        if (iteraciones % 2 == 1) {
          nuevoCentroX = -X + cos(angle + PI) * radioReducido;
          nuevoCentroY = Y + sin(angle) * radioReducido;
        } else {
          nuevoCentroX = X + cos(angle) * radioReducido
          nuevoCentroY = Y + sin(angle) * radioReducido;
        }
      } else {
        nuevoCentroX = X + cos(angle) * radioReducido;
        nuevoCentroY = Y + sin(angle) * radioReducido;
      }

      DibujarFractal(nuevoCentroX, nuevoCentroY, nuevoVertice, radioReducido, numVertices, iteraciones - 1)
    }
  }
}

/*  InformacionPoligono:
    Almacena informacion relacionada a la posicion y angulo respecto al eje X de los vertices del poligono a 
    excepcion de 1.
    -->   centro: (centroX, centroY), la posicion donde se empieza a dibujar el poligono.
    -->   radio: Distancia de cada vertice con el centro.
    -->   vertice: El vertice donde no se dibujara un poligono ni sus siguientes iteraciones.
    -->   numVertices: Es la cantidad de vertices que tiene el poligono.
    -->   iteraciones: La iteracion en la que se encuentra el poligono.
*/
function InformacionPoligono(centroX, centroY, vertice, radio, numVertices, iteraciones) {

  const ANGULO = TWO_PI / numVertices;
  const EPSILON = 0.01;

  let vertices = [];
  let angulos = [];
  let informacion = [];

  let sx, sy;
  /*
    Buscamos la posicion de cada vertice del poligono a partir de su centro y su radio, guardamos su posicion
    y su angulo con respecto al eje x en una lista.
    Verificamos que la posicion que guardamos no sea la del parametro vertice, de serlo lo sacamos de la lista
  */
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

    /*
      Verificar que el vertice del poligono no concuerde con uno dado, util para la siguiente iteración.
      NOTA:
        La verificacion cambia sutilmente dependiendo si el poligono es par o impar.
    */
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
  //  Guardamos la informacion que queremos en una lista
  informacion.push(vertices);
  informacion.push(angulos);

  return informacion;
}

/*  DibujarPoligono:
    Dibuja un poligono con parametros:
    -->   centro: (centroX, centroY), la posicion donde se empieza a dibujar el poligono.
    -->   radio: Distancia de cada vertice con el centro.
    -->   numVertices: Es la cantidad de vertices que tiene el poligono.
    -->   iteraciones: La iteracion en la que se encuentra el poligono.
*/
function DibujarPoligono(centroX, centroY, radio, numVertices, iteraciones) {
  //  Calculo del ángulo para rotar cada vertice de poligonos
  const ANGULO = TWO_PI / numVertices;
  //  Dibujo del poligono
  beginShape();
  //  Color
  stroke(COLOR_CONTORNO_FRACTAL)
  fill(COLOR_FRACTAL);

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
    } else {
      sx = centroX + cos(a) * radio;
      sy = centroY + sin(a) * radio;
    }
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
