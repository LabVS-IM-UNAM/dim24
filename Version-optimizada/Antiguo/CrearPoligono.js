class Punto {
  constructor(centro, angulo, radio) {
    this.centro = centro;
    this.angulo = angulo;
    this.radio = radio
  }

  get puntoX() {
    return this.centro.x + cos(this.angulo) * this.radio;
  }
  get puntoY() {
    return this.centro.y + sin(this.angulo) * this.radio;
  }
  get vector() {
    return { x: this.puntoX, y: this.puntoY };
  }
  get centroX() {
    return this.centro.x;
  }
  get centroY() {
    return this.centro.y;
  }
}

function CrearPoligono(numeroVertices = 3, radio = 50, centro = { x: width / 2, y: height / 2 }) {
  let anguloCentral = TWO_PI / numeroVertices;
  let vertices = [];
  for (let i = 0; i < numeroVertices; i++) {
    let angulo = anguloCentral * i;

    let punto = new Punto(centro, angulo, radio);

    vertices.push(punto);
  }
  return vertices;
}


