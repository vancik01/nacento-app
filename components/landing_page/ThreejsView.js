import React, { useRef, useState, Suspense, useEffect, useLayoutEffect, } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Line, PerspectiveCamera, OrthographicCamera, OrbitControls } from '@react-three/drei'


import { DoubleSide } from 'three'
import * as THREE from 'three'

// import img from "../../public/static/0.png"
import img from "../../public/static/test.png"
import { join } from 'lodash'


function ThreejsView(props) {
  const [showScene, setShowScene] = useState(false);
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
    }

    function points_from_shape(shape) {
      var points = []

      if (!shape.curves.length) return [shape.currentPoint]

      for (let i = 0; i < shape.curves.length; i++) {

        if (i == shape.curves.length - 1) {
          points.push(shape.curves[i].v1)
          points.push(shape.curves[i].v2)
        }

        else points.push(shape.curves[i].v1)

      }

      return points
    }

    function handleCircleHover(e) {
      let id = e.object.userData
      if (id['ix'] == 0 && id['pix'] == points.length - 1 && points[id['pix']].length > 1)
        e.object.scale.set(2, 2, 2)
    }

    function handleCircleUnhover(e) {
      let id = e.object.userData
      if (id['ix'] == 0 && id['pix'] == points.length - 1 && points[id['pix']].length > 1)
        e.object.scale.set(1, 1, 1)
    }

    function get_Circles(points) {
      const Circles = []

      for (let p = 0; p < points.length; p++) {
        for (let i = 0; i < points[p].length; i++) {

          Circles.push(
            <mesh
              rotation={[-Math.PI / 2, 0, 0]}
              position={[points[p][i].x, 0.01, -points[p][i].y]}
              key={`${p}${i}`}
              onPointerOver={handleCircleHover}
              onPointerOut={handleCircleUnhover}
              userData={{ "ix": i, "pix": p }}>

              <circleGeometry args={[0.2, 32]} />
              <meshBasicMaterial attach="material" color="black" side={DoubleSide} />

              <mesh>
                <circleGeometry args={[0.18, 32]} />
                <meshBasicMaterial attach="material" color="orange" side={DoubleSide} />
              </mesh>

            </mesh>
          )
        }
      }

      return Circles
    }

    function get_RealPolygons(points) {
      const Polygons = []

      points.forEach(polygon => {
        if (polygon.length)
          Polygons.push(new THREE.Shape(polygon))
      });

      var is_hole = []
      for (let i = 0; i < Polygons.length; i++) is_hole[i] = false

      const Real_polygons = []
      for (let i = 0; i < Polygons.length; i++) {
        var pts1 = points_from_shape(Polygons[i])

        if (is_hole[i]) continue

        for (let j = i + 1; j < Polygons.length; j++) {
          var pts2 = points_from_shape(Polygons[j])

          if (pts2.length > 1 && inside(pts2[0], pts1)) {

            let is_inside_hole = false

            for (let h = 0; h < Polygons[i].holes.length; h++) {
              let pts_hole = points_from_shape(Polygons[i].holes[h])
              if (inside(pts2[0], pts_hole)) {
                is_inside_hole = true
                break
              }
            }

            if (!is_inside_hole) {
              Polygons[i].holes.push(Polygons[j])
              is_hole[j] = true
            }
          }
        }

        if (!is_hole[i])
          Real_polygons.push(Polygons[i])
      }
      return Real_polygons
    }

    function Line({ start, end }) {
      const ref = useRef()
      useLayoutEffect(() => {
        ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
      }, [start, end])
  
      return (
        <line ref={ref}>
          <bufferGeometry />
          <lineBasicMaterial color="black" />
        </line>
      )
    }

    function get_Lines(points){
      const Lines = []

      for (let i=0; i<points.length; i++) {
        let len = points[i].length-1
        if(i != points.length-1) len++
  
        for (let j=0; j<len; j++) {
            let l = points[i].length
            let p1 = points[i][j]
            let p2 = points[i][j+1]
   
            if(j+1 == l) p2 = points[i][0]
  
            Lines.push(<Line start={[p1.x, 0, -p1.y]} end={[p2.x, 0, -p2.y]} />)
        }
      }

      return Lines
    }

    const Circles = get_Circles(props.points)
    const RealPolygons = get_RealPolygons(props.points)
    const Lines = get_Lines(props.points)


    return (
      <>
      
        {RealPolygons.map(polygon_shape => {
          return (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <shapeGeometry args={[polygon_shape]} />
              <meshBasicMaterial attach="material" color="gray" side={DoubleSide} opacity={0.6} transparent />
            </mesh>
          )
        })}

        {Lines}

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
      return res
    }

    function handleClick(event) {
      var pts = [...points]

      const new_point = new THREE.Vector2(event.point.x, -event.point.z)

      if (pts.length == 0 || pts[pts.length - 1].length == 0) pts[pts.length - 1].push(new_point)

      else if (pts[pts.length - 1].length > 1 && dist(new_point, pts[pts.length - 1][0]) < 1) {
        pts.push([])
      }

      else pts[pts.length - 1].push(new_point)


      // let x = (event.point.x + img.width/200) * 100
      // let y = (event.point.z + img.height/200) * 100

      setPoints(pts)
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
