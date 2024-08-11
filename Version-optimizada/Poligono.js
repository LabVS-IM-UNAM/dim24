class Poligono {
	constructor(centro, radio, numeroVertices) {
		this.centro = centro;
		this.radio = radio;
		this.numeroVertices = numeroVertices;

		// Crear y reutilizar el gráfico y la imagen escalada
		this.maskShape = createGraphics(2 * this.radio, 2 * this.radio);
		this.imageScaled = createImage(2 * this.radio, 2 * this.radio);
		this.maskNeedsUpdate = true; // Bandera para saber si la máscara necesita actualización

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

	ActualizarMascara(esPar) {
		let vertices = this.CrearPoligono(esPar);

		// Solo actualiza la máscara si es necesario
		if (this.maskNeedsUpdate) {
			this.maskShape.clear();
			this.maskShape.beginShape();
			for (const ver of vertices) {
				this.maskShape.vertex(
					ver.vertice.x - ver.centroInicial.x + this.radio,
					ver.vertice.y - ver.centroInicial.y + this.radio
				);
			}
			this.maskShape.endShape(CLOSE);
			this.maskNeedsUpdate = false; // Máscara actualizada
		}
	}



	DibujarImagen(esPar) {
		// Actualiza la máscara solo si es necesario
		this.ActualizarMascara(esPar);

		// Escalar la imagen base y aplicar la máscara
		this.imageScaled.copy(IMAGEN, 0, 0, IMAGEN.width, IMAGEN.height, 0, 0, 2 * this.radio, 2 * this.radio);
		this.imageScaled.mask(this.maskShape);

		// Dibujar la imagen enmascarada en la posición deseada
		imageMode(CENTER);
		image(this.imageScaled, this.centro.x, this.centro.y);
	}

	// Método para forzar la actualización de la máscara en caso de cambios externos
	ForzarActualizacionMascara() {
		this.maskNeedsUpdate = true;
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