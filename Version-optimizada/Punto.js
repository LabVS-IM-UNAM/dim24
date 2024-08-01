class Punto {
	constructor(centroInicial, angulo, radio) {
		this._centroInicial = centroInicial;
		this._angulo = angulo;
		this._radio = radio;

		this._puntoInicial = null;
	}
	//	Nos regresa uno de los lados del poligono usando el hecho de que (x, y) = (r * cos(t), r * sin(t)); es decir, que podemos crear un poligono regular dado un circulo
	get vertice() {
		return { x: this._centroInicial.x + cos(this._angulo) * this._radio, y: this._centroInicial.y + sin(this._angulo) * this._radio };
	}
	//	Nos regresa el centro del poligono
	get centroInicial() {
		return { x: this._centroInicial.x, y: this._centroInicial.y };
	}
	//	Referencia del Punto padre (util, para cuando queramos limpiar las orbitas del fractal).
	set puntoInicial(puntoInicial) {
		this._puntoInicial = puntoInicial;
	}
	get puntoInicial() {
		return this._puntoInicial;
	}

}
