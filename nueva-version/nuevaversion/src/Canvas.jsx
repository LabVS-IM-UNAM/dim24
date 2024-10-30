import React, { useRef, useState } from 'react';

const ImageEditor = () => {
    const canvasRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [proporcion, setProporcion] = useState(1/2);
    const [zoom, setZoom] = useState(1);




    const semejanza = (homotecia = 1, rotacion = 0, traslacion = [0,0])=>{
      function rot(x,y){
        return [x*Math.cos(rotacion) - y*Math.sin(rotacion), x*Math.sin(rotacion) + y*Math.cos(rotacion)]
      }

      return (x,y)=>{
        const rotado = rot(x,y);
        const [x2,y2] = [rotado[0]*homotecia + traslacion[0], rotado[1]*homotecia + traslacion[1]];
        return (x2,y2);
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
            for(let i = 0; i<vertices; i++){
              const funcion = semejanza(proporcion,Math.PI*2*i/vertices,[Math.cos(Math.PI*2*i/vertices),Math.sin(Math.PI*2*i/vertices)]);
              
            }

            





            for (let i = 0; i < modifiedData.length; i += 4) {
                // Example: Invert colors
                modifiedData[i] = 255 - modifiedData[i];       // Red channel
                modifiedData[i + 1] = 255 - modifiedData[i + 1]; // Green channel
                modifiedData[i + 2] = 255 - modifiedData[i + 2]; // Blue channel
                // Alpha channel (i + 3) remains the same
            }

            // Put modified data back to the canvas
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const modifiedImageData = new ImageData(modifiedData, imageData.width, imageData.height);
            ctx.putImageData(modifiedImageData, 0, 0);
        }
    };

    return (
        <div>
            <input type="file" accept="image/*" onChange={cargarImagen	} />
            <button onClick={modifyImage}>Modify Image</button>
            <input type="range" min ="3" max = "100" value = {vertices} onChange = {(event)=>{event.preventDefault(); setVertices(event.target.value)}}/>
            <input type="range" min = "0.1" max = "1" step = "0.1" value = {proporcion} onChange = {(event)=>{event.preventDefault(); setProporcion(event.target.value)}}/>
            <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
        </div>
    );
};

export default ImageEditor;