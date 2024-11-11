import React, { useRef, useEffect, useState } from 'react';
import Cajon from './Cajon';
import p5 from 'p5';
import { Complejo } from './Complejo';
import Poligono from './Poligono';
import { poligonosFractal, dibujarPoligonos } from './fractal';
import { Button, Slider } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';

const Canvas = () => {
    const sketchRef = useRef();
    const [lados, setLados] = useState(4);
    const [iteraciones, setIteraciones] = useState(3);
    const [proporcion, setProporcion] = useState(1 / 2);
    const [imagen, setImagen] = useState(null);
    const [imgTexture, setImgTexture] = useState(null);
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    const [fillColor, setFillColor] = useState('#FFFFFF');
    const [zoom, setZoom] = useState(1);

    useEffect(() => {
        if (imagen) {
            const loadTexture = (p) => {
                p.loadImage(imagen.src, (loadedImg) => {
                    setImgTexture(loadedImg);
                });
            };
            const miP5 = new p5((p) => loadTexture(p));
        } else {
            setImgTexture(null);
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
                
                // Enable orbit control for camera movement
                p.orbitControl();
                
                // Apply zoom level as a scale factor
                p.scale(zoom);
                
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
    }, [proporcion, iteraciones, lados, imgTexture, backgroundColor, zoom, fillColor]);

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
            <div className='ContenedorSlider' style={{backgroundColor: "white" , width: "50%", height: "1rem", top: "1rem", position: "absolute", left: "25%", borderRadius:"5px"}}>
                <Slider 
                    min={0.01} 
                    max={5} 
                    step={0.01} 
                    onChange={(value) => setZoom(value)} 
                    value={zoom}
                    style={{marginTop: "0.15rem"}}
                />
            </div>
            <div ref={sketchRef}></div>
        </div>
    );
};

export default Canvas;
