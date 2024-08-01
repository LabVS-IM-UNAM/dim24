let NUMERO_VERTICES = 3;
let PROPORCION = 0.5;
let ZOOM = 75;
let ITERACIONES = 2;

let marco

function preload() {
  // CreateMetronome(1);
}
function setup() {
  createCanvas(windowWidth, windowHeight);

  Input();
  InicializarColores();
  Dibujar();
}

function Dibujar() {
  AsignarColores() // Si se quiere testear comentar esta linea
  DibujarFractal(ITERACIONES, ZOOM / PROPORCION, PROPORCION, NUMERO_VERTICES);
  // T_DibujarOrbitas(ITERACIONES, ZOOM / PROPORCION, PROPORCION, NUMERO_VERTICES);
}


//  Test
// function draw() {

//   let fps = frameRate();

//   clear();
//   textSize(10)
//   text(fps.toFixed(2), 50, 50);
//   Dibujar();
// }