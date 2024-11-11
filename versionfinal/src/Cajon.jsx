import React, { useState } from 'react';
import {Carousel, Modal,Tooltip, Flex, Drawer, Button, Slider, Typography, Upload, ColorPicker } from 'antd';
import { RightOutlined,QuestionCircleOutlined } from '@ant-design/icons';
import './Carrusel.css'

const { Text } = Typography;

const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};

const Cajon = ({ lados, setLados, iteraciones, setIteraciones, proporcion, setProporcion, imagen, setImagen, canvasRef, setBackgroundColor, setFillColor }) => {
    const [open, setOpen] = useState(false);
    const [openInfo, setOpenInfo] = useState(true);


    const abrir = () => {
        setOpen(true);
    };

    const cerrar = () => {
        setOpen(false);
    };

    const abrirInfo = ()=>{
        setOpenInfo(true);
    }

    const cerrarInfo = ()=>{
        setOpenInfo(false);
    }

    const slideChange = (currentSlide)=>{
        console.log(currentSlide)
    }

    const beforeUpload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const image = new window.Image();
            image.src = reader.result;
            image.onload = () => {
                setImagen(image); // Set the loaded image in state
            };
        };
        reader.readAsDataURL(file);
        
        return false; // Prevent upload to server
    };

    const downloadCanvas = () => {
        const canvas = canvasRef.current.querySelector('canvas'); // Get the canvas element
        if (canvas) {
            const dataUrl = canvas.toDataURL(); // Get the image data from the canvas
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'canvas_image.png'; // Name of the downloaded file
            link.click();
        }
    };

    const handleBackgroundColorChange = (color) => {
        // Check if color.rgb exists (for RGB color representation)
        if (color) {
            const r = color.metaColor.r;
            const g = color.metaColor.g;
            const b = color.metaColor.b;
            // Convert RGB to Hex format
            const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
            setBackgroundColor(hex); // Update the background color state
        } else {
            console.error('Invalid color object:', color);
        }
    };
    

    // Handle fill color change
    const handleFillColorChange = (color) => {
        if (color) {
            const r = color.metaColor.r;
            const g = color.metaColor.g;
            const b = color.metaColor.b;
            // Convert RGB to Hex format
            const hex = `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
            setFillColor(hex); // Update the background color state
        } else {
            console.error('Invalid color object:', color);
        }
    };

    return (
        <>
            <Button icon={<RightOutlined />} onClick={abrir} style={{ position: 'absolute', left: "1rem", top: "1rem" }} />
            <Drawer title="!Fractalízate!" placement="left" onClose={cerrar} open={open} width={"30%"}>
                <Flex vertical>
                    <Tooltip title = "Lados del polígono" placement='top'>
                        <Text style={{ textAlign: 'center' }}>Lados</Text>
                    </Tooltip>
                    <Slider
                        className="SliderLados"
                        defaultValue={lados}
                        onChange={(event) => {
                            setLados(event);
                        }}
                        min={3}
                        max={8}
                    />
                    <Tooltip title = "Iteraciones del fractal" placement='top'>
                        <Text style={{ textAlign: 'center', marginTop: '1rem' }}>Iteraciones</Text>
                    </Tooltip>
                    <Slider
                        className="SliderIteraciones"
                        defaultValue={iteraciones}
                        onChange={(event) => {
                            setIteraciones(event);
                        }}
                        min={0}
                        max={4}
                    />
                    <Tooltip title = "Proporción de tamaño entre iteraciones">
                        <Text style={{ textAlign: 'center', marginTop: '1rem' }}>Proporción</Text>
                    </Tooltip>
                    <Slider
                        className="SliderProporcion"
                        defaultValue={proporcion}
                        onChange={(event) => {
                            setProporcion(event);
                        }}
                        step={0.01}
                        min={0}
                        max={1}
                    />

                    <Flex vertical>
                        <Flex>
                            <Flex vertical style={{marginLeft: "20%"}}>
                                <Text style={{ textAlign: 'center', marginTop: '1rem' }}>Fondo</Text>
                                <ColorPicker defaultValue={"#000000"} onChange={handleBackgroundColorChange} />
                            </Flex>

                            <Flex vertical style={{marginLeft: "30%"}}>
                                <Text style={{ textAlign: 'center', marginTop: '1rem'}}>Relleno</Text>
                                <ColorPicker defaultValue = {"#ffffff"} onChange={handleFillColorChange} />
                            </Flex>
                            
                        </Flex>    
                        
                        <Flex style= {{width: "100%"}}>
                            <Upload
                                name="file"
                                listType="picture"
                                showUploadList={true}  // No mostrar la lista de archivos cargados
                                beforeUpload={beforeUpload}
                                onRemove={()=>setImagen(null)}
                                maxCount={1}
                            >
                                <Button style={{marginTop:"1rem"} }>Subir Imagen</Button>
                            </Upload>
                        </Flex>
                    </Flex>
                    {/* Verificación de la imagen cargada */}
                    {imagen && (
                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <img src={imagen.src} alt="Cargada" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        </div>
                    )}
                    <Button 
                        type="primary" 
                        onClick={downloadCanvas} 
                        style={{ marginTop: '1rem', width: '100%' }}
                    >
                        Descargar Imagen
                    </Button>
                </Flex>
            </Drawer>
            <Button icon={<QuestionCircleOutlined />} onClick = {abrirInfo} style={{position: 'absolute', right: "1rem", top: "1rem"}}>
            </Button>
            <Modal
            footer={[]}
            width={500}
            title="Información"
            open={openInfo}
            onOk={cerrarInfo}
            onCancel={cerrarInfo}
            >
            <Carousel dotPosition='buttom'>
            <div>
                <h1>Bienvenido a fractalizate</h1>
            </div>
            <div>
                <h3>¿Qué es?</h3>
                <p>Esta es una aplicación de generación de fractales utilizando una imagen.</p>
            </div>
            <div>
                <h3>¿Cómo funciona?</h3>
                <p>El programa genera un póligono y en cada iteración, coloca polígonos en cada uno de sus vértices. Estos polígonos pueden estar rellos de un color o con una imagen que puedes subir.</p>
                <p>Puedes cambiar el zoom de la imagen generada moviendo el slider que se encuentra en la parte superior</p>
            </div>
            <div>
                <h3>Menú</h3>
                <p>A tu izquierda tienes un botón para desplegar el menú. En él encontrarás opciones para cambiar la manera en la que se genera el fractal, aquí hay una breve explicación de qué hacen algunas de ellas:</p>
                <ul>
                    <li>
                        <p>Lados: escoge el número de lados que quieres que tenga el polígono.</p>
                    </li>
                    <li>
                        <p>Iteraciones: elige el número de iteraciones para generar el fractal. En cada iteración se agregan polígonos a cada uno de los polígonos dibujados en el paso anterior.</p>
                    </li>
                    <li>
                        <p>Proporción: elige la proporción que se aplica en cada iteración. Los polígonos que resultan en cada iteración mantienen esta proporción con respecto al polígono anterior.</p>
                    </li>
                </ul>
            </div>
            </Carousel>

            </Modal>
        </>
    );
};

export default Cajon;
