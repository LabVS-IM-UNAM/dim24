let startX, startY;
let endX, endY;
let selecting = false;
let w, h;
let released = false;

function setup() {
  createCanvas(400, 400);
}

//Los sketches no están incluyendo la función draw, se tiene que eliminar.
//No se están eliminando los rectángulos, solo se generan otros por encima.

function draw() {
  background(220);

  //esto generaba un error porque selecting se vuelve falso cuando se deja de presionar el mouse
  //y no es posible calcular los valores de w y h; el programa se ve obligado a esperar la segunda asignación.
  //Cambié la variable selecting por released, pero no sé si eso pueda crear problemas (porque se mantiene verdadera).
  //moví las asignaciones de w y h a la función mouseReleased().

  if (released) {
    rect(startX, startY, w, h);
  }
}

//Sería mejor tener una especie de while(mousepressed) para tener más suavidad en el generado del rectángulo.
//Quizás sería bueno eliminar el canvas anterior (usando draw) como una instrucción de mousePressed().

function mousePressed() {
  released = false;
  startX = mouseX;
  startY = mouseY;
  selecting = true;
}

function mouseReleased() {
  endX = mouseX;
  endY = mouseY;
  w = endX - startX;
  h = endY - startY;
  selecting = false;
  released = true;
}
