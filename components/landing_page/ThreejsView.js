import { createRoot } from 'react-dom/client'
import React, { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Line, OrbitControls, PerspectiveCamera } from '@react-three/drei'

import * as THREE from 'three'
import img from "../../public/static/0.png"
import { LinearEncoding, sRGBEncoding, DoubleSide } from 'three'


function ThreejsView(props) {
    const [showScene, setShowScene] = useState(false);

    function Box(props) {
        const mesh = useRef()

        console.log(img)
        let h = img.height
        let w = img.width

        const texture = useLoader(THREE.TextureLoader, img.src)

        return (
          <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[w/10, h/10, 10]}>
            
            <planeBufferGeometry />
            <meshStandardMaterial attach="material" map={texture} side={DoubleSide} />
            {/* <planeBufferGeometry attach="geometry" args={[10, 10]} /> */}
            {/* <meshStandardMaterial attach="material" map={texture} />*/}

          </mesh>
        )
      }

  return (
    <>
    <button onClick={() => setShowScene(!showScene)}>
      {props.label}
    </button>

    {showScene && <div className='absolute w-[75%] h-[75%] z-10'>
        <Canvas colorManagement>
          <Suspense fallback={null}>
              <ambientLight intensity={1}/>
              {/* <pointLight position={[0, 10, 0]} intensity={2}/> */}


              <PerspectiveCamera position={[2, 2, 2]} makeDefault />
              <Box/>

        {/*
              <Box/>
              {/* <Box position={[-1.2, 0, 0]} encoding={THREE.LinearEncoding}/>
              <Box position={[-11.5, 0, 0]} encoding={THREE.sRGBEncoding}/>
              <Box position={[-1.2, 0, -10.3]} encoding={THREE.BasicDepthPacking}/>
              <Box position={[-11.5, 0, -10.3]} encoding={THREE.RGBADepthPacking}/> */}

              {/* <Box position={[1.2, 0, 0]} /> */}
              <OrbitControls />
            </Suspense>
        </Canvas>
    </div>
    }

    </>
    
  )
}

export default ThreejsView
