const VectorX = (centroX, angulo, radio) => centroX + cos(angulo) * radio;
const VectorY = (centroY, angulo, radio) => centroY + sin(angulo) * radio;



function CrearPoligono(numeroVertices = 3, radio = 50, centro = { x: width / 2, y: height / 2 }) {
  let anguloCentral = TWO_PI / numeroVertices;
  let vertices = [];
  for (let i = 0; i < numeroVertices; i++) {
    let angulo = anguloCentral * i;
    vertices.push({ x: VectorX(centro.x, angulo, radio), y: VectorY(centro.y, angulo, radio) });
  }
  return vertices;
}


