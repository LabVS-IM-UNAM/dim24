let NUMERO_VERTICES;
let PROPORCION;
let ZOOM;
let ITERACIONES;

function preload() {
  CreateMetronome(1);
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  Input();
  InicializarColores();
  Dibujar();

}

function Dibujar() {
  let poligono = CrearPoligono(NUMERO_VERTICES, ZOOM);

  if (IMAGEN) DibujarImagen(poligono, ZOOM);
  else DibujarPoligono(poligono);
}

