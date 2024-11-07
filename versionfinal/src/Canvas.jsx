import React, { useRef, useEffect, useState } from 'react';
import Cajon from './Cajon';
import p5 from 'p5';
import { Complejo } from './Complejo';
import Poligono from './Poligono';
import { poligonosFractal, dibujarPoligonos } from './fractal';

const Canvas = () => {
    const sketchRef = useRef();
    const [lados, setLados] = useState(4);
    const [iteraciones, setIteraciones] = useState(3);
    const [proporcion, setProporcion] = useState(1 / 2);
    const [imagen, setImagen] = useState(null);
    const [imgTexture, setImgTexture] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    const [fillColor, setFillColor] = useState('#FFFFFF');

    useEffect(() => {
        // Este efecto carga una nueva imagen en p5 y la asigna a imgTexture cuando cambia `imagen`
        if (imagen) {
            const loadTexture = (p) => {
                p.loadImage(imagen.src, (loadedImg) => {
                    setImgTexture(loadedImg); // Asigna la textura cargada
                });
            };
            const miP5 = new p5((p) => loadTexture(p));
        } else {
            setImgTexture(null); // Limpia la textura si no hay imagen
        }
    }, [imagen]);

    useEffect(() => {
        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
                p.noLoop();
            };

            p.draw = () => {
                p.clear();
                p.background(backgroundColor);
                p.camera(0, 0, (p.height / 2) / Math.tan(p.PI / 6), 0, 0, 0, 0, 1, 0);

                p.noStroke();
                p.fill(fillColor);

                const poligono = new Poligono(
                    new Complejo(0, 0),
                    new Complejo(0, 0),
                    lados,
                    0,
                    proporcion,
                    0
                );
                const poligonos = poligonosFractal([poligono], iteraciones);

                if (imgTexture) {
                    p.push();
                    p.texture(imgTexture);
                    dibujarPoligonos(p, imgTexture, poligonos);
                    p.pop();
                } else {
                    dibujarPoligonos(p, fillColor, poligonos);
                }
            };

            p.windowResized = () => {
                p.resizeCanvas(window.innerWidth, window.innerHeight);
                p.redraw();
            };
        };

        const miP5 = new p5(sketch, sketchRef.current);

        return () => {
            miP5.remove();
        };
    }, [proporcion, iteraciones, lados, imgTexture, backgroundColor, fillColor]);

    return (
        <div style={{ position: 'relative' }}>
            <Cajon 
                lados={lados} 
                setLados={setLados} 
                iteraciones={iteraciones} 
                setIteraciones={setIteraciones}
                proporcion={proporcion} 
                setProporcion={setProporcion} 
                imagen={imagen} 
                setImagen={setImagen} 
                canvasRef={sketchRef} 
                setBackgroundColor={setBackgroundColor} 
                setFillColor={setFillColor} 
            />
            <div ref={sketchRef}></div>
        </div>
    );
};

export default Canvas;
