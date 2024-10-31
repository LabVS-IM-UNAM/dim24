let shape;
class Poligono {
	constructor(centro, radio, numeroVertices) {
		this.centro = centro;
		this.radio = radio;
		this.numeroVertices = numeroVertices;
		this.WIDTH = 2 * radio;
		this.HEIGHT = 2 * radio;
	}
	//	Creacion de un poligono dependiedo si la cantidad de numeros de vertices es Par o no (necesaria para poligonos impares)
	CrearPoligono(esPar) {
		const ANGULO_CENTRAL = TWO_PI / this.numeroVertices;
		let vertices = [];
		for (let i = 0; i < this.numeroVertices; i++) {
			let angulo = esPar ? ANGULO_CENTRAL * i : (ANGULO_CENTRAL * i) + PI;
			vertices.push(new Punto(this.centro, angulo, this.radio));
		}
		return vertices;
	}
	
	//	Se dibuja el poligono creado
	DibujarPoligono(esPar) {
		let vertices = this.CrearPoligono(esPar);
		beginShape();
		for (const ver of vertices) {
			let vertice = ver.vertice;
			vertex(vertice.x, vertice.y)
		}
		endShape(CLOSE);
	}

	//	Se dibuja una mascara para colocar una imagen; siendo la frontera de la mascara el poligono
	DibujarImagen(esPar) {
		let vertices = this.CrearPoligono(esPar);

		shape = createGraphics(this.WIDTH, this.HEIGHT);

		shape.beginShape();
		for (const ver of vertices) {
			shape.vertex(
				ver.vertice.x - ver.centroInicial.x + this.radio,
				ver.vertice.y - ver.centroInicial.y + this.radio,
			);
		}
		shape.endShape(CLOSE);

		let imageScaled = createImage(this.WIDTH, this.HEIGHT);
		imageScaled.copy(IMAGEN, 0, 0, IMAGEN.width, IMAGEN.height, 0, 0, this.WIDTH, this.HEIGHT);
		imageScaled.mask(shape);

		imageMode(CENTER);
		image(imageScaled, this.centro.x, this.centro.y);
	}

	//	Se dibuja el centro del poligono
	Debug_DibujarCentro() {
		let vertice = this.CrearPoligono(true)[0].centroInicial;
		push();
		strokeWeight(2);
		stroke("blue");
		point(vertice.x, vertice.y);
		pop();
	}
}