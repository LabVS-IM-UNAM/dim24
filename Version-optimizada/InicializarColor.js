let IMAGEN;
let COLOR_FONDO;
let COLOR_FRACTAL;
let COLOR_BORDE;

//	Se inicializan los colores que se quieren mostrar al iniciar la pagina
function InicializarColores() {
	COLOR_FONDO = color("#ffffff");
	COLOR_FRACTAL = color("#000000");
	COLOR_BORDE = color("#000000");
}
//	Se asignan los colores a la pagina
function AsignarColores() {
	background(COLOR_FONDO);
	fill(COLOR_FRACTAL);
	stroke(COLOR_BORDE);
}
