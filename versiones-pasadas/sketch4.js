
let fractalDiv;
let divWidth, divHeight
let length, proportion, maxlevel, colorPicker, uploadedImage, logo_im, logo_unam, marco;
let canvas;

function setup() {
  //Contenedor
  fractalDiv = createDiv();
  fractalDiv.parent("fractal");
  fractalDiv.class("fractalSkin")
  //Asignacion de tamaños apartir del div
  divWidth = fractalDiv.size().width;
  divHeight = fractalDiv.size().height;

  //Creacion canvas
  canvas = createCanvas(divWidth, windowHeight / 1.4);
  // colocar canvas en contenedor
  canvas.parent(fractalDiv);

  //Slider Iteraciones
  let text1 = createP('Iteraciones');
  text1.parent("slider");
  iterationsSlider = createSlider(1, 6, 3, 1);
  iterationsSlider.parent("slider");
  iterationsSlider.class("sliderSkin");
  //Slider Proporcion
  let text2 = createP('Proporción');
  text2.parent("slider");
  proportionSlider = createSlider(0.2, 0.8, 0.4, 0.01);
  proportionSlider.parent("slider");
  proportionSlider.class("sliderSkin");
  //Slider Zoom
  let text3 = createP('zoom');
  text3.parent("slider");
  lengthSlider = createSlider(divWidth / 10, divWidth / 2, divWidth / 5, 0);
  lengthSlider.parent("slider");
  lengthSlider.class("sliderSkin");
  //ColorPicker del fondo
  let texto_color = createP("Color del fondo");
  texto_color.parent("slider");
  colorPicker = createColorPicker(color(173, 216, 230));
  colorPicker.parent("slider");
  colorPicker.class("sliderSkin");
  //ColorPicker del fractal
  let cuadro_color = createP("Color del fractal");
  cuadro_color.parent("slider");
  colorPickerCuadro = createColorPicker(color(random(0, 255), random(0, 255), random(0, 255)));
  colorPickerCuadro.parent("slider");
  colorPickerCuadro.class("sliderSkin");

  //Deteccion de cambios
  iterationsSlider.changed(drawFractal);
  proportionSlider.changed(drawFractal);
  lengthSlider.changed(drawFractal);
  colorPicker.changed(drawFractal);

  // Evento para cambiar el colorPicker
  colorPicker.input(changeBackgroundColor);
}


function draw() {
  clear()

  translate(width / 2, height / 2);
  //translate(divWidth / 2,height/2);
  //translate(canvas.width / 2,canvas.height/2);
  drawFractal();

  //image(logo_im, -canvas.width/2+5, -canvas.height/2 , canvas.width/12, canvas.width/12);
  //image(logo_unam, -canvas.width/2 +10, -canvas.height/2, canvas.width/13, canvas.width/13);
}

function drawFractal() {
  maxlevel = iterationsSlider.value();
  proportion = proportionSlider.value();
  length = lengthSlider.value();
  h = length / 2;
  f_1 = funciones(createVector(h, -h));
  g_1 = funciones(createVector(h, h));
  f_2 = funciones(createVector(-h, h));
  g_2 = funciones(createVector(-h, -h));
  transformaciones = [f_1, g_1, f_2, g_2];
  drawOrbit(transformaciones, createVector(-h, -h));
}
function funciones(direccion) {
  return function (p) {
    return p5.Vector.add(
      p5.Vector.mult(
        p5.Vector.add(p, direccion), proportion), direccion);
  }
}
function createIndexesNotInverse() {
  let inotinverse = [];
  let kinv;
  for (let k = 1; k <= 4; k++) {
    kinv = ((k + 1) % 4);
    let a = [];
    let b = [];
    for (let j = kinv + 1; j < 4; j++) {
      append(a, j); 250
    }
    for (let j = 0; j <= kinv - 1; j++) {
      append(b, j);
    }
    c = a.concat(b);
    inotinverse.push(c);
  }
  return inotinverse;
}
function drawOrbit(transformaciones, p) {
  indexesNotInverse = createIndexesNotInverse();

  function traverseForward(p, index, level) {
    if (uploadedImage) {
      image(uploadedImage, p.x, p.y, length * (proportion ** (level)), length * (proportion ** (level)));

    } else {
      fill(colorPickerCuadro.value());
      square(p.x, p.y, length * (proportion ** (level)));
    }

    if (level >= maxlevel) {
      return;
    }
    let indices = indexesNotInverse[index];
    for (let i = 0; i < 3; i++) {
      traverseForward(transformaciones[indices[i]](p), indices[i], level + 1);
    }
  }
  if (uploadedImage) {
    image(uploadedImage, p.x, p.y, length, length);
  } else {
    fill(colorPickerCuadro.value())
    square(p.x, p.y, length);
  }

  for (let i = 0; i < 4; i++) {
    traverseForward(transformaciones[i](p), i, 1);
  }
}
function preload() {
  //logo_im = loadImage("imgs/im.png");
  //logo_unam = loadImage("imgs/unam.png");
  //marco = loadImage("marco.png");
}
function windowResized() {
  // Actualiza el tamaño del lienzo cuando se cambia el tamaño de la ventana
  divWidth = fractalDiv.size().width;
  resizeCanvas(divWidth, windowHeight / 1.4);
}
//  Cambiar color background
function changeBackgroundColor() {
  // Obtener el color seleccionado por el color picker
  let selectedColor = colorPicker.color();
  // Aplicar el color como fondo del contenedor fractalDiv
  fractalDiv.style("background-color", selectedColor.toString());
}
function uploadImage() {
  const fileInput = document.getElementById('imageUpload');
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      uploadedImage = loadImage(event.target.result, function (img) {
        console.log("Ya se subió");
        drawFractal();
        //para que se actualice el fractal justo después de subir la foto
      });
    };
    reader.readAsDataURL(file);
  } else {
    console.error("No hay foto");
  }
}
//Funcion para descargar la imagen
function descargarImagen() {
  //Medidas recorte y centro
  let x = (canvas.width - canvas.height) / 2;
  let y = 0;
  let w = canvas.width;
  let h = canvas.height;

  //Creacion del canvas cuadrado
  let imagenDescargar = createGraphics(h, h);
  //Asignacion de color al fondo del canvas para que se vea en la descarga
  imagenDescargar.background(colorPicker.color())


  //        Aqui se podra agregar un marco.       //


  //Recorte del canvas
  imagenDescargar.image(canvas.get(x, y, w, h), 0, 0);
  //Descarga del  nuevo canvas
  imagenDescargar.save("Fractal.png");
}
