let NUMERO_VERTICES = 3;
let PROPORCION = 0.5;
let ZOOM = 75;
let ITERACIONES = 2;

let ANGULO = (2 * Math.PI) / NUMERO_VERTICES;

let shape;

function preload() {
  // CreateMetronome(1);
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  shape = createGraphics(windowWidth, windowHeight);

  Input();
  InicializarColores();
  Dibujar();
}

function Dibujar() {
  AsignarColores() // Si se quiere testear comentar esta linea
  DibujarFractal(ITERACIONES, ZOOM / PROPORCION, PROPORCION, NUMERO_VERTICES);
  // Debug_DibujarOrbitas(ITERACIONES, ZOOM / PROPORCION, PROPORCION, NUMERO_VERTICES);
}