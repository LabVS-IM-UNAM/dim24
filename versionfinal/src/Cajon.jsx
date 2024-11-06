import React, {useState} from 'react';
import {Drawer, Button, Slider, Typography} from 'antd';
import {RightOutlined} from '@ant-design/icons';

const {Text} = Typography;


const Cajon = ({lados, setLados, iteraciones, setIteraciones, proporcion, setProporcion})=>{
    const [open, setOpen] = useState(true);

    const abrir = ()=>{
        setOpen(true);
    };

    const cerrar = ()=>{
        setOpen(false);
    };

    return (
        <>
            <Button type= "primary" icon = {<RightOutlined />} onClick = {abrir} style={{position: 'absolute', left: "1rem", top: "1rem"}}/>
            <Drawer title= "Cajon" placement='left'  onClose = {cerrar} open={open} width={"30%"}>
                <Text style={{textAlign: 'center'}}>Lados</Text>
                <Slider className='SliderLados'
                    defaultValue={lados}
                    onChange={(event)=>{
                        setLados(event);
                    }}
                    min={3}
                    max={20}
                />
                <Slider className='SliderIteraciones'
                    defaultValue={iteraciones}
                    onChange={(event)=>{
                        setIteraciones(event);
                    }}
                    min={0}
                    max={8}
                />
                <Slider className='SliderProporcion'
                    defaultValue={proporcion}
                    onChange={(event)=>{
                        setProporcion(event);
                    }}
                    step={0.01}
                    min={0}
                    max={1}
                />
            </Drawer>
        </>
    );

};

export default Cajon;