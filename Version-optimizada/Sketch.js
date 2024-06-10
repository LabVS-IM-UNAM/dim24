let NUMERO_VERTICES = 4;
let PROPORCION = 0.5;
let ZOOM = 75;
let ITERACIONES = 2;

function preload() {
  // CreateMetronome(1);
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  Input();
  // InicializarColores();
  Dibujar();
}

function Dibujar() {
  let poligono = new Poligono({ x: width / 2, y: height / 2 }, ZOOM, NUMERO_VERTICES);

  if (IMAGEN) poligono.DibujarImagen(true);
  else poligono.DibujarPoligono(true);
  poligono.DibujarPunto();
}

