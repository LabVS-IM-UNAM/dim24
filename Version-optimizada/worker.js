// worker.js
self.onmessage = function(e) {
	const { centro, radio, numeroVertices, esPar } = e.data;
	const ANGULO_CENTRAL = 2 * Math.PI / numeroVertices;
	let vertices = [];

	for (let i = 0; i < numeroVertices; i++) {
		let angulo = esPar ? ANGULO_CENTRAL * i : (ANGULO_CENTRAL * i) + Math.PI;
		let x = centro.x + radio * Math.cos(angulo);
		let y = centro.y + radio * Math.sin(angulo);
		vertices.push({ x, y });
	}
	postMessage(vertices);
};