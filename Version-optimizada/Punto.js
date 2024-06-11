class Punto {
	constructor(centroInicial, angulo, radio) {
		this._centroInicial = centroInicial;
		this._angulo = angulo;
		this._radio = radio;

		this._puntoInicial = null;
	}

	get vertice() {
		return { x: this._centroInicial.x + cos(this._angulo) * this._radio, y: this._centroInicial.y + sin(this._angulo) * this._radio };
	}
	get centroInicial() {
		return { x: this._centroInicial.x, y: this._centroInicial.y };
	}

	set puntoInicial(puntoInicial) {
		this._puntoInicial = puntoInicial;
	}
	get puntoInicial() {
		return this._puntoInicial;
	}

}
