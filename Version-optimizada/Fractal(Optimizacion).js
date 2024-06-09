let NUMERO_VERTICES = 3;
let PROPORCION = 0.5;
let ZOOM = 75;
let ITERACIONES = 5;

function preload() {
  // CreateMetronome(1);
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  Input();
  // InicializarColores();
  // Dibujar();

  TestDibujarOrbita(ITERACIONES, ZOOM, PROPORCION, NUMERO_VERTICES);
}

function Dibujar() {
  let poligono = CrearPoligono(NUMERO_VERTICES, ZOOM);

  if (IMAGEN) DibujarImagen(poligono, ZOOM);
  else DibujarPoligono(poligono);
}

