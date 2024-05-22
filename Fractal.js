//  valores predeterminados
let PROPORCION = 0.5;
let ZOOM = 100;
let ITERACIONES = 5;
let NUMERO_VERTICES = 4;
let COLOR_BACKGROUND, COLOR_FRACTAL, COLOR_CONTORNO_FRACTAL, IMAGEN;
let shape;
let WIDTHSHAPE;
let HEIGHTSHAPE;

function setup() {
  createCanvas(windowWidth, windowHeight);
  //IMAGEN.resize(50,0);

  shape = createGraphics(width, height);
  WIDTHSHAPE = shape.width / 2;
  HEIGHTSHAPE = shape.height / 2;

  COLOR_BACKGROUND = color("#ffffff");
  COLOR_FRACTAL = color("#000000");
  COLOR_CONTORNO_FRACTAL = color("#000000");

  Dibujar();
  CreateMetronome(ITERACIONES);


  let sliderProporcion = document.getElementById("proporcion");
  let sliderZoom = document.getElementById("zoom");
  let sliderIteraciones = document.getElementById("iteraciones");
  let sliderNumeroVertices = document.getElementById("numeroVertices");
  let colorPickerBackground = document.getElementById("colorBackground");
  let colorPickerFractal = document.getElementById("colorFractal");
  let colorPickerContorno = document.getElementById("colorContornoFractal");
  let boton = document.getElementById("boton")

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
    CreateMetronome(ITERACIONES);
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

  boton.addEventListener("click", function () { saveCanvas("Fractal") })
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
    -->   itdaranhaeraciones: Son las veces que se realiza recursivamente el fractal.
*/
function DibujarFractal(centroX, centroY, vertice, radio, numVertices, iteraciones) {
  let radioReducido = radio * PROPORCION
  //  Para iteraciones positivas distintas de cero.
  if (iteraciones > 0) {
    // DibujarImagen(centroX, centroY, radio);
    // DibujarMask(centroX, centroY, radio, numVertices, iteraciones - 1);
    DibujarPoligono(centroX, centroY, radio, numVertices, iteraciones - 1);

    let listaVertices = InformacionPoligono(centroX, centroY, vertice, radio, numVertices, iteraciones);

    /*
      Para cada vertice del poligono anterior:
      -->   Asignamos ese vertice para no dibujar un poligono.
      -->   Buscamos un centro nuevo para dibujar nuestro poligono.
      -->   Llamamos esta función para realizar el proceso para cada vertice las iteraciones necesarias.
    */

    let angleOdd = setAngleOdd(numVertices, iteraciones)

    for (let v = 0; v < listaVertices[0].length; v++) {
      let X = (numVertices % 2 == 1 && iteraciones % 2 == 1) ? -listaVertices[0][v].x : listaVertices[0][v].x;
      let Y = listaVertices[0][v].y;
      let angle = listaVertices[1][v];

      DibujarFractal(
        getX(X, angle + angleOdd, radioReducido),
        getY(Y, angle, radioReducido),
        createVector(X, Y),
        radioReducido,
        numVertices,
        iteraciones - 1)
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
function InformacionPoligono(centroX, centroY, vertice = createVector(0, 0), radio, numVertices, iteraciones) {

  const ANGULO = TWO_PI / numVertices;
  const EPSILON = 0.01;

  let vertices = [];
  let angulos = [];

  centroX *= numVertices % 2 == 1 && iteraciones % 2 == 1 ? -1 : 1;

  let vector
  for (let a = 0; a < TWO_PI; a += ANGULO) {
    vector = createVector(getX(centroX, a, radio), getY(centroY, a, radio));

    vertices.push(vector);
    angulos.push(a);

    if ((numVertices % 2 == 1 && abs(vector.x + vertice.x) < EPSILON && abs(vector.y - vertice.y) < EPSILON) || (abs(vector.x - vertice.x) < EPSILON && abs(vector.y - vertice.y) < EPSILON)) {
      vertices.pop();
      angulos.pop();
    }
  }
  return [vertices, angulos];
}

/*  DibujarPoligono:
    Dibuja un poligono con parametros:
    -->   centro: (centroX, centroY), la posicion donde se empieza a dibujar el poligono.
    -->   radio: Distancia de cada vertice con el centro.
    -->   numVertices: Es la cantidad de vertices que tiene el poligono.
    -->   iteraciones: La iteracion en la que se encuentra el poligono.
*/
function DibujarPoligono(centroX, centroY, radio, numVertices, iteraciones) {

  let listVertex = CreateVertex(centroX, centroY, radio, numVertices, iteraciones);

  stroke(COLOR_CONTORNO_FRACTAL)
  fill(COLOR_FRACTAL)
  beginShape()
  for (let i = 0; i < listVertex.length; i++) {
    vertex(listVertex[i].x, listVertex[i].y);
  }
  endShape(CLOSE)
}

function DibujarMask(centroX, centroY, radio, numVertices, iteraciones) {
  let listVertex = CreateVertex(WIDTHSHAPE, HEIGHTSHAPE, radio, numVertices, iteraciones);
  shape.clear();
  shape.beginShape();
  for (let i = 0; i < listVertex.length; i++) {
    shape.vertex(listVertex[i].x, listVertex[i].y);
  }
  shape.endShape(CLOSE);

  imageMode(CENTER);
  image(shape, centroX, centroY)

  // let imageMasked = createImage(WIDTHMASK, HEIGHTMASK);
  // imageMasked.copy(IMAGEN, 0, 0, IMAGEN.width, IMAGEN.height, 0, 0, WIDTHIMAGE, HEIGHTIMAGE);

  // imageMode(CENTER);
  // imageMasked.mask(shape);
  // image(imageMasked, centroX, centroY);
}

function DibujarImagen(centroX, centroY, radio) {
  const WIDTH = 2 * radio;
  const HEIGHT = 2 * radio;
  let imageScaled = createImage(WIDTH, HEIGHT);
  imageScaled.copy(IMAGEN, 0, 0, IMAGEN.width, IMAGEN.height, 0, 0, WIDTH, HEIGHT);

  imageMode(CENTER);
  image(imageScaled, centroX, centroY);
}

function CreateVertex(centroX, centroY, radio, numVertices, iteraciones) {
  let listVertex = [];
  const ANGULO = TWO_PI / numVertices;
  let angle = setAnglePair(numVertices, iteraciones);

  for (let a = 0; a < TWO_PI; a += ANGULO) {
    let vertex = createVector(getX(centroX, a + angle, radio), getY(centroY, a + angle, radio));
    listVertex.push(vertex);
  }
  return listVertex;
}

function setAnglePair(numVertices, iteraciones) {
  return numVertices % 2 == 1 && iteraciones % 2 == 0 ? PI : 0;
}
function setAngleOdd(_numVertices, _iteraciones) {
  return _numVertices % 2 == 1 && _iteraciones % 2 == 1 ? PI : 0;
}


function getX(centroX, a, radio) {
  return centroX + cos(a) * radio;
}

function getY(centroY, a, radio) {
  return centroY + sin(a) * radio;
}
