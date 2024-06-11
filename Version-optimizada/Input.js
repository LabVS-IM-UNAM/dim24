function Input() {
  let sliderNumeroVertices = document.getElementById("numeroVertices");
  let sliderProporcion = document.getElementById("proporcion");
  let sliderZoom = document.getElementById("zoom");
  let sliderIteraciones = document.getElementById("iteraciones");

  let colorPickerFondo = document.getElementById("colorFondo");
  let colorPickerFractal = document.getElementById("colorFractal");
  let colorPickerBorde = document.getElementById("colorBorde");

  let boton = document.getElementById("boton")
  let inputImagen = select("#imagen");


  sliderProporcion.addEventListener("input", function () {
    PROPORCION = parseFloat(sliderProporcion.value);
    clear();

    Dibujar();
  });
  sliderZoom.addEventListener("input", function () {
    ZOOM = parseFloat(sliderZoom.value);
    clear();

    Dibujar();
  })
  sliderIteraciones.addEventListener("input", function () {
    ITERACIONES = parseInt(sliderIteraciones.value);
    clear();

    Dibujar();
    // CreateMetronome(ITERACIONES);
  })
  sliderNumeroVertices.addEventListener("input", function () {
    NUMERO_VERTICES = parseInt(sliderNumeroVertices.value);
    clear();

    Dibujar();
  })

  colorPickerFondo.addEventListener("input", function () {
    COLOR_FONDO = this.value;
    clear();

    AsignarColores();
    Dibujar();
  })
  colorPickerFractal.addEventListener("input", function () {
    COLOR_FRACTAL = this.value;
    clear();

    AsignarColores();
    Dibujar();
  })
  colorPickerBorde.addEventListener("input", function () {
    COLOR_BORDE = this.value;
    clear();

    AsignarColores();
    Dibujar();
  })

  inputImagen.elt.addEventListener("change", SubirArchivo);
  boton.addEventListener("click", function () { saveCanvas("Fractal") })
}
