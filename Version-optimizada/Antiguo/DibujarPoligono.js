function DibujarPoligono(vertices) {
  beginShape();
  for (var vertice of vertices) {
    vertex(vertice.puntoX, vertice.puntoY);
  }
  endShape(CLOSE);
}


function DibujarImagen(vertices, radio = 50, centro = { x: width / 2, y: height / 2 }) {
  const WIDTH = 2 * radio;
  const HEIGHT = 2 * radio;

  shape = createGraphics(WIDTH, HEIGHT);

  shape.beginShape();
  for (let vertice of vertices) {
    shape.vertex(vertice.puntoX - vertice.centroX + radio, vertice.puntoY - vertice.centroY + radio);
  }
  shape.endShape(CLOSE);

  let imageScaled = createImage(WIDTH, HEIGHT);
  imageScaled.copy(IMAGEN, 0, 0, IMAGEN.width, IMAGEN.height, 0, 0, WIDTH, HEIGHT);
  imageScaled.mask(shape);

  imageMode(CENTER);
  image(imageScaled, centro.x, centro.y);
}
