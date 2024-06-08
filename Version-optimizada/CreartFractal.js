const Distancia = (vectorA, vectorB) => Math.sqrt((vectorB.x - vectorA.x) ** 2 + (vectorB.y - vectorA.y) ** 2);
/*
CalcularCentros:
  A partir de un centro calcula la posicion de los centros para la siguiente iteracion con un radio, una proporcion y un numero de vertices fijos.
*/
function CalcularSiguientesCentros(centro = { x: width / 2, y: height / 2 }, iteracionActual = 1, radio = 50, proporcion = 0.5, numeroVertices = 3) {
  const DISTANCIA_CENTROS = radio * ((proporcion ** iteracionActual) + (proporcion ** (iteracionActual + 1))); // Distancia del centro de la iteracion i con el centro de la iteracion i+1
  const ANGULO = TWO_PI / numeroVertices;

  let siguienteCentro; //  Siguiente centro dado uno base
  let centros = []; //  Lista de centros

  for (let j = 0; j < numeroVertices; j++) {
    siguienteCentro = { x: VectorX(centro.x, j * ANGULO, DISTANCIA_CENTROS), y: VectorY(centro.y, j * ANGULO, DISTANCIA_CENTROS) };
    centros.push(siguienteCentro);
  }
  return centros;
}
/*
LimpiarDespuesDeSiguientesCentros:
  Se regresa un array de centros tales que su distancia con un centro inicial es menor a una distancia determinada por la iteracion actual, el radio y la proporcion (DISTANCIA_CENTROS)
*/
function LimpiarDespuesDeSiguientesCentros(centrosDespuesDeSiguienteIteracion = [], centroInicial = { x: width / 2, y: height / 2 }, iteracionActual = 1, radio = 50, proporcion = 0.5) {
  const DISTANCIA_CENTROS = radio * ((proporcion ** iteracionActual) + (proporcion ** (iteracionActual + 1)));
  return centrosDespuesDeSiguienteIteracion.filter(element => Distancia(centroInicial, element) > DISTANCIA_CENTROS);
}


// function CrearCentrosFractal(iteraciones = 1) {
//   let centros = [];
//   let centroInicial = [{ x: width / 2, y: height / 2 }]
//   centros.push();

//   for (let i = 0; i < iteraciones; i++) {
//     for (let j = 0; j < array.length; j++) {
//       let
//         centros.push()
//     }
//   }
// }