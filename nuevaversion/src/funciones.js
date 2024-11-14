function clamp(num, min, max) {
    return Math.max(min, Math.min(num, max));
}

function pixelACoordenadas(imagen, pixely, pixelx) {
    const [ancho, alto] = [imagen.width, imagen.height];
    const [x, y] = [
        -2 + (pixelx / (ancho - 1))*2 * 2 ,
        2 - (pixely / (alto - 1))*2 * 2
    ];
    return [x, y];
}

function coordenadasAPixel(imagen, x, y) {
    const [ancho, alto] = [imagen.width, imagen.height];
    const pixelx = Math.round(clamp((x + 2) / (2 * 2) * (ancho - 1), 0, ancho - 1));
    const pixely = Math.round(clamp((2 - y) / (2 * 2) * (alto - 1), 0, alto - 1));
    return [pixely, pixelx];
}

export function funcionAImagen(imagen, funcion) {
    const [ancho, alto] = [imagen.width, imagen.height];
    let nuevaImagen = new ImageData(ancho, alto);
    
    // Inicializa nueva imagen con transparencia
    nuevaImagen.data.fill(0);

    for (let columna = 0; columna < ancho; columna++) {
        for (let renglon = 0; renglon < alto; renglon++) {
            const [x, y] = pixelACoordenadas(imagen, renglon, columna);
            const nuevasCoordenadas = funcion(x, y);
            const [pixely, pixelx] = coordenadasAPixel(imagen, nuevasCoordenadas[0], nuevasCoordenadas[1]);

            // Calcula los índices de los píxeles en la imagen de entrada y en la nueva imagen
            const indiceOriginal = (columna + renglon * ancho) * 4;
            const indiceTransformado = (pixelx + pixely * ancho) * 4;

            // Si el índice ya tiene valores, aplica un promedio simple (mezcla de colores)
            for (let i = 0; i < 4; i++) {
                nuevaImagen.data[indiceTransformado + i] =imagen.data[indiceOriginal + i];
            }
        }
    }
    return nuevaImagen;
}


export function combinarImagenes(imagen1, imagen2) {
    const [ancho, alto] = [imagen1.width, imagen1.height];
    let nuevaImagen = new ImageData(ancho, alto);

    for (let renglon = 0; renglon < alto; renglon++) {
        for (let columna = 0; columna < ancho; columna++) {
            const indice = (columna + renglon * ancho) * 4;
            for (let i = 0; i < 3; i++) {
                nuevaImagen.data[indice + i] =clamp(imagen1.data[indice + i] + imagen2.data[indice + i],0,255);
            }
            nuevaImagen.data[indice + 3] = 255;
        }
    }

    return nuevaImagen;
}
export function Hutchinson(imagen, funciones, iteraciones){
    if (iteraciones == 0){
        return imagen
    }else{
        let nuevaImagen = new ImageData(imagen.width, imagen.height);
        const imagenesTransformadas = []
        for (let funcion of funciones){
            const imagenTransofrmada = funcionAImagen(imagen,funcion);
            imagenesTransformadas.push(imagenTransofrmada);
        }

        for (let i=0; i<imagenesTransformadas.length; i++){
            nuevaImagen = combinarImagenes(nuevaImagen, imagenesTransformadas[i]);
        }
        return Hutchinson(nuevaImagen, funciones, iteraciones-1);

    }
}
