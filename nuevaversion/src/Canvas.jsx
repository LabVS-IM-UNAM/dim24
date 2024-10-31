import React, { useRef, useState } from 'react';
import { funcionAImagen, combinarImagenes, Hutchinson } from './funciones';

const ImageEditor = () => {
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [proporcion, setProporcion] = useState(1/2);
    const [vertices, setVertices] = useState(3);
    const [iteraciones, setIteraciones] = useState(1);




    const semejanza = (homotecia = 1, rotacion = 0, traslacion = [0,0])=>{
      function rot(x,y){
        return [x*Math.cos(rotacion) - y*Math.sin(rotacion), x*Math.sin(rotacion) + y*Math.cos(rotacion)]
      }

      return (x,y)=>{
        const rotado = rot(x,y);
        const [x2,y2] = [rotado[0]*homotecia + traslacion[0], rotado[1]*homotecia + traslacion[1]];
        return[x2,y2];
      };

    }


    const cargarImagen = (event) => {
        const file = event.target.files[0];
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;

                // Draw the image to the canvas
                ctx.drawImage(img, 0, 0);
                
                // Save the image data for pixel manipulation
                const imgData = ctx.getImageData(0, 0, img.width, img.height);
                setImageData(imgData);
            };
        }
    };

    const generarFractal = () => {
        if (imageData) {
            const modifiedData = new Uint8ClampedArray(imageData.data);
            const ancho = imageData.width;
            const alto = imageData.height;
            let funciones = []
            for(let i = 0; i<vertices; i++){
                const funcion =(x,y)=>{
                    return [(Math.cos(Math.PI*2*i/vertices)-x)*proporcion+x,(Math.sin(Math.PI*2*i/vertices)-y)*proporcion+y]
                };
                funciones.push(funcion)
            }

            

            const nuevaImagen = Hutchinson(imageData,funciones,iteraciones)
            console.log(imageData)
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            ctx.putImageData(nuevaImagen, 0, 0);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={cargarImagen	} />
            <input type="range" min ="3" max = "10" step="1" value = {vertices} onChange = {(event)=>{event.preventDefault(); setVertices(event.target.value)}}/>
            <input type="range" min ="1" max = "10" value = {iteraciones} onChange = {(event)=>{event.preventDefault(); setIteraciones(event.target.value)}}/>
            <input type="range" min = "0.1" max = "1" step = "0.1" value = {proporcion} onChange = {(event)=>{event.preventDefault(); setProporcion(event.target.value)}}/>
            <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
            <button onClick={generarFractal}>Generar</button>
        </div>
    );
};

export default ImageEditor;