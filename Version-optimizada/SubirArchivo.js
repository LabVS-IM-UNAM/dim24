function SubirArchivo(event) {
  let file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    loadImage(URL.createObjectURL(file), (img) => {
      IMAGEN = img;
      console.log("Imagen cargada correctamente");
      Dibujar();
    });
  } else {
    console.log("El archivo no es una imagen");
  }
}
