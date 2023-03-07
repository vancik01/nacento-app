import React, { useRef, useState, Suspense, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Line, PerspectiveCamera, OrthographicCamera, OrbitControls } from '@react-three/drei'


import { DoubleSide } from 'three'
import * as THREE from 'three'

// import img from "../../public/static/0.png"
import img from "../../public/static/test.png"
import { join } from 'lodash'


function ThreejsView(props) {
  const [showScene, setShowScene] = useState(true);
  const [cursor, setCursor] = useState('crosshair');
  const [trackerVisible, setTracker] = useState(false);
  const [trackerPosition, setTrackerPosition] = useState([10, 10, 10]);
  const [points, setPoints] = useState([[]]);



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

  function Tracker(props) {

    const pointsArray = []
    pointsArray.push(new THREE.Vector2(0, 0))
    pointsArray.push(new THREE.Vector2(10, 0))
    pointsArray.push(new THREE.Vector2(10, 10))
    pointsArray.push(new THREE.Vector2(0, 10))

    const holesArray = []
    holesArray.push(new THREE.Vector2(2, 2))
    holesArray.push(new THREE.Vector2(8, 2))
    holesArray.push(new THREE.Vector2(8, 8))
    holesArray.push(new THREE.Vector2(2, 8))

    const polygonShape = new THREE.Shape(pointsArray);
    const holeShape = new THREE.Shape(holesArray);

    polygonShape.holes.push(holeShape)

    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={props.position} scale={[.05, .05, .05]} >
        <shapeGeometry args={[polygonShape]} />
        <meshBasicMaterial attach="material" color="orange" side={DoubleSide} />
      </mesh>
    )

  }

  function Circle(props) {
    const circleShape = new THREE.CircleGeometry(props.points);

    return (
      <></>
    )

  }


  function Polygon(props) {

    function inside(point, vs) {
      var x = point.x, y = point.y;

      var inside = false;
      for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i].x, yi = vs[i].y;
        var xj = vs[j].x, yj = vs[j].y;

        var intersect = ((yi > y) != (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }

      return inside;
    };

    const Circles = []
    for (let p = 0; p < props.points.length; p++) {
      for (let i = 0; i < props.points[p].length; i++) {

        Circles.push(
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[props.points[p][i].x, 0.01, -props.points[p][i].y]} key={`${p}${i}`}>
            <circleGeometry args={[0.2, 32]} />
            <meshBasicMaterial attach="material" color="orange" side={DoubleSide} />
          </mesh>)
      }
    }

    var drawn = []
    for (let i = 0; i < props.points.length; i++) drawn.push(false)

    const Polygons_pts = []
    for (let p = 0; p < props.points.length; p++) {
      let polygon_pts = props.points[p]
      if (polygon_pts.length) {

        if(!drawn[p]) {
          var polygon = new THREE.Shape(polygon_pts)
          drawn[p] = true
          
          for (let j = p + 1; j < props.points.length; j++) {
            let hole = props.points[j]
            if (hole.length > 1 && inside(hole[0], props.points[p]) )
              if(!drawn[j]){
                  console.log(new THREE.Shape(hole))
                  drawn[j] = true
                  polygon.holes.push(new THREE.Shape(hole))
              }        
          }


          Polygons_pts.push(polygon)
        }
      }
    }


    return (
      <>

        {Polygons_pts.map(polygon_shape => {
          return (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <shapeGeometry args={[polygon_shape]} />
              <meshBasicMaterial attach="material" color="gray" side={DoubleSide} opacity={0.6} transparent />
            </mesh>
          )
        })}

        {Circles}

      </>

    )

  }

  function ProjectPlane(props) {
    const mesh = useRef()

    const texture = useLoader(THREE.TextureLoader, img.src)
    // texture.format = THREE.RGBAFormat
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.NearestMipmapLinearFilter

    function dist(p1, p2) {
      let res = Math.abs(Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2))
      console.log("RES: ", res)
      return res
    }

    function handleClick(event) {
      // console.log(points)

      var pts = [...points]

      const new_point = new THREE.Vector2(event.point.x, -event.point.z)

      if (pts.length == 0 || pts[pts.length - 1].length == 0) pts[pts.length - 1].push(new_point)

      else if (pts[pts.length - 1].length > 1 && dist(new_point, pts[pts.length - 1][0]) < 1) {
        pts.push([])
      }

      else pts[pts.length - 1].push(new_point)


      // let x = (event.point.x + img.width/200) * 100
      // let y = (event.point.z + img.height/200) * 100

      console.warn(event.point.x, event.point.z)

      setPoints(pts)

      console.log(points)

    }

    function handleHover() {
      setCursor('crosshair')
      setTracker(true)
    }

    function handleUnhover() {
      setCursor('default')
      setTracker(false)
    }

    function handleMove(event) {
      // console.log(event.point.x, event.point.y, event.point.z)

      // setTrackerPosition([event.point.x - 0.25, 0.001, event.point.z + 0.25])
    }

    return (
      <mesh onClick={handleClick}
        position={[0, -0.001, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[img.width / 100, img.height / 100, 3]}
        onPointerOver={handleHover}
        onPointerOut={handleUnhover}
      // onPointerMove={ handleMove }
      >

        <planeGeometry />
        <meshBasicMaterial attach="material" map={texture} side={DoubleSide} toneMapped={false} />
      </mesh>
    )
  }


  return (
    <>
      <button onClick={() => setShowScene(!showScene)}>
        {props.label}
      </button>

      {showScene &&
        <div className={"Editor-Canvas"} style={{
          height: `${width * 0.8 * (img.height / img.width)}px`,
          cursor: `${cursor}`
        }}>
          <Canvas style={{ border: `1px solid black`, background: "black" }}>
            <Suspense fallback={null}>
              <ambientLight intensity={100} color={"white"} />

              <PerspectiveCamera
                position={[0, (img.width / 200) / 1.19175, 0]}
                fov={80}
                makeDefault />

              <ProjectPlane />
              <gridHelper position={[0, -0.2, 0]} args={[1000, 1000, 0xff0000, 'gray']} />

              {points.length && <Polygon points={points} />}

              {/* { trackerVisible && <Tracker position={trackerPosition}/> } */}

              <OrbitControls enableRotate={false} zoomSpeed={2} enableDamping={false} />

            </Suspense>
          </Canvas>
        </div>
      }

    </>

  )
}

export default ThreejsView
