import React, { useRef, useState, Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Line, PerspectiveCamera, OrthographicCamera, OrbitControls } from '@react-three/drei'


import { DoubleSide  } from 'three'
import * as THREE from 'three'

// import img from "../../public/static/0.png"
import img from "../../public/static/test.png"




function ThreejsView(props) {
    const [showScene, setShowScene] = useState(true);
    const [cursor, setCursor] = useState('crosshair');
    const [points, setPoints] = useState([]);


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

    function Polygon(props){
      console.log(props.points)
      const polygonShape = new THREE.Shape( props.points );

      return(
        <mesh rotation={[-Math.PI/2, 0, 0]} >
          <shapeGeometry args={[polygonShape]} />
          <meshBasicMaterial attach="material" color="gray" side={DoubleSide} opacity={0.6} transparent/>
        </mesh>
      )

    }

    function ProjectPlane(props) {
      const mesh = useRef()

      const texture = useLoader(THREE.TextureLoader, img.src)
      // texture.format = THREE.RGBAFormat
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestMipmapLinearFilter


      function handleClick(event){
        console.log(event)

        // let x = (event.point.x + img.width/200) * 100
        // let y = (event.point.z + img.height/200) * 100

        console.warn(event.point.x, event.point.z)

        setPoints([...points, new THREE.Vector2( event.point.x, -event.point.z  )])

      }

      function handleHover(){
        if (cursor !== 'crosshair'){
            
        }
      }

      function handleUnhover(){
        if (cursor !== 'default'){
          setCursor('default')
      }
      }

      return (
        <mesh onClick={handleClick} 
              position={[0, -0.001, 0]} 
              rotation={[-Math.PI/2, 0, 0]} 
              scale={[img.width/100, img.height/100, 3]}
              onPointerOver={setCursor('crosshair')}
              onPointerOut={setCursor('default')}
              >
          
          <planeGeometry />
          <meshBasicMaterial attach="material" map={texture} side={DoubleSide} toneMapped={false}/>
        </mesh>
      )
    }


  return (
    <>
    <button onClick={() => setShowScene(!showScene)}>
      {props.label}
    </button>
    
    {showScene &&
    <div className='Editor-Canvas' style={{height: `${width*0.8 * (img.height/img.width)}px`,
    cursor: "crosshair" 
    }}>
        <Canvas style={{border: `1px solid black`, background: "black" }}>
          <Suspense fallback={null}>
              <ambientLight intensity={100} color={"white"}/>
              
              <PerspectiveCamera position={[0, (img.width/200) / 1.19175, 0]} fov={80} makeDefault/>

              <ProjectPlane/>
              <gridHelper position={[0,-0.2,0]} args={[1000, 1000, 0xff0000, 'gray']}/>

               {points.length && <Polygon points={points}/>}


              <OrbitControls enableRotate={false} zoomSpeed={2} enableDamping={false}/>

            </Suspense>
        </Canvas>
    </div>
    }

    </>
    
  )
}

export default ThreejsView
