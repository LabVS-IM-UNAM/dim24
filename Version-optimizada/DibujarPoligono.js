let IMAGEN;
let COLOR_FONDO;
let COLOR_FRACTAL;
let COLOR_BORDE;

function InicializarColores() {
  COLOR_FONDO = color("#ffffff");
  COLOR_FRACTAL = color("#000000");
  COLOR_BORDE = color("#000000");

  AsignarColores();
}

function AsignarColores() {
  background(COLOR_FONDO)
  fill(COLOR_FRACTAL);
  stroke(COLOR_BORDE);
}

function DibujarPoligono(vertices) {
  beginShape();
  for (let vertice of vertices) {
    vertex(vertice.x, vertice.y);
  }
  endShape(CLOSE);
}
function DibujarImagen(vertices, radio = 50, centro = { x: width / 2, y: height / 2 }) {
  const WIDTH = 2 * radio;
  const HEIGHT = 2 * radio;

  shape = createGraphics(WIDTH, HEIGHT);

  shape.beginShape();
  for (let vertice of vertices) {
    shape.vertex(vertice.x - centro.x + radio, vertice.y - centro.y + radio);
  }
  shape.endShape(CLOSE);

  let imageScaled = createImage(WIDTH, HEIGHT);
  imageScaled.copy(IMAGEN, 0, 0, IMAGEN.width, IMAGEN.height, 0, 0, WIDTH, HEIGHT);
  imageScaled.mask(shape);

  imageMode(CENTER);
  image(imageScaled, centro.x, centro.y);
}
