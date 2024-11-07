class Poligono {
    constructor(centro, centroAnterior, lados, rotacion, proporcion, iteracion = 0) {
        this.centro = centro;
        this.centroAnterior = centroAnterior;
        this.lados = lados;
        this.proporcion = proporcion;
        this.unidad = 100;
        this.iteracion = iteracion;
        this.rotacion = rotacion;
    }

    // Update dibujar method to support texture mapping
    dibujar(p, imagen = null) {
        p.beginShape();
        for (let i = 0; i < this.lados; i++) {
            const angulo = p.TWO_PI / this.lados * i;
            const verticeX = this.centro.real + this.unidad * this.proporcion ** this.iteracion * Math.cos(angulo + this.rotacion);
            const verticeY = this.centro.imag + this.unidad * this.proporcion ** this.iteracion * Math.sin(angulo + this.rotacion);

            // Apply texture if provided
            if (imagen) {
                // Calculate texture coordinates
                const u = (Math.cos(angulo + this.rotacion) + 1) / 2; // Normalize x to texture coordinates
                const v = (Math.sin(angulo + this.rotacion) + 1) / 2; // Normalize y to texture coordinates

                p.vertex(verticeX, verticeY, 0, u * imagen.width, v * imagen.height); // Map texture to the vertices
            } else {
                p.vertex(verticeX, verticeY);
            }
        }
        p.endShape(p.CLOSE);
    }
}

export default Poligono;
