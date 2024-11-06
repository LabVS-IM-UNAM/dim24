import React, {useRef, useEffect, useState} from 'react';
import {Slider, Drawer, Button} from 'antd';
import p5 from 'p5';
import Cajon from './Cajon';
import { Complejo } from './Complejo';
import Poligono from './Poligono';
import { poligonosFractal, dibujarPoligonos } from './fractal';

const Canvas = ()=>{
    const sketchRef = useRef();
    const [open, setOpen] = useState(true);
    const [lados, setLados] = useState(4);
    const [iteraciones, setIteraciones] = useState(3);
    const [proporcion, setProporcion] = useState(1/2);


    useEffect( ()=>{
        const sketch = (p)=>{
            p.setup = () => {
                p.createCanvas(window.innerWidth,window.innerHeight);
                p.background(0);
                p.noLoop()
            };

            p.draw = ()=>{
                p.fill(255);
                const poligono = new Poligono(new Complejo(p.width/2, p.height/2),new Complejo(p.width/2, p.height/2), lados, proporcion, 0);
                const poligonos=poligonosFractal([poligono], iteraciones);
                dibujarPoligonos(p,poligonos);
                
            };

            p.windowResized = ()=>{
                p.resizeCanvas(window.innerWidth, window.innerHeight);
                p.background(0);
            };

            

        };

        const miP5 = new p5(sketch, sketchRef.current);

        return ()=>{
            miP5.remove();
        };
    },[lados,iteraciones, proporcion]);



    return (
        <div style={{position: 'relative'}}>
            <Cajon lados={lados} setLados={setLados} iteraciones = {iteraciones} setIteraciones={setIteraciones} proporcion={proporcion} setProporcion={setProporcion}/>
            <div ref={sketchRef}></div>
        </div>
    );

}

export default Canvas;