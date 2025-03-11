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
            <Drawer title="Menú" placement="left" onClose={cerrar} open={open} width={"300px"}>
                <Flex vertical>S
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
            width={700}
            title="Info"
            open={openInfo}
            onOk={cerrarInfo}
            onCancel={cerrarInfo}
            >
            <Carousel dotPosition="bottom" arrows>
                <div> {/* Agrega espacio arriba y abajo */}
                    <h1 style={{textAlign:"center"}}>¡Fractalízate!</h1>
                    <br />
                    <h2 style={{textAlign:"center"}}>¡Celebramos las matemáticas con arte y creatividad!</h2>
                    <br />
                    <h2 style={{textAlign:"center"}}>¡Feliz día internacional de las matemáticas 2025!</h2>
                </div>
                <div>
                    <h3  style={{marginLeft: "30px", marginRight: "30px"}}>¿Qué es esto?</h3>
                    <p style={{marginLeft: "30px", marginRight: "30px", marginBottom: "30px"}}>Esta es una aplicación para generar fractales usando un color o una imagen. </p>
                    <h3 style={{marginLeft: "30px", marginRight: "30px"}}>¿Cómo funciona?</h3>
                    <p style={{marginLeft: "30px", marginRight: "30px"}}>El programa genera un póligono y en cada iteración, coloca polígonos en cada uno de sus vértices. Estos polígonos pueden estar rellenos de un color o con la imagen que tú quieras.
                    Puedes cambiar el zoom de la imagen generada moviendo el slider que se encuentra en la parte superior</p>
                </div>
                <div>
                    <h3 style={{marginLeft: "30px", marginRight: "30px"}}>Menú</h3>
                    <p style={{marginLeft: "30px", marginRight: "30px"}}>A tu izquierda tienes un botón para desplegar el menú. En él encontrarás opciones para cambiar la manera en la que se genera el fractal. Puedes modificar los siguientes parámetros:</p>
                    <ul style={{marginLeft: "30px", marginRight: "30px", marginBottom: "30px"}}>
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

                <div>
                    <h3  style={{marginLeft: "30px", marginRight: "30px"}}>Créditos</h3>
                    <p style={{marginLeft: "30px", marginRight: "30px", marginBottom: "30px"}}>Esta aplicación está siendo desarrollada en el <strong>Laboratorio de Visualización y Sonorización de Matemáticas</strong>, un proyecto del <strong>Instituto de Matemáticas de la UNAM</strong>. </p>
                    
                    <p style={{marginLeft: "30px", marginRight: "30px"}}>En su desarrollo han participado Emilio Junoy de Juambelz, Iñaki Mendieta Noguez, 
                    Hugo Giovani Ramírez, Pablo de la Fuente Parres, Dylan Alexis Facio y Darío Alatorre Guzmán, a partir de una <a href="https://penelope.matem.unam.mx/fractalizate/" target = "blank"> versión anterior</a>  desarrollada por este último y Bruno Cisneros de la Cruz.</p>
                </div>

                </Carousel>


            </Modal>
        </>
    );
};

export default Cajon;
