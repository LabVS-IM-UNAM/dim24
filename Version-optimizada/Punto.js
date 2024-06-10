class Punto {
	constructor(centro, angulo, radio) {
		this.centroInicial = centro;
		this.angulo = angulo;
		this.radio = radio;
	}

	get Vertice() {
		return { x: this.centroInicial.x + cos(this.angulo) * this.radio, y: this.centroInicial.y + sin(this.angulo) * this.radio };
	}
	get CentroInicial() {
		return { x: this.centroInicial.x, y: this.centroInicial.y };
	}

}
