import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Html, OrbitControls, PerspectiveCamera } from '@react-three/drei'

import * as THREE from 'three'

import Img from "../../public/static/Frame.png"
import Footer from './Footer'

function Mockup() {
    const useDeviceSize = () => {

        const [width, setWidth] = useState(0)
        const [height, setHeight] = useState(0)

        const handleWindowResize = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
        }

        useEffect(() => {
            // component is mounted and window is available
            handleWindowResize();
            window.addEventListener('resize', handleWindowResize);
            // unsubscribe from the event on component unmount
            return () => window.removeEventListener('resize', handleWindowResize);
        }, []);

        return [width, height]

    }

    const [width, height] = useDeviceSize();

    function Box(props) {

        const texture = useLoader(THREE.TextureLoader, Img.src)

        function convertRange(value, r1, r2) {
            return (value - r1[0]) * (r2[1] - r2[0]) / (r1[1] - r1[0]) + r2[0];
        }

        function handleMouseMove(e) {
            var o = document.getElementById('canvas').getBoundingClientRect();

            let x = ((e.clientX - o.left) / (o.right - o.left)) * 2 - 1;
            let y = -((e.clientY - o.top) / (o.bottom - o.top)) * 2 + 1;

            // x = convertRange( x, [ -1, 1 ], [ -5, 1 ] )

            e.object.children[0].rotation.set((y * Math.PI / 2) / 20, (x * Math.PI / 2) / 20, 0)

        }

        return (
            <mesh onPointerMove={handleMouseMove} position={props.position} scale={10000} >


                <planeBufferGeometry />
                <meshBasicMaterial transparent opacity={0} />


                <Html transform castShadow fullscreen scale={1 / 10000}>
                    {/* <Footer/> */}
                    <img src={Img.src} alt="hero" />
                </Html>

            </mesh>


        )
    }

    return (
        <div style={{ width: `${width}px`, height: `${(width / 2.5)}px`, border: "0px solid black" }}>
            <Canvas id='canvas' camera={{ position: [0, 0, 20] }}>
                {/* <Canvas id='canvas' camera={{position:[0,0,16]}} onPointerOver={handleMove}> */}
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <Box position={[0, 0, 0]} />

                {/* <PerspectiveCamera zoom={-5}/> */}

                {/* <OrbitControls enableRotate={false}/> */}

            </Canvas>

        </div>
    )
}

export default Mockup
