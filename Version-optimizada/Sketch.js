let NUMERO_VERTICES = 4;
let PROPORCION = 0.5;
let ZOOM = 75;
let ITERACIONES = 4;

let marco

function preload() {
  // CreateMetronome(1);
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  marco = createGraphics(windowWidth / 4, windowHeight / 4)


  Input();
  // InicializarColores();
  Dibujar();
}

function Dibujar() {
  // let poligono = new Poligono({ x: width / 2, y: height / 2 }, ZOOM, NUMERO_VERTICES);

  // // if (IMAGEN) poligono.DibujarImagen(true);
  // // else poligono.DibujarPoligono(true);
  T_DibujarOrbitas(ITERACIONES, ZOOM, PROPORCION, NUMERO_VERTICES);
}

function draw() {

  let fps = frameRate();

  clear();
  textSize(10)
  text(fps.toFixed(2), 50, 50);
  Dibujar();
}